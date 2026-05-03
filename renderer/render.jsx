import { TEP_LAYOUT } from "./layout.jsx";

export const MATCHED_COLOR = "#2f7d40";
export const DIVERGED_COLOR = "#7f1d1d";

const INK = "#111111";
const MUTED_INK = "#545454";
const PAPER = "#ffffff";
const UTILITY_BLUE = "#2e617f";
const STEAM = "#8a3d22";
const RULE = "#d7d7d7";
const SIGNAL = "#6f6f6f";
const PID_CANVAS = {
  width: 1320,
  height: 900,
};
const FLOW_SHEET = {
  x: 24,
  y: 78,
  width: 1272,
  height: 758,
};

const VALVE_SIZE = { width: 28, height: 20 };
const CONTROLLER_RADIUS = 22;
const VALVE_RADIUS = 18;
const CONTROLLER_TO_VALVE_GAP = 24;
const TAG_FONT = "Avenir Next, Segoe UI, sans-serif";
const TAG_FONT_SIZE = 10;

const DEFAULT_VALVE_LABEL = { dx: 0, dy: 35, anchor: "middle" };
const DEFAULT_MEASUREMENT_LABEL = { dx: 0, dy: 37, anchor: "middle" };
const VALVE_LABEL_OFFSETS = {
  "XMV(1)": { dx: -34, dy: 4, anchor: "end" },
  "XMV(2)": { dx: 34, dy: 4, anchor: "start" },
  "XMV(3)": { dx: 34, dy: 4, anchor: "start" },
  "XMV(8)": { dx: -4, dy: 58, anchor: "end" },
  "XMV(10)": { dx: 10, dy: 43, anchor: "start" },
};
const MEASUREMENT_LABEL_OFFSETS = {
  "XMEAS(7)": { dx: 28, dy: 4, anchor: "start" },
  "XMEAS(8)": { dx: 28, dy: 4, anchor: "start" },
  "XMEAS(9)": { dx: 28, dy: 4, anchor: "start" },
  "XMEAS(11)": { dx: 30, dy: 4, anchor: "start" },
  "XMEAS(12)": { dx: 30, dy: 4, anchor: "start" },
  "XMEAS(15)": { dx: 30, dy: 4, anchor: "start" },
  "XMEAS(17)": { dx: -28, dy: 4, anchor: "end" },
  "XMEAS(22)": { dx: 28, dy: 4, anchor: "start" },
  "XMEAS(23)": { dx: 28, dy: 4, anchor: "start" },
  "XMEAS(38)": { dx: -28, dy: 4, anchor: "end" },
  "XMEAS(40)": { dx: -28, dy: 4, anchor: "end" },
};
const CONTROLLER_OFFSETS = {};

const CONTROL_POINTS = {
  valves: {
    "XMV(1)": { x: 160, y: 280, label: "D feed valve", orientation: "horizontal" },
    "XMV(2)": { x: 160, y: 400, label: "E feed valve", orientation: "horizontal" },
    "XMV(3)": { x: 160, y: 160, label: "A feed valve", orientation: "horizontal" },
    "XMV(4)": { x: 210, y: 704, label: "A+C feed valve", orientation: "horizontal" },
    "XMV(5)": { x: 760, y: 132, label: "Recycle valve", orientation: "horizontal" },
    "XMV(6)": { x: 1080, y: 160, label: "Purge valve", orientation: "horizontal" },
    "XMV(7)": { x: 780, y: 525, label: "Separator liquid valve", orientation: "horizontal" },
    "XMV(8)": { x: 1030, y: 780, label: "Product valve", orientation: "horizontal" },
    "XMV(9)": { x: 790, y: 760, label: "Steam valve", orientation: "horizontal" },
    "XMV(10)": { x: 475, y: 455, label: "Reactor cooling valve", orientation: "horizontal" },
    "XMV(11)": { x: 735, y: 205, label: "Condenser cooling valve", orientation: "horizontal" },
    "XMV(12)": { x: 455, y: 270, label: "Agitator speed", orientation: "vertical" },
  },
  measurements: {
    "XMEAS(7)": { x: 450, y: 325, label: "Reactor pressure" },
    "XMEAS(8)": { x: 450, y: 382, label: "Reactor level" },
    "XMEAS(9)": { x: 450, y: 500, label: "Reactor temperature" },
    "XMEAS(11)": { x: 1068, y: 370, label: "Separator temperature" },
    "XMEAS(12)": { x: 1068, y: 425, label: "Separator level" },
    "XMEAS(15)": { x: 770, y: 685, label: "Stripper level" },
    "XMEAS(17)": { x: 1110, y: 780, label: "Production rate" },
    "XMEAS(22)": { x: 215, y: 520, label: "Reactor feed D component" },
    "XMEAS(23)": { x: 215, y: 570, label: "Reactor feed A+C composition" },
    "XMEAS(38)": { x: 1110, y: 650, label: "Product E composition" },
    "XMEAS(40)": { x: 1110, y: 720, label: "Product G composition" },
  },
};

