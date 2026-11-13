import React from "react";
import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { Arrow, C, Center, Count, Headline, Pill, Plane, prog, Reveal, SceneProps, Shell, Sub } from "./lib";

const mid = (t: number[], e: number[], i: number, f = 0.5) => Math.round(t[i] + (e[i] - t[i]) * f);

/** Centered content that appears at `at` and leaves at `out`. */
const Phase: React.FC<{ at: number; out?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  at,
  out,
  style,
  children,
}) => (
  <Center style={style}>
    <Reveal at={at} out={out}>
      {children}
    </Reveal>
  </Center>
);

/* ---------- Illustrations ---------- */

const CreditCard: React.FC<{ width: number; color?: string }> = ({ width, color = C.blue }) => (
  <svg width={width} viewBox="0 0 640 400">
    <rect width="640" height="400" rx="36" fill={color} />
    <rect y="70" width="640" height="70" fill="#0B1220" opacity="0.75" />
    <rect x="50" y="200" width="100" height="70" rx="12" fill="#FBBF24" />
    <rect x="50" y="315" width="330" height="26" rx="13" fill="#F5F1E8" opacity="0.9" />
    <circle cx="520" cy="320" r="42" fill="#F5F1E8" opacity="0.85" />
    <circle cx="570" cy="320" r="42" fill="#F5F1E8" opacity="0.5" />
  </svg>
);

const BankIcon: React.FC<{ width: number }> = ({ width }) => (
  <svg width={width} viewBox="0 0 200 180">
    <path d="M100 8 L190 62 L10 62 Z" fill="#F5F1E8" />
    {[32, 74, 116, 158].map((x) => (
      <rect key={x} x={x - 9} y="74" width="18" height="70" fill="#F5F1E8" />
    ))}
    <rect x="10" y="150" width="180" height="20" rx="4" fill="#F5F1E8" />
  </svg>
);

const StoreIcon: React.FC<{ width: number }> = ({ width }) => (
  <svg width={width} viewBox="0 0 200 180">
    <path d="M14 20 H186 L196 70 H4 Z" fill="#EF4444" />
    {[52, 100, 148].map((x) => (
      <rect key={x} x={x - 12} y="20" width="24" height="50" fill="#F5F1E8" opacity="0.85" />
    ))}
    <rect x="18" y="70" width="164" height="100" fill="#F5F1E8" />
    <rect x="80" y="100" width="40" height="70" fill="#2A3650" />
    <rect x="30" y="92" width="38" height="38" fill="#60A5FA" />
    <rect x="132" y="92" width="38" height="38" fill="#60A5FA" />
  </svg>
);

const PersonIcon: React.FC<{ width: number }> = ({ width }) => (
  <svg width={width} viewBox="0 0 100 180">
    <circle cx="50" cy="42" r="32" fill="#F5F1E8" />
    <path d="M5 175 Q5 88 50 88 Q95 88 95 175 Z" fill="#F5F1E8" />
  </svg>
);

const Coin: React.FC<{ width: number }> = ({ width }) => (
  <svg width={width} viewBox="0 0 300 300">
    <circle cx="150" cy="150" r="140" fill="#FBBF24" />
    <circle cx="150" cy="150" r="112" fill="none" stroke="#B4830C" strokeWidth="8" />
    <text x="150" y="142" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="96" fill="#0B1220">
      1
    </text>
    <text x="150" y="200" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="44" fill="#0B1220" letterSpacing="4">
      MILE
    </text>
  </svg>
);

const Check: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 64 }) => (
  <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.2 }}>
    <span style={{ color: C.green }}>✓</span> {children}
  </div>
);

const Chips: React.FC<{ items: string[]; at: number; step?: number; color?: string }> = ({ items, at, step = 10, color }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
    {items.map((s, i) => (
      <Reveal key={s} at={at + i * step}>
        <Pill color={color} style={{ padding: "24px 44px", fontSize: 52 }}>
          {s}
        </Pill>
      </Reveal>
    ))}
  </div>
);

const HBar: React.FC<{ at: number; label: string; value: string; width: number; color: string }> = ({
  at,
  label,
  value,
  width,
  color,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 30);
  return (
    <div style={{ opacity: prog(frame, at, 10), marginBottom: 44, textAlign: "left" }}>
      <div style={{ fontSize: 44, fontWeight: 600, color: C.mute, marginBottom: 12 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ height: 96, width: Math.max(8, width * p), background: color, borderRadius: 14 }} />
        <div style={{ fontSize: 84, fontWeight: 900, color, opacity: p, whiteSpace: "nowrap" }}>{value}</div>
      </div>
    </div>
  );
};

const Strike: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {children}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "54%",
          height: 9,
          borderRadius: 5,
          background: C.red,
          width: `${prog(frame, at, 14) * 100}%`,
        }}
      />
    </div>
  );
};

