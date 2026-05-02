import { TEP_LAYOUT } from "./layout.jsx";
import {
  Controller,
  InstrumentLine,
  ProcessLine,
  Valve,
  Vessel,
} from "./symbols.jsx";

export const MATCHED_COLOR = "#15803d";
export const DIVERGED_COLOR = "#7f1d1d";

const PIPE_STROKE = "#94a3b8";
const UNIT_STROKE = "#334155";
const UNIT_FILL = "#f8fafc";
const LABEL_FILL = "#111827";
const MUTED_FILL = "#475569";
const CONTROLLER_SIZE = 58;
const VALVE_SIZE = { width: 46, height: 34 };

const PROCESS_ROUTES = [
  { label: "A feed", points: [{ x: 28, y: 275 }, { x: 220, y: 275 }] },
  { label: "D feed", points: [{ x: 28, y: 323 }, { x: 220, y: 323 }] },
  { label: "E feed", points: [{ x: 28, y: 371 }, { x: 220, y: 371 }] },
  { label: "A+C feed", points: [{ x: 28, y: 419 }, { x: 220, y: 419 }] },
  { label: "reactor vapor", points: [{ x: 340, y: 288 }, { x: 430, y: 272 }] },
  { label: "condensed stream", points: [{ x: 550, y: 272 }, { x: 620, y: 330 }] },
  { label: "separator liquid", points: [{ x: 790, y: 448 }, { x: 940, y: 448 }] },
  { label: "product", points: [{ x: 1050, y: 502 }, { x: 1170, y: 502 }] },
  { label: "purge", points: [{ x: 790, y: 300 }, { x: 850, y: 210 }, { x: 850, y: 72 }] },
  { label: "steam", points: [{ x: 892, y: 620 }, { x: 892, y: 475 }] },
  { label: "reactor cooling", points: [{ x: 198, y: 620 }, { x: 198, y: 470 }] },
  { label: "condenser cooling", points: [{ x: 452, y: 360 }, { x: 552, y: 360 }] },
  {
    label: "recycle",
    points: [
      { x: 705, y: 300 },
      { x: 705, y: 188 },
      { x: 472, y: 152 },
      { x: 340, y: 250 },
    ],
  },
];

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
      viewBox={`0 0 ${TEP_LAYOUT.canvas.width} ${TEP_LAYOUT.canvas.height}`}
      width={TEP_LAYOUT.canvas.width}
      height={TEP_LAYOUT.canvas.height}
      role="img"
      aria-label={options.ariaLabel || "TEP P and ID control loop rendering"}
    >
      <PIDDiagram
        pairings={pairings}
        highlightDivergent={highlightDivergent}
        title={options.title || "TEP P&ID Control Loops"}
        subtitle={options.subtitle || ""}
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
  const gap = 48;
  const width = TEP_LAYOUT.canvas.width * 2 + gap;
  const height = TEP_LAYOUT.canvas.height;

  return (
    <svg
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
        />
      </g>
      <g transform={`translate(${TEP_LAYOUT.canvas.width + gap} 0)`}>
        <PIDDiagram
          pairings={rickerPairings}
          highlightDivergent={false}
          title="Ricker 1996 Baseline"
          subtitle="Reference decentralized control structure."
        />
      </g>
    </svg>
  );
}

export default renderPID;

function PIDDiagram({ pairings, highlightDivergent, title, subtitle }) {
  const normalized = normalizePairings(pairings);
  const loops = describeLoops(normalized, highlightDivergent);
  const skipped = normalized.length - loops.length;

  return (
    <g>
      <rect width={TEP_LAYOUT.canvas.width} height={TEP_LAYOUT.canvas.height} fill="#ffffff" />
      <Header title={title} subtitle={subtitle} skipped={skipped} />
      <ProcessBackground />
      <LoopLayer loops={loops} />
      <Legend x={32} y={710} />
    </g>
  );
}

function Header({ title, subtitle, skipped }) {
  return (
    <g>
      <text
        x="32"
        y="38"
        fontSize="22"
        fontWeight="700"
        fontFamily="Inter, Arial, sans-serif"
        fill={LABEL_FILL}
      >
        {title}
      </text>
      {subtitle && (
        <text x="32" y="61" fontSize="13" fontFamily="Inter, Arial, sans-serif" fill={MUTED_FILL}>
          {subtitle}
        </text>
      )}
      {skipped > 0 && (
        <text x="32" y="82" fontSize="12" fontFamily="Inter, Arial, sans-serif" fill={DIVERGED_COLOR}>
          {skipped} pairing(s) skipped because the MV or CV was missing from the layout.
        </text>
      )}
    </g>
  );
}

function ProcessBackground() {
  return (
    <g aria-label="TEP process background">
      <g opacity="0.72">
        {PROCESS_ROUTES.map((route) => (
          <Polyline key={route.label} points={route.points} label={route.label} />
        ))}
      </g>

      {Object.values(TEP_LAYOUT.units).map((unit) => (
        <Unit key={unit.id} unit={unit} />
      ))}
    </g>
  );
}

