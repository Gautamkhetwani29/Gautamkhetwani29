import { Img, staticFile, Interactive, useCurrentFrame, interpolate } from "remotion";
import { colors, easeOut, fonts, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Headline, Rise, SceneShell } from "../shared/primitives";

export const SceneTitle: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <Interactive.Div
          name="Piu logo"
          style={{
            width: 132,
            height: 132,
            borderRadius: 32,
            overflow: "hidden",
            border: `1px solid ${colors.borderStrong}`,
            opacity: interpolate(frame, [0, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easeOut,
            }),
            scale: String(
              interpolate(frame, [0, 30], [0.8, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              }),
            ),
          }}
        >
          <Img src={staticFile("piu-logo.png")} style={{ width: "100%", height: "100%" }} />
        </Interactive.Div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Eyebrow delay={10}>Sleepwear · D2C Fashion</Eyebrow>
          <Rise name="Brand name" delay={16}>
            <Headline size={168}>Piu Snooze</Headline>
          </Rise>
          <Rise name="Subtitle" delay={30}>
            <Body size={44}>
              Meta Ads case study{" "}
              <span style={{ color: colors.faint, fontFamily: fonts.mono, fontSize: 36 }}>
                · Jul – Nov 2025
              </span>
            </Body>
          </Rise>
        </div>
      </div>
    </SceneShell>
  );
};
