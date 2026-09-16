import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background } from "../shared/Background";
import { SceneOutro, OUTRO_FRAMES } from "../shared/SceneOutro";
import { SceneTitle } from "./SceneTitle";
import { SceneStart } from "./SceneStart";
import { SceneOffer } from "./SceneOffer";
import { ScenePaper } from "./ScenePaper";
import { SceneResult } from "./SceneResult";
import { SceneMetrics } from "./SceneMetrics";

// Same cut length and exit-fade contract as PiuSnooze.tsx.
export const FADE = 8;

export const scenes = {
  title: 90,
  start: 165,
  offer: 160,
  paper: 175,
  result: 175,
  metrics: 130,
  outro: OUTRO_FRAMES,
};

export const basslilaDuration =
  Object.values(scenes).reduce((a, b) => a + b, 0) - FADE * (Object.keys(scenes).length - 1);

const cut = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: FADE })}
  />
);

export const Basslila: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Title" durationInFrames={scenes.title}>
          <SceneTitle durationInFrames={scenes.title} />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence name="Starting point" durationInFrames={scenes.start}>
          <SceneStart durationInFrames={scenes.start} />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence name="Offer" durationInFrames={scenes.offer}>
          <SceneOffer durationInFrames={scenes.offer} />
        </TransitionSeries.Sequence>
        {cut}
        <TransitionSeries.Sequence name="On paper" durationInFrames={scenes.paper}>
          <ScenePaper durationInFrames={scenes.paper} />
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
