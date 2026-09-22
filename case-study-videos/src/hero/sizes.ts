// One cut, two sizes.
//
// Both are 1920x1080 landscape — the phone version is not a different
// video, it is the same four beats laid out for how small the frame is
// shown. On a desktop the band fills the window, so the frame arrives
// somewhere near life size. On a phone it is a 16:9 strip about 390px
// wide, which is roughly a fifth of the frame's own width: type set for
// the desktop cut would land at 5px there. Everything below is what that
// fifth has to be multiplied by to come out legible.
//
// The two also differ in how much of the frame they can use. The desktop
// band is object-fit: cover against a window of any shape, so it keeps a
// wide safe margin for the crop (see layout.ts). The phone band is given
// the frame's own 16:9, so nothing is cropped and the layout can run
// closer to the edges.

export type HeroSize = {
  padX: number;
  contentW: number;

  markSize: number;
  markRadius: number;
  markFont: number;
  nameSize: number;
  identityGap: number;
  eyebrow: number;

  statsGap: number;
  statValue: number;
  statLabel: number;
  statPadY: number;
  statPadX: number;
  gridRadius: number;

  logoTile: number;
  logoGap: number;
  logoRadius: number;
  logoCaption: number;

  baValue: number;
  baLabel: number;
  baArrow: number;
  baGap: number;
  baColGap: number;

  closeSize: number;
  closeGap: number;
  closePadX: number;
  ruleW: number;
};

export const desktopSize: HeroSize = {
  padX: 250,
  contentW: 1420,

  markSize: 116,
  markRadius: 28,
  markFont: 52,
  nameSize: 116,
  identityGap: 34,
  eyebrow: 28,

  statsGap: 44,
  statValue: 80,
  statLabel: 28,
  statPadY: 52,
  statPadX: 34,
  gridRadius: 28,

  // Two rows, six then five: 6 x 150 + 5 x 44 = 1120 inside 1420.
  logoTile: 150,
  logoGap: 44,
  logoRadius: 26,
  logoCaption: 28,

  // The wider pair is "₹1,584 → ₹672": 5.42px per px of font size for the
  // two figures, plus the arrow and its gaps. At 96 that is 620px, inside
  // the 710px column.
  baValue: 96,
  baLabel: 34,
  baArrow: 52,
  baGap: 26,
  baColGap: 100,

  // The closing line runs as one row. Measured in Space Grotesk 600 at
  // -0.015em, it is 16.75px wide for every px of font size, so 78px comes
  // to 1306px inside the 1420px the crop leaves -- 114px to spare.
  closeSize: 78,
  closeGap: 40,
  closePadX: 250,
  ruleW: 420,
};

export const phoneSize: HeroSize = {
  padX: 110,
  contentW: 1700,

  markSize: 150,
  markRadius: 34,
  markFont: 66,
  // Mark + gap + 8.25 x this has to stay inside 1700: 150 + 50 + 1403.
  nameSize: 170,
  identityGap: 40,
  eyebrow: 52,

  statsGap: 54,
  statValue: 110,
  statLabel: 52,
  statPadY: 64,
  statPadX: 30,
  gridRadius: 36,

  // 6 x 170 + 5 x 40 = 1220 inside 1700. At 170 a tile lands about 34px
  // on a phone -- small, but a logo is a shape and still reads.
  logoTile: 170,
  logoGap: 40,
  logoRadius: 30,
  logoCaption: 46,

  // At 120 the wider pair comes to 780px inside an 850px column.
  baValue: 120,
  baLabel: 52,
  baArrow: 66,
  baGap: 30,
  baColGap: 60,

  // Nothing is cropped on a phone, so this scene alone can run wider than
  // the rest: 70px of padding leaves 1780, and 100px of type comes to
  // 1675px. On a 390px-wide band that lands at about 20px on screen --
  // the price of one line rather than two.
  closeSize: 100,
  closeGap: 44,
  closePadX: 70,
  ruleW: 500,
};
