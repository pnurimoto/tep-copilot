import {
  Controller,
  InstrumentLine,
  ProcessLine,
  Valve,
  Vessel,
} from "./symbols.jsx";

const CELL_STROKE = "#d1d5db";
const TITLE_FILL = "#111827";

/**
 * Visual smoke-test panel for Sprint 2.1 symbols.
 *
 * @param {object} props
 * @param {number} props.width SVG viewport width.
 * @param {number} props.height SVG viewport height.
 */
// if SymbolsVisualTest is wrong, the Engineer will not see every symbol in isolation.
export default function SymbolsVisualTest({ width = 820, height = 560 }) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label="Sprint 2.1 P and ID symbol visual test"
    >
      <rect width={width} height={height} fill="#ffffff" />
      <text
        x="28"
        y="34"
        fontSize="18"
        fontWeight="700"
        fontFamily="Inter, Arial, sans-serif"
        fill={TITLE_FILL}
      >
        Sprint 2.1 Symbol Vocabulary
      </text>

      <SymbolCell title="Vessel: reactor" x={28} y={58}>
        <Vessel position={{ x: 54, y: 34 }} size={{ width: 92, height: 126 }} label="Reactor" type="reactor" />
      </SymbolCell>

      <SymbolCell title="Vessel: separator" x={226} y={58}>
        <Vessel
          position={{ x: 24, y: 64 }}
          size={{ width: 150, height: 78 }}
          label="Separator"
          type="separator"
        />
      </SymbolCell>

      <SymbolCell title="Vessel: stripper" x={424} y={58}>
        <Vessel position={{ x: 56, y: 30 }} size={{ width: 88, height: 132 }} label="Stripper" type="stripper" />
      </SymbolCell>

      <SymbolCell title="Valve states" x={622} y={58}>
        <Valve position={{ x: 42, y: 56 }} size={{ width: 58, height: 40 }} label="XMV open" state="open" />
        <Valve position={{ x: 42, y: 124 }} size={{ width: 58, height: 40 }} label="XMV closed" state="closed" />
      </SymbolCell>

      <SymbolCell title="Controller" x={28} y={300}>
        <Controller position={{ x: 64, y: 52 }} size={72} label="PIC-7" mode="PID" />
      </SymbolCell>

      <SymbolCell title="Instrument line" x={226} y={300}>
        <InstrumentLine position={{ x: 22, y: 106 }} size={{ width: 126, height: -42 }} label="signal" />
      </SymbolCell>

      <SymbolCell title="Process line" x={424} y={300}>
        <ProcessLine position={{ x: 18, y: 104 }} size={136} label="material flow" />
      </SymbolCell>
    </svg>
  );
}

/**
 * Draws one isolated preview cell around a symbol.
 *
 * @param {object} props
 * @param {string} props.title Cell heading.
 * @param {number} props.x Cell x coordinate.
 * @param {number} props.y Cell y coordinate.
 * @param {import("react").ReactNode} props.children Symbol under test.
 */
// if SymbolCell is wrong, the visual test will be cluttered and labels may overlap symbols.
function SymbolCell({ title, x, y, children }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="0"
        y="0"
        width="170"
        height="210"
        rx="6"
        fill="#ffffff"
        stroke={CELL_STROKE}
        strokeWidth="1"
      />
      <text
        x="14"
        y="24"
        fontSize="12"
        fontWeight="700"
        fontFamily="Inter, Arial, sans-serif"
        fill={TITLE_FILL}
      >
        {title}
      </text>
      {children}
    </g>
  );
}

export const SYMBOLS_UNDER_TEST = [
  "Vessel",
  "Valve",
  "Controller",
  "InstrumentLine",
  "ProcessLine",
];
