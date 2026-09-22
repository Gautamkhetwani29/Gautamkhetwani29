import { interpolate, useCurrentFrame } from "remotion";
import { colors, easeOut, fonts } from "../shared/theme";
import { Eyebrow, Headline, Rise, SceneShell } from "../shared/primitives";
import type { HeroSize } from "./sizes";

// Opening card. It fades up from the bare background rather than
// starting at full opacity: the closing scene fades back down to the
// same bare background, so the two ends of the loop meet on an
// identical frame and the repeat is invisible.
const ENTER = 18;

export const SceneIdentity: React.FC<{ durationInFrames: number; s: HeroSize }> = ({
  durationInFrames,
  s,
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, ENTER], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "center", padding: `0 ${s.padX}px` }}
    >
      <div
        style={{
          opacity: enter,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: s.identityGap,
        }}
      >
        {/* Mark and name on one row, as they were. "Gautam Khetwani" is
            8.25px wide per px of font size in Space Grotesk 600, so the
            row comes to mark + gap + 8.25 x nameSize -- which is what the
            two nameSize values are picked against. */}
        <div style={{ display: "flex", alignItems: "center", gap: s.identityGap, whiteSpace: "nowrap" }}>
          <Rise name="GK mark" delay={2} distance={18}>
            <div
              style={{
                width: s.markSize,
                height: s.markSize,
                borderRadius: s.markRadius,
                backgroundColor: colors.accent,
                color: colors.onAccent,
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: s.markFont,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 90px ${colors.accentGlow}`,
              }}
            >
              GK
            </div>
          </Rise>

          <Rise name="Name" delay={10}>
            <Headline size={s.nameSize}>Gautam Khetwani</Headline>
          </Rise>
        </div>

        <Eyebrow delay={24} size={s.eyebrow}>
          Meta Ads for D2C &amp; Ecommerce Brands
        </Eyebrow>
      </div>
    </SceneShell>
  );
};
