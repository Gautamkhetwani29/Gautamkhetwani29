import { Config } from "@remotion/cli/config";

Config.setRspack(true);
// PNG, not JPEG. Frames are captured to disk before the encoder sees
// them, so JPEG put a whole generation of lossy compression in front of
// h264 -- and on flat dark grounds with fine type, that is exactly what
// softens edges. Measured against a lossless reference frame of the hero
// loop, the same clip scores 23.6 dB as JPEG frames and 37.7 dB as PNG,
// and the PNG file came out *smaller*: the JPEG artifacts were noise the
// encoder then had to spend bits describing.
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
