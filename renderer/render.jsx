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
const PROCESS_ORIGIN_Y = 58;
const PID_CANVAS = {
  width: 1074,
  height: 1120,
};
const FLOW_SHEET = {
  x: 0,
  y: 0,
  width: 1074,
  height: 938,
};
const REFERENCE_PID_ASSET = "tep_pid_reference_trace.png";

const VALVE_SIZE = { width: 20, height: 14 };
const TAG_FONT = "Avenir Next, Segoe UI, sans-serif";
const TAG_FONT_SIZE = 9;
const SIGNAL_LANE_SPACING = 8;
const SIGNAL_OVERLAP_MIN = 6;
const SIGNAL_EPSILON = 0.001;

const DEFAULT_VALVE_LABEL = { dx: 0, dy: 29, anchor: "middle" };
const DEFAULT_MEASUREMENT_LABEL = { dx: 24, dy: 4, anchor: "start" };
const VALVE_LABEL_OFFSETS = {
  "XMV(1)": { dx: 0, dy: 27, anchor: "middle" },
  "XMV(2)": { dx: 0, dy: 27, anchor: "middle" },
  "XMV(3)": { dx: 0, dy: 27, anchor: "middle" },
  "XMV(4)": { dx: 0, dy: 27, anchor: "middle" },
  "XMV(5)": { dx: 0, dy: -18, anchor: "middle" },
  "XMV(6)": { dx: 0, dy: 29, anchor: "middle" },
  "XMV(8)": { dx: 0, dy: 30, anchor: "middle" },
  "XMV(9)": { dx: 30, dy: 4, anchor: "start" },
  "XMV(10)": { dx: 0, dy: 28, anchor: "middle" },
  "XMV(11)": { dx: 31, dy: 4, anchor: "start" },
  "XMV(12)": { dx: 33, dy: 4, anchor: "start" },
};
const MEASUREMENT_LABEL_OFFSETS = {
  "XMEAS(7)": { dx: 27, dy: 4, anchor: "start" },
  "XMEAS(8)": { dx: 27, dy: 4, anchor: "start" },
  "XMEAS(9)": { dx: 27, dy: 4, anchor: "start" },
  "XMEAS(11)": { dx: 27, dy: 4, anchor: "start" },
  "XMEAS(12)": { dx: 27, dy: 4, anchor: "start" },
  "XMEAS(15)": { dx: -27, dy: 4, anchor: "end" },
  "XMEAS(17)": { dx: 0, dy: -24, anchor: "middle" },
  "XMEAS(22)": { dx: 27, dy: 4, anchor: "start" },
  "XMEAS(23)": { dx: 27, dy: 4, anchor: "start" },
  "XMEAS(38)": { dx: -29, dy: 4, anchor: "end" },
  "XMEAS(40)": { dx: -29, dy: 4, anchor: "end" },
};
const CONTROL_POINTS = {
  valves: {
    "XMV(1)": { x: 215, y: 322, label: "D feed valve", orientation: "horizontal" },
    "XMV(2)": { x: 215, y: 446, label: "E feed valve", orientation: "horizontal" },
    "XMV(3)": { x: 215, y: 198, label: "A feed valve", orientation: "horizontal" },
    "XMV(4)": { x: 215, y: 818, label: "C feed valve", orientation: "horizontal" },
    "XMV(5)": { x: 805, y: 151, label: "Recycle valve", orientation: "horizontal" },
    "XMV(6)": { x: 927, y: 198, label: "Purge valve", orientation: "horizontal" },
    "XMV(7)": { x: 753, y: 482, label: "Separator liquid valve", orientation: "horizontal" },
    "XMV(8)": { x: 861, y: 818, label: "Product valve", orientation: "horizontal" },
    "XMV(9)": { x: 790, y: 704, label: "Steam valve", orientation: "horizontal" },
    "XMV(10)": { x: 464, y: 603, label: "Reactor cooling valve", orientation: "horizontal" },
    "XMV(11)": { x: 582, y: 292, label: "Condenser cooling valve", orientation: "horizontal" },
    "XMV(12)": { x: 338, y: 350, label: "Agitator speed", orientation: "horizontal" },
  },
  measurements: {
    "XMEAS(7)": { x: 897, y: 274, label: "Reactor pressure" },
    "XMEAS(8)": { x: 291, y: 410, label: "Reactor level" },
    "XMEAS(9)": { x: 357, y: 622, label: "Reactor temperature" },
    "XMEAS(11)": { x: 817, y: 374, label: "Separator temperature" },
    "XMEAS(12)": { x: 812, y: 273, label: "Separator level" },
    "XMEAS(15)": { x: 636, y: 682, label: "Stripper level" },
    "XMEAS(17)": { x: 807, y: 790, label: "Production rate" },
    "XMEAS(22)": { x: 552, y: 264, label: "Condenser CW outlet temperature" },
    "XMEAS(23)": { x: 166, y: 520, label: "Reactor feed composition" },
    "XMEAS(38)": { x: 997, y: 656, label: "Product E composition" },
    "XMEAS(40)": { x: 997, y: 730, label: "Product G composition" },
  },
};