const STREAMS = [
  { d: "M 88 160 L 220 160 L 220 330 L 270 330", number: "1", numberAt: { x: 202, y: 146 } },
  { d: "M 88 280 L 205 280 L 205 365 L 270 365", number: "2", numberAt: { x: 190, y: 266 } },
  { d: "M 88 400 L 270 400", number: "3", numberAt: { x: 176, y: 386 } },
  { d: "M 88 704 L 540 704 L 540 735 L 590 735", number: "4", numberAt: { x: 184, y: 690 } },
  { d: "M 760 132 L 525 132 L 525 184 L 400 184 L 400 305", number: "5", numberAt: { x: 714, y: 118 } },
  { d: "M 335 305 L 335 260 L 525 260 L 525 203", number: "6", numberAt: { x: 348, y: 280 } },
  { d: "M 705 203 L 800 203 L 800 338 L 870 338", number: "7", numberAt: { x: 782, y: 194 } },
  { d: "M 940 320 L 940 205 L 915 205 L 915 171", number: "8", numberAt: { x: 952, y: 222 } },
  { d: "M 980 143 L 1080 143 L 1080 160 L 1160 160", number: "9", numberAt: { x: 1132, y: 146 } },
  { d: "M 940 445 L 940 525 L 780 525 L 780 650 L 720 650", number: "10", numberAt: { x: 902, y: 512 } },
  { d: "M 655 780 L 655 820 L 1030 820 L 1030 780 L 1160 780", number: "11", numberAt: { x: 934, y: 806 } },
  { d: "M 400 430 L 520 430 L 520 620 L 590 620", number: "12", numberAt: { x: 500, y: 416 } },
];

const SIGNAL_ROUTES = {
  "XMV(10)->XMEAS(9)": [
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(11)->XMEAS(8)": [
    ["h", 760],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(6)->XMEAS(7)": [
    ["v", 88],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(7)->XMEAS(12)": [
    ["h", 1094],
    ["v", 500],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(8)->XMEAS(15)": [
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(9)->XMEAS(11)": [
    ["h", 1094],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(1)->XMEAS(17)": [
    ["v", 850],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(4)->XMEAS(23)": [
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(2)->XMEAS(38)": [
    ["v", 825],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(3)->XMEAS(40)": [
    ["v", 860],
    ["h", 215],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(12)->XMEAS(22)": [
    ["h", 480],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(8)->XMEAS(17)": [
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(1)->XMEAS(40)": [
    ["v", 860],
    ["h", 215],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(3)->XMEAS(23)": [
    ["h", 215],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(11)->XMEAS(11)": [
    ["h", 1094],
    ["v", 250],
    ["h", 760],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(2)->XMEAS(40)": [
    ["v", 845],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(3)->XMEAS(38)": [
    ["v", 845],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(4)->XMEAS(22)": [
    ["h", "cx"],
    ["v", "cy"],
  ],
};

/**
 * Deterministically renders TEP MV-CV pairings as a P&ID-like SVG.
 *
 * @param {Array|{pairings: Array}} pairings Pairing records with `mv` and `cv`.
 * @param {boolean|Function|Set|object} highlightDivergent Divergence marker source.
 * @param {object} [options] Optional title/subtitle overrides.
 * @returns {object} JSX SVG node.
 */
