import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { colors, easeOut, fonts, PAD_X } from "../shared/theme";
import { Body, Eyebrow, Rise, SceneShell } from "../shared/primitives";

// The number Meta reports, shown in the "before" amber: true, but not
// the whole story. The next scene shows what the dashboard can't see.
export const ScenePaper: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell
      durationInFrames={durationInFrames}
      style={{ justifyContent: "center", alignItems: "flex-start", padding: `0 ${PAD_X}px` }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 1560 }}>
        <Eyebrow>On paper</Eyebrow>
        <Rise name="Metric label" delay={8}>
          <Body size={40}>Meta&apos;s own ROAS for this campaign</Body>
        </Rise>
        <Interactive.Div
          name="Meta ROAS"
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 176,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: colors.before,
            fontVariantNumeric: "tabular-nums",
            opacity: interpolate(frame, [12, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easeOut,
            }),
          }}
        >
          1.15<span style={{ fontSize: 110 }}>x</span>
        </Interactive.Div>
        <Rise name="Caveat" delay={48}>
          <Body size={48} style={{ color: colors.text }}>
            Which on its own looks modest.
          </Body>
        </Rise>
        <Rise name="Turn" delay={70}>
          <Body size={44}>
            But 120+ people signed up, and two of them went on to join the ₹70,000 program.
            Revenue that happens over a call, not on the ad, so Meta&apos;s dashboard doesn&apos;t
            capture it.
          </Body>
        </Rise>
      </div>
    </SceneShell>
  );
};
