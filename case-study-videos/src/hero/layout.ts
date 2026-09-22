// The hero loop is the one clip on the site that is never shown whole.
// It fills a 100vh band with object-fit: cover, so the frame is cropped
// to whatever shape the viewport is, and the crop is not small:
//
//   4:3 landscape (1024x768)   -> 240px cut from each side
//   16:10 (1440x900)           ->  96px cut from each side
//   ultrawide (3440x1440)      -> 137px cut from top and bottom
//
// So everything that has to be readable lives inside this box. It is
// what is left when the worst crop in each direction is taken off, with
// a little to spare. The case-study clips do not need this — they are
// letterboxed inside their cards and always shown whole.
export const SAFE_X = 250;
export const SAFE_Y = 150;

// Usable area: 1420 x 780 of the 1920 x 1080 frame.
export const SAFE_W = 1920 - SAFE_X * 2;
export const SAFE_H = 1080 - SAFE_Y * 2;
