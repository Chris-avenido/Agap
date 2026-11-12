import type { RefObject } from 'react';

interface TourStep {
  label: string;
  title: string;
  body: string;
}

interface TourOverlayProps {
  highlightRef: RefObject<HTMLDivElement | null>;
  tooltipRef: RefObject<HTMLDivElement | null>;
  active: boolean;
  index: number;
  steps: TourStep[];
  onEnd: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function TourOverlay({ highlightRef, tooltipRef, active, index, steps, onEnd, onPrev, onNext }: TourOverlayProps) {
  return (
    <>
        <div
          ref={highlightRef}
          className={`tour-highlight ${active ? 'active' : ''}`}
        />
        {active && (
          <div
            ref={tooltipRef}
            className="tour-tooltip active"
          >
            <button
              type="button"
              className="tour-skip"
              onClick={onEnd}
              title="Close tutorial"
            >
              ✕
            </button>
            <div className="tour-step-label">
              {steps[index]?.label}
            </div>
            <h4>{steps[index]?.title}</h4>
            <p>{steps[index]?.body}</p>
            <div className="tour-footer">
              <div className="tour-progress">
                Step {index + 1} of {steps.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="tour-btn secondary"
                  onClick={onPrev}
                  disabled={index === 0}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="tour-btn"
                  onClick={onNext}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
