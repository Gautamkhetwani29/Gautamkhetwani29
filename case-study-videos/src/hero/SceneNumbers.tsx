import { colors, fonts } from "../shared/theme";
import { Eyebrow, Rise, SceneShell } from "../shared/primitives";
import type { HeroSize } from "./sizes";

// The four figures from the strip under the headline on the site, in the
// same order.
//
// Deliberately revealed rather than counted. A count-up needs digits to
// travel through, and "₹1Cr+" has none — the old loop spent most of its
// run showing "₹0Cr+", which reads as a bug rather than an animation.
// The one figure with room to count, 4.52x, does it in the next scene.
const stats = [
  { value: "₹1Cr+", label: "Revenue Generated" },
  { value: "₹30L+", label: "Ad Spend Managed" },
  { value: "10+", label: "Brand Partnerships" },
  { value: "4.52x", label: "Peak ROAS" },
];

export const SceneNumbers: React.FC<{ durationInFrames: number; s: HeroSize }> = ({
  durationInFrames,
  s,
}) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "center", padding: `0 ${s.padX}px` }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: s.statsGap,
          width: s.contentW,
        }}
      >
        <Eyebrow size={s.eyebrow}>Across D2C &amp; ecommerce brands</Eyebrow>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
            width: "100%",
            backgroundColor: colors.border,
            border: `1px solid ${colors.border}`,
            borderRadius: s.gridRadius,
            overflow: "hidden",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: colors.surface,
                padding: `${s.statPadY}px ${s.statPadX}px`,
                textAlign: "center",
              }}
            >
              <Rise name={`Stat ${i + 1}`} delay={10 + i * 9} distance={20}>
                <div style={{ display: "flex", flexDirection: "column", gap: s.statValue * 0.18 }}>
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: s.statValue,
                      lineHeight: 1,
                      letterSpacing: "-0.015em",
                      color: colors.text,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: s.statLabel,
                      lineHeight: 1.25,
                      color: colors.muted,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </Rise>
            </div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};
