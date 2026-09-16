import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { Easing } from "remotion";

// Tokens mirror css/style.css on gautamkhetwani.com so the videos sit
// inside the dark case-study cards without a visible seam.
export const colors = {
  bg: "#0d1210",
  bgSoft: "#101614",
  surface: "#151c18",
  surface2: "#1d2620",
  border: "rgba(255, 255, 255, 0.09)",
  borderStrong: "rgba(255, 255, 255, 0.16)",
  text: "#f4f5f1",
  muted: "#8c948d",
  faint: "#868d85",
  accent: "#34d07c",
  accentDim: "#2aa866",
  accentGlow: "rgba(52, 208, 124, 0.22)",
  onAccent: "#06170e",
  before: "#c4844f",
  cream: "#f5f3ea",
};

const spaceGrotesk = loadSpaceGrotesk("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
});
const inter = loadInter("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});
const mono = loadJetBrainsMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const fonts = {
  display: spaceGrotesk.fontFamily,
  body: inter.fontFamily,
  mono: mono.fontFamily,
};

// Same curve as --ease-out on the site.
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

// Safe-area padding for a 1920x1080 frame.
export const PAD_X = 160;
export const PAD_Y = 120;

// Indian digit grouping: 104106 -> "1,04,106"
export const formatINR = (n: number): string => {
  const whole = Math.round(n).toString();
  if (whole.length <= 3) return `₹${whole}`;
  const last3 = whole.slice(-3);
  const rest = whole.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${rest},${last3}`;
};
