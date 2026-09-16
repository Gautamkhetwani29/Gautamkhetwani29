import { colors, fonts, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Headline, Rise, SceneShell } from "../shared/primitives";

const facts = ["₹499 webinar", "4.5 hours", "₹70,000 advanced course behind it"];

export const SceneOffer: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1560 }}>
        <Eyebrow>The offer</Eyebrow>
        <Rise name="Headline" delay={8}>
          <Headline size={104}>
            A ₹499 webinar for serious learners, with a{" "}
            <span style={{ color: colors.accent }}>₹70,000 course</span> as the goal behind it.
          </Headline>
        </Rise>
        <Rise name="Subhead" delay={20}>
          <Body size={44}>
            The webinar is the front door. The course is where the revenue happens, over a call.
          </Body>
        </Rise>
        <div style={{ display: "flex", gap: 20, marginTop: 30, flexWrap: "wrap" }}>
          {facts.map((f, i) => (
            <Rise key={f} name={`Fact ${i + 1}`} delay={44 + i * 14} distance={16}>
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
                {f}
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};
