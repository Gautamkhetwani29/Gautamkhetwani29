import "./index.css";
import { Composition } from "remotion";
import { PiuSnooze, piuSnoozeDuration } from "./piu-snooze/PiuSnooze";
import { NurseryBrand, nurseryDuration } from "./nursery/NurseryBrand";
import { Basslila, basslilaDuration } from "./basslila/Basslila";
import { HeroLoop, HeroLoopPhone, heroLoopDuration } from "./hero/HeroLoop";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PiuSnooze"
        component={PiuSnooze}
        durationInFrames={piuSnoozeDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="NurseryBrand"
        component={NurseryBrand}
        durationInFrames={nurseryDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Basslila"
        component={Basslila}
        durationInFrames={basslilaDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* The hero loop. Plays muted on repeat behind the headline, so it
          is built to meet its own first frame -- see HeroLoop. */}
      <Composition
        id="HeroLoop"
        component={HeroLoop}
        durationInFrames={heroLoopDuration}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Same frame, same beats, same frame counts. The phone band is
          about 390px wide, a fifth of this frame, so the type is set
          larger — see hero/sizes.ts. Rendered at half scale. */}
      <Composition
        id="HeroLoopPhone"
        component={HeroLoopPhone}
        durationInFrames={heroLoopDuration}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