const STREAMS = [
  { d: "M 85 174 L 200 174 L 200 285 L 270 285", number: "1", numberAt: { x: 140, y: 178 } },
  { d: "M 85 254 L 220 254 L 220 320 L 270 320", number: "2", numberAt: { x: 140, y: 258 } },
  { d: "M 85 334 L 245 334 L 245 355 L 270 355", number: "3", numberAt: { x: 140, y: 338 } },
  { d: "M 85 674 L 460 674 L 460 590 L 510 590", number: "4", numberAt: { x: 140, y: 678 } },
  { d: "M 540 500 L 540 470 L 400 470 L 400 250 L 270 250", number: "5", numberAt: { x: 430, y: 474 } },
  { d: "M 700 85 L 200 85 L 200 174", number: "6", numberAt: { x: 235, y: 289 } },
  { d: "M 320 300 L 320 200 L 450 155", number: "7", numberAt: { x: 320, y: 249 } },
  { d: "M 820 210 L 820 100 L 760 90", number: "8", numberAt: { x: 450, y: 89 } },
  { d: "M 760 75 L 850 75 L 850 114 L 1135 114", number: "9", numberAt: { x: 1000, y: 118 } },
  { d: "M 820 380 L 820 395 L 705 395 L 705 540 L 570 540", number: "10", numberAt: { x: 650, y: 544 } },
  { d: "M 540 660 L 540 700 L 768 700 M 793 700 L 1135 674", number: "11", numberAt: { x: 950, y: 692 } },
];

const SIGNAL_ROUTES = {
  "XMV(10)->XMEAS(9)": [
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(11)->XMEAS(8)": [
    ["h", 500],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(6)->XMEAS(7)": [
    ["v", 88],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(7)->XMEAS(12)": [
    ["h", 705],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(8)->XMEAS(15)": [
    ["v", 760],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(9)->XMEAS(11)": [
    ["h", 942],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(1)->XMEAS(17)": [
    ["v", 952],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(4)->XMEAS(23)": [
    ["h", 155],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(2)->XMEAS(38)": [
    ["v", 952],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(3)->XMEAS(40)": [
    ["v", 974],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(12)->XMEAS(22)": [
    ["v", 224],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(8)->XMEAS(17)": [
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(1)->XMEAS(40)": [
    ["v", 974],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(3)->XMEAS(23)": [
    ["h", 155],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(11)->XMEAS(11)": [
    ["h", 942],
    ["v", "cy"],
    ["h", "cx"],
  ],
  "XMV(2)->XMEAS(40)": [
    ["v", 974],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(3)->XMEAS(38)": [
    ["v", 952],
    ["h", "cx"],
    ["v", "cy"],
  ],
  "XMV(4)->XMEAS(22)": [
    ["v", 952],
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
      <g transform={`translate(0 ${PROCESS_ORIGIN_Y})`}>
        <FlowSheet idPrefix={idPrefix} />
        <LoopLayer loops={loops} idPrefix={idPrefix} />
      </g>
      <Legend x={32} y={1088} />
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
      <desc>
        Reference Tennessee Eastman P&ID base showing Reactor, Condenser, Compressor, Vap/Liq Separator, Stripper,
        analyzers, stream labels, feed valves, purge, and product lines.
      </desc>
      <rect x={FLOW_SHEET.x} y={FLOW_SHEET.y} width={FLOW_SHEET.width} height={FLOW_SHEET.height} fill="#fff" stroke={RULE} strokeWidth="1" />
      <image
        href={REFERENCE_PID_ASSET}
        x={FLOW_SHEET.x}
        y={FLOW_SHEET.y}
        width={FLOW_SHEET.width}
        height={FLOW_SHEET.height}
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  );
}

