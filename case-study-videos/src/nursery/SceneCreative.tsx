import { colors, fonts, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Headline, Rise, SceneShell } from "../shared/primitives";

const beats = ["How to plant it", "Where it's from", "What to expect"];

export const SceneCreative: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1560 }}>
        <Eyebrow>The creative</Eyebrow>
        <Rise name="Headline" delay={8}>
          <Headline size={104}>
            Gardeners want to learn{" "}
            <span style={{ color: colors.accent }}>before they buy.</span>
          </Headline>
        </Rise>
        <Rise name="Subhead" delay={20}>
          <Body size={44}>
            Short, genuinely educational videos outperformed the more polished ads we tried.
          </Body>
        </Rise>
        <div style={{ display: "flex", gap: 20, marginTop: 30, flexWrap: "wrap" }}>
          {beats.map((b, i) => (
            <Rise key={b} name={`Beat ${i + 1}`} delay={44 + i * 14} distance={16}>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 32,
                  letterSpacing: "0.04em",
                  color: colors.text,
                  border: `1px solid ${colors.borderStrong}`,
                  backgroundColor: colors.surface,
                  borderRadius: 999,
                  padding: "18px 36px",
                }}
              >
                {b}
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};
