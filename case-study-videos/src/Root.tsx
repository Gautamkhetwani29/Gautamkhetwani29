import "./index.css";
import { Composition } from "remotion";
import { PiuSnooze, piuSnoozeDuration } from "./piu-snooze/PiuSnooze";
import { NurseryBrand, nurseryDuration } from "./nursery/NurseryBrand";
import { Basslila, basslilaDuration } from "./basslila/Basslila";

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
    </>
  );
};
