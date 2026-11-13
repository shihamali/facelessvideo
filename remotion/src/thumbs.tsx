import React from "react";
import { AbsoluteFill } from "remotion";
import { Bottle, C, FONT, HotDog, Plane } from "./lib";
import { Coin } from "./v2scenes";

const base: React.CSSProperties = { fontFamily: FONT, color: C.text, overflow: "hidden" };
const big: React.CSSProperties = { fontWeight: 900, letterSpacing: -6, lineHeight: 0.95 };

const UpArrow: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 6 L92 52 H66 V94 H34 V52 H8 Z" fill={color} />
  </svg>
);

/** Video 1: Costco hot dog */
export const Thumb01: React.FC = () => (
  <AbsoluteFill style={{ ...base, background: `radial-gradient(ellipse at 28% 45%, #24365C 0%, ${C.bg} 70%)` }}>
    <div style={{ position: "absolute", left: -30, top: 250, rotate: "-8deg" }}>
      <HotDog width={720} />
    </div>
    <div style={{ position: "absolute", left: 50, top: 30, ...big, fontSize: 210, color: "#fff", textShadow: "0 8px 0 #000" }}>$1.50</div>
    <div style={{ position: "absolute", left: 60, top: 235, fontSize: 54, fontWeight: 900, letterSpacing: 3, background: C.red, padding: "6px 22px", borderRadius: 12 }}>
      SOLD AT A LOSS
    </div>
    <div style={{ position: "absolute", right: 50, top: 150, width: 520, textAlign: "center" }}>
      <UpArrow size={170} color={C.green} />
      <div style={{ ...big, fontSize: 200, color: C.green, textShadow: "0 8px 0 #000" }}>$5B</div>
      <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: 2, marginTop: 14 }}>PROFIT. HOW?</div>
    </div>
  </AbsoluteFill>
);

/** Video 2: Airlines are banks */
export const Thumb02: React.FC = () => (
  <AbsoluteFill style={{ ...base, background: `radial-gradient(ellipse at 72% 50%, #3A3210 0%, ${C.bg} 70%)` }}>
    <div style={{ position: "absolute", left: 30, top: 120, rotate: "-6deg" }}>
      <Plane width={560} />
    </div>
    <div style={{ position: "absolute", left: 90, top: 470, textAlign: "center", width: 440 }}>
      <div style={{ fontSize: 50, fontWeight: 900, letterSpacing: 3, color: C.mute }}>THE AIRLINE</div>
      <div style={{ ...big, fontSize: 150, color: C.mute }}>$11B</div>
    </div>
    <div style={{ position: "absolute", left: 575, top: 250, fontSize: 150, fontWeight: 900, color: "#fff" }}>&lt;</div>
    <div style={{ position: "absolute", right: 110, top: 40 }}>
      <Coin width={400} />
    </div>
    <div style={{ position: "absolute", right: 60, top: 450, textAlign: "center", width: 520 }}>
      <div style={{ fontSize: 50, fontWeight: 900, letterSpacing: 3, color: C.yellow }}>ITS MILES</div>
      <div style={{ ...big, fontSize: 210, color: C.yellow, textShadow: "0 8px 0 #000" }}>$22B</div>
    </div>
  </AbsoluteFill>
);

