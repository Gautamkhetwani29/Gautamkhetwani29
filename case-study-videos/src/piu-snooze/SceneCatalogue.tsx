import { Img, Interactive, interpolate, staticFile, useCurrentFrame } from "remotion";
import { colors, easeOut, PAD_X, PAD_Y } from "../shared/theme";
import { Body, Eyebrow, Headline, Rise, SceneShell } from "../shared/primitives";

export const SceneCatalogue: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: `${PAD_Y - 10}px ${PAD_X}px`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 22, width: "100%" }}>
        <Eyebrow>The surprise</Eyebrow>
        <Rise name="Headline" delay={8}>
          <Headline size={84}>
            Plain catalogue ads{" "}
            <span style={{ color: colors.accent }}>outperformed everything.</span>
          </Headline>
        </Rise>
        <Rise name="Subhead" delay={20}>
          <Body size={40}>
            Video, product reels, UGC-style content: all tested. The least
            &ldquo;creative&rdquo; option quietly won.
          </Body>
        </Rise>

        <Interactive.Div
          name="Catalogue ads card"
          style={{
            marginTop: 26,
            width: 1600,
            height: 508,
            borderRadius: 24,
            overflow: "hidden",
            border: `1px solid ${colors.borderStrong}`,
            backgroundColor: colors.surface,
            boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)",
            opacity: interpolate(frame, [36, 60], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easeOut,
            }),
            translate: `0px ${interpolate(frame, [36, 64], [60, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easeOut,
            })}px`,
          }}
        >
          <Img
            src={staticFile("piu-catalogue-ads.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              scale: String(
                interpolate(frame, [36, 180], [1.0, 1.05], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              ),
            }}
          />
        </Interactive.Div>
      </div>
    </SceneShell>
  );
};