// if renderer is wrong, loops will connect to wrong units or colors will be inverted
export function renderPID(pairings, highlightDivergent = false, options = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${PID_CANVAS.width} ${PID_CANVAS.height}`}
      width="100%"
      height={PID_CANVAS.height}
      style={{ maxWidth: "100%", height: "auto" }}
      role="img"
      aria-label={options.ariaLabel || "TEP P and ID control loop rendering"}
    >
      <PIDDiagram
        pairings={pairings}
        highlightDivergent={highlightDivergent}
        title={options.title || "TEP P&ID Control Loops"}
        subtitle={options.subtitle || ""}
        idPrefix={options.idPrefix || safeId(options.title || "pid")}
      />
    </svg>
  );
}

/**
 * Renders two P&IDs side by side for demo review.
 *
 * @param {Array|{pairings: Array}} agentPairings Agent-generated pairings.
 * @param {Array|{pairings: Array}} rickerPairings Ricker baseline pairings.
 * @param {boolean|Function|Set|object} highlightDivergent Divergence marker source.
 * @returns {object} JSX SVG node.
 */
export function renderPIDSideBySide(agentPairings, rickerPairings, highlightDivergent = false) {
  const gap = 52;
  const width = PID_CANVAS.width * 2 + gap;
  const height = PID_CANVAS.height;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label="Agent and Ricker TEP P and ID renderings side by side"
    >
      <g transform="translate(0 0)">
        <PIDDiagram
          pairings={agentPairings}
          highlightDivergent={highlightDivergent}
          title="Agent Run"
          subtitle="Green loops match Ricker; oxblood loops diverge."
          idPrefix="agent"
        />
      </g>
      <g transform={`translate(${PID_CANVAS.width + gap} 0)`}>
        <PIDDiagram
          pairings={rickerPairings}
          highlightDivergent={false}
          title="Ricker 1996 Baseline"
          subtitle="Reference decentralized control structure."
          idPrefix="ricker"
        />
      </g>
    </svg>
  );
}

export default renderPID;

function PIDDiagram({ pairings, highlightDivergent, title, subtitle, idPrefix }) {
  const normalized = normalizePairings(pairings);
  const loops = describeLoops(normalized, highlightDivergent);
  const skipped = normalized.length - loops.length;

  return (
    <g>
      <DiagramDefs idPrefix={idPrefix} />
      <rect width={PID_CANVAS.width} height={PID_CANVAS.height} fill={PAPER} />
      <Header title={title} subtitle={subtitle} skipped={skipped} />
      <FlowSheet idPrefix={idPrefix} />
      <LoopLayer loops={loops} idPrefix={idPrefix} />
      <Legend x={32} y={868} />
    </g>
  );
}

function DiagramDefs({ idPrefix }) {
  return (
    <defs>
      <marker
        id={`${idPrefix}-arrow`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={INK} />
      </marker>
      <marker
        id={`${idPrefix}-utility-arrow`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={UTILITY_BLUE} />
      </marker>
      <marker
        id={`${idPrefix}-steam-arrow`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={STEAM} />
      </marker>
    </defs>
  );
}

function Header({ title, subtitle, skipped }) {
  return (
    <g>
      <text x="32" y="32" fontSize="24" fontWeight="800" fontFamily="Avenir Next, Segoe UI, sans-serif" fill="#1f2933">
        {title}
      </text>
      {subtitle && (
        <text x="32" y="53" fontSize="13" fontFamily="Avenir Next, Segoe UI, sans-serif" fill={MUTED_INK}>
          {subtitle}
        </text>
      )}
      {skipped > 0 && (
        <text x="32" y="72" fontSize="12" fontFamily="Avenir Next, Segoe UI, sans-serif" fill={DIVERGED_COLOR}>
          {skipped} pairing(s) skipped because the MV or CV was missing from the layout.
        </text>
      )}
    </g>
  );
}

function FlowSheet({ idPrefix }) {
  return (
    <g aria-label="TEP process flowsheet">
      <rect x={FLOW_SHEET.x} y={FLOW_SHEET.y} width={FLOW_SHEET.width} height={FLOW_SHEET.height} fill="#fff" stroke={RULE} strokeWidth="1" />

      <IoBox x={32} y={146} width={56} label="A" />
      <IoBox x={32} y={266} width={56} label="D" />
      <IoBox x={32} y={386} width={56} label="E" />
      <IoBox x={32} y={690} width={56} label="C" />
      <IoBox x={1160} y={146} width={86} label="Purge" />
      <IoBox x={1160} y={766} width={92} label="Product" />

      <g fill="none" strokeLinecap="square" strokeLinejoin="miter">
        {STREAMS.map((stream) => (
          <StreamPath key={stream.number} stream={stream} idPrefix={idPrefix} />
        ))}
      </g>

      <UtilityLines idPrefix={idPrefix} />

      <ProcessEquipment />

      <g aria-label="process valves">
        {Object.entries(CONTROL_POINTS.valves).map(([id, point]) => (
          <BaseValve key={id} id={id} point={point} />
        ))}
      </g>
    </g>
  );
}

function StreamPath({ stream, idPrefix }) {
  return (
    <g>
      <path d={stream.d} fill="none" fillOpacity="0" stroke={INK} strokeWidth="2" markerEnd={`url(#${idPrefix}-arrow)`} />
      <text
        x={stream.numberAt.x}
        y={stream.numberAt.y}
        fontSize="15"
        fontWeight="800"
        fontFamily="Avenir Next, Segoe UI, sans-serif"
        fill={INK}
      >
        {stream.number}
      </text>
    </g>
  );
}

function UtilityLines({ idPrefix }) {
  return (
    <g>
      <path d="M 400 455 L 475 455" fill="none" fillOpacity="0" stroke={UTILITY_BLUE} strokeWidth="1.7" strokeDasharray="5 4" markerEnd={`url(#${idPrefix}-utility-arrow)`} />
      <text x="438" y="443" fontSize="11" fontWeight="700" textAnchor="middle" fill={UTILITY_BLUE}>
        CWS
      </text>
      <path d="M 475 480 L 400 480" fill="none" fillOpacity="0" stroke={UTILITY_BLUE} strokeWidth="1.7" strokeDasharray="5 4" markerEnd={`url(#${idPrefix}-utility-arrow)`} />
      <text x="438" y="498" fontSize="11" fontWeight="700" textAnchor="middle" fill={UTILITY_BLUE}>
        CWR
      </text>
      <path d="M 615 136 L 615 173" fill="none" fillOpacity="0" stroke={UTILITY_BLUE} strokeWidth="1.7" strokeDasharray="5 4" markerEnd={`url(#${idPrefix}-utility-arrow)`} />
      <text x="594" y="147" fontSize="11" fontWeight="700" textAnchor="middle" fill={UTILITY_BLUE}>
        CWS
      </text>
      <path d="M 665 233 L 665 270" fill="none" fillOpacity="0" stroke={UTILITY_BLUE} strokeWidth="1.7" strokeDasharray="5 4" markerEnd={`url(#${idPrefix}-utility-arrow)`} />
      <text x="691" y="263" fontSize="11" fontWeight="700" textAnchor="middle" fill={UTILITY_BLUE}>
        CWR
      </text>
      <path d="M 790 760 L 870 760" fill="none" fillOpacity="0" stroke={STEAM} strokeWidth="1.8" markerEnd={`url(#${idPrefix}-steam-arrow)`} />
      <IoBox x={872} y={745} width={56} label="Stm" small />
      <path d="M 720 780 L 870 780" fill="none" fillOpacity="0" stroke={STEAM} strokeWidth="1.5" />
      <IoBox x={872} y={771} width={56} label="Cond" small />
    </g>
  );
}

