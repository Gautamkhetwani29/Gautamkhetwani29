import { colors, fonts, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Headline, Rise, SceneShell } from "../shared/primitives";

const steps = [
  "Rebuilt the campaign structure",
  "Tightened who we were retargeting",
  "Went back to basics on creative",
];

export const SceneApproach: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1560 }}>
        <Eyebrow>What I did</Eyebrow>
        <Rise name="Headline" delay={8}>
          <Headline size={104}>I didn&apos;t touch the product or the offer.</Headline>
        </Rise>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 30 }}>
          {steps.map((s, i) => (
            <Rise key={s} name={`Step ${i + 1}`} delay={40 + i * 18} distance={18}>
              <Body
                size={46}
                style={{ display: "flex", alignItems: "baseline", gap: 28, color: colors.text }}
              >
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 30,
                    color: colors.accent,
                    letterSpacing: "0.08em",
                  }}
                >
                  0{i + 1}
                </span>
                {s}
              </Body>
            </Rise>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};