/* 0. Hook */
export const Hook: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const dim = 1 - 0.9 * prog(frame, t[3], 20);
  return (
    <Shell dur={dur}>
      <AbsoluteFill style={{ opacity: dim }}>
        <div style={{ position: "absolute", left: 100, top: 330, translate: `${interpolate(frame, [0, dur], [-30, 40])}px 0px` }}>
          <Reveal at={4} y={0} len={30}>
            <Plane width={720} />
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 980, top: 240, width: 840 }}>
          <Reveal at={t[0] + 8} out={t[1] - 8}>
            <div style={{ fontSize: 230, fontWeight: 900, letterSpacing: -8, lineHeight: 1 }}>2020</div>
            <Sub size={58} color={C.text} style={{ marginTop: 20 }}>
              Planes parked. United Airlines needs cash.
            </Sub>
            <Reveal at={mid(t, e, 0, 0.6)} style={{ marginTop: 30 }}>
              <Sub size={54} color={C.yellow}>
                It borrows against the most valuable thing it owns.
              </Sub>
            </Reveal>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 980, top: 290, width: 840 }}>
          <Reveal at={t[1] + 4} out={t[2] - 8}>
            <Strike at={t[1] + 26}>
              <Headline size={92} color={C.mute}>
                Its aircraft
              </Headline>
            </Strike>
            <Reveal at={mid(t, e, 1, 0.3)} style={{ marginTop: 24 }}>
              <Strike at={mid(t, e, 1, 0.3) + 22}>
                <Headline size={92} color={C.mute}>
                  Its airport gates
                </Headline>
              </Strike>
            </Reveal>
            <Reveal at={mid(t, e, 1, 0.62)} style={{ marginTop: 24 }}>
              <Headline size={100} color={C.yellow}>
                Its frequent flyer program
              </Headline>
            </Reveal>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 980, top: 260, width: 840 }}>
          <Reveal at={t[2] + 4}>
            <HBar at={t[2] + 10} label="The frequent flyer program" value="≈ $22B" width={520} color={C.yellow} />
            <HBar at={mid(t, e, 2, 0.5)} label="The whole airline (stock market value)" value="about half" width={260} color={C.mute} />
            <Sub size={32}>Appraisal for United's 2020 loan; approximate</Sub>
          </Reveal>
        </div>
      </AbsoluteFill>
      <Phase at={t[3] + 10}>
        <Headline size={130}>
          So what, exactly, <span style={{ color: C.yellow }}>is</span> an airline?
        </Headline>
      </Phase>
    </Shell>
  );
};

/* 1. Origin */
const Year: React.FC<{ year: string; children: React.ReactNode }> = ({ year, children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 80, textAlign: "left" }}>
    <div style={{ fontSize: 260, fontWeight: 900, letterSpacing: -10, color: C.yellow, lineHeight: 1 }}>{year}</div>
    <div style={{ width: 860 }}>{children}</div>
  </div>
);

export const Origin: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="Where it started">
    <Phase at={mid(t, e, 0, 0.22)} out={t[1] - 8}>
      <Year year="1981">
        <Headline size={72}>American Airlines launches AAdvantage</Headline>
        <Sub style={{ marginTop: 18 }}>The first modern frequent flyer program</Sub>
        <Reveal at={mid(t, e, 0, 0.8)} style={{ marginTop: 30 }}>
          <Sub color={C.text}>United follows within days.</Sub>
        </Reveal>
      </Year>
    </Phase>
    <Phase at={t[1] + 6} out={t[2] - 8}>
      <Year year="1978">
        <Headline size={72}>The US deregulates air travel</Headline>
        <Reveal at={mid(t, e, 1, 0.6)} style={{ marginTop: 24 }}>
          <Sub color={C.text}>Airlines compete on price. Fares fall.</Sub>
        </Reveal>
      </Year>
    </Phase>
    <Phase at={t[2] + 6} out={t[3] - 8}>
      <Sub size={54}>A way to stop customers shopping around</Sub>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 26, marginTop: 60 }}>
        <Reveal at={mid(t, e, 2, 0.4)}>
          <Pill style={{ width: 460, fontSize: 54 }}>Fly with us often</Pill>
        </Reveal>
        <Reveal at={mid(t, e, 2, 0.55)} y={0}>
          <Arrow />
        </Reveal>
        <Reveal at={mid(t, e, 2, 0.6)}>
          <Pill style={{ width: 460, fontSize: 54 }}>Earn miles</Pill>
        </Reveal>
        <Reveal at={mid(t, e, 2, 0.75)} y={0}>
          <Arrow />
        </Reveal>
        <Reveal at={mid(t, e, 2, 0.8)}>
          <Pill color={C.green} style={{ width: 460, fontSize: 54, color: C.green }}>
            Free flight
          </Pill>
        </Reveal>
      </div>
    </Phase>
    <Phase at={t[3] + 6}>
      <Sub size={54}>What a mile cost the airline at first:</Sub>
      <Headline size={96} style={{ marginTop: 24 }}>
        A seat that would have flown empty
      </Headline>
      <Reveal at={mid(t, e, 3, 0.62)} style={{ marginTop: 70 }}>
        <Headline size={84} color={C.yellow}>
          Then other companies wanted miles too.
        </Headline>
      </Reveal>
    </Phase>
  </Shell>
);

/* 2. The sale */
const Node: React.FC<{ x: number; y: number; label: string; icon: React.ReactNode; hot?: number }> = ({
  x,
  y,
  label,
  icon,
  hot = 0,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 380,
      height: 210,
      background: C.panel,
      border: `4px solid ${interpolateColors(hot, [0, 1], [C.line, C.yellow])}`,
      borderRadius: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 30,
      fontSize: 60,
      fontWeight: 800,
    }}
  >
    {icon}
    {label}
  </div>
);

