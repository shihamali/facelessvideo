import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export const C = {
  bg: "#0B1220",
  panel: "#151E31",
  line: "#2A3650",
  text: "#F5F1E8",
  mute: "#9AA6BD",
  red: "#EF4444",
  green: "#34D399",
  yellow: "#FBBF24",
  blue: "#60A5FA",
};
export const FONT = "Inter, 'Inter Display', 'DejaVu Sans', sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** 0→1 progress starting at frame `at` */
export const prog = (frame: number, at: number, len = 20) =>
  interpolate(frame, [at, at + len], [0, 1], { ...clamp, easing: ease });

export type SceneProps = { t: number[]; e: number[]; dur: number };

export const Reveal: React.FC<{
  at: number;
  out?: number;
  y?: number;
  len?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, out, y = 40, len = 20, style, children }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, len);
  const o = out === undefined ? 1 : 1 - prog(frame, out, 12);
  return (
    <div style={{ opacity: p * o, translate: `0px ${(1 - p) * y}px`, ...style }}>
      {children}
    </div>
  );
};

export const Shell: React.FC<{
  dur: number;
  kicker?: string;
  source?: string;
  children: React.ReactNode;
}> = ({ dur, kicker, source, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 12, dur - 10, dur], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 20%, #16223A 0%, ${C.bg} 65%)`,
        fontFamily: FONT,
        color: C.text,
      }}
    >
      <AbsoluteFill style={{ opacity: o }}>
        {kicker ? (
          <div
            style={{
              position: "absolute",
              left: 120,
              top: 80,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 6,
              color: C.yellow,
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
        ) : null}
        {children}
        {source ? (
          <div style={{ position: "absolute", left: 120, bottom: 60, fontSize: 26, color: C.mute }}>
            {source}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Count: React.FC<{
  at: number;
  len?: number;
  from?: number;
  to: number;
  format: (n: number) => string;
  style?: React.CSSProperties;
}> = ({ at, len = 45, from = 0, to, format, style }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [at, at + len], [from, to], {
    ...clamp,
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });
  return <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>{format(v)}</span>;
};

export const Headline: React.FC<{ children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({
  children,
  size = 104,
  color = C.text,
  style,
}) => (
  <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, color, ...style }}>{children}</div>
);

export const Sub: React.FC<{ children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({
  children,
  size = 50,
  color = C.mute,
  style,
}) => <div style={{ fontSize: size, fontWeight: 500, lineHeight: 1.25, color, ...style }}>{children}</div>;

export const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill
    style={{ justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 160px", ...style }}
  >
    {children}
  </AbsoluteFill>
);

export const Stamp: React.FC<{ at: number; color: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  at,
  color,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 10);
  return (
    <div
      style={{
        position: "absolute",
        border: `10px solid ${color}`,
        color,
        borderRadius: 18,
        padding: "14px 34px",
        fontSize: 76,
        fontWeight: 900,
        letterSpacing: 4,
        rotate: "-8deg",
        opacity: p,
        scale: String(2 - p),
        background: "rgba(11,18,32,0.85)",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ---------- Illustrations (original, generic) ---------- */

export const HotDog: React.FC<{ width: number }> = ({ width }) => (
  <svg width={width} viewBox="0 0 800 420">
    <ellipse cx="400" cy="385" rx="330" ry="22" fill="#000" opacity="0.35" />
    <rect x="70" y="170" width="660" height="170" rx="85" fill="#D9973F" />
    <rect x="30" y="120" width="740" height="130" rx="65" fill="#B4432B" />
    <rect x="30" y="120" width="740" height="50" rx="25" fill="#C9553A" opacity="0.6" />
    <path
      d="M110 185 q35 -50 70 0 t70 0 t70 0 t70 0 t70 0 t70 0 t70 0 t70 0"
      fill="none"
      stroke="#FBBF24"
      strokeWidth="22"
      strokeLinecap="round"
    />
    <rect x="70" y="235" width="660" height="110" rx="55" fill="#E5AC55" />
    <rect x="110" y="300" width="580" height="16" rx="8" fill="#C98A34" opacity="0.5" />
  </svg>
);

export const Cup: React.FC<{ width: number }> = ({ width }) => (
  <svg width={width} viewBox="0 0 200 300">
    <rect x="118" y="0" width="12" height="90" rx="6" fill="#F5F1E8" transform="rotate(12 124 45)" />
    <rect x="30" y="70" width="140" height="26" rx="10" fill="#F5F1E8" />
    <path d="M40 96 L160 96 L145 290 L55 290 Z" fill="#EF4444" />
    <path d="M47 170 L153 170 L150 215 L50 215 Z" fill="#F5F1E8" opacity="0.9" />
  </svg>
);

export const Chicken: React.FC<{ width: number }> = ({ width }) => (
  <svg width={width} viewBox="0 0 300 240">
    <ellipse cx="150" cy="215" rx="130" ry="16" fill="#F5F1E8" opacity="0.9" />
    <ellipse cx="150" cy="130" rx="115" ry="80" fill="#C77B2B" />
    <ellipse cx="150" cy="110" rx="90" ry="50" fill="#DE9A45" />
    <ellipse cx="60" cy="165" rx="42" ry="30" fill="#B56A22" transform="rotate(-25 60 165)" />
    <ellipse cx="240" cy="165" rx="42" ry="30" fill="#B56A22" transform="rotate(25 240 165)" />
    <rect x="12" y="176" width="26" height="14" rx="7" fill="#F5F1E8" />
    <rect x="262" y="176" width="26" height="14" rx="7" fill="#F5F1E8" />
  </svg>
);

export const Bottle: React.FC<{ width: number; color: string }> = ({ width, color }) => (
  <svg width={width} viewBox="0 0 100 260">
    <rect x="36" y="0" width="28" height="30" rx="6" fill="#F5F1E8" />
    <path d="M38 30 L62 30 L66 80 Q90 95 90 125 L90 235 Q90 255 70 255 L30 255 Q10 255 10 235 L10 125 Q10 95 34 80 Z" fill={color} />
    <rect x="22" y="140" width="56" height="60" rx="8" fill="#F5F1E8" opacity="0.85" />
  </svg>
);

export const Person: React.FC<{ width: number; color: string }> = ({ width, color }) => (
  <svg width={width} viewBox="0 0 100 180">
    <circle cx="50" cy="38" r="30" fill={color} />
    <path d="M5 175 Q5 85 50 85 Q95 85 95 175 Z" fill={color} />
  </svg>
);

export const Plane: React.FC<{ width: number }> = ({ width }) => (
  <svg width={width} viewBox="0 0 400 240">
    <path d="M20 130 Q20 105 60 105 L330 105 Q385 110 385 130 Q385 150 330 155 L60 155 Q20 155 20 130 Z" fill="#F5F1E8" />
    <path d="M150 110 L215 110 L130 15 L100 15 Z" fill="#60A5FA" />
    <path d="M150 150 L215 150 L130 235 L100 235 Z" fill="#60A5FA" />
    <path d="M30 110 L75 110 L40 50 L20 50 Z" fill="#60A5FA" />
    <rect x="250" y="118" width="70" height="12" rx="6" fill="#0B1220" opacity="0.6" />
  </svg>
);

export const MemberCard: React.FC<{ width: number }> = ({ width }) => (
  <svg width={width} viewBox="0 0 640 400">
    <rect x="0" y="0" width="640" height="400" rx="36" fill="#F5F1E8" />
    <rect x="0" y="60" width="640" height="70" fill="#EF4444" />
    <circle cx="110" cy="250" r="60" fill="#9AA6BD" />
    <rect x="210" y="205" width="330" height="26" rx="13" fill="#2A3650" />
    <rect x="210" y="255" width="230" height="22" rx="11" fill="#9AA6BD" />
    <text x="40" y="365" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="40" fill="#0B1220" letterSpacing="6">
      MEMBER
    </text>
  </svg>
);

export const Arrow: React.FC<{ size?: number; color?: string }> = ({ size = 60, color = C.mute }) => (
  <svg width={size} height={size} viewBox="0 0 60 60">
    <path d="M6 30 H48 M34 14 L50 30 L34 46" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Pill: React.FC<{ children: React.ReactNode; color?: string; style?: React.CSSProperties }> = ({
  children,
  color = C.line,
  style,
}) => (
  <div
    style={{
      background: C.panel,
      border: `3px solid ${color}`,
      borderRadius: 28,
      padding: "30px 40px",
      fontSize: 46,
      fontWeight: 700,
      lineHeight: 1.2,
      textAlign: "center",
      ...style,
    }}
  >
    {children}
  </div>
);
