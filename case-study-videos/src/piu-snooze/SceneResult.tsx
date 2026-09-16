import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { colors, easeOut, fonts, formatINR, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Rise, SceneShell } from "../shared/primitives";

const BEFORE = 22400;
const AFTER = 104106;
const BAR_MAX = 400;

const bars = [
  {
    label: "Before",
    value: "₹22.4K",
    height: (BEFORE / AFTER) * BAR_MAX,
    color: "rgba(255,255,255,0.16)",
    delay: 20,
  },
  { label: "After", value: "₹1.04L", height: BAR_MAX, color: colors.accent, delay: 34 },
];

export const SceneResult: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const counted = interpolate(frame, [16, 96], [BEFORE, AFTER], {
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
          gridTemplateColumns: "1fr 520px",
          columnGap: 120,
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <Eyebrow>One month later</Eyebrow>
          <Rise name="Metric label" delay={8}>
            <Body size={40}>Monthly revenue</Body>
          </Rise>
          <Interactive.Div
            name="Revenue counter"
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
            {formatINR(counted)}
          </Interactive.Div>
          <Rise name="Growth pill" delay={88} distance={14}>
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
              +363%
              <span style={{ color: colors.muted }}>in 30 days</span>
            </div>
          </Rise>
        </div>

        <Rise name="Bar chart" delay={16} distance={30}>
          <div style={{ display: "flex", gap: 60 }}>
            {bars.map((b) => (
              <div
                key={b.label}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 220 }}
              >
                <div
                  style={{
                    height: BAR_MAX + 80,
                    width: 220,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderBottom: `1px solid ${colors.borderStrong}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 600,
                      fontSize: 42,
                      lineHeight: 1,
                      marginBottom: 18,
                      color: b.label === "After" ? colors.text : colors.faint,
                      opacity: interpolate(frame, [b.delay + 34, b.delay + 50], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    {b.value}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      borderRadius: "12px 12px 0 0",
                      backgroundColor: b.color,
                      height: interpolate(frame, [b.delay, b.delay + 56], [0, b.height], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                        easing: easeOut,
                      }),
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: 22,
                    fontFamily: fonts.mono,
                    fontSize: 28,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: colors.muted,
                  }}
                >
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        </Rise>
      </div>
    </SceneShell>
  );
};
