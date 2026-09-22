import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { colors, easeOut, fonts } from "../shared/theme";
import { Body, Eyebrow, Rise, SceneShell } from "../shared/primitives";
import type { HeroSize } from "./sizes";

// The same quarterly ROAS the nursery widget shows on the site. 4.52x is
// the figure the strip in the previous scene calls peak ROAS, so the two
// corroborate each other instead of introducing a second number.
const quarters = [
  { label: "Q1", roas: 2.09 },
  { label: "Q2", roas: 4.23 },
  { label: "Q3", roas: 4.44 },
  { label: "Q4", roas: 4.52 },
];

const MIN = 1.5;
const MAX = 5;

const geometry = (W: number, H: number) => {
  const pts = quarters.map((q, i) => ({
    x: 20 + (i * (W - 40)) / (quarters.length - 1),
    y: H - 20 - ((q.roas - MIN) / (MAX - MIN)) * (H - 40),
  }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  return {
    pts,
    line,
    area: `${line} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`,
    length: pts.reduce(
      (acc, p, i) => (i === 0 ? 0 : acc + Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y)),
      0,
    ),
  };
};

const DRAW_START = 20;
const DRAW_END = 86;

export const SceneClimb: React.FC<{ durationInFrames: number; s: HeroSize }> = ({
  durationInFrames,
  s,
}) => {
  const frame = useCurrentFrame();
  const { pts, line, area, length } = geometry(s.chartW, s.chartH);

  const counted = interpolate(frame, [16, 86], [2.09, 4.52], {
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
      style={{ justifyContent: "center", alignItems: "center", padding: `0 ${s.padX}px` }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `1fr ${s.chartW}px`,
          columnGap: s.climbGap,
          alignItems: "center",
          width: s.contentW,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: s.climbLabel * 0.65 }}>
          <Eyebrow size={s.eyebrow}>Over the year</Eyebrow>
          <Rise name="Metric label" delay={8}>
            <Body size={s.climbLabel}>Quarterly Meta Ads ROAS</Body>
          </Rise>
          <Interactive.Div
            name="ROAS counter"
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: s.climbCounter,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: colors.accent,
              fontVariantNumeric: "tabular-nums",
              opacity: interpolate(frame, [10, 30], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              }),
            }}
          >
            {counted.toFixed(2)}
            <span style={{ fontSize: s.climbUnit }}>x</span>
          </Interactive.Div>
          <Rise name="Growth pill" delay={80} distance={12}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: s.pillText * 0.5,
                fontFamily: fonts.mono,
                fontSize: s.pillText,
                color: colors.accent,
                border: `1px solid ${colors.borderStrong}`,
                backgroundColor: colors.surface,
                borderRadius: 999,
                padding: `${s.pillPadY}px ${s.pillPadX}px`,
                whiteSpace: "nowrap",
              }}
            >
              <svg
                width={s.pillIcon}
                height={s.pillIcon}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
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

        <Rise name="ROAS chart" delay={14} distance={26}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: s.chartW }}>
            <svg
              width={s.chartW}
              height={s.chartH}
              viewBox={`0 0 ${s.chartW} ${s.chartH}`}
              aria-hidden
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.accent} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#hero-area)" opacity={drawn} />
              <path
                d={line}
                fill="none"
                stroke={colors.accent}
                strokeWidth={s.chartStroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={length}
                strokeDashoffset={length * (1 - drawn)}
              />
              {pts.map((p, i) => {
                const at = i / (pts.length - 1);
                // Each dot appears as the line reaches it. The range ends
                // at `at`, never [1, 1], which interpolate rejects.
                const show = interpolate(
                  drawn,
                  [Math.max(at - 0.08, 0), Math.max(at, 0.08)],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                );
                return (
                  <g key={quarters[i].label} opacity={show}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={i === pts.length - 1 ? s.chartDotLast : s.chartDot}
                      fill={colors.accent}
                    />
                    <text
                      x={p.x}
                      y={p.y - s.chartValue * 0.75}
                      textAnchor="middle"
                      fontFamily={fonts.display}
                      fontWeight={600}
                      fontSize={s.chartValue}
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
                padding: "18px 4px 0",
                borderTop: `1px solid ${colors.borderStrong}`,
                fontFamily: fonts.mono,
                fontSize: s.chartAxis,
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
