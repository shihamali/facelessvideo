import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, HotDog, Plane } from "./lib";
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