function IoBox({ x, y, width, label, small = false }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={small ? 22 : 28} fill="#ffffff" stroke={INK} strokeWidth="2" />
      <text
        x={x + width / 2}
        y={y + (small ? 15 : 19)}
        fontSize={small ? 12 : 15}
        fontWeight="800"
        fontFamily="Avenir Next Condensed, Avenir Next, Segoe UI, sans-serif"
        textAnchor="middle"
        fill={INK}
      >
        {label}
      </text>
    </g>
  );
}

function BaseValve({ id, point }) {
  if (id === "XMV(12)") {
    return (
      <g opacity="0.55">
        <circle cx={point.x} cy={point.y} r="10" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
        <text x={point.x} y={point.y + 3} fontSize="8" fontWeight="800" textAnchor="middle" fill={INK}>
          SC
        </text>
      </g>
    );
  }

  return (
    <g transform={`translate(${point.x} ${point.y})`} opacity="0.82">
      <path d="M -12 -9 L 0 0 L -12 9 Z" fill="#ffffff" stroke={INK} strokeWidth="1.7" />
      <path d="M 12 -9 L 0 0 L 12 9 Z" fill="#ffffff" stroke={INK} strokeWidth="1.7" />
      <line x1="0" y1="0" x2="0" y2="-18" stroke={INK} strokeWidth="1.6" />
    </g>
  );
}

function LoopLayer({ loops, idPrefix }) {
  return (
    <g aria-label="control loop pairings">
      <SignalLayer loops={loops} />
      <EquipmentOverlay />
      {loops.map((loop) => (
        <ValveCallout key={`valve-${loop.key}`} loop={loop} />
      ))}
      {loops.map((loop) => (
        <MeasurementCallout key={`measurement-${loop.key}`} loop={loop} idPrefix={idPrefix} />
      ))}
    </g>
  );
}

function ProcessEquipment() {
  return (
    <>
      <EquipmentBlock
        x={270}
        y={305}
        width={130}
        height={150}
        label="Reactor"
        sublabel="R-101"
        ports={[
          { x: 270, y: 330, side: "left" },
          { x: 270, y: 365, side: "left" },
          { x: 270, y: 400, side: "left" },
          { x: 335, y: 305, side: "top" },
          { x: 400, y: 430, side: "right" },
        ]}
      />
      <EquipmentBlock
        x={525}
        y={173}
        width={180}
        height={60}
        label="Condenser"
        sublabel="E-101"
        ports={[
          { x: 525, y: 203, side: "left" },
          { x: 705, y: 203, side: "right" },
          { x: 615, y: 173, side: "top" },
          { x: 665, y: 233, side: "bottom" },
        ]}
      />
      <EquipmentBlock
        x={850}
        y={115}
        width={130}
        height={56}
        label="Compressor"
        sublabel="C-101"
        ports={[
          { x: 915, y: 171, side: "bottom" },
          { x: 850, y: 143, side: "left" },
          { x: 980, y: 143, side: "right" },
        ]}
        icon="compressor"
      />
      <EquipmentBlock
        x={870}
        y={320}
        width={140}
        height={125}
        label="Vap/liq"
        sublabel="Separator"
        ports={[
          { x: 870, y: 338, side: "left" },
          { x: 940, y: 320, side: "top" },
          { x: 940, y: 445, side: "bottom" },
          { x: 1010, y: 370, side: "right" },
          { x: 1010, y: 425, side: "right" },
        ]}
      />
      <EquipmentBlock
        x={590}
        y={620}
        width={130}
        height={160}
        label="Stripper"
        sublabel="T-101"
        ports={[
          { x: 590, y: 620, side: "left" },
          { x: 590, y: 735, side: "left" },
          { x: 720, y: 650, side: "right" },
          { x: 720, y: 780, side: "right" },
          { x: 655, y: 780, side: "bottom" },
        ]}
        icon="column"
      />
      <AnalyzerBlock x={104} y={500} width={74} height={150} label="Feed analyzer" compounds={["XA", "XB", "XC", "XD", "XE", "XF"]} />
      <AnalyzerBlock x={1164} y={300} width={70} height={170} label="Purge analyzer" compounds={["XA", "XB", "XC", "XD", "XE", "XF", "XG", "XH"]} />
      <AnalyzerBlock x={1164} y={610} width={70} height={150} label="Product analyzer" compounds={["XD", "XE", "XF", "XG", "XH"]} />
    </>
  );
}

