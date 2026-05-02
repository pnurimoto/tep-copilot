#!/bin/bash
# Test runner for TEP Control Structure Replay project
# Must complete in under 30 seconds per spec.md

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Running Sprint 1.1 tests..."
python3 "$SCRIPT_DIR/test_variables.py"

echo ""
echo "Running Sprint 2.1 renderer visual test..."
cd "$ROOT_DIR"
node <<'NODE'
const esbuild = require("esbuild");
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
echo "All tests passed ✓"