const Link: React.FC<{ d: string; at: number; label: string; lx: number; ly: number; hot?: number; len: number }> = ({
  d,
  at,
  label,
  lx,
  ly,
  hot = 0,
  len,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 26);
  const color = interpolateColors(hot, [0, 1], [C.green, C.yellow]);
  return (
    <>
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d={d} fill="none" stroke={color} strokeWidth={8 + 6 * hot} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} markerEnd={p > 0.95 ? "url(#head)" : undefined} />
        <defs>
          <marker id="head" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill={color} />
          </marker>
        </defs>
      </svg>
      <div style={{ position: "absolute", left: lx, top: ly, width: 360, textAlign: "center", fontSize: 38, fontWeight: 700, color, opacity: p }}>{label}</div>
    </>
  );
};

export const TheSale: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  // "Follow the money": highlight each link in turn during beat 3
  const span = e[3] - t[3];
  const hot = (i: number) => {
    const a = t[3] + span * (0.18 + i * 0.2);
    return interpolate(frame, [a, a + 8, a + span * 0.2, a + span * 0.2 + 8], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  };
  return (
    <Shell dur={dur} kicker="The deal at the heart of the airline">
      <Reveal at={t[2] + 6} style={{ position: "absolute", left: 0, top: 0 }}>
        <Node x={130} y={230} label="Store" icon={<StoreIcon width={110} />} />
      </Reveal>
      <Reveal at={t[0] + 20} style={{ position: "absolute", left: 0, top: 0 }}>
        <Node x={770} y={230} label="Bank" icon={<BankIcon width={110} />} hot={Math.max(hot(0), hot(1))} />
      </Reveal>
      <Reveal at={t[1] + 4} style={{ position: "absolute", left: 0, top: 0 }}>
        <Node x={1410} y={230} label="Airline" icon={<Plane width={130} />} hot={Math.max(hot(1), hot(2))} />
      </Reveal>
      <Reveal at={mid(t, e, 0, 0.5)} style={{ position: "absolute", left: 0, top: 0 }}>
        <Node x={1410} y={690} label="You" icon={<PersonIcon width={70} />} hot={hot(2)} />
      </Reveal>
      <Link d="M520 335 H750" len={230} at={mid(t, e, 2, 0.45)} label="fee on every swipe" lx={455} ly={170} hot={hot(0)} />
      <Link d="M1160 335 H1390" len={230} at={t[1] + 20} label="cash for miles" lx={1095} ly={170} hot={hot(1)} />
      <Link d="M1600 450 V670" len={220} at={mid(t, e, 1, 0.55)} label="miles" lx={1590} ly={535} hot={hot(2)} />
      <div style={{ position: "absolute", left: 130, top: 600, width: 1160 }}>
        <Reveal at={t[0] + 30} out={t[1] - 6}>
          <Headline size={72}>A bank wants you to use its card, not someone else's.</Headline>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 130, top: 600, width: 1160 }}>
        <Reveal at={t[1] + 30} out={t[2] - 6}>
          <Headline size={72}>
            So it buys miles in bulk, and gives them to you <span style={{ color: C.green }}>every time you spend.</span>
          </Headline>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 130, top: 600, width: 1160 }}>
        <Reveal at={t[2] + 30} out={t[3] - 6}>
          <Headline size={72}>You pay nothing extra. The store's swipe fee funds your miles.</Headline>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 130, top: 600, width: 1160 }}>
        <Reveal at={t[3] + 10} out={t[4] - 6}>
          <Sub size={54}>Follow the money</Sub>
          <Reveal at={mid(t, e, 3, 0.7)} style={{ marginTop: 20 }}>
            <Headline size={80}>
              The airline pays you in a currency <span style={{ color: C.yellow }}>it prints itself.</span>
            </Headline>
          </Reveal>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 130, top: 590, width: 1160 }}>
        <Reveal at={t[4] + 6} out={t[5] - 6}>
          <Sub size={50}>Others buy miles the same way:</Sub>
          <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
            {["Hotels", "Car rental", "Shopping sites"].map((s, i) => (
              <Reveal key={s} at={t[4] + 16 + i * 14}>
                <Pill style={{ fontSize: 46, padding: "22px 36px" }}>{s}</Pill>
              </Reveal>
            ))}
          </div>
          <Reveal at={mid(t, e, 4, 0.6)} style={{ marginTop: 34 }}>
            <Headline size={66}>But banks are by far the biggest customers.</Headline>
          </Reveal>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 130, top: 600, width: 1160 }}>
        <Reveal at={t[5] + 6}>
          <Headline size={76}>
            The airline is paid when miles are sold, <span style={{ color: C.yellow }}>often years before anyone flies on them.</span>
          </Headline>
        </Reveal>
      </div>
    </Shell>
  );
};

