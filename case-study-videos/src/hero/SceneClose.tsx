import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, easeOut } from "../shared/theme";
import { Headline, Rise } from "../shared/primitives";
import type { HeroSize } from "./sizes";

// One row, arriving a word at a time. The stagger is what "showcases"
// the line: each word uses the same fade-and-rise as everything else in
// these clips, just four frames behind the one before it, so the line
// assembles left to right instead of appearing all at once.
const WORDS = ["Your", "Growth", "Partner", "for", "D2C", "Brands"];
const STAGGER = 4;
const FIRST = 2;

// A space in Space Grotesk at this weight measures 0.24em, so the flex
// gap has to be that to read as ordinary word spacing rather than a row
// of separate words.
const SPACE = 0.24;

// The closing line, then back to the bare background.
//
// This one does its own fade rather than using SceneShell. SceneShell
// reaches zero on the frame *after* the last one it renders, which leaves
// the final frame sitting at 1/exitFrames — five percent of the headline
// still on screen. On a clip that ends, nobody sees it. On a loop it is
// the seam: five percent of text vanishing every pass. Fading out over
// [d-34, d-6] instead means the last six frames are genuinely empty, and
// the repeat lands on the opening scene's own frame 0, which is also
// empty. The two ends then match.
const TAIL = 6;

export const SceneClose: React.FC<{ durationInFrames: number; s: HeroSize }> = ({
  durationInFrames,
  s,
}) => {
  const frame = useCurrentFrame();

  const out = interpolate(frame, [durationInFrames - 34, durationInFrames - TAIL], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // The rule draws once the last word has landed, so the hold before the
  // loop point still has something moving in it.
  const lastWordAt = FIRST + (WORDS.length - 1) * STAGGER + 26;
  const rule = interpolate(frame, [lastWordAt, lastWordAt + 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <AbsoluteFill
      style={{
        opacity: out,
        justifyContent: "center",
        alignItems: "center",
        padding: `0 ${s.closePadX}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: s.closeGap,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: s.closeSize * SPACE,
            whiteSpace: "nowrap",
          }}
        >
          {WORDS.map((word, i) => (
            <Rise
              key={word}
              name={`Word ${i + 1}`}
              delay={FIRST + i * STAGGER}
              duration={26}
              distance={24}
            >
              <Headline
                size={s.closeSize}
                style={{ color: word === "D2C" ? colors.accent : colors.text }}
              >
                {word}
              </Headline>
            </Rise>
          ))}
        </div>

        <div
          style={{
            width: s.ruleW,
            height: 3,
            borderRadius: 999,
            backgroundColor: colors.accent,
            boxShadow: `0 0 26px ${colors.accentGlow}`,
            transform: `scaleX(${rule})`,
            transformOrigin: "center",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
