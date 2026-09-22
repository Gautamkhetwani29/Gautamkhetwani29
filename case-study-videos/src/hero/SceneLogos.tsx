import { Img, Interactive, interpolate, staticFile, useCurrentFrame } from "remotion";
import { colors, easeOut, fonts } from "../shared/theme";
import { Eyebrow, Rise, SceneShell } from "../shared/primitives";
import type { HeroSize } from "./sizes";

// The eleven client logos already on the site's marquee, same files.
// They arrive as white tiles because that is how the source images are
// drawn and how the strip below the hero shows them.
//
// Logos are the one element that survives the phone band unchanged: they
// are shapes, not type, so nothing about them has to be re-set for a
// frame shown at a fifth of its own width.
const LOGOS = Array.from({ length: 11 }, (_, i) =>
  `logos/logo-${String(i + 1).padStart(2, "0")}.png`,
);

// Six on top, five below, so the shorter row centres under the longer one.
const TOP = LOGOS.slice(0, 6);
const BOTTOM = LOGOS.slice(6);

const Tile: React.FC<{ src: string; index: number; s: HeroSize }> = ({ src, index, s }) => {
  const frame = useCurrentFrame();
  const delay = 8 + index * 3;
  const appear = interpolate(frame, [delay, delay + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return (
    <Interactive.Div
      name={`Logo ${index + 1}`}
      style={{
        width: s.logoTile,
        height: s.logoTile,
        borderRadius: s.logoRadius,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        border: `1px solid ${colors.border}`,
        opacity: appear,
        scale: String(interpolate(appear, [0, 1], [0.86, 1])),
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </Interactive.Div>
  );
};

export const SceneLogos: React.FC<{ durationInFrames: number; s: HeroSize }> = ({
  durationInFrames,
  s,
}) => {
  const row: React.CSSProperties = {
    display: "flex",
    gap: s.logoGap,
    justifyContent: "center",
  };

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
          gap: s.logoGap * 0.9,
        }}
      >
        <Eyebrow size={s.eyebrow}>Trusted by</Eyebrow>

        <div style={{ display: "flex", flexDirection: "column", gap: s.logoGap }}>
          <div style={row}>
            {TOP.map((src, i) => (
              <Tile key={src} src={src} index={i} s={s} />
            ))}
          </div>
          <div style={row}>
            {BOTTOM.map((src, i) => (
              <Tile key={src} src={src} index={i + TOP.length} s={s} />
            ))}
          </div>
        </div>

        <Rise name="Categories" delay={44} distance={14}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: s.logoCaption,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: colors.faint,
              whiteSpace: "nowrap",
            }}
          >
            Fashion &middot; Skincare &middot; Plants &middot; Lifestyle
          </div>
        </Rise>
      </div>
    </SceneShell>
  );
};
