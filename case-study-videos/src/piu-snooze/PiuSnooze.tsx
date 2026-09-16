import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background } from "../shared/Background";
import { SceneTitle } from "./SceneTitle";
import { SceneProblem } from "./SceneProblem";
import { SceneApproach } from "./SceneApproach";
import { SceneCatalogue } from "./SceneCatalogue";
import { SceneResult } from "./SceneResult";
import { SceneMetrics } from "./SceneMetrics";
import { SceneOutro, OUTRO_FRAMES } from "../shared/SceneOutro";

// A short crossfade: long enough to read as a deliberate cut, short
// enough that it never shows two full scenes at once (each scene's own
// SceneShell has already faded its content to nothing before this
// window starts, see shared/primitives.tsx).
export const FADE = 8;

// Scene lengths in frames at 30 fps. Each scene fades its own content
// out over its last 20 frames, so these only need to cover: entrance +
// a short hold + that exit — not a long static pause on top.
export const scenes = {
  title: 90,
  problem: 155,
  approach: 155,
  catalogue: 155,
  result: 165,
  metrics: 130,
  outro: OUTRO_FRAMES,
};

export const piuSnoozeDuration =
  Object.values(scenes).reduce((a, b) => a + b, 0) - FADE * (Object.keys(scenes).length - 1);

// TransitionSeries only accepts its own children directly, so this is a
// plain element, not a wrapper component.
const cut = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: FADE })}
  />
);

export const PiuSnooze: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Title" durationInFrames={scenes.title}>
          <SceneTitle durationInFrames={scenes.title} />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence name="Problem" durationInFrames={scenes.problem}>
          <SceneProblem durationInFrames={scenes.problem} />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence name="Approach" durationInFrames={scenes.approach}>
          <SceneApproach durationInFrames={scenes.approach} />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence name="Catalogue ads" durationInFrames={scenes.catalogue}>
          <SceneCatalogue durationInFrames={scenes.catalogue} />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence name="Result" durationInFrames={scenes.result}>
          <SceneResult durationInFrames={scenes.result} />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence name="Metrics" durationInFrames={scenes.metrics}>
          <SceneMetrics durationInFrames={scenes.metrics} />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence name="Outro" durationInFrames={scenes.outro}>
          <SceneOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
