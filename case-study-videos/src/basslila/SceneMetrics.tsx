import { colors, fonts, PAD_X } from "../shared/theme";
import { Eyebrow, Rise, SceneShell } from "../shared/primitives";

// Straight from the site's Basslila metric grid.
const metrics = [
  { value: "104", label: "Webinar sign-ups" },
  { value: "₹415", label: "Cost per sign-up" },
  { value: "₹43,210", label: "Ad spend (campaign)" },
  { value: "₹1L+", label: "Backend course revenue" },
];

export const SceneMetrics: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%" }}>
        <Eyebrow>Webinar funnel totals</Eyebrow>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            backgroundColor: colors.border,
            border: `1px solid ${colors.border}`,
            borderRadius: 28,
            overflow: "hidden",
          }}
        >
          {metrics.map((m, i) => (
            <div key={m.label} style={{ backgroundColor: colors.surface, padding: "56px 64px" }}>
              <Rise name={`Metric ${i + 1}`} delay={10 + i * 14} distance={22}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 96,
                      lineHeight: 1,
                      color: colors.accent,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {m.value}
                  </div>
                  <div style={{ fontFamily: fonts.body, fontSize: 34, color: colors.muted }}>
                    {m.label}
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
