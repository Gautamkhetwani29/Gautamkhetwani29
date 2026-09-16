import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, fonts } from "./theme";
import { Headline, Rise } from "./primitives";

export const OUTRO_FRAMES = 110;

// A small, continuously bobbing chevron: the one bit of motion that
// keeps running after the entrance animations settle, nudging the
// viewer to look at what's below the video. Path matches the
// case-toggle chevron already used for "read more" on the site.
const BobbingChevron: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const y = 4 * Math.sin((t * 2 * Math.PI) / 1.4);
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ translate: `0px ${y}px` }}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Straight to the sign-off card: no separate quote frame first. It
// fades in from Metrics via the shared crossfade and simply holds,
// since nothing follows it.
export const SceneOutro: React.FC = () => {
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <Rise name="GK mark" delay={0} distance={16}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              backgroundColor: colors.accent,
              color: colors.onAccent,
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            GK
          </div>
        </Rise>
        <Rise name="Name" delay={8}>
          <Headline size={72} style={{ textAlign: "center" }}>
            Gautam Khetwani
          </Headline>
        </Rise>
        <Rise name="CTA" delay={16}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: fonts.mono,
              fontSize: 34,
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: colors.accentDim,
            }}
          >
            Full case study below
            <BobbingChevron />
          </div>
        </Rise>
        <Rise name="URL" delay={26} distance={12}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 32,
              letterSpacing: "0.08em",
              color: colors.accentDim,
              marginTop: 12,
            }}
          >
            gautamkhetwani.com
          </div>
        </Rise>
      </div>
    </AbsoluteFill>
  );
};
