import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { colors, easeOut, fonts } from "../shared/theme";
import { Eyebrow, Rise, SceneShell } from "../shared/primitives";
import type { HeroSize } from "./sizes";

// Both pairs are the Piu Snooze figures already published on the site's
// case-study grid. The scene above this one gives totals; totals say how
// much, not what changed. This says what changed.
const PAIRS = [
  { before: "1.12", after: "4.21", label: "Purchase ROAS" },
  { before: "₹1,584", after: "₹672", label: "Cost per purchase" },
];

// Before, then the arrow, then after: the order the animation should
// read in, so the eye sees a thing move rather than two numbers appear.
const BEFORE_AT = 8;
const ARROW_AT = 22;
const AFTER_AT = 32;
const LABEL_AT = 44;
const PAIR_STAGGER = 14;

const Pair: React.FC<{ pair: (typeof PAIRS)[number]; index: number; s: HeroSize }> = ({
  pair,
  index,
  s,
}) => {
  const frame = useCurrentFrame();
  const at = (f: number) => f + index * PAIR_STAGGER;
  const ease = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const, easing: easeOut };

  const before = interpolate(frame, [at(BEFORE_AT), at(BEFORE_AT) + 20], [0, 1], ease);
  const arrow = interpolate(frame, [at(ARROW_AT), at(ARROW_AT) + 16], [0, 1], ease);
  const after = interpolate(frame, [at(AFTER_AT), at(AFTER_AT) + 22], [0, 1], ease);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: s.baValue * 0.2 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: s.baGap,
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: s.baValue,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
        }}
      >
        <Interactive.Div name={`Before ${index + 1}`} style={{ color: colors.before, opacity: before }}>
          {pair.before}
        </Interactive.Div>

        {/* The arrow slides the short distance it points in, so the pair
            reads as a move rather than as two separate figures. */}
        <Interactive.Div
          name={`Arrow ${index + 1}`}
          style={{
            opacity: arrow,
            translate: `${interpolate(arrow, [0, 1], [-s.baGap, 0])}px 0px`,
            display: "flex",
          }}
        >
          <svg width={s.baArrow} height={s.baArrow} viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3.5 8h9M8.5 3.5L13 8l-4.5 4.5"
              stroke={colors.faint}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Interactive.Div>

        <Interactive.Div
          name={`After ${index + 1}`}
          style={{
            color: colors.accent,
            opacity: after,
            scale: String(interpolate(after, [0, 1], [0.9, 1])),
          }}
        >
          {pair.after}
        </Interactive.Div>
      </div>

      <Rise name={`Label ${index + 1}`} delay={at(LABEL_AT)} distance={14}>
        <div style={{ fontFamily: fonts.body, fontSize: s.baLabel, color: colors.muted }}>
          {pair.label}
        </div>
      </Rise>
    </div>
  );
};

export const SceneBeforeAfter: React.FC<{ durationInFrames: number; s: HeroSize }> = ({
  durationInFrames,
  s,
}) => {
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "center", padding: `0 ${s.padX}px` }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: s.statsGap,
          width: s.contentW,
        }}
      >
        <Eyebrow size={s.eyebrow}>One account, five months</Eyebrow>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: s.baColGap,
            width: "100%",
          }}
        >
          {PAIRS.map((pair, i) => (
            <Pair key={pair.label} pair={pair} index={i} s={s} />
          ))}
        </div>
      </div>
    </SceneShell>
  );
};