/* 3. Why banks pay */
export const WhyBanks: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="Why a bank pays so much">
    <Reveal at={t[0] + 6} style={{ position: "absolute", left: 130, top: 330, rotate: "-6deg" }}>
      <CreditCard width={600} />
    </Reveal>
    <div style={{ position: "absolute", left: 880, top: 250, width: 920 }}>
      <Reveal at={mid(t, e, 0, 0.2)} out={t[1] - 8}>
        <Headline size={76}>Airline cardholders are some of a bank's most valuable customers</Headline>
        <Reveal at={mid(t, e, 0, 0.5)} style={{ marginTop: 44 }}>
          <Check>They tend to spend more</Check>
        </Reveal>
        <Reveal at={mid(t, e, 0, 0.64)} style={{ marginTop: 22 }}>
          <Check>They stay for years</Check>
        </Reveal>
        <Reveal at={mid(t, e, 0, 0.8)} style={{ marginTop: 30 }}>
          <Sub size={48}>Their miles are locked into one airline.</Sub>
        </Reveal>
      </Reveal>
    </div>
    <div style={{ position: "absolute", left: 880, top: 270, width: 920 }}>
      <Reveal at={t[1] + 6} out={t[2] - 8}>
        <Pill style={{ textAlign: "left" }}>
          <Sub size={42}>A cash-back card</Sub>
          <div style={{ fontSize: 64, fontWeight: 800 }}>Replaced in an afternoon</div>
        </Pill>
        <Reveal at={mid(t, e, 1, 0.5)} style={{ marginTop: 34 }}>
          <Pill color={C.yellow} style={{ textAlign: "left" }}>
            <Sub size={42}>A mileage balance</Sub>
            <div style={{ fontSize: 64, fontWeight: 800, color: C.yellow }}>A reason to stay</div>
          </Pill>
        </Reveal>
      </Reveal>
    </div>
    <div style={{ position: "absolute", left: 880, top: 330, width: 920 }}>
      <Reveal at={t[2] + 6}>
        <Headline size={84}>
          And the airline does the bank's marketing, <span style={{ color: C.yellow }}>to millions of travelers a year.</span>
        </Headline>
      </Reveal>
    </div>
  </Shell>
);

/* 4. Scale */
export const Scale: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const grow = prog(frame, t[1] + 10, 50);
  return (
    <Shell dur={dur} kicker="The sums" source="Sources: Delta Air Lines; On Point Loyalty estimates (2026)">
      <Phase at={mid(t, e, 0, 0.3)} out={t[2] - 8} style={{ top: -60 }}>
        <Sub size={54}>American Express paid Delta about</Sub>
        <Count
          at={mid(t, e, 0, 0.32)}
          len={50}
          to={7}
          format={(n) => `$${n.toFixed(n >= 7 ? 0 : 1)} billion`}
          style={{ fontSize: 200, fontWeight: 900, color: C.green, letterSpacing: -6 }}
        />
        <Sub size={54}>in 2024</Sub>
        <Reveal at={t[1] + 6} style={{ marginTop: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 30, justifyContent: "center" }}>
            <div style={{ width: 1000, height: 70, borderRadius: 14, background: C.line, overflow: "hidden" }}>
              <div style={{ width: `${70 + 30 * grow}%`, height: "100%", background: C.green }} />
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: C.yellow }}>$10B</div>
          </div>
          <Sub size={46} style={{ marginTop: 18 }}>
            Delta's stated goal: ten billion dollars a year
          </Sub>
        </Reveal>
      </Phase>
      <Phase at={t[2] + 6} out={t[3] - 8}>
        <Headline size={96}>Cash that arrives either way</Headline>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 60, width: 1300 }}>
          {["Planes full", "Planes empty", "Fuel cheap", "Fuel expensive"].map((s, i) => (
            <Reveal key={s} at={mid(t, e, 2, 0.15 + i * 0.17)}>
              <Pill style={{ textAlign: "left" }}>
                <Check size={60}>{s}</Check>
              </Pill>
            </Reveal>
          ))}
        </div>
      </Phase>
      <div style={{ position: "absolute", left: 120, right: 120, top: 190 }}>
        <Reveal at={t[3] + 6}>
          <Headline size={72} style={{ marginBottom: 44 }}>
            What analysts think the programs are worth
          </Headline>
          <HBar at={mid(t, e, 3, 0.1)} label="Delta SkyMiles" value="about $30B" width={1150} color={C.yellow} />
          <HBar at={mid(t, e, 3, 0.3)} label="American AAdvantage" value="about $25B" width={960} color={C.blue} />
          <HBar at={mid(t, e, 3, 0.4)} label="United MileagePlus" value="about $25B" width={960} color={C.blue} />
        </Reveal>
      </div>
    </Shell>
  );
};

/* 5. Flying */
export const Flying: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="Compare that with the flying">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Headline size={84}>To sell you one seat, an airline pays for:</Headline>
      <div style={{ marginTop: 60 }}>
        <Chips items={["Aircraft", "Fuel", "Crews", "Gates"]} at={mid(t, e, 0, 0.45)} step={16} color={C.red} />
      </div>
    </Phase>
    <Phase at={t[1] + 6} out={t[2] - 8}>
      <Sub size={54}>And it is exposed to:</Sub>
      <div style={{ marginTop: 34 }}>
        <Chips items={["Weather", "Strikes", "Oil prices", "Recessions"]} at={t[1] + 12} step={14} />
      </div>
      <Reveal at={mid(t, e, 1, 0.42)} style={{ marginTop: 70 }}>
        <Headline size={84}>
          Good year: <span style={{ color: C.green }}>a few cents</span> of every ticket dollar
        </Headline>
      </Reveal>
      <Reveal at={mid(t, e, 1, 0.8)} style={{ marginTop: 20 }}>
        <Headline size={84}>
          Bad year: <span style={{ color: C.red }}>billions lost</span>
        </Headline>
      </Reveal>
    </Phase>
    <Phase at={t[2] + 6}>
      <Sub size={54}>Since deregulation</Sub>
      <Headline size={100} style={{ marginTop: 24 }}>
        Most large US carriers have been through <span style={{ color: C.red }}>bankruptcy</span> at least once
      </Headline>
    </Phase>
  </Shell>
);

