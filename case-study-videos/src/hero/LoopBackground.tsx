import { AbsoluteFill, Interactive, useCurrentFrame } from "remotion";
import { colors } from "../shared/theme";

// The case-study ground, rebuilt so it loops.
//
// The shared Background drifts the dot grid at a fixed speed and breathes
// the glow on 7, 9 and 12 second cycles. That is fine for a clip that
// plays once. This one is on `loop`, so frame 0 follows the last frame
// forever, and any motion that is mid-cycle at the cut shows up as a jump
// every pass. Here every motion is driven by position through the loop
// rather than by elapsed time, and each completes a whole number of
// cycles, so the last frame and the first are identical by construction.
//
// The glow also holds a constant opacity: the shared version fades it up
// over the first 40 frames, which would flash on every repeat.
export const LoopBackground: React.FC<{ loopFrames: number }> = ({ loopFrames }) => {
  const frame = useCurrentFrame();
  const p = frame / loopFrames; // 0 -> 1 across the loop
  const turn = p * 2 * Math.PI;

  // Whole tile-cycles, so the repeating pattern lands back on itself.
  const tile = 28;
  const driftX = ((p * 3) % 1) * tile;
  const driftY = ((p * 2) % 1) * tile;

  // Whole sine cycles, on different counts so the two never beat together.
  const breathe = 1 + 0.05 * Math.sin(turn * 2);
  const glowX = 18 * Math.sin(turn);
  const glowY = 14 * Math.cos(turn);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, opacity: 0.16 }}
        aria-hidden
      >
        <defs>
          <pattern
            id="hero-dots"
            width={tile}
            height={tile}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${driftX} ${driftY})`}
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill={colors.muted} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      <Interactive.Div
        name="Green glow"
        style={{
          position: "absolute",
          right: -340,
          bottom: -460,
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, rgba(52,208,124,0) 62%)`,
          translate: `${glowX}px ${glowY}px`,
          scale: String(breathe),
        }}
      />
      <Interactive.Div
        name="Counter glow"
        style={{
          position: "absolute",
          left: -300,
          top: -380,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(52,208,124,0.10) 0%, rgba(52,208,124,0) 64%)`,
          translate: `${-glowX}px ${-glowY}px`,
          scale: String(2 - breathe),
        }}
      />
    </AbsoluteFill>
  );
};