/** Video 3: Dollar stores */
export const Thumb03: React.FC = () => (
  <AbsoluteFill style={{ ...base, background: `radial-gradient(ellipse at 30% 50%, #3A3210 0%, ${C.bg} 70%)` }}>
    <div style={{ position: "absolute", left: 60, top: 30, ...big, fontSize: 250, color: C.yellow, textShadow: "0 8px 0 #000" }}>$4</div>
    <div style={{ position: "absolute", left: 70, top: 290, fontSize: 60, fontWeight: 900, letterSpacing: 3, background: C.green, color: C.bg, padding: "6px 22px", borderRadius: 12 }}>
      LOOKS CHEAP
    </div>
    <div style={{ position: "absolute", left: 150, top: 400 }}>
      <Bottle width={115} color={C.yellow} />
    </div>
    <div style={{ position: "absolute", left: 590, top: 40 }}>
      <Bottle width={250} color={C.blue} />
    </div>
    <div style={{ position: "absolute", right: 30, top: 120, width: 440, textAlign: "center" }}>
      <div style={{ ...big, fontSize: 150, color: C.red, textShadow: "0 8px 0 #000" }}>+33%</div>
      <div style={{ fontSize: 66, fontWeight: 900, letterSpacing: 2, marginTop: 20 }}>PER OUNCE</div>
      <div style={{ fontSize: 50, fontWeight: 900, letterSpacing: 2, marginTop: 40, background: C.red, padding: "8px 20px", borderRadius: 12, display: "inline-block" }}>THE TRICK</div>
    </div>
  </AbsoluteFill>
);

/** Video 4: FTX collapse */
export const Thumb04: React.FC = () => (
  <AbsoluteFill style={{ ...base, background: `radial-gradient(ellipse at 50% 40%, #3A1418 0%, ${C.bg} 72%)` }}>
    <div style={{ position: "absolute", left: 60, top: 50, ...big, fontSize: 230, color: "#fff", textShadow: "0 8px 0 #000" }}>$32B</div>
    <svg width={1280} height={720} style={{ position: "absolute" }}>
      <path d="M90 330 L420 300 L640 340 L760 380 L840 640 L1200 660" fill="none" stroke={C.red} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1150 610 L1215 662 L1140 700" fill="none" stroke={C.red} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <div style={{ position: "absolute", right: 60, top: 60, textAlign: "right" }}>
      <div style={{ ...big, fontSize: 250, color: C.red, textShadow: "0 8px 0 #000" }}>$0</div>
      <div style={{ fontSize: 76, fontWeight: 900, letterSpacing: 2, marginTop: 24, background: C.red, padding: "8px 26px", borderRadius: 14, display: "inline-block" }}>IN 9 DAYS</div>
    </div>
  </AbsoluteFill>
);

/** Channel profile picture (shown as a circle, so keep content central) */
export const Avatar: React.FC = () => (
  <AbsoluteFill style={{ ...base, background: `radial-gradient(circle at 50% 40%, #24365C 0%, ${C.bg} 75%)`, alignItems: "center", justifyContent: "center" }}>
    <div style={{ fontSize: 520, fontWeight: 900, color: C.yellow, lineHeight: 1, marginTop: -30 }}>$</div>
    <svg width={800} height={800} style={{ position: "absolute" }}>
      <path d="M170 560 L330 470 L450 520 L610 330" fill="none" stroke={C.green} strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M520 320 L620 318 L628 418" fill="none" stroke={C.green} strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </AbsoluteFill>
);

/** Channel banner, 2560x1440. Text sits in the central 1546x423 area that shows on every device. */
export const Banner: React.FC = () => (
  <AbsoluteFill style={{ ...base, background: `radial-gradient(ellipse at 50% 50%, #1B2A4A 0%, ${C.bg} 70%)`, alignItems: "center", justifyContent: "center" }}>
    <svg width={2560} height={1440} style={{ position: "absolute", opacity: 0.35 }}>
      <path d="M0 1100 L400 1000 L800 1060 L1200 900 L1600 960 L2000 760 L2560 620" fill="none" stroke={C.green} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0 400 L500 430 L900 380 L1400 470 L1900 420 L2560 500" fill="none" stroke={C.line} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <div style={{ width: 1546, textAlign: "center" }}>
      <div style={{ fontSize: 136, fontWeight: 900, letterSpacing: -5, lineHeight: 1, whiteSpace: "nowrap" }}>
        Where the <span style={{ color: C.yellow }}>Money</span> Goes
      </div>
      <div style={{ fontSize: 56, fontWeight: 600, color: C.mute, marginTop: 36 }}>The real business behind everyday companies</div>
    </div>
  </AbsoluteFill>
);
