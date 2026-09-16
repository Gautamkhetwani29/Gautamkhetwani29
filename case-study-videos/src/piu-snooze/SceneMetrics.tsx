import { colors, fonts, PAD_X } from "../shared/theme";
import { Arrow, Eyebrow, Rise, SceneShell } from "../shared/primitives";

type Metric =
  | { kind: "pair"; before: string; after: string; label: string }
  | { kind: "single"; value: string; unit: string; label: string };

const metrics: Metric[] = [
  { kind: "pair", before: "1.12", after: "4.21", label: "Purchase ROAS" },
  { kind: "pair", before: "₹1,584", after: "₹672", label: "Cost per purchase" },
  { kind: "single", value: "+364", unit: "%", label: "Website sessions" },
  { kind: "single", value: "+400", unit: "%", label: "Orders placed" },
];

export const SceneMetrics: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%" }}>
        <Eyebrow>The numbers</Eyebrow>
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
                      fontSize: 96,
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {m.kind === "pair" ? (
                      <>
                        <span style={{ color: colors.before }}>{m.before}</span>
                        <Arrow size={52} />
                        <span style={{ color: colors.accent }}>{m.after}</span>
                      </>
                    ) : (
                      <span style={{ color: colors.accent }}>
                        {m.value}
                        <span style={{ fontSize: 56 }}>{m.unit}</span>
                      </span>
                    )}
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
