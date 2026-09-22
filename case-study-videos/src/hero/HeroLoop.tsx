import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { LoopBackground } from "./LoopBackground";
import { SceneIdentity } from "./SceneIdentity";
import { SceneNumbers } from "./SceneNumbers";
import { SceneClimb } from "./SceneClimb";
import { SceneClose } from "./SceneClose";
import { desktopSize, phoneSize, type HeroSize } from "./sizes";

// Same short crossfade as the case-study clips: each scene has already
// faded its own content to nothing before this window opens, so the
// transition only ever dissolves background into background.
export const FADE = 8;

export const scenes = {
  identity: 96,
  numbers: 126,
  climb: 132,
  close: 120,
};

export const heroLoopDuration =
  Object.values(scenes).reduce((a, b) => a + b, 0) - FADE * (Object.keys(scenes).length - 1);

const cut = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: FADE })}
  />
);

// Unlike the case-study clips, this one plays on `loop` behind the
// headline. Two things follow from that: the background's motion is
// driven by position through the loop so its last frame matches its
// first (see LoopBackground), and the first and last scenes fade from
// and to the bare background, so the repeat has nothing to show.
//
// Both cuts are the same 16:9 frame and the same four beats at the same
// frame counts. Only the type scale and the padding differ — see sizes.ts
// for why the phone one has to be set so much larger.
const Loop: React.FC<{ s: HeroSize }> = ({ s }) => (
  <AbsoluteFill>
    <LoopBackground loopFrames={heroLoopDuration} />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Identity" durationInFrames={scenes.identity}>
        <SceneIdentity durationInFrames={scenes.identity} s={s} />
      </TransitionSeries.Sequence>
      {cut}
      <TransitionSeries.Sequence name="Track record" durationInFrames={scenes.numbers}>
        <SceneNumbers durationInFrames={scenes.numbers} s={s} />
      </TransitionSeries.Sequence>
      {cut}
      <TransitionSeries.Sequence name="The climb" durationInFrames={scenes.climb}>
        <SceneClimb durationInFrames={scenes.climb} s={s} />
      </TransitionSeries.Sequence>
      {cut}
      <TransitionSeries.Sequence name="Close" durationInFrames={scenes.close}>
        <SceneClose durationInFrames={scenes.close} s={s} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);

export const HeroLoop: React.FC = () => <Loop s={desktopSize} />;
export const HeroLoopPhone: React.FC = () => <Loop s={phoneSize} />;
