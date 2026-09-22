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

  climbGap: number;
  climbLabel: number;
  climbCounter: number;
  climbUnit: number;
  pillText: number;
  pillIcon: number;
  pillPadY: number;
  pillPadX: number;
  chartW: number;
  chartH: number;
  chartStroke: number;
  chartDot: number;
  chartDotLast: number;
  chartValue: number;
  chartAxis: number;

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

  climbGap: 80,
  climbLabel: 34,
  climbCounter: 140,
  climbUnit: 88,
  pillText: 28,
  pillIcon: 26,
  pillPadY: 14,
  pillPadX: 28,
  chartW: 840,
  chartH: 300,
  chartStroke: 5,
  chartDot: 8,
  chartDotLast: 11,
  chartValue: 32,
  chartAxis: 26,

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
  nameSize: 190,
  identityGap: 40,
  eyebrow: 52,

  statsGap: 54,
  statValue: 110,
  statLabel: 52,
  statPadY: 64,
  statPadX: 30,
  gridRadius: 36,

  climbGap: 70,
  climbLabel: 56,
  climbCounter: 190,
  climbUnit: 120,
  pillText: 44,
  pillIcon: 40,
  pillPadY: 20,
  pillPadX: 38,
  chartW: 900,
  chartH: 340,
  chartStroke: 8,
  chartDot: 12,
  chartDotLast: 16,
  chartValue: 46,
  chartAxis: 40,

  // Nothing is cropped on a phone, so this scene alone can run wider than
  // the rest: 70px of padding leaves 1780, and 100px of type comes to
  // 1675px. On a 390px-wide band that lands at about 20px on screen --
  // the price of one line rather than two.
  closeSize: 100,
  closeGap: 44,
  closePadX: 70,
  ruleW: 500,
};
