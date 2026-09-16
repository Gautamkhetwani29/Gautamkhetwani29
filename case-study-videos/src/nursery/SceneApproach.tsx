import { colors, fonts, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Headline, Rise, SceneShell } from "../shared/primitives";

const seasons = [
  { season: "Summer", picks: "aquatic plants and lotus tubers" },
  { season: "Monsoon", picks: "mangoes and rare fruiting trees" },
  { season: "Winter", picks: "tulips and saffron bulbs" },
];

export const SceneApproach: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 1560 }}>
        <Eyebrow>What changed</Eyebrow>
        <Rise name="Headline" delay={8}>
          <Headline size={104}>Let the season decide the hero product.</Headline>
        </Rise>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 30 }}>
          {seasons.map((s, i) => (
            <Rise key={s.season} name={`Season ${i + 1}`} delay={40 + i * 18} distance={18}>
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
                    textTransform: "uppercase",
                    width: 190,
                    flexShrink: 0,
                  }}
                >
                  {s.season}
                </span>
                {s.picks}
              </Body>
            </Rise>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};