function StreamPath({ stream, idPrefix }) {
  return (
    <g>
      <path d={stream.d} fill="none" fillOpacity="0" stroke={INK} strokeWidth="1.7" markerEnd={`url(#${idPrefix}-arrow)`} />
      <text
        x={stream.numberAt.x}
        y={stream.numberAt.y}
        fontSize="10"
        fontWeight="800"
        fontFamily="Avenir Next, Segoe UI, sans-serif"
        textAnchor="middle"
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
      <path d="M 220 420 L 270 420" fill="none" fillOpacity="0" stroke={UTILITY_BLUE} strokeWidth="1.35" strokeDasharray="5 4" markerEnd={`url(#${idPrefix}-utility-arrow)`} />
      <text x="245" y="412" fontSize="9" fontWeight="700" textAnchor="middle" fill={UTILITY_BLUE}>
        CWS
      </text>
      <path d="M 370 420 L 420 420" fill="none" fillOpacity="0" stroke={UTILITY_BLUE} strokeWidth="1.35" strokeDasharray="5 4" markerEnd={`url(#${idPrefix}-utility-arrow)`} />
      <text x="395" y="412" fontSize="9" fontWeight="700" textAnchor="middle" fill={UTILITY_BLUE}>
        CWR
      </text>
      <path d="M 550 95 L 550 135" fill="none" fillOpacity="0" stroke={UTILITY_BLUE} strokeWidth="1.35" strokeDasharray="5 4" markerEnd={`url(#${idPrefix}-utility-arrow)`} />
      <text x="525" y="105" fontSize="9" fontWeight="700" textAnchor="middle" fill={UTILITY_BLUE}>
        CWS
      </text>
      <path d="M 600 175 L 600 200" fill="none" fillOpacity="0" stroke={UTILITY_BLUE} strokeWidth="1.35" strokeDasharray="5 4" markerEnd={`url(#${idPrefix}-utility-arrow)`} />
      <text x="623" y="195" fontSize="9" fontWeight="700" textAnchor="middle" fill={UTILITY_BLUE}>
        CWR
      </text>
      <path d="M 700 645 L 665 645" fill="none" fillOpacity="0" stroke={STEAM} strokeWidth="1.35" strokeDasharray="5 4" markerEnd={`url(#${idPrefix}-steam-arrow)`} />
      <text x="715" y="640" fontSize="9" fontWeight="700" textAnchor="middle" fill={STEAM}>
        Stm
      </text>
      <path d="M 700 663 L 665 663" fill="none" fillOpacity="0" stroke={STEAM} strokeWidth="1.35" strokeDasharray="5 4" markerEnd={`url(#${idPrefix}-steam-arrow)`} />
      <text x="717" y="670" fontSize="9" fontWeight="700" textAnchor="middle" fill={STEAM}>
        Cond
      </text>
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

  const rotation = point.orientation === "vertical" ? "rotate(90)" : "";

  return (
    <g transform={`translate(${point.x} ${point.y}) ${rotation}`} opacity="0.82">
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
      <g aria-label="Reactor">
        <rect x="270" y="300" width="100" height="190" fill="#ffffff" stroke="none" />
        <ellipse cx="320" cy="300" rx="50" ry="15" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
        <rect x="270" y="300" width="100" height="190" fill="none" stroke={INK} strokeWidth="1.8" />
        <ellipse cx="320" cy="490" rx="50" ry="15" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
        <g stroke="#777" strokeWidth="0.9" fill="none">
          {["345", "365", "385", "405", "425", "445"].map((coilY) => (
            <path key={coilY} d={`M 285 ${coilY} Q 320 ${Number(coilY) - 10} 355 ${coilY}`} />
          ))}
        </g>
        <EquipmentText x={320} y={523} label="Reactor" sublabel="R-101" />
      </g>

      <g aria-label="Condenser">
        <rect x="450" y="135" width="200" height="40" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
        <line x1="465" y1="148" x2="635" y2="148" stroke="#777" strokeWidth="0.9" />
        <line x1="465" y1="162" x2="635" y2="162" stroke="#777" strokeWidth="0.9" />
        <EquipmentText x={550} y={126} label="Condenser" sublabel="E-101" above />
      </g>

      <g aria-label="Compressor">
        <polygon points="700,75 760,60 760,110 700,95" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
        <EquipmentText x={730} y={48} label="Compressor" sublabel="C-101" above />
      </g>

      <g aria-label="Vap/liquid separator">
        <rect x="780" y="210" width="80" height="170" fill="#ffffff" stroke="none" />
        <ellipse cx="820" cy="210" rx="40" ry="13" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
        <rect x="780" y="210" width="80" height="170" fill="none" stroke={INK} strokeWidth="1.8" />
        <ellipse cx="820" cy="380" rx="40" ry="13" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
        <line x1="785" y1="335" x2="855" y2="335" stroke="#777" strokeWidth="0.8" strokeDasharray="3 2" />
        <EquipmentText x={820} y={410} label="Vap/Liq" sublabel="Separator" />
      </g>

      <g aria-label="Stripper">
        <rect x="510" y="500" width="60" height="160" fill="#ffffff" stroke="none" />
        <ellipse cx="540" cy="500" rx="30" ry="11" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
        <rect x="510" y="500" width="60" height="160" fill="none" stroke={INK} strokeWidth="1.8" />
        <ellipse cx="540" cy="660" rx="30" ry="11" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
        <g stroke="#777" strokeWidth="0.8">
          {[525, 545, 565, 585, 605, 625].map((trayY) => (
            <line key={trayY} x1="514" y1={trayY} x2="566" y2={trayY} />
          ))}
        </g>
        <rect x="600" y="640" width="65" height="28" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
        <line x1="608" y1="650" x2="657" y2="650" stroke="#777" strokeWidth="0.9" />
        <line x1="608" y1="660" x2="657" y2="660" stroke="#777" strokeWidth="0.9" />
        <EquipmentText x={540} y={690} label="Stripper" sublabel="T-101" />
      </g>

      <g aria-label="Pumps">
        <circle cx="690" cy="395" r="13" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
        <text x="690" y="399" fontSize="9" fontWeight="800" textAnchor="middle" fill={INK}>
          P
        </text>
        <circle cx="780" cy="700" r="13" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
        <text x="780" y="704" fontSize="9" fontWeight="800" textAnchor="middle" fill={INK}>
          P
        </text>
      </g>

      <AnalyzerBlock x={112} y={442} width={58} height={128} label="Feed analyzer" compounds={["XA", "XB", "XC", "XD", "XE", "XF"]} />
      <AnalyzerBlock x={1080} y={178} width={54} height={168} label="Purge analyzer" compounds={["XA", "XB", "XC", "XD", "XE", "XF", "XG", "XH"]} />
      <AnalyzerBlock x={1080} y={546} width={54} height={150} label="Product analyzer" compounds={["XD", "XE", "XF", "XG", "XH"]} />
    </>
  );
}

function EquipmentText({ x, y, label, sublabel, above = false }) {
  return (
    <g>
      <text
        x={x}
        y={y}
        fontSize="13"
        fontWeight="900"
        fontFamily="Avenir Next Condensed, Avenir Next, sans-serif"
        textAnchor="middle"
        fill={INK}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x}
          y={above ? y + 15 : y + 15}
          fontSize="9"
          fontWeight="800"
          fontFamily="Avenir Next, Segoe UI, sans-serif"
          textAnchor="middle"
          fill={MUTED_INK}
        >
          {sublabel}
        </text>
      )}
    </g>
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
  const routes = layoutSignalRoutes(loops);

  return (
    <g aria-label="instrument lines from XMEAS controlled variables to paired XMV valves">
      {routes.map(({ loop, points }) => (
        <ControlSignal key={`signal-${loop.key}`} loop={loop} points={points} />
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

function ControlSignal({ loop, points }) {
  const signalOpacity = loop.divergent ? 1 : 0.96;

  return (
    <g>
      {points.slice(1).map((point, index) => {
        const previous = points[index];
        return (
          <g key={`${loop.key}-${index}`}>
            <line
              x1={previous.x}
              y1={previous.y}
              x2={point.x}
              y2={point.y}
              stroke="#ffffff"
              strokeWidth="3.2"
              strokeDasharray="4 5"
              strokeLinecap="round"
              opacity="0.82"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={previous.x}
              y1={previous.y}
              x2={point.x}
              y2={point.y}
              stroke={loop.color}
              strokeWidth="1.45"
              strokeDasharray="4 5"
              strokeLinecap="round"
              opacity={signalOpacity}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </g>
  );
}

function layoutSignalRoutes(loops) {
  const routes = loops.map((loop) => ({
    loop,
    points: controlRoutePoints(loop),
  }));
  const offsets = signalSegmentOffsets(routes);

  return routes.map((route, routeIndex) => ({
    ...route,
    points: applySignalSegmentOffsets(route.points, routeIndex, offsets),
  }));
}

function signalSegmentOffsets(routes) {
  const segments = [];

  routes.forEach((route, routeIndex) => {
    route.points.slice(1).forEach((point, pointIndex) => {
      const previous = route.points[pointIndex];
      const segment = describeSignalSegment(previous, point, routeIndex, pointIndex);
      if (segment) {
        segments.push(segment);
      }
    });
  });

  const offsets = new Map();
  for (const group of overlappingSignalGroups(segments)) {
    const ordered = [...group].sort((a, b) => a.routeIndex - b.routeIndex || a.segmentIndex - b.segmentIndex);
    ordered.forEach((segment, index) => {
      offsets.set(segment.key, (index - (ordered.length - 1) / 2) * SIGNAL_LANE_SPACING);
    });
  }

  return offsets;
}

function describeSignalSegment(start, end, routeIndex, segmentIndex) {
  if (sameCoordinate(start.x, end.x) && !sameCoordinate(start.y, end.y)) {
    return {
      key: signalSegmentKey(routeIndex, segmentIndex),
      orientation: "vertical",
      fixed: start.x,
      min: Math.min(start.y, end.y),
      max: Math.max(start.y, end.y),
      routeIndex,
      segmentIndex,
    };
  }

  if (sameCoordinate(start.y, end.y) && !sameCoordinate(start.x, end.x)) {
    return {
      key: signalSegmentKey(routeIndex, segmentIndex),
      orientation: "horizontal",
      fixed: start.y,
      min: Math.min(start.x, end.x),
      max: Math.max(start.x, end.x),
      routeIndex,
      segmentIndex,
    };
  }

  return null;
}

function overlappingSignalGroups(segments) {
  const visited = new Set();
  const groups = [];

  segments.forEach((segment) => {
    if (visited.has(segment.key)) {
      return;
    }

    const stack = [segment];
    const group = [];
    visited.add(segment.key);

    while (stack.length > 0) {
      const current = stack.pop();
      group.push(current);

      segments.forEach((candidate) => {
        if (!visited.has(candidate.key) && signalSegmentsOverlap(current, candidate)) {
          visited.add(candidate.key);
          stack.push(candidate);
        }
      });
    }

    if (group.length > 1) {
      groups.push(group);
    }
  });

  return groups;
}

function signalSegmentsOverlap(a, b) {
  if (a.orientation !== b.orientation || !sameCoordinate(a.fixed, b.fixed)) {
    return false;
  }

  return Math.min(a.max, b.max) - Math.max(a.min, b.min) >= SIGNAL_OVERLAP_MIN;
}

function applySignalSegmentOffsets(points, routeIndex, offsets) {
  if (points.length <= 1) {
    return points;
  }

  const shiftedLines = points.slice(1).map((point, pointIndex) => {
    const previous = points[pointIndex];
    const segment = describeSignalSegment(previous, point, routeIndex, pointIndex);
    const offset = segment ? offsets.get(segment.key) || 0 : 0;
    return segment ? { ...segment, fixed: segment.fixed + offset } : null;
  });
  const shifted = [points[0]];

  shiftedLines.forEach((line, index) => {
    if (!line) {
      shifted.push(points[index + 1]);
      return;
    }

    const previousLine = shiftedLines[index - 1];
    const nextLine = shiftedLines[index + 1];
    const start =
      previousLine && line
        ? signalLineIntersection(previousLine, line, points[index])
        : projectSignalEndpoint(points[index], line);
    const end =
      nextLine && line
        ? signalLineIntersection(line, nextLine, points[index + 1])
        : projectSignalEndpoint(points[index + 1], line);

    shifted.push(start);
    shifted.push(end);
  });
  shifted.push(points[points.length - 1]);

  return dedupeAdjacentPoints(shifted);
}

function signalLineIntersection(a, b, fallback) {
  if (a.orientation === "vertical" && b.orientation === "horizontal") {
    return { x: a.fixed, y: b.fixed };
  }

  if (a.orientation === "horizontal" && b.orientation === "vertical") {
    return { x: b.fixed, y: a.fixed };
  }

  return fallback;
}

function projectSignalEndpoint(point, line) {
  return line.orientation === "vertical" ? { x: line.fixed, y: point.y } : { x: point.x, y: line.fixed };
}

function ValveCallout({ loop }) {
  const { x, y } = loop.valvePoint;
  const label = labelPosition({ x, y }, VALVE_LABEL_OFFSETS[loop.pairing.mv], DEFAULT_VALVE_LABEL);
  const isVertical = loop.valve.orientation === "vertical";
  const valveRotation = isVertical ? "rotate(90)" : "";

  return (
    <g aria-label={`${loop.pairing.mv} manipulated variable for ${loop.displayName}`}>
      <title>{`${loop.pairing.mv} to ${loop.pairing.cv}: ${loop.displayName}`}</title>
      <g transform={`translate(${x} ${y}) ${valveRotation}`}>
        <path d={`M ${-VALVE_SIZE.width / 2} ${-VALVE_SIZE.height / 2} L 0 0 L ${-VALVE_SIZE.width / 2} ${VALVE_SIZE.height / 2} Z`} fill="none" stroke={loop.color} strokeWidth="1.5" />
        <path d={`M ${VALVE_SIZE.width / 2} ${-VALVE_SIZE.height / 2} L 0 0 L ${VALVE_SIZE.width / 2} ${VALVE_SIZE.height / 2} Z`} fill="none" stroke={loop.color} strokeWidth="1.5" />
      </g>
      <circle cx={x + 16} cy={y - 12} r="7" fill="none" stroke={loop.color} strokeWidth="1.1" />
      <text x={x + 16} y={y - 9.6} fontSize="6.8" fontWeight="800" textAnchor="middle" fill={loop.color}>
        {loop.loopNumber}
      </text>
      {loop.mvOccurrence === 0 && (
        <TagLabel x={label.x} y={label.y} anchor={label.anchor} fontSize={9}>
          {loop.pairing.mv}
        </TagLabel>
      )}
    </g>
  );
}

function MeasurementCallout({ loop }) {
  const { x, y } = loop.measurementPoint;
  const label = labelPosition({ x, y }, MEASUREMENT_LABEL_OFFSETS[loop.pairing.cv], DEFAULT_MEASUREMENT_LABEL);

  return (
    <g aria-label={`${loop.pairing.cv} controlled variable for ${loop.displayName}`}>
      <title>{`${loop.pairing.mv} to ${loop.pairing.cv}: ${loop.displayName}`}</title>
      <circle cx={x} cy={y} r="10" fill="none" stroke={loop.color} strokeWidth="2" />
      <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke={loop.color} strokeWidth="1.7" vectorEffect="non-scaling-stroke" />
      <circle cx={x + 12} cy={y - 10} r="7" fill="none" stroke={loop.color} strokeWidth="1.1" />
      <text x={x + 12} y={y - 7.6} fontSize="6.8" fontWeight="800" textAnchor="middle" fill={loop.color}>
        {loop.loopNumber}
      </text>
      {loop.cvOccurrence === 0 && (
        <>
          <LabelLeader from={{ x, y }} to={label} color={loop.color} />
          <TagLabel x={label.x} y={label.y} anchor={label.anchor}>
            {loop.pairing.cv}
          </TagLabel>
        </>
      )}
    </g>
  );
}

function LabelLeader({ from, to, color }) {
  const labelSide = to.anchor === "end" ? -1 : to.anchor === "start" ? 1 : 0;
  const x1 = from.x + labelSide * 11;
  const x2 = labelSide === 0 ? to.x : to.x - labelSide * 6;
  const y2 = labelSide === 0 ? to.y - 15 : to.y - 4;

  return (
    <line
      x1={x1}
      y1={from.y}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth="1.2"
      strokeDasharray="3 3"
      strokeLinecap="round"
      opacity="0.82"
      vectorEffect="non-scaling-stroke"
    />
  );
}

function TagLabel({ x, y, anchor = "middle", fontSize = TAG_FONT_SIZE, children }) {
  const text = String(children || "");
  const resolvedFontSize = Number(fontSize) || TAG_FONT_SIZE;
  const width = estimateTextWidth(text, resolvedFontSize);
  const height = resolvedFontSize + 6;
  const rectX = labelRectX(x, width, anchor);

  return (
    <g>
      <rect x={rectX} y={y - resolvedFontSize - 3} width={width} height={height} rx="2" fill="#ffffff" opacity="0.68" />
      <text x={x} y={y} fontSize={resolvedFontSize} fontWeight="800" fontFamily={TAG_FONT} textAnchor={anchor} fill={INK}>
        {children}
      </text>
    </g>
  );
}

function Legend({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-label="legend">
      <rect x="0" y="-28" width="430" height="54" rx="4" fill="#ffffff" stroke={RULE} strokeWidth="1.2" />
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
      <circle cx="107" cy="11" r="7" fill={MATCHED_COLOR} />
      <text x="107" y="14" fontSize="6.5" fontWeight="800" fontFamily="Avenir Next, Segoe UI, sans-serif" textAnchor="middle" fill="#ffffff">
        01
      </text>
      <line x1="142" y1="11" x2="188" y2="11" stroke={SIGNAL} strokeWidth="1.4" strokeDasharray="4 5" strokeLinecap="round" />
      <text x="198" y="15" fontSize="11" fontFamily="Avenir Next, Segoe UI, sans-serif" fill={MUTED_INK}>
        dashed instrument line connects XMEAS to XMV
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
      mvOccurrence,
      mvCount: mvCounts.get(loop.pairing.mv),
      cvOccurrence,
      cvCount: cvCounts.get(loop.pairing.cv),
      valvePoint,
      measurementPoint,
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
  const distance = type === "valve" ? 58 : 40;
  return {
    x: point.x + offset * distance,
    y: point.y + (type === "valve" ? offset * 8 : -Math.abs(offset) * 5),
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

function controlRoutePoints(loop) {
  const route = SIGNAL_ROUTES[`${loop.pairing.mv}->${loop.pairing.cv}`];
  if (route) {
    return orthogonalPoints(loop.measurementPoint, loop.valvePoint, route);
  }

  const laneOffset = ((loop.index % 5) - 2) * 28;
  const laneY = clamp(Math.max(loop.measurementPoint.y, loop.valvePoint.y) + 58 + laneOffset, 92, PID_CANVAS.height - 92);
  return orthogonalPoints(loop.measurementPoint, loop.valvePoint, [
    ["v", laneY],
    ["h", "cx"],
    ["v", "cy"],
  ]);
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

function signalSegmentKey(routeIndex, segmentIndex) {
  return `${routeIndex}:${segmentIndex}`;
}

function sameCoordinate(a, b) {
  return Math.abs(a - b) <= SIGNAL_EPSILON;
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