/* 6. Keystroke */
export const Keystroke: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="Selling miles">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Sub size={54}>Almost none of those costs</Sub>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30, marginTop: 50 }}>
        <Reveal at={mid(t, e, 0, 0.35)}>
          <Pill style={{ width: 620, fontSize: 58 }}>Create a mile with a keystroke</Pill>
        </Reveal>
        <Reveal at={mid(t, e, 0, 0.6)} y={0}>
          <Arrow size={80} />
        </Reveal>
        <Reveal at={mid(t, e, 0, 0.65)}>
          <Pill color={C.green} style={{ width: 620, fontSize: 58, color: C.green }}>
            Sell it for real money, today
          </Pill>
        </Reveal>
      </div>
    </Phase>
    <Phase at={t[1] + 6}>
      <Headline size={100}>
        The cost arrives later. <span style={{ color: C.mute }}>If you redeem.</span>
      </Headline>
      <Reveal at={mid(t, e, 1, 0.5)} style={{ marginTop: 50 }}>
        <Headline size={76} color={C.yellow}>
          By then, the airline has decided what the mile is worth.
        </Headline>
      </Reveal>
    </Phase>
  </Shell>
);

/* 7. Currency */
export const Currency: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const steps = ["Print the money", "Sell it for dollars", "Decide later what it buys"];
  return (
    <Shell dur={dur} kicker="A mile is not money">
      <Reveal at={t[0] + 6} style={{ position: "absolute", left: 150, top: 330, rotate: `${Math.sin(frame / 40) * 4}deg` }}>
        <Coin width={440} />
      </Reveal>
      <div style={{ position: "absolute", left: 760, top: 270, width: 1040 }}>
        <Reveal at={mid(t, e, 0, 0.35)} out={t[1] - 8}>
          <Headline size={92}>A currency with one central bank</Headline>
          <Reveal at={mid(t, e, 0, 0.7)} style={{ marginTop: 34 }}>
            <Headline size={110} color={C.yellow}>
              The airline.
            </Headline>
          </Reveal>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 760, top: 230, width: 1040 }}>
        <Reveal at={t[1] + 6} out={t[2] - 8}>
          <Sub size={50}>Imagine a central bank that could:</Sub>
          {steps.map((s, i) => (
            <Reveal key={s} at={mid(t, e, 1, 0.2 + i * 0.17)} style={{ marginTop: 26 }}>
              <Pill color={i === 2 ? C.yellow : C.line} style={{ textAlign: "left", fontSize: 58, color: i === 2 ? C.yellow : C.text }}>
                {i + 1}. {s}
              </Pill>
            </Reveal>
          ))}
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 760, top: 250, width: 1040 }}>
        <Reveal at={t[2] + 6}>
          <Sub size={50}>The airline decides:</Sub>
          <Reveal at={t[2] + 14} style={{ marginTop: 30 }}>
            <Check>How many miles exist</Check>
          </Reveal>
          <Reveal at={mid(t, e, 2, 0.3)} style={{ marginTop: 26 }}>
            <Check>What a flight costs in miles</Check>
          </Reveal>
          <Reveal at={mid(t, e, 2, 0.62)} style={{ marginTop: 44 }}>
            <Headline size={76} color={C.yellow}>
              And it can change both whenever it likes.
            </Headline>
          </Reveal>
        </Reveal>
      </div>
    </Shell>
  );
};

