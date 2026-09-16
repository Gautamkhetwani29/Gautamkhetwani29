import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { colors, easeOut, fonts, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Rise, SceneShell } from "../shared/primitives";

// Quarterly ROAS from the site's nursery widget.
const quarters = [
  { label: "Q1", roas: 2.09 },
  { label: "Q2", roas: 4.23 },
  { label: "Q3", roas: 4.44 },
  { label: "Q4", roas: 4.52 },
];

const W = 560;
const H = 300;
const MIN = 1.5;
const MAX = 5;
const pts = quarters.map((q, i) => ({
  x: 20 + (i * (W - 40)) / (quarters.length - 1),
  y: H - 20 - ((q.roas - MIN) / (MAX - MIN)) * (H - 40),
}));
const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
const areaPath = `${linePath} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`;
const lineLength = pts.reduce(
  (acc, p, i) => (i === 0 ? 0 : acc + Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y)),
  0,
);

const DRAW_START = 24;
const DRAW_END = 110;

export const SceneResult: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const counted = interpolate(frame, [20, 110], [2.09, 4.52], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const drawn = interpolate(frame, [DRAW_START, DRAW_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 560px",
          columnGap: 120,
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <Eyebrow>Over the year</Eyebrow>
          <Rise name="Metric label" delay={8}>
            <Body size={40}>Quarterly Meta Ads ROAS</Body>
          </Rise>
          <Interactive.Div
            name="ROAS counter"
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 176,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: colors.accent,
              fontVariantNumeric: "tabular-nums",
              opacity: interpolate(frame, [12, 32], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              }),
            }}
          >
            {counted.toFixed(2)}
            <span style={{ fontSize: 110 }}>x</span>
          </Interactive.Div>
          <Rise name="Growth pill" delay={100} distance={14}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                fontFamily: fonts.mono,
                fontSize: 34,
                color: colors.accent,
                border: `1px solid ${colors.borderStrong}`,
                backgroundColor: colors.surface,
                borderRadius: 999,
                padding: "16px 34px",
              }}
            >
              <svg width="30" height="30" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              +116%
              <span style={{ color: colors.muted }}>up from 2.09x</span>
            </div>
          </Rise>
        </div>

        <Rise name="ROAS chart" delay={16} distance={30}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, width: W }}>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id="nursery-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.accent} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#nursery-area)" opacity={drawn} />
              <path
                d={linePath}
                fill="none"
                stroke={colors.accent}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={lineLength}
                strokeDashoffset={lineLength * (1 - drawn)}
              />
              {pts.map((p, i) => {
                const at = i / (pts.length - 1);
                // Each dot fades in over the stretch of line just before
                // it, so the last one's range ends at 1, never [1, 1].
                const show = interpolate(drawn, [Math.max(at - 0.08, 0), Math.max(at, 0.08)], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                return (
                  <g key={quarters[i].label} opacity={show}>
                    <circle cx={p.x} cy={p.y} r={i === pts.length - 1 ? 11 : 8} fill={colors.accent} />
                    <text
                      x={p.x}
                      y={p.y - 24}
                      textAnchor="middle"
                      fontFamily={fonts.display}
                      fontWeight={600}
                      fontSize={34}
                      fill={i === 0 ? colors.before : colors.text}
                    >
                      {quarters[i].roas.toFixed(2)}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 4px",
                borderTop: `1px solid ${colors.borderStrong}`,
                paddingTop: 18,
                fontFamily: fonts.mono,
                fontSize: 28,
                letterSpacing: "0.08em",
                color: colors.muted,
              }}
            >
              {quarters.map((q) => (
                <span key={q.label}>{q.label}</span>
              ))}
            </div>
          </div>
        </Rise>
      </div>
    </SceneShell>
  );
};
