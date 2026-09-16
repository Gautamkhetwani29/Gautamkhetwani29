import { colors, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Headline, Rise, SceneShell } from "../shared/primitives";

const points = [
  "Twelve, thirteen orders a month",
  "The same creative running since who-knows-when",
  "A checkout not built for phones, where most customers shop",
];

export const SceneProblem: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1500 }}>
        <Eyebrow>The problem</Eyebrow>
        <Rise name="Headline" delay={8}>
          <Headline size={116}>
            Stuck at <span style={{ color: colors.before }}>₹22,400</span> a month.
          </Headline>
        </Rise>
        <Rise name="Subhead" delay={20}>
          <Body size={52} style={{ color: colors.text }}>
            Not failing. Just flat.
          </Body>
        </Rise>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 24 }}>
          {points.map((p, i) => (
            <Rise key={p} name={`Point ${i + 1}`} delay={44 + i * 18} distance={18}>
              <Body size={40} style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <span
                  style={{
                    width: 28,
                    height: 2,
                    backgroundColor: colors.before,
                    flexShrink: 0,
                  }}
                />
                {p}
              </Body>
            </Rise>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};