/* 8. Inflation */
const PRICES = [25000, 32500, 41000, 28500, 57500, 36000, 62000, 44500];
export const Inflation: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const dynAt = mid(t, e, 0, 0.5);
  const dynamic = frame >= dynAt;
  const price = dynamic ? PRICES[Math.floor((frame - dynAt) / 14) % PRICES.length] : 25000;
  const draw = prog(frame, t[1] + 14, 70);
  const W = 1100;
  const pts = Array.from({ length: 12 }).map((_, i) => [60 + (i / 11) * (W - 120), 70 + 300 * (1 - Math.exp(-i / 4.5)) + (i % 2) * 14]);
  const shown = pts.filter((_, i) => i / 11 <= draw);
  return (
    <Shell dur={dur} kicker="Quiet inflation">
      <Phase at={t[0] + 6} out={t[1] - 8}>
        <Sub size={54}>{dynamic ? "Now: the price moves with demand" : "Then: a fixed chart"}</Sub>
        <div
          style={{
            marginTop: 40,
            background: C.panel,
            border: `4px solid ${dynamic ? C.red : C.line}`,
            borderRadius: 36,
            padding: "50px 90px",
            display: "inline-block",
          }}
        >
          <Sub size={48}>One round trip</Sub>
          <div style={{ fontSize: 170, fontWeight: 900, fontVariantNumeric: "tabular-nums", color: dynamic ? C.red : C.text, lineHeight: 1.1 }}>
            {price.toLocaleString("en-US")}
          </div>
          <Sub size={48}>miles</Sub>
        </div>
        <Sub size={34} style={{ marginTop: 30 }}>
          Illustrative numbers
        </Sub>
      </Phase>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 120, top: 220, width: 1100 }}>
          <Reveal at={t[1] + 6} out={t[2] - 8}>
            <Headline size={64}>What the same miles buy, over time</Headline>
            <svg width={W} height={460} style={{ marginTop: 20 }}>
              <line x1="60" y1="420" x2={W - 40} y2="420" stroke={C.line} strokeWidth="4" />
              <line x1="60" y1="40" x2="60" y2="420" stroke={C.line} strokeWidth="4" />
              <polyline points={shown.map((p) => p.join(",")).join(" ")} fill="none" stroke={C.red} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Sub size={34}>Illustrative</Sub>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 1300, top: 300, width: 520 }}>
          <Reveal at={mid(t, e, 1, 0.4)} out={t[2] - 8}>
            <Sub size={50}>Your balance</Sub>
            <Headline size={84}>Same number.</Headline>
            <Reveal at={mid(t, e, 1, 0.75)} style={{ marginTop: 30 }}>
              <Headline size={96} color={C.red}>
                Buys less.
              </Headline>
            </Reveal>
          </Reveal>
        </div>
      </AbsoluteFill>
      <Phase at={t[2] + 6}>
        <Sub size={54}>And some miles are never spent at all</Sub>
        <div style={{ display: "flex", justifyContent: "center", gap: 30, marginTop: 50 }}>
          <Reveal at={mid(t, e, 2, 0.6)}>
            <Pill color={C.green} style={{ width: 560, fontSize: 60, color: C.green }}>
              Sold for cash
            </Pill>
          </Reveal>
          <Reveal at={mid(t, e, 2, 0.8)}>
            <Pill color={C.green} style={{ width: 560, fontSize: 60, color: C.green }}>
              Cost the airline nothing
            </Pill>
          </Reveal>
        </div>
      </Phase>
    </Shell>
  );
};

/* 9. Spend */
const Ticket: React.FC<{ fare: string; miles: React.ReactNode; hot?: boolean }> = ({ fare, miles, hot }) => (
  <div
    style={{
      width: 620,
      background: C.panel,
      border: `4px solid ${hot ? C.yellow : C.line}`,
      borderRadius: 32,
      padding: "40px 50px",
      textAlign: "left",
    }}
  >
    <Sub size={40}>Coast to coast, same seat</Sub>
    <div style={{ fontSize: 110, fontWeight: 900 }}>{fare}</div>
    <div style={{ borderTop: `4px dashed ${C.line}`, margin: "20px 0" }} />
    <Sub size={40}>Miles earned</Sub>
    <div style={{ fontSize: 96, fontWeight: 900, color: hot ? C.yellow : C.green, fontVariantNumeric: "tabular-nums" }}>{miles}</div>
  </div>
);