function EquipmentBlock({ x, y, width, height, label, sublabel, ports = [], icon }) {
  const labelX = icon === "compressor" ? x + width / 2 + 18 : x + width / 2;
  const labelSize = icon === "compressor" ? 16 : 18;

  return (
    <g aria-label={label}>
      <rect x={x} y={y} width={width} height={height} fill="#ffffff" stroke={INK} strokeWidth="3" />
      <rect x={x + 7} y={y + 7} width={width - 14} height={height - 14} fill="none" stroke="#c8c8c8" strokeWidth="0.9" />
      {icon === "column" && (
        <g stroke="#777" strokeWidth="1.1">
          {[y + 44, y + 68, y + 92, y + 116, y + 140].map((trayY) => (
            <line key={trayY} x1={x + 18} y1={trayY} x2={x + width - 18} y2={trayY} />
          ))}
        </g>
      )}
      {icon === "compressor" && (
        <g transform={`translate(${x + 26} ${y + height / 2})`}>
          <circle cx="0" cy="0" r="16" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
          <path d="M -6 -9 L 12 0 L -6 9 Z" fill="#ffffff" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        </g>
      )}
      <text
        x={labelX}
        y={y + height / 2 - (sublabel ? 4 : -4)}
        fontSize={labelSize}
        fontWeight="900"
        fontFamily="Avenir Next Condensed, Avenir Next, sans-serif"
        textAnchor="middle"
        fill={INK}
      >
        {label}
      </text>
      {sublabel && (
        <text x={labelX} y={y + height / 2 + 18} fontSize="12" fontWeight="800" textAnchor="middle" fill={MUTED_INK}>
          {sublabel}
        </text>
      )}
      {ports.map((port) => (
        <Port key={`${port.x}-${port.y}-${port.side}`} {...port} />
      ))}
    </g>
  );
}

function Port({ x, y, side }) {
  const horizontal = side === "left" || side === "right";
  return (
    <g>
      <circle cx={x} cy={y} r="4.5" fill="#ffffff" stroke={INK} strokeWidth="1.7" />
      <line
        x1={x}
        y1={y}
        x2={x + (side === "left" ? -12 : side === "right" ? 12 : 0)}
        y2={y + (side === "top" ? -12 : side === "bottom" ? 12 : 0)}
        stroke={INK}
        strokeWidth="1.7"
      />
      {horizontal && <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke={INK} strokeWidth="1.7" />}
    </g>
  );
}

function AnalyzerBlock({ x, y, width, height, label, compounds }) {
  return (
    <g aria-label={label}>
      <rect x={x} y={y} width={width} height={height} fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      <text
        x={x + width / 2}
        y={y + height / 2}
        fontSize="12"
        fontWeight="900"
        fontFamily="Avenir Next Condensed, Avenir Next, sans-serif"
        textAnchor="middle"
        fill={INK}
        transform={`rotate(-90 ${x + width / 2} ${y + height / 2})`}
      >
        ANALYZER
      </text>
      {compounds.map((compound, index) => {
        const cy = y + 18 + index * ((height - 36) / Math.max(compounds.length - 1, 1));
        const right = x > PID_CANVAS.width / 2;
        return (
          <g key={compound}>
            <line
              x1={right ? x + width : x}
              y1={cy}
              x2={right ? x + width + 18 : x - 18}
              y2={cy}
              stroke={INK}
              strokeWidth="1.1"
              strokeDasharray="4 3"
            />
            <circle cx={right ? x + width + 32 : x - 32} cy={cy} r="12" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
            <text x={right ? x + width + 32 : x - 32} y={cy + 4} fontSize="9" fontWeight="800" textAnchor="middle" fill={INK}>
              {compound}
            </text>
          </g>
        );
      })}
      <text x={x + width / 2} y={y - 8} fontSize="10" fontWeight="800" textAnchor="middle" fill={MUTED_INK}>
        {label}
      </text>
    </g>
  );
}

function SignalLayer({ loops }) {
  return (
    <g opacity="0.98">
      {loops.map((loop) => (
        <ControlSignal key={`signal-${loop.key}`} loop={loop} />
      ))}
    </g>
  );
}

function EquipmentOverlay() {
  return (
    <g aria-hidden="true" pointerEvents="none">
      <ProcessEquipment />
    </g>
  );
}

