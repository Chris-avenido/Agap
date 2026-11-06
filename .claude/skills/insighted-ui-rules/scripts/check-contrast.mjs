#!/usr/bin/env node
// Verifies WCAG 2.x contrast for every pair in assets/insighted-tokens.json. Node built-ins only.
// Usage: node check-contrast.mjs [--tokens <path>] [--json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED = { text: 4.5, graphic: 3 };

function parseArgs(argv) {
  const args = { tokens: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--tokens') args.tokens = argv[++i];
    else if (argv[i] === '--json') args.json = true;
    else if (argv[i] === '--help' || argv[i] === '-h') args.help = true;
  }
  return args;
}

const hexToRgb = (hex) => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`not a 6-digit hex color: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const rgbToHex = (rgb) => '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

function luminance([r, g, b]) {
  const lin = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function lookup(tokens, spec) {
  if (/^#[0-9a-fA-F]{3,6}$/.test(spec)) return spec;
  let node = tokens;
  for (const part of spec.split('.')) {
    if (node == null || typeof node !== 'object' || !(part in node)) throw new Error(`unknown token path: ${spec}`);
    node = node[part];
  }
  if (typeof node !== 'string') throw new Error(`token path is not a color string: ${spec}`);
  return node;
}

function resolve(tokens, spec) {
  if (typeof spec === 'string') return hexToRgb(lookup(tokens, spec));
  const top = hexToRgb(lookup(tokens, spec.color));
  const base = hexToRgb(lookup(tokens, spec.over));
  return top.map((v, i) => v * spec.alpha + base[i] * (1 - spec.alpha));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log('node check-contrast.mjs [--tokens <path>] [--json]');
    return 0;
  }
  const here = path.dirname(fileURLToPath(import.meta.url));
  const tokensPath = path.resolve(args.tokens || path.join(here, '..', 'assets', 'insighted-tokens.json'));
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
  const results = [];
  for (const pair of tokens.contrastPairs || []) {
    const fg = resolve(tokens, pair.fg);
    const bg = resolve(tokens, pair.bg);
    const r = ratio(fg, bg);
    const required = pair.min ?? REQUIRED[pair.kind] ?? null;
    const status = required === null ? 'INFO' : r >= required ? 'PASS' : 'FAIL';
    results.push({
      id: pair.id,
      kind: pair.kind,
      fg: rgbToHex(fg),
      bg: rgbToHex(bg),
      ratio: Math.round(r * 100) / 100,
      required,
      status,
      note: pair.note || null,
    });
  }
  const failed = results.filter((r) => r.status === 'FAIL').length;
  const summary = {
    tokens: tokensPath,
    total: results.length,
    pass: results.filter((r) => r.status === 'PASS').length,
    fail: failed,
    info: results.filter((r) => r.status === 'INFO').length,
  };
  if (args.json) {
    console.log(JSON.stringify({ summary, results }));
  } else {
    for (const r of results) {
      const req = r.required === null ? 'n/a ' : `${r.required}:1`;
      console.log(`${r.status.padEnd(4)}  ${String(r.ratio.toFixed(2)).padStart(5)}:1  need ${req.padEnd(5)}  ${r.kind.padEnd(10)}  ${r.id}  ${r.fg} on ${r.bg}${r.note ? '  (' + r.note + ')' : ''}`);
    }
    console.log(`\n${summary.pass} pass, ${summary.fail} fail, ${summary.info} info (decorative, no minimum) of ${summary.total} pairs`);
  }
  return failed > 0 ? 1 : 0;
}

try {
  process.exitCode = main();
} catch (err) {
  console.error(`check-contrast: ${err.message}`);
  process.exitCode = 2;
}
