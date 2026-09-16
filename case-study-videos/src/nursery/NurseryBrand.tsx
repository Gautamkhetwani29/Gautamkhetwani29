import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background } from "../shared/Background";
import { SceneOutro, OUTRO_FRAMES } from "../shared/SceneOutro";
import { SceneTitle } from "./SceneTitle";
import { SceneProblem } from "./SceneProblem";
import { SceneApproach } from "./SceneApproach";
import { SceneCreative } from "./SceneCreative";
import { SceneResult } from "./SceneResult";
import { SceneMetrics } from "./SceneMetrics";

// Same cut length and exit-fade contract as PiuSnooze.tsx.
export const FADE = 8;

export const scenes = {
  title: 90,
  problem: 165,
  approach: 165,
  creative: 150,
  result: 175,
  metrics: 130,
  outro: OUTRO_FRAMES,
};

export const nurseryDuration =
  Object.values(scenes).reduce((a, b) => a + b, 0) - FADE * (Object.keys(scenes).length - 1);

const cut = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: FADE })}
  />
);

export const NurseryBrand: React.FC = () => {
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
        <TransitionSeries.Sequence name="Creative" durationInFrames={scenes.creative}>
          <SceneCreative durationInFrames={scenes.creative} />
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
