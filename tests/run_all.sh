#!/bin/bash
# Test runner for TEP Control Structure Replay project
# Must complete in under 30 seconds per spec.md

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo "Running Sprint 1.1 tests..."
python3 "$SCRIPT_DIR/test_variables.py"

echo ""
echo "Running Sprint 1.5 verifier tests..."
python3 "$SCRIPT_DIR/test_verifier.py"

echo ""
echo "Running Sprint 2.1 renderer visual test..."
cd "$ROOT_DIR"
node <<'NODE'
let esbuild;
try {
  esbuild = require("esbuild");
} catch (error) {
  console.error("Missing Node dependency: esbuild. Run `npm install` from the repository root.");
  process.exit(1);
}
const fs = require("fs");
const vm = require("vm");

const result = esbuild.buildSync({
  entryPoints: ["renderer/symbols.test.jsx"],
  bundle: true,
  write: false,
  jsx: "transform",
  jsxFactory: "h",
  jsxFragment: "Fragment",
  format: "cjs",
  platform: "node",
  logLevel: "silent",
});

function normalizeChildren(children) {
  return children.flat(Infinity).filter((child) => child !== null && child !== undefined && child !== false);
}

function h(type, props, ...children) {
  if (typeof type === "function") {
    return type({
      ...(props || {}),
      children: children.length === 1 ? children[0] : normalizeChildren(children),
    });
  }

  return {
    type,
    props: props || {},
    children: normalizeChildren(children),
  };
}

function Fragment({ children }) {
  return children;
}

const attrNames = {
  strokeWidth: "stroke-width",
  strokeLinejoin: "stroke-linejoin",
  strokeLinecap: "stroke-linecap",
  strokeDasharray: "stroke-dasharray",
  vectorEffect: "vector-effect",
  textAnchor: "text-anchor",
  fontSize: "font-size",
  fontWeight: "font-weight",
  fontFamily: "font-family",
};

function escapeText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeText(value).replaceAll('"', "&quot;");
}

function renderNode(node) {
  if (Array.isArray(node)) {
    return node.map(renderNode).join("");
  }

  if (typeof node === "string" || typeof node === "number") {
    return escapeText(node);
  }

  if (!node || typeof node !== "object") {
    return "";
  }

  const attributes = Object.entries(node.props || {})
    .filter(([name, value]) => name !== "children" && name !== "key" && value !== undefined && value !== false)
    .map(([name, value]) => {
      const attrName = attrNames[name] || name;
      return value === true ? attrName : `${attrName}="${escapeAttribute(value)}"`;
    })
    .join(" ");

  const openTag = attributes ? `<${node.type} ${attributes}>` : `<${node.type}>`;
  return `${openTag}${node.children.map(renderNode).join("")}</${node.type}>`;
}

const module = { exports: {} };
vm.runInNewContext(result.outputFiles[0].text, {
  module,
  exports: module.exports,
  require,
  console,
  h,
  Fragment,
  Math,
  Array,
  Number,
  String,
  Object,
});

const SymbolsVisualTest = module.exports.default;
if (typeof SymbolsVisualTest !== "function") {
  throw new Error("symbols.test.jsx did not export a visual test component");
}

const svg = renderNode(SymbolsVisualTest({}));
for (const expected of ["Reactor", "Separator", "Stripper", "XMV open", "PIC-7", "signal", "material flow"]) {
  if (!svg.includes(expected)) {
    throw new Error(`Rendered SVG missing expected label: ${expected}`);
  }
}

fs.writeFileSync("/private/tmp/tep-symbols-preview.svg", svg);
console.log("Renderer symbol visual test rendered at /private/tmp/tep-symbols-preview.svg");
NODE

echo ""
echo "Running Sprint 2.2 layout smoke test..."
node <<'NODE'
let esbuild;
try {
  esbuild = require("esbuild");
} catch (error) {
  console.error("Missing Node dependency: esbuild. Run `npm install` from the repository root.");
  process.exit(1);
}
const vm = require("vm");

const result = esbuild.buildSync({
  entryPoints: ["renderer/layout.jsx"],
  bundle: true,
  write: false,
  format: "cjs",
  platform: "node",
  logLevel: "silent",
});

const module = { exports: {} };
vm.runInNewContext(result.outputFiles[0].text, {
  module,
  exports: module.exports,
  console,
  Object,
  Array,
  Error,
});

const { TEP_LAYOUT } = module.exports;
if (!TEP_LAYOUT) {
  throw new Error("renderer/layout.jsx must export TEP_LAYOUT");
}

if (TEP_LAYOUT.canvas?.width !== 1200 || TEP_LAYOUT.canvas?.height !== 800) {
  throw new Error("TEP_LAYOUT must use a 1200x800 canvas");
}

const requiredUnits = ["reactor", "condenser", "separator", "stripper", "compressor"];
for (const unit of requiredUnits) {
  if (!TEP_LAYOUT.units?.[unit]) {
    throw new Error(`TEP_LAYOUT missing required unit: ${unit}`);
  }
}

const valveIds = Array.from({ length: 12 }, (_, index) => `XMV(${index + 1})`);
const measurementIds = Array.from({ length: 41 }, (_, index) => `XMEAS(${index + 1})`);
for (const id of valveIds) {
  if (!TEP_LAYOUT.valves?.[id]) {
    throw new Error(`TEP_LAYOUT missing required valve: ${id}`);
  }
}
for (const id of measurementIds) {
  if (!TEP_LAYOUT.measurements?.[id]) {
    throw new Error(`TEP_LAYOUT missing required measurement: ${id}`);
  }
}

if (Object.keys(TEP_LAYOUT.units).length !== 5) {
  throw new Error("TEP_LAYOUT must contain exactly 5 major units");
}
if (Object.keys(TEP_LAYOUT.valves).length !== 12) {
  throw new Error("TEP_LAYOUT must contain exactly 12 XMV valves");
}
if (Object.keys(TEP_LAYOUT.measurements).length !== 41) {
  throw new Error("TEP_LAYOUT must contain exactly 41 XMEAS tap points");
}

const positionedItems = [
  ...Object.entries(TEP_LAYOUT.units).map(([key, item]) => [`unit:${key}`, item]),
  ...Object.entries(TEP_LAYOUT.valves).map(([key, item]) => [`valve:${key}`, item]),
  ...Object.entries(TEP_LAYOUT.measurements).map(([key, item]) => [`measurement:${key}`, item]),
];
const occupied = new Map();
for (const [key, item] of positionedItems) {
  if (!Number.isFinite(item.x) || !Number.isFinite(item.y)) {
    throw new Error(`${key} must have finite x and y coordinates`);
  }
  if (item.x < 0 || item.y < 0 || item.x > TEP_LAYOUT.canvas.width || item.y > TEP_LAYOUT.canvas.height) {
    throw new Error(`${key} is outside the canvas`);
  }
  const coordinate = `${item.x},${item.y}`;
  if (occupied.has(coordinate)) {
    throw new Error(`${key} shares coordinates with ${occupied.get(coordinate)}`);
  }
  occupied.set(coordinate, key);
}

console.log("Layout smoke test passed with 5 units, 12 valves, and 41 measurements");
NODE

echo ""
echo "All tests passed ✓"