export const Spend: React.FC<SceneProps> = ({ t, e, dur }) => {
  const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
  return (
    <Shell dur={dur} kicker="From miles flown to dollars spent">
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Reveal at={t[0] + 6} out={t[2] - 8}>
          <div style={{ display: "flex", gap: 60 }}>
            <Ticket fare="$250" miles={<Count at={t[1] + 20} len={40} from={2500} to={1250} format={fmt} />} />
            <Ticket fare="$900" hot miles={<Count at={t[1] + 20} len={40} from={2500} to={4500} format={fmt} />} />
          </div>
          <div style={{ textAlign: "center", marginTop: 40, height: 70 }}>
            <Reveal at={mid(t, e, 0, 0.45)} out={t[1] + 10}>
              <Sub size={52} color={C.text}>
                Old rule: miles for distance
              </Sub>
            </Reveal>
            <Reveal at={t[1] + 24} style={{ marginTop: -70 }}>
              <Sub size={52} color={C.yellow}>
                From 2015 at Delta: miles for dollars (illustrative, 5 per dollar)
              </Sub>
            </Reveal>
          </div>
        </Reveal>
      </AbsoluteFill>
      <Phase at={t[2] + 6}>
        <Sub size={56}>The airline's best customer is not who flies the most.</Sub>
        <Reveal at={mid(t, e, 2, 0.62)} style={{ marginTop: 30 }}>
          <Headline size={120}>
            It is who <span style={{ color: C.yellow }}>spends</span> the most.
          </Headline>
        </Reveal>
        <Reveal at={t[3] + 6} style={{ marginTop: 60, display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
          <CreditCard width={200} />
          <Sub size={56} color={C.text}>
            Mostly on the ground, with a card.
          </Sub>
        </Reveal>
      </Phase>
    </Shell>
  );
};

/* 10. Status */
export const Status: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="Pushing the logic further">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Year year="2023">
        <Headline size={72}>Delta: elite status will depend only on spending</Headline>
        <Reveal at={mid(t, e, 0, 0.7)} style={{ marginTop: 24 }}>
          <Sub color={C.text}>And the amounts required go up.</Sub>
        </Reveal>
      </Year>
    </Phase>
    <Phase at={t[1] + 6} out={t[2] - 8}>
      <Headline size={120} color={C.red}>
        Frequent flyers were furious.
      </Headline>
      <Reveal at={mid(t, e, 1, 0.35)} style={{ marginTop: 50 }}>
        <Sub size={58} color={C.text}>
          Within weeks, Delta's chief executive said the airline had gone too far, and softened the changes.
        </Sub>
      </Reveal>
    </Phase>
    <Phase at={t[2] + 6}>
      <Sub size={54}>But the direction did not reverse</Sub>
      <div style={{ marginTop: 40 }}>
        <Chips items={["Status", "Upgrades", "Lounge access"]} at={mid(t, e, 2, 0.28)} step={16} />
      </div>
      <Reveal at={mid(t, e, 2, 0.7)} style={{ marginTop: 60 }}>
        <Headline size={88}>
          Earned with a <span style={{ color: C.yellow }}>card</span>, not a boarding pass
        </Headline>
      </Reveal>
    </Phase>
  </Shell>
);

/* 11. Pitch */
export const Pitch: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="Once you see it">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Headline size={84}>You notice it everywhere</Headline>
      <div style={{ display: "flex", gap: 40, marginTop: 60, justifyContent: "center" }}>
        <Reveal at={mid(t, e, 0, 0.3)}>
          <Pill style={{ width: 720, textAlign: "left" }}>
            <Sub size={42}>At check-in</Sub>
            <div style={{ fontSize: 60, fontWeight: 800 }}>The card offer</div>
          </Pill>
        </Reveal>
        <Reveal at={mid(t, e, 0, 0.5)}>
          <Pill style={{ width: 720, textAlign: "left" }}>
            <Sub size={42}>Before landing</Sub>
            <div style={{ fontSize: 60, fontWeight: 800 }}>The sign-up bonus announcement</div>
          </Pill>
        </Reveal>
      </div>
    </Phase>
    <Phase at={t[1] + 6} out={t[2] - 8}>
      <Sub size={54}>The flight is doing a second job</Sub>
      <Headline size={104} style={{ marginTop: 30 }}>
        A sales floor for a <span style={{ color: C.yellow }}>financial product</span>
      </Headline>
      <Reveal at={mid(t, e, 1, 0.75)} style={{ marginTop: 34 }}>
        <Sub size={54}>With a captive audience.</Sub>
      </Reveal>
    </Phase>
    <Phase at={t[2] + 6}>
      <div style={{ display: "flex", gap: 50, justifyContent: "center" }}>
        <Reveal at={mid(t, e, 2, 0.2)}>
          <Pill color={C.red} style={{ width: 640 }}>
            <Sub size={46}>Economy seats</Sub>
            <div style={{ fontSize: 96, fontWeight: 900, color: C.red }}>↓ Tighter</div>
          </Pill>
        </Reveal>
        <Reveal at={mid(t, e, 2, 0.42)}>
          <Pill color={C.green} style={{ width: 640 }}>
            <Sub size={46}>Card perks</Sub>
            <div style={{ fontSize: 96, fontWeight: 900, color: C.green }}>↑ Richer</div>
          </Pill>
        </Reveal>
      </div>
      <Reveal at={mid(t, e, 2, 0.72)} style={{ marginTop: 60 }}>
        <Headline size={80}>The airline invests where the money is.</Headline>
      </Reveal>
    </Phase>
  </Shell>
);

/* 12. Collateral */
const VBar: React.FC<{ at: number; h: number; value: string; label: string; color: string }> = ({ at, h, value, label, color }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 34);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 360, opacity: prog(frame, at, 10) }}>
      <div style={{ fontSize: 92, fontWeight: 900, color, opacity: p }}>{value}</div>
      <div style={{ width: 260, height: h * p, background: color, borderRadius: "18px 18px 0 0", marginTop: 12 }} />
      <div style={{ fontSize: 50, fontWeight: 700, marginTop: 20 }}>{label}</div>
    </div>
  );
};

export const Collateral: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const shift = prog(frame, t[2], 24);
  return (
    <Shell dur={dur} kicker="Back to 2020" source="Money raised against loyalty programs, 2020 to 2021. Approximate.">
      <Phase at={t[0] + 6} out={t[1] - 8}>
        <Sub size={54}>Travel collapsed. The three biggest US carriers did the same thing.</Sub>
        <Reveal at={mid(t, e, 0, 0.7)} style={{ marginTop: 30 }}>
          <Headline size={100}>
            They pledged their <span style={{ color: C.yellow }}>loyalty programs</span> to lenders.
          </Headline>
        </Reveal>
      </Phase>
      <AbsoluteFill
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 30,
          paddingBottom: 150,
          translate: `${-300 * shift}px 0px`,
        }}
      >
        <VBar at={t[1] + 6} h={306} value="$6.8B" label="United" color={C.blue} />
        <VBar at={mid(t, e, 1, 0.45)} h={405} value="$9B" label="Delta" color={C.blue} />
        <VBar at={mid(t, e, 1, 0.75)} h={450} value="$10B" label="American" color={C.yellow} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 1260, top: 300, width: 560 }}>
        <Reveal at={t[2] + 14} out={t[3] - 8}>
          <Sub size={50}>The lenders were not betting on planes.</Sub>
          <Headline size={76} style={{ marginTop: 24 }}>
            They bet people would <span style={{ color: C.yellow }}>keep swiping.</span>
          </Headline>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 1260, top: 300, width: 560 }}>
        <Reveal at={t[3] + 6}>
          <Headline size={110} color={C.green}>
            They were right.
          </Headline>
          <Sub size={50} color={C.text} style={{ marginTop: 24 }}>
            Card spending held up far better than ticket sales.
          </Sub>
        </Reveal>
      </div>
    </Shell>
  );
};

