import sys
import os
import json
import fitz  # PyMuPDF

def hydra_transform(input_pdf, output_dir, dpi):
    os.makedirs(output_dir, exist_ok=True)
    doc = fitz.open(input_pdf)
    manifest = []

    for i in range(len(doc)):
        page = doc[i]
        pix = page.get_pixmap(dpi=dpi)
        filename = f"page_{i+1}.jpg"
        filepath = os.path.join(output_dir, filename)
        pix.save(filepath, "jpeg")
        
        manifest.append({
            "file": filename,
            "width": pix.width,
            "height": pix.height
        })

    manifest_path = os.path.join(output_dir, "manifest.json")
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f)
    doc.close()

def compress_pdf(input_pdf, output_pdf, dpi):
    orig_size = os.path.getsize(input_pdf)

    # Strategy 1: Non-destructive compression (garbage collection + deflate)
    doc = fitz.open(input_pdf)
    temp_native = output_pdf + ".native.pdf"
    doc.save(temp_native, garbage=4, deflate=True)
    doc.close()
    native_size = os.path.getsize(temp_native)

    # Strategy 2: Rasterization (image-based compression)
    temp_raster = output_pdf + ".raster.pdf"
    doc = fitz.open(input_pdf)
    new_doc = fitz.open()
    for i in range(len(doc)):
        page = doc[i]
        pix = page.get_pixmap(dpi=dpi)
        img_bytes = pix.tobytes("jpeg", 85)
        new_page = new_doc.new_page(width=page.rect.width, height=page.rect.height)
        new_page.insert_image(page.rect, stream=img_bytes)
    new_doc.save(temp_raster, garbage=4, deflate=True)
    doc.close()
    new_doc.close()
    raster_size = os.path.getsize(temp_raster)

    # Choose the best result that is smaller than the original
    best_size = orig_size
    best_file = None

    if native_size < best_size:
        best_size = native_size
        best_file = temp_native

    if raster_size < best_size:
        best_size = raster_size
        best_file = temp_raster

    # Clean up and finalize
    if best_file == temp_native:
        os.rename(temp_native, output_pdf)
        if os.path.exists(temp_raster):
            os.remove(temp_raster)
    elif best_file == temp_raster:
        os.rename(temp_raster, output_pdf)
        if os.path.exists(temp_native):
            os.remove(temp_native)
    else:
        # Neither strategy improved the size, discard both
        if os.path.exists(temp_native): os.remove(temp_native)
        if os.path.exists(temp_raster): os.remove(temp_raster)


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: compress_pdf.py <input> <output_or_dir> <dpi> [--hydra]")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_target = sys.argv[2]
    dpi = int(sys.argv[3])
    is_hydra = "--hydra" in sys.argv

    if is_hydra:
        hydra_transform(input_pdf, output_target, dpi)
    else:
        compress_pdf(input_pdf, output_target, dpi)
