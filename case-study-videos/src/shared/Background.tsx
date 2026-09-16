import { AbsoluteFill, Interactive, interpolate, useCurrentFrame } from "remotion";
import { colors } from "./theme";

// Persistent ground for every case-study video: the site's dark card,
// a dot grid that drifts, and a glow that breathes. The video cuts
// between scenes often; this layer is what keeps a frame from ever
// looking completely inert in between.
//
// Deliberately no green left edge. These clips sit flush inside the
// case-study cards on the site, and those cards already carry that
// accent line down their whole height. Drawing a second one here would
// double it alongside the video and break at the video's bottom edge.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30; // seconds

  // The dot grid drifts diagonally by less than one tile (28px), so
  // the repeating pattern loops with no visible seam or jump.
  const tile = 28;
  const driftX = (frame * 0.12) % tile;
  const driftY = (frame * 0.08) % tile;

  // The glow breathes (scale) and drifts (position) on independent,
  // slow, non-matching cycles so it never reads as looping on a beat.
  const breathe = 1 + 0.05 * Math.sin((t * 2 * Math.PI) / 7);
  const glowX = 16 * Math.sin((t * 2 * Math.PI) / 9);
  const glowY = 12 * Math.cos((t * 2 * Math.PI) / 12);

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
            id="dots"
            width={tile}
            height={tile}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${driftX} ${driftY})`}
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill={colors.muted} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <Interactive.Div
        name="Green glow"
        style={{
          position: "absolute",
          right: -300,
          bottom: -420,
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, rgba(52,208,124,0) 62%)`,
          opacity: interpolate(frame, [0, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: `${glowX}px ${glowY}px`,
          scale: String(breathe),
        }}
      />
    </AbsoluteFill>
  );
};
