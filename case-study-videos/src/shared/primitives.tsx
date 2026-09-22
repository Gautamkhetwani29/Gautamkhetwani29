import React from "react";
import { AbsoluteFill, Interactive, interpolate, useCurrentFrame } from "remotion";
import { colors, easeOut, fonts } from "./theme";

type RiseProps = {
  name: string;
  delay?: number;
  duration?: number;
  distance?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

// Fade + rise into a reserved layout slot. Nothing moves into another
// element's space; the slot is always the element's own.
export const Rise: React.FC<RiseProps> = ({
  name,
  delay = 0,
  duration = 24,
  distance = 28,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name={name}
      style={{
        opacity: interpolate(frame, [delay, delay + duration], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easeOut,
        }),
        translate: `0px ${interpolate(frame, [delay, delay + duration], [distance, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: easeOut,
        })}px`,
        ...style,
      }}
    >
      {children}
    </Interactive.Div>
  );
};

type SceneShellProps = {
  durationInFrames: number;
  exitFrames?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

// Wraps a whole scene's content so it fades out as one group, fully,
// before the crossfade into the next scene begins. Without this, a
// scene's headline is still at full opacity when the next scene's
// headline fades in on top of it, and the two large text blocks read
// as a stuck, overlapping mess instead of a clean cut. With this, the
// outgoing scene is already invisible once the crossfade runs, so the
// crossfade only ever dissolves into empty background.
export const SceneShell: React.FC<SceneShellProps> = ({
  durationInFrames,
  exitFrames = 20,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const exitStart = durationInFrames - exitFrames;
  const opacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return <AbsoluteFill style={{ opacity, ...style }}>{children}</AbsoluteFill>;
};

// Mono label with the green dot, like .eyebrow / .case-tag on the site.
// `size` defaults to the case-study scale; the hero loop's phone cut runs
// it larger, since that frame is shown about 390px wide.
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
}> = ({ children, delay = 0, size = 28 }) => (
  <Rise name="Eyebrow" delay={delay} distance={12}>
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.57,
        fontFamily: fonts.mono,
        fontSize: size,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: colors.accentDim,
      }}
    >
      <span
        style={{
          width: size * 0.43,
          height: size * 0.43,
          borderRadius: 999,
          backgroundColor: colors.accent,
          boxShadow: `0 0 18px ${colors.accent}`,
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  </Rise>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 108, style }) => (
  <div
    style={{
      fontFamily: fonts.display,
      fontWeight: 600,
      fontSize: size,
      lineHeight: 1.08,
      letterSpacing: "-0.015em",
      color: colors.text,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Body: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 44, style }) => (
  <div
    style={{
      fontFamily: fonts.body,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.4,
      color: colors.muted,
      ...style,
    }}
  >
    {children}
  </div>
);

// Small arrow used between before/after values, drawn like the site's SVG.
export const Arrow: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = colors.faint,
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M3.5 8h9M8.5 3.5L13 8l-4.5 4.5"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
