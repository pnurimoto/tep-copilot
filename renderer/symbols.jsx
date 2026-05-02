const DEFAULT_STROKE = "#26323f";
const DEFAULT_FILL = "#f8fafc";
const LABEL_FILL = "#111827";
const SIGNAL_STROKE = "#2563eb";
const FLOW_STROKE = "#0f766e";

// if this is wrong, symbols will drift away from the coordinates in the hardcoded layout.
function pointFromPosition(position = {}) {
  return {
    x: Number(position.x ?? 0),
    y: Number(position.y ?? 0),
  };
}

// if this is wrong, symbols will stretch or collapse when layout code passes a size object.
function sizeFromValue(size, fallbackWidth, fallbackHeight = fallbackWidth) {
  if (typeof size === "number") {
    return { width: size, height: size };
  }

  return {
    width: Number(size?.width ?? fallbackWidth),
    height: Number(size?.height ?? fallbackHeight),
  };
}

// if this is wrong, numeric line sizes will draw diagonal lines instead of horizontal runs.
function lineSizeFromValue(size, fallbackWidth) {
  if (typeof size === "number") {
    return { width: size, height: 0 };
  }

  return sizeFromValue(size, fallbackWidth, 0);
}

// if this is wrong, process and instrument arrows will point in the wrong direction.
function arrowTransform(width, height) {
  const angle = (Math.atan2(height, width) * 180) / Math.PI;
  return `translate(${width} ${height}) rotate(${angle})`;
}

/**
 * Draws a major TEP process unit as a reusable SVG vessel.
 *
 * @param {object} props
 * @param {{x: number, y: number}} props.position Top-left SVG coordinate.
 * @param {number|{width: number, height: number}} props.size Bounding size for the unit.
 * @param {string} props.label Readable unit label shown below the vessel.
 * @param {"reactor"|"separator"|"stripper"} props.type Vessel drawing style.
 * @param {string} [props.fill] Interior fill color.
 * @param {string} [props.stroke] Outline color.
 */
