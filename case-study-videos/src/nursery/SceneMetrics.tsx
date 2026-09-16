import { colors, fonts, PAD_X } from "../shared/theme";
import { Arrow, Eyebrow, Rise, SceneShell } from "../shared/primitives";

// Straight from the site's nursery metric grid.
const metrics = [
  { before: "₹17.2L", after: "₹30.2L", label: "Quarterly revenue" },
  { before: "₹516", after: "₹393", label: "Ad spend efficiency" },
  { before: "1,723", after: "1,911", label: "Orders per quarter" },
  { before: "₹970", after: "₹1,563", label: "Avg. order value" },
];

export const SceneMetrics: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%" }}>
        <Eyebrow>Q1 to Q4</Eyebrow>
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
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 92,
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    <span style={{ color: colors.before }}>{m.before}</span>
                    <Arrow size={52} />
                    <span style={{ color: colors.accent }}>{m.after}</span>
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
