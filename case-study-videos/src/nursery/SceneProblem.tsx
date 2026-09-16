import { colors, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Headline, Rise, SceneShell } from "../shared/primitives";

const points = [
  "Over ₹6.6L a month in ad spend, the largest account I manage",
  "Their long-time bestseller, Brazilian Wood, stopped converting",
  "One item asked to carry the whole year",
];

export const SceneProblem: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1560 }}>
        <Eyebrow>The problem</Eyebrow>
        <Rise name="Headline" delay={8}>
          <Headline size={112}>
            One hero product carried <span style={{ color: colors.before }}>most of the sales.</span>
          </Headline>
        </Rise>
        <Rise name="Subhead" delay={20}>
          <Body size={52} style={{ color: colors.text }}>
            It sold well, until it didn&apos;t.
          </Body>
        </Rise>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 24 }}>
          {points.map((p, i) => (
            <Rise key={p} name={`Point ${i + 1}`} delay={44 + i * 18} distance={18}>
              <Body size={40} style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <span
                  style={{ width: 28, height: 2, backgroundColor: colors.before, flexShrink: 0 }}
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