function Unit({ unit }) {
  if (unit.type === "reactor" || unit.type === "separator" || unit.type === "stripper") {
    return (
      <Vessel
        position={{ x: unit.x, y: unit.y }}
        size={{ width: unit.width, height: unit.height }}
        label={unit.label}
        type={unit.type}
        fill={UNIT_FILL}
        stroke={UNIT_STROKE}
      />
    );
  }

  if (unit.type === "heat-exchanger") {
    return <HeatExchanger unit={unit} />;
  }

  if (unit.type === "compressor") {
    return <Compressor unit={unit} />;
  }

  return (
    <rect
      x={unit.x}
      y={unit.y}
      width={unit.width}
      height={unit.height}
      fill={UNIT_FILL}
      stroke={UNIT_STROKE}
      strokeWidth="2"
    />
  );
}

function HeatExchanger({ unit }) {
  const coilY = unit.y + unit.height / 2;
  const coilStart = unit.x + 14;
  const coilEnd = unit.x + unit.width - 14;

  return (
    <g aria-label={`${unit.label} heat exchanger`}>
      <rect
        x={unit.x}
        y={unit.y}
        width={unit.width}
        height={unit.height}
        rx="7"
        fill={UNIT_FILL}
        stroke={UNIT_STROKE}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M ${coilStart} ${coilY} C ${coilStart + 18} ${unit.y + 8}, ${coilStart + 36} ${
          unit.y + unit.height - 8
        }, ${coilStart + 54} ${coilY} S ${coilEnd - 18} ${unit.y + 8}, ${coilEnd} ${coilY}`}
        fill="none"
        stroke={UNIT_STROKE}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
      <text
        x={unit.x + unit.width / 2}
        y={unit.y + unit.height + 18}
        textAnchor="middle"
        fontSize="12"
        fontFamily="Inter, Arial, sans-serif"
        fill={LABEL_FILL}
      >
        {unit.label}
      </text>
    </g>
  );
}

function Compressor({ unit }) {
  const cx = unit.x + unit.width / 2;
  const cy = unit.y + unit.height / 2;

  return (
    <g aria-label={`${unit.label} compressor`}>
      <circle
        cx={cx}
        cy={cy}
        r={Math.min(unit.width, unit.height) / 2}
        fill={UNIT_FILL}
        stroke={UNIT_STROKE}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M ${cx - 26} ${cy - 18} L ${cx + 30} ${cy} L ${cx - 26} ${cy + 18} Z`}
        fill="#ffffff"
        stroke={UNIT_STROKE}
        strokeWidth="1.6"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <text
        x={cx}
        y={unit.y + unit.height + 18}
        textAnchor="middle"
        fontSize="12"
        fontFamily="Inter, Arial, sans-serif"
        fill={LABEL_FILL}
      >
        {unit.label}
      </text>
    </g>
  );
}

function Polyline({ points, label }) {
  return (
    <g aria-label={`${label} process route`}>
      {points.slice(0, -1).map((point, index) => {
        const next = points[index + 1];
        return (
          <ProcessLine
            key={`${label}-${index}`}
            position={point}
            size={{ width: next.x - point.x, height: next.y - point.y }}
            label={index === 0 ? label : ""}
            hasArrow={index === points.length - 2}
            stroke={PIPE_STROKE}
          />
        );
      })}
    </g>
  );
}

function LoopLayer({ loops }) {
  return (
    <g aria-label="control loop pairings">
      <g opacity="0.94">
        {loops.map((loop) => (
          <LoopLines key={`lines-${loop.key}`} loop={loop} />
        ))}
      </g>
      {loops.map((loop) => (
        <MeasurementTap key={`tap-${loop.key}`} loop={loop} />
      ))}
      {loops.map((loop) => (
        <Valve
          key={`valve-${loop.key}`}
          position={{ x: loop.valve.x, y: loop.valve.y }}
          size={VALVE_SIZE}
          label={loop.pairing.mv}
          state="open"
          orientation={loop.valve.orientation}
          stroke={loop.color}
        />
      ))}
      {loops.map((loop) => (
        <LoopController key={`controller-${loop.key}`} loop={loop} />
      ))}
    </g>
  );
}

function LoopLines({ loop }) {
  return (
    <g aria-label={`${loop.displayName} loop lines`}>
      <InstrumentLine
        position={loop.measurementCenter}
        size={{
          width: loop.controllerCenter.x - loop.measurementCenter.x,
          height: loop.controllerCenter.y - loop.measurementCenter.y,
        }}
        stroke={loop.color}
        label=""
      />
      <ProcessLine
        position={loop.controllerCenter}
        size={{
          width: loop.valveCenter.x - loop.controllerCenter.x,
          height: loop.valveCenter.y - loop.controllerCenter.y,
        }}
        stroke={loop.color}
        label=""
      />
    </g>
  );
}

