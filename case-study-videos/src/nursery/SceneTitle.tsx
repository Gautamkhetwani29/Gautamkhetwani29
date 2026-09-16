import { Interactive, useCurrentFrame, interpolate } from "remotion";
import { colors, easeOut, fonts, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Headline, Rise, SceneShell } from "../shared/primitives";

// The nursery brand is anonymised on the site, so instead of a logo the
// title carries a simple leaf mark in the same slot Piu's logo used.
export const SceneTitle: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <Interactive.Div
          name="Leaf mark"
          style={{
            width: 132,
            height: 132,
            borderRadius: 32,
            backgroundColor: colors.surface2,
            border: `1px solid ${colors.borderStrong}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.accent,
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
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 19c0-8 5-13 14-14 1 9-4 14-12 14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M5 19c3-5 7-8 11-10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </Interactive.Div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Eyebrow delay={10}>Plant Nursery · Home &amp; Garden</Eyebrow>
          <Rise name="Brand name" delay={16}>
            <Headline size={150}>D2C Nursery Brand</Headline>
          </Rise>
          <Rise name="Subtitle" delay={30}>
            <Body size={44}>
              Meta Ads case study{" "}
              <span style={{ color: colors.faint, fontFamily: fonts.mono, fontSize: 36 }}>
                · Jan – Nov 2025
              </span>
            </Body>
          </Rise>
        </div>
      </div>
    </SceneShell>
  );
};