// if Vessel is wrong, all major units will be misshapen or hard to recognize.
export function Vessel({
  position = { x: 0, y: 0 },
  size = { width: 110, height: 150 },
  label = "",
  type = "reactor",
  fill = DEFAULT_FILL,
  stroke = DEFAULT_STROKE,
}) {
  const { x, y } = pointFromPosition(position);
  const fallback = type === "separator" ? { width: 160, height: 82 } : { width: 110, height: 150 };
  const { width, height } = sizeFromValue(size, fallback.width, fallback.height);
  const isSeparator = type === "separator";
  const isStripper = type === "stripper";
  const capHeight = Math.max(12, Math.min(24, height * 0.16));
  const trayCount = isStripper ? 4 : 0;

  return (
    <g transform={`translate(${x} ${y})`} aria-label={`${label || type} vessel`}>
      {isSeparator ? (
        <>
          <rect
            x={capHeight / 2}
            y={capHeight / 2}
            width={width - capHeight}
            height={height - capHeight}
            rx={(height - capHeight) / 2}
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={width * 0.5}
            y1={height * 0.22}
            x2={width * 0.5}
            y2={height * 0.78}
            stroke={stroke}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </>
      ) : (
        <>
          <rect
            x="0"
            y={capHeight / 2}
            width={width}
            height={height - capHeight}
            rx={Math.min(width * 0.28, 22)}
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <ellipse
            cx={width / 2}
            cy={capHeight / 2}
            rx={width / 2}
            ry={capHeight / 2}
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M 0 ${height - capHeight / 2} C ${width * 0.25} ${height + capHeight / 2}, ${
              width * 0.75
            } ${height + capHeight / 2}, ${width} ${height - capHeight / 2}`}
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          {trayCount > 0 &&
            Array.from({ length: trayCount }, (_, index) => {
              const trayY = capHeight + ((index + 1) * (height - capHeight * 2)) / (trayCount + 1);
              return (
                <line
                  key={`tray-${index}`}
                  x1={width * 0.18}
                  y1={trayY}
                  x2={width * 0.82}
                  y2={trayY}
                  stroke={stroke}
                  strokeWidth="1.25"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
        </>
      )}
      <text
        x={width / 2}
        y={height + 18}
        textAnchor="middle"
        fontSize="12"
        fontFamily="Inter, Arial, sans-serif"
        fill={LABEL_FILL}
      >
        {label || type}
      </text>
    </g>
  );
}

/**
 * Draws a control valve with a visible open or closed state indicator.
 *
 * @param {object} props
 * @param {{x: number, y: number}} props.position Top-left SVG coordinate.
 * @param {number|{width: number, height: number}} props.size Valve body size.
 * @param {string} props.label Readable valve label shown below the symbol.
 * @param {"open"|"closed"} props.state State indicator shown beside the valve.
 * @param {"horizontal"|"vertical"} props.orientation Valve orientation.
 * @param {string} [props.stroke] Outline color.
 */
// if Valve is wrong, manipulated variables will be unclear or their open/closed state will be unreadable.
export function Valve({
  position = { x: 0, y: 0 },
  size = 46,
  label = "",
  state = "open",
  orientation = "horizontal",
  stroke = DEFAULT_STROKE,
}) {
  const { x, y } = pointFromPosition(position);
  const { width, height } = sizeFromValue(size, 46, 34);
  const isOpen = state !== "closed";
  const rotation = orientation === "vertical" ? `rotate(90 ${width / 2} ${height / 2})` : undefined;
  const indicatorFill = isOpen ? "#16a34a" : "#991b1b";

  return (
    <g transform={`translate(${x} ${y})`} aria-label={`${label || "valve"} ${state}`}>
      <g transform={rotation}>
        <path
          d={`M 0 0 L ${width / 2} ${height / 2} L 0 ${height} Z`}
          fill="#ffffff"
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={`M ${width} 0 L ${width / 2} ${height / 2} L ${width} ${height} Z`}
          fill="#ffffff"
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1={width / 2}
          y1={height / 2}
          x2={width / 2}
          y2={-height * 0.35}
          stroke={stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {!isOpen && (
          <line
            x1={width * 0.18}
            y1={height * 0.82}
            x2={width * 0.82}
            y2={height * 0.18}
            stroke="#991b1b"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </g>
      <circle
        cx={width + 11}
        cy={height / 2}
        r="5"
        fill={indicatorFill}
        stroke="#ffffff"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <text
        x={width / 2}
        y={height + 18}
        textAnchor="middle"
        fontSize="11"
        fontFamily="Inter, Arial, sans-serif"
        fill={LABEL_FILL}
      >
        {label || "Valve"}
      </text>
    </g>
  );
}

/**
 * Draws a PID controller/instrument bubble with an internal tag.
 *
 * @param {object} props
 * @param {{x: number, y: number}} props.position Top-left SVG coordinate.
 * @param {number|{width: number, height: number}} props.size Controller bubble size.
 * @param {string} props.label Controller tag, such as "PIC-7".
 * @param {string} props.mode Controller mode label, usually "PID".
 * @param {string} [props.stroke] Outline color.
 */
// if Controller is wrong, PID loops will not be visually separable from process equipment.
export function Controller({
  position = { x: 0, y: 0 },
  size = 58,
  label = "PID",
  mode = "PID",
  stroke = DEFAULT_STROKE,
}) {
  const { x, y } = pointFromPosition(position);
  const { width, height } = sizeFromValue(size, 58, 58);
  const radius = Math.min(width, height) / 2;

  return (
    <g transform={`translate(${x} ${y})`} aria-label={`${label} controller`}>
      <circle
        cx={width / 2}
        cy={height / 2}
        r={radius}
        fill="#ffffff"
        stroke={stroke}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={width * 0.18}
        y1={height / 2}
        x2={width * 0.82}
        y2={height / 2}
        stroke={stroke}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <text
        x={width / 2}
        y={height * 0.4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fontFamily="Inter, Arial, sans-serif"
        fill={LABEL_FILL}
      >
        {label}
      </text>
      <text
        x={width / 2}
        y={height * 0.7}
        textAnchor="middle"
        fontSize="10"
        fontFamily="Inter, Arial, sans-serif"
        fill={LABEL_FILL}
      >
        {mode}
      </text>
    </g>
  );
}

/**
 * Draws a dashed instrument signal line from a sensor or controller.
 *
 * @param {object} props
 * @param {{x: number, y: number}} props.position Start coordinate for the line.
 * @param {number|{width: number, height: number}} props.size Line length or delta from start to end.
 * @param {string} props.label Optional label shown near the midpoint.
 * @param {boolean} props.hasArrow Whether to draw a signal direction arrow.
 * @param {string} [props.stroke] Line color.
 */
// if InstrumentLine is wrong, measurement signals will look like material piping.
export function InstrumentLine({
  position = { x: 0, y: 0 },
  size = { width: 120, height: 0 },
  label = "",
  hasArrow = true,
  stroke = SIGNAL_STROKE,
}) {
  const { x, y } = pointFromPosition(position);
  const { width, height } = lineSizeFromValue(size, 120);

  return (
    <g transform={`translate(${x} ${y})`} aria-label={label || "instrument signal line"}>
      <line
        x1="0"
        y1="0"
        x2={width}
        y2={height}
        stroke={stroke}
        strokeWidth="1.75"
        strokeDasharray="6 5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {hasArrow && (
        <path
          d="M 0 0 L -8 -4 L -8 4 Z"
          transform={arrowTransform(width, height)}
          fill={stroke}
        />
      )}
      {label && (
        <text
          x={width / 2}
          y={height / 2 - 8}
          textAnchor="middle"
          fontSize="11"
          fontFamily="Inter, Arial, sans-serif"
          fill={LABEL_FILL}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/**
 * Draws a solid process material flow line.
 *
 * @param {object} props
 * @param {{x: number, y: number}} props.position Start coordinate for the line.
 * @param {number|{width: number, height: number}} props.size Line length or delta from start to end.
 * @param {string} props.label Optional label shown near the midpoint.
 * @param {boolean} props.hasArrow Whether to draw a flow direction arrow.
 * @param {string} [props.stroke] Line color.
 */
// if ProcessLine is wrong, feed and product routing will be hard to trace.
export function ProcessLine({
  position = { x: 0, y: 0 },
  size = { width: 140, height: 0 },
  label = "",
  hasArrow = true,
  stroke = FLOW_STROKE,
}) {
  const { x, y } = pointFromPosition(position);
  const { width, height } = lineSizeFromValue(size, 140);

  return (
    <g transform={`translate(${x} ${y})`} aria-label={label || "process material line"}>
      <line
        x1="0"
        y1="0"
        x2={width}
        y2={height}
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {hasArrow && (
        <path
          d="M 0 0 L -10 -5 L -10 5 Z"
          transform={arrowTransform(width, height)}
          fill={stroke}
        />
      )}
      {label && (
        <text
          x={width / 2}
          y={height / 2 - 10}
          textAnchor="middle"
          fontSize="11"
          fontFamily="Inter, Arial, sans-serif"
          fill={LABEL_FILL}
        >
          {label}
        </text>
      )}
    </g>
  );
}