function MeasurementTap({ loop }) {
  return (
    <g transform={`translate(${loop.measurementCenter.x} ${loop.measurementCenter.y})`} aria-label={`${loop.pairing.cv} tap`}>
      <circle
        cx="0"
        cy="0"
        r="13"
        fill="#ffffff"
        stroke={loop.color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="-9"
        y1="0"
        x2="9"
        y2="0"
        stroke={loop.color}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <text
        x="0"
        y="-18"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fontFamily="Inter, Arial, sans-serif"
        fill={LABEL_FILL}
      >
        {loop.pairing.cv}
      </text>
    </g>
  );
}

function LoopController({ loop }) {
  return (
    <g>
      <Controller
        position={{
          x: loop.controllerCenter.x - CONTROLLER_SIZE / 2,
          y: loop.controllerCenter.y - CONTROLLER_SIZE / 2,
        }}
        size={CONTROLLER_SIZE}
        label={controllerTag(loop)}
        mode="PID"
        stroke={loop.color}
      />
      <text
        x={loop.controllerCenter.x}
        y={loop.controllerCenter.y + 46}
        textAnchor="middle"
        fontSize="10"
        fontFamily="Inter, Arial, sans-serif"
        fill={LABEL_FILL}
      >
        {loop.displayName}
      </text>
    </g>
  );
}

function Legend({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-label="legend">
      <rect x="0" y="-24" width="318" height="70" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <text x="14" y="-3" fontSize="12" fontWeight="700" fontFamily="Inter, Arial, sans-serif" fill={LABEL_FILL}>
        Legend
      </text>
      <line x1="14" y1="18" x2="58" y2="18" stroke={MATCHED_COLOR} strokeWidth="4" strokeLinecap="round" />
      <text x="70" y="22" fontSize="12" fontFamily="Inter, Arial, sans-serif" fill={LABEL_FILL}>
        green = matched
      </text>
      <line x1="176" y1="18" x2="220" y2="18" stroke={DIVERGED_COLOR} strokeWidth="4" strokeLinecap="round" />
      <text x="232" y="22" fontSize="12" fontFamily="Inter, Arial, sans-serif" fill={LABEL_FILL}>
        oxblood = diverged
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
      const valve = TEP_LAYOUT.valves[pairing.mv];
      const measurement = TEP_LAYOUT.measurements[pairing.cv];
      if (!valve || !measurement) {
        return null;
      }

      const measurementCenter = { x: measurement.x, y: measurement.y };
      const valveCenter = {
        x: valve.x + VALVE_SIZE.width / 2,
        y: valve.y + VALVE_SIZE.height / 2,
      };
      const baseCenter = midpoint(measurementCenter, valveCenter);
      const bucket = `${Math.round(baseCenter.x / 90)},${Math.round(baseCenter.y / 70)}`;

      return {
        key: `${index}-${pairing.mv}-${pairing.cv}`,
        index,
        bucket,
        pairing,
        valve,
        measurement,
        valveCenter,
        measurementCenter,
        baseCenter,
      };
    })
    .filter(Boolean);

  const bucketCounts = countBy(provisional, (loop) => loop.bucket);
  const bucketSeen = new Map();

  return provisional.map((loop) => {
    const occurrence = bucketSeen.get(loop.bucket) || 0;
    bucketSeen.set(loop.bucket, occurrence + 1);

    const siblingCount = bucketCounts.get(loop.bucket) || 1;
    const offsetIndex = occurrence - (siblingCount - 1) / 2;
    const normal = normalVector(loop.measurementCenter, loop.valveCenter);
    const controllerCenter = clampPoint(
      {
        x: loop.baseCenter.x + normal.x * offsetIndex * 28,
        y: loop.baseCenter.y + normal.y * offsetIndex * 28,
      },
      68,
      72,
      TEP_LAYOUT.canvas.width - 68,
      TEP_LAYOUT.canvas.height - 92
    );
    const divergent = isDivergent(loop.pairing, loop.index, highlightDivergent);

    return {
      ...loop,
      controllerCenter,
      divergent,
      color: divergent ? DIVERGED_COLOR : MATCHED_COLOR,
      displayName: loopDisplayName(loop.pairing, loop.index),
    };
  });
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
  return truncate(name, 30);
}

function controllerTag(loop) {
  const cvNumber = loop.pairing.cv.match(/\((\d+)\)/)?.[1] || loop.index + 1;
  return `PIC-${cvNumber}`;
}

function midpoint(a, b) {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

function normalVector(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy) || 1;
  return {
    x: -dy / length,
    y: dx / length,
  };
}

function clampPoint(point, minX, minY, maxX, maxY) {
  return {
    x: Math.max(minX, Math.min(maxX, point.x)),
    y: Math.max(minY, Math.min(maxY, point.y)),
  };
}

function countBy(items, keyFn) {
  const counts = new Map();
  for (const item of items) {
    const key = keyFn(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

function truncate(value, maxLength) {
  const text = String(value || "");
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 3)}...`;
}