/* 13. Catch */
const Item: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
  <div
    style={{
      display: "flex",
      gap: 36,
      alignItems: "center",
      background: C.panel,
      border: `3px solid ${C.line}`,
      borderRadius: 28,
      padding: "22px 40px",
    }}
  >
    <div style={{ fontSize: 76, fontWeight: 900, color: C.red, lineHeight: 1, width: 70 }}>{n}</div>
    <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.15 }}>{children}</div>
  </div>
);

export const Catch: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="What this means for you">
    <div style={{ position: "absolute", left: 120, right: 120, top: 165, display: "flex", flexDirection: "column", gap: 22 }}>
      <Reveal at={t[0] + 6}>
        <Item n={1}>Miles are not a scam. Used well, they buy real flights.</Item>
      </Reveal>
      <Reveal at={t[1] + 6}>
        <Item n={2}>The airline profits when you earn, and saves when you wait.</Item>
      </Reveal>
      <Reveal at={t[2] + 6}>
        <Item n={3}>2024: US regulators opened an inquiry into the four largest programs.</Item>
      </Reveal>
      <Reveal at={t[3] + 6}>
        <Item n={4}>Rewards are not free. Swipe fees are built into everyone's prices.</Item>
      </Reveal>
      <Reveal at={mid(t, e, 4, 0.3)} style={{ marginTop: 10 }}>
        <Headline size={62} color={C.yellow} style={{ textAlign: "center" }}>
          Miles are not savings. Earn them free. Spend them soon.
        </Headline>
      </Reveal>
    </div>
  </Shell>
);

/* 14. Payoff */
export const Payoff: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  return (
    <Shell dur={dur}>
      <div style={{ position: "absolute", left: 110, top: 360, translate: `${interpolate(frame, [0, dur], [-20, 40])}px 0px` }}>
        <Plane width={660} />
      </div>
      <div style={{ position: "absolute", left: 900, top: 230, width: 920 }}>
        <Reveal at={t[0] + 8} out={t[1] - 8}>
          <Sub size={56}>So what is an airline?</Sub>
          <Reveal at={mid(t, e, 0, 0.3)} style={{ marginTop: 30 }}>
            <Headline size={92} color={C.mute}>
              Planes, at a thin margin
            </Headline>
          </Reveal>
          <Reveal at={mid(t, e, 0, 0.62)} style={{ marginTop: 26 }}>
            <Headline size={104} color={C.yellow}>
              A currency, at a fat one
            </Headline>
          </Reveal>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 900, top: 250, width: 920 }}>
        <Reveal at={t[1] + 6}>
          <Pill style={{ textAlign: "left", fontSize: 56 }}>The seat gets you to care about the miles.</Pill>
          <Reveal at={mid(t, e, 1, 0.5)} style={{ marginTop: 26 }}>
            <Pill color={C.yellow} style={{ textAlign: "left", fontSize: 56, color: C.yellow }}>
              The miles get the bank to pay.
            </Pill>
          </Reveal>
          <Reveal at={t[2] + 10} style={{ marginTop: 50 }}>
            <Sub size={50} color={C.text}>
              Why a frequent flyer program can be worth more than the fleet.
            </Sub>
          </Reveal>
        </Reveal>
      </div>
    </Shell>
  );
};

/* 15. Outro */
export const Outro: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Shell dur={dur + 1000}>
        <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", gap: 140, paddingTop: 270 }}>
          <Reveal at={t[0] + 6} out={t[1] - 6} style={{ width: 640, textAlign: "center" }}>
            <div style={{ height: 252, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plane width={400} />
            </div>
            <Sub size={54} color={C.text} style={{ marginTop: 30 }}>
              Airlines hide a bank behind a seat.
            </Sub>
          </Reveal>
          <Reveal at={mid(t, e, 0, 0.5)} out={t[1] - 6} style={{ width: 640, textAlign: "center" }}>
            <div style={{ height: 252, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <StoreIcon width={260} />
            </div>
            <Sub size={54} color={C.text} style={{ marginTop: 30 }}>
              Dollar stores hide something stranger.
            </Sub>
          </Reveal>
        </AbsoluteFill>
        <Center style={{ top: -90 }}>
          <Reveal at={t[1] + 6}>
            <div style={{ background: C.panel, border: `4px solid ${C.blue}`, borderRadius: 40, padding: "56px 80px", width: 1400 }}>
              <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 8, color: C.blue }}>NEXT</div>
              <div style={{ display: "flex", alignItems: "center", gap: 50, marginTop: 20 }}>
                <StoreIcon width={200} />
                <Headline size={84} style={{ textAlign: "left" }}>
                  The dark genius of dollar stores
                </Headline>
              </div>
            </div>
          </Reveal>
        </Center>
        <Center style={{ top: 640, bottom: 0, height: 300 }}>
          <Reveal at={t[2] + 6}>
            <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
              <div style={{ background: C.red, borderRadius: 24, padding: "26px 60px", fontSize: 60, fontWeight: 900, letterSpacing: 3 }}>SUBSCRIBE</div>
              <Sub size={54} color={C.text}>
                See where the money really goes.
              </Sub>
            </div>
          </Reveal>
        </Center>
      </Shell>
    </AbsoluteFill>
  );
};