function ControlSignal({ loop }) {
  const points = controlRoutePoints(loop);

  return (
    <g opacity={loop.divergent ? "0.16" : "0.08"}>
      {points.slice(1).map((point, index) => {
        const previous = points[index];
        return (
          <line
            key={`${loop.key}-${index}`}
            x1={previous.x}
            y1={previous.y}
            x2={point.x}
            y2={point.y}
            stroke={loop.color}
            strokeWidth="1.35"
            strokeDasharray="8 7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </g>
  );
}

function ValveCallout({ loop }) {
  const { x, y } = loop.valvePoint;
  const controller = loop.controllerPoint;
  const label = labelPosition({ x, y }, VALVE_LABEL_OFFSETS[loop.pairing.mv], DEFAULT_VALVE_LABEL);
  const valveTop = y - VALVE_SIZE.height / 2;

  return (
    <g aria-label={`${loop.pairing.mv} manipulated variable for ${loop.displayName}`}>
      <title>{`${loop.pairing.mv} to ${loop.pairing.cv}: ${loop.displayName}`}</title>
      <path
        d={`M ${controller.x} ${controller.y + CONTROLLER_RADIUS} L ${x} ${valveTop}`}
        fill="none"
        stroke={loop.color}
        strokeWidth="1.35"
        strokeDasharray="5 4"
        strokeLinecap="round"
        opacity="0.36"
        vectorEffect="non-scaling-stroke"
      />
      <ControllerBubble loop={loop} x={controller.x} y={controller.y} />
      <g transform={`translate(${x} ${y})`}>
        <path d={`M ${-VALVE_SIZE.width / 2} ${-VALVE_SIZE.height / 2} L 0 0 L ${-VALVE_SIZE.width / 2} ${VALVE_SIZE.height / 2} Z`} fill="#ffffff" stroke={loop.color} strokeWidth="1.8" />
        <path d={`M ${VALVE_SIZE.width / 2} ${-VALVE_SIZE.height / 2} L 0 0 L ${VALVE_SIZE.width / 2} ${VALVE_SIZE.height / 2} Z`} fill="#ffffff" stroke={loop.color} strokeWidth="1.8" />
      </g>
      <circle cx={x + 23} cy={y - 16} r="10" fill={loop.color} stroke="#ffffff" strokeWidth="1.5" />
      <text x={x + 23} y={y - 12.5} fontSize="9" fontWeight="800" textAnchor="middle" fill="#ffffff">
        {loop.loopNumber}
      </text>
      <TagLabel x={label.x} y={label.y} anchor={label.anchor} fontSize="11">
        {loop.pairing.mv}
      </TagLabel>
    </g>
  );
}

function ControllerBubble({ loop, x, y }) {
  return (
    <g aria-label={`${controllerTag(loop)} controller for ${loop.pairing.mv}`}>
      <circle cx={x} cy={y} r={CONTROLLER_RADIUS + 4} fill="#ffffff" opacity="0.9" />
      <circle cx={x} cy={y} r={CONTROLLER_RADIUS} fill="#ffffff" stroke={loop.color} strokeWidth="3" />
      <text x={x} y={y - 5} fontSize="10" fontWeight="900" fontFamily="Avenir Next, Segoe UI, sans-serif" textAnchor="middle" fill={INK}>
        {controllerTag(loop)}
      </text>
      <text x={x} y={y + 8} fontSize="8" fontWeight="800" fontFamily="Avenir Next, Segoe UI, sans-serif" textAnchor="middle" fill={MUTED_INK}>
        PID
      </text>
    </g>
  );
}

function MeasurementCallout({ loop }) {
  const { x, y } = loop.measurementPoint;
  const label = labelPosition({ x, y }, MEASUREMENT_LABEL_OFFSETS[loop.pairing.cv], DEFAULT_MEASUREMENT_LABEL);

  return (
    <g aria-label={`${loop.pairing.cv} controlled variable for ${loop.displayName}`}>
      <title>{`${loop.pairing.mv} to ${loop.pairing.cv}: ${loop.displayName}`}</title>
      <circle cx={x} cy={y} r="18" fill="#ffffff" opacity="0.9" />
      <circle cx={x} cy={y} r="14" fill="#ffffff" stroke={loop.color} strokeWidth="2.6" />
      <line x1={x - 7} y1={y} x2={x + 7} y2={y} stroke={loop.color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <circle cx={x + 16} cy={y - 13} r="9" fill={loop.color} stroke="#ffffff" strokeWidth="1.4" />
      <text x={x + 16} y={y - 9.8} fontSize="8" fontWeight="800" textAnchor="middle" fill="#ffffff">
        {loop.loopNumber}
      </text>
      <TagLabel x={label.x} y={label.y} anchor={label.anchor}>
        {loop.pairing.cv}
      </TagLabel>
    </g>
  );
}

function TagLabel({ x, y, anchor = "middle", fontSize = TAG_FONT_SIZE, children }) {
  const text = String(children || "");
  const width = estimateTextWidth(text, fontSize);
  const height = fontSize + 6;
  const rectX = labelRectX(x, width, anchor);

  return (
    <g>
      <rect x={rectX} y={y - fontSize - 3} width={width} height={height} rx="2" fill="#ffffff" opacity="0.92" />
      <text x={x} y={y} fontSize={fontSize} fontWeight="800" fontFamily={TAG_FONT} textAnchor={anchor} fill={INK}>
        {children}
      </text>
    </g>
  );
}

function Legend({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-label="legend">
      <rect x="0" y="-28" width="386" height="54" rx="4" fill="#ffffff" stroke={RULE} strokeWidth="1.2" />
      <text x="14" y="-8" fontSize="12" fontWeight="800" fontFamily="Avenir Next, Segoe UI, sans-serif" fill={INK}>
        Legend
      </text>
      <line x1="84" y1="-12" x2="130" y2="-12" stroke={MATCHED_COLOR} strokeWidth="4" strokeLinecap="round" />
      <text x="142" y="-8" fontSize="12" fontFamily="Avenir Next, Segoe UI, sans-serif" fill={INK}>
        green = matched
      </text>
      <line x1="254" y1="-12" x2="300" y2="-12" stroke={DIVERGED_COLOR} strokeWidth="4" strokeLinecap="round" />
      <text x="312" y="-8" fontSize="12" fontFamily="Avenir Next, Segoe UI, sans-serif" fill={INK}>
        oxblood = diverged
      </text>
      <line x1="84" y1="11" x2="130" y2="11" stroke={SIGNAL} strokeWidth="2" strokeDasharray="8 7" strokeLinecap="round" />
      <text x="142" y="15" fontSize="11" fontFamily="Avenir Next, Segoe UI, sans-serif" fill={MUTED_INK}>
        dashed signal links same-number MV and CV badges
      </text>
    </g>
  );
}

function normalizePairings(pairings) {
  const rawPairings = Array.isArray(pairings) ? pairings : pairings?.pairings;
  if (!Array.isArray(rawPairings)) {
    return [];
  }

  return rawPairings.filter((pairing) => pairing && typeof pairing.mv === "string" && typeof pairing.cv === "string");
}

function describeLoops(pairings, highlightDivergent) {
  const provisional = pairings
    .map((pairing, index) => {
      const valve = controlValvePoint(pairing.mv);
      const measurement = controlMeasurementPoint(pairing.cv);
      if (!valve || !measurement) {
        return null;
      }

      return {
        key: `${index}-${pairing.mv}-${pairing.cv}`,
        index,
        pairing,
        valve,
        measurement,
      };
    })
    .filter(Boolean);

  const cvCounts = countBy(provisional, (loop) => loop.pairing.cv);
  const mvCounts = countBy(provisional, (loop) => loop.pairing.mv);
  const cvSeen = new Map();
  const mvSeen = new Map();

  return provisional.map((loop) => {
    const cvOccurrence = cvSeen.get(loop.pairing.cv) || 0;
    const mvOccurrence = mvSeen.get(loop.pairing.mv) || 0;
    cvSeen.set(loop.pairing.cv, cvOccurrence + 1);
    mvSeen.set(loop.pairing.mv, mvOccurrence + 1);

    const divergent = isDivergent(loop.pairing, loop.index, highlightDivergent);
    const color = divergent ? DIVERGED_COLOR : MATCHED_COLOR;
    const displayName = loopDisplayName(loop.pairing, loop.index);

    const valvePoint = spreadPoint(loop.valve, mvOccurrence, mvCounts.get(loop.pairing.mv), "valve");
    const measurementPoint = spreadPoint(loop.measurement, cvOccurrence, cvCounts.get(loop.pairing.cv), "measurement");

    return {
      ...loop,
      divergent,
      color,
      displayName,
      loopNumber: String(loop.index + 1).padStart(2, "0"),
      valvePoint,
      measurementPoint,
      controllerPoint: controllerPosition(valvePoint, loop.pairing.mv),
    };
  });
}

function controlValvePoint(id) {
  const point = CONTROL_POINTS.valves[id] || TEP_LAYOUT.valves[id];
  return point ? { ...point } : null;
}

function controlMeasurementPoint(id) {
  const point = CONTROL_POINTS.measurements[id] || TEP_LAYOUT.measurements[id];
  return point ? { ...point } : null;
}

function spreadPoint(point, occurrence = 0, count = 1, type = "measurement") {
  if (!count || count <= 1) {
    return { x: point.x, y: point.y };
  }

  const offset = occurrence - (count - 1) / 2;
  const distance = type === "valve" ? 52 : 46;
  return {
    x: point.x + offset * distance,
    y: point.y + (type === "valve" ? offset * 10 : -Math.abs(offset) * 6),
  };
}

function labelPosition(point, offset, fallback) {
  const resolved = { ...fallback, ...offset };
  return {
    x: point.x + resolved.dx,
    y: point.y + resolved.dy,
    anchor: resolved.anchor,
  };
}

function controllerPosition(point, id) {
  const minControllerY = 72;
  const preferredY = point.y - VALVE_RADIUS - CONTROLLER_TO_VALVE_GAP - CONTROLLER_RADIUS;
  const offset = CONTROLLER_OFFSETS[id] || { dx: 0, dy: 0 };

  return {
    x: clamp(point.x + offset.dx, 36, PID_CANVAS.width - 36),
    y: clamp(preferredY + offset.dy, minControllerY, PID_CANVAS.height - 92),
  };
}

function controlRoute(loop) {
  return pointsToPath(controlRoutePoints(loop));
}

function controlRoutePoints(loop) {
  const route = SIGNAL_ROUTES[`${loop.pairing.mv}->${loop.pairing.cv}`];
  if (route) {
    return orthogonalPoints(loop.measurementPoint, loop.controllerPoint, route);
  }

  const laneOffset = ((loop.index % 5) - 2) * 28;
  const laneY = clamp(Math.max(loop.measurementPoint.y, loop.controllerPoint.y) + 58 + laneOffset, 92, PID_CANVAS.height - 92);
  return orthogonalPoints(loop.measurementPoint, loop.controllerPoint, [
    ["v", laneY],
    ["h", "cx"],
    ["v", "cy"],
  ]);
}

function orthogonalPath(start, end, route) {
  return pointsToPath(orthogonalPoints(start, end, route));
}

function orthogonalPoints(start, end, route) {
  const points = [{ x: start.x, y: start.y }];
  let cursor = { x: start.x, y: start.y };

  for (const [axis, rawValue] of route) {
    const value = resolveRouteValue(rawValue, start, end);
    cursor = axis === "h" ? { x: value, y: cursor.y } : { x: cursor.x, y: value };
    points.push(cursor);
  }

  if (cursor.x !== end.x) {
    cursor = { x: end.x, y: cursor.y };
    points.push(cursor);
  }
  if (cursor.y !== end.y) {
    points.push({ x: end.x, y: end.y });
  }

  return dedupeAdjacentPoints(points);
}

function resolveRouteValue(value, start, end) {
  if (value === "sx") {
    return start.x;
  }
  if (value === "sy") {
    return start.y;
  }
  if (value === "cx") {
    return end.x;
  }
  if (value === "cy") {
    return end.y;
  }
  return value;
}

function dedupeAdjacentPoints(points) {
  return points.filter((point, index) => {
    const previous = points[index - 1];
    return !previous || previous.x !== point.x || previous.y !== point.y;
  });
}

function pointsToPath(points) {
  if (points.length === 0) {
    return "";
  }
  const [first, ...rest] = points;
  return `M ${first.x} ${first.y}${rest.map((point) => ` L ${point.x} ${point.y}`).join("")}`;
}

function isDivergent(pairing, index, highlightDivergent) {
  if (typeof highlightDivergent === "function") {
    return Boolean(highlightDivergent(pairing, index));
  }

  if (highlightDivergent && typeof highlightDivergent.has === "function") {
    return hasDivergenceMarker(highlightDivergent, pairing, index);
  }

  if (highlightDivergent && typeof highlightDivergent === "object") {
    return objectMarksDivergence(highlightDivergent, pairing, index);
  }

  if (highlightDivergent === true) {
    return pairing.divergent === true || statusIsDivergent(pairing.status) || statusIsDivergent(pairing.overall);
  }

  return false;
}

function hasDivergenceMarker(markerSet, pairing, index) {
  return candidateKeys(pairing, index).some((key) => markerSet.has(key));
}

function objectMarksDivergence(markerMap, pairing, index) {
  return candidateKeys(pairing, index).some((key) => statusIsDivergent(markerMap[key]) || markerMap[key] === true);
}

function candidateKeys(pairing, index) {
  return [
    `${pairing.mv}->${pairing.cv}`,
    `${pairing.cv}->${pairing.mv}`,
    pairing.loop,
    pairing.loop_id,
    pairing.control_objective,
    pairing.loop_name,
    pairing.cv,
    pairing.mv,
    index,
  ].filter((key) => key !== undefined && key !== null && key !== "");
}

function statusIsDivergent(status) {
  const normalized = String(status || "").toLowerCase();
  return normalized === "diverged" || normalized === "divergent" || normalized === "novel" || normalized === "fail";
}

function loopDisplayName(pairing, index) {
  const name = pairing.loop_name || pairing.control_objective || `Loop ${pairing.loop || pairing.loop_id || index + 1}`;
  return truncate(name, 34);
}

function controllerTag(loop) {
  const cvNumber = loop.pairing.cv.match(/\((\d+)\)/)?.[1] || loop.index + 1;
  return `PIC-${cvNumber}`;
}

function countBy(items, keyFn) {
  const counts = new Map();
  for (const item of items) {
    const key = keyFn(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function estimateTextWidth(text, fontSize) {
  return text.length * fontSize * 0.62 + 10;
}

function labelRectX(x, width, anchor) {
  if (anchor === "start") {
    return x - 5;
  }
  if (anchor === "end") {
    return x - width + 5;
  }
  return x - width / 2;
}

function truncate(value, maxLength) {
  const text = String(value || "");
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 3)}...`;
}

function safeId(value) {
  return String(value || "pid")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
