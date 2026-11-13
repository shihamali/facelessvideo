import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  Arrow,
  C,
  Center,
  Chicken,
  Count,
  Cup,
  Headline,
  HotDog,
  Pill,
  prog,
  Reveal,
  SceneProps,
  Shell,
  Stamp,
  Sub,
} from "./lib";

const mid = (t: number[], e: number[], i: number, f = 0.5) => Math.round(t[i] + (e[i] - t[i]) * f);
const usd = (n: number) => `$${n.toFixed(2)}`;

/* 0. Hook */
export const Hook: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const dim = 1 - 0.88 * prog(frame, t[4], 20);
  const strikeAt = mid(t, e, 2, 0.75);
  return (
    <Shell dur={dur}>
      <AbsoluteFill style={{ opacity: dim }}>
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 300,
            scale: String(interpolate(frame, [0, dur], [1, 1.07])),
          }}
        >
          <Reveal at={4} y={0} len={30}>
            <HotDog width={860} />
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 1090, top: 190, width: 720 }}>
          <Reveal at={mid(t, e, 0, 0.45)}>
            <div style={{ fontSize: 250, fontWeight: 900, letterSpacing: -8, lineHeight: 1 }}>$1.50</div>
          </Reveal>
          <Reveal at={mid(t, e, 0, 0.7)}>
            <div style={{ fontSize: 60, fontWeight: 700, color: C.yellow, marginTop: 10 }}>
              in{" "}
              <Count at={t[1]} len={50} from={1985} to={2026} format={(n) => String(Math.round(n))} />
            </div>
          </Reveal>
          <Reveal at={t[2] + 20} style={{ marginTop: 70 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <Count
                at={t[2] + 25}
                len={60}
                from={1.5}
                to={4.5}
                format={(n) => `≈ ${usd(n)}`}
                style={{ fontSize: 120, fontWeight: 800, color: C.mute }}
              />
              <div
                style={{
                  position: "absolute",
                  left: -10,
                  top: "52%",
                  height: 10,
                  borderRadius: 5,
                  background: C.red,
                  width: `${prog(frame, strikeAt, 14) * 105}%`,
                }}
              />
            </div>
            <Sub size={40} style={{ marginTop: 6 }}>
              if it had kept up with inflation
            </Sub>
          </Reveal>
        </div>
        <Stamp at={mid(t, e, 3, 0.2)} color={C.red} style={{ left: 250, top: 640 }}>
          SOLD AT A LOSS
        </Stamp>
      </AbsoluteFill>
      <Center>
        <Reveal at={t[4] + 10}>
          <Headline size={120}>
            So where does the <span style={{ color: C.yellow }}>profit</span> come from?
          </Headline>
        </Reveal>
      </Center>
    </Shell>
  );
};

/* 1. The threat */
const NameCard: React.FC<{ initials: string; name: string; role: string; color: string }> = ({
  initials,
  name,
  role,
  color,
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 620 }}>
    <div
      style={{
        width: 240,
        height: 240,
        borderRadius: 120,
        background: C.panel,
        border: `8px solid ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 96,
        fontWeight: 800,
        color,
      }}
    >
      {initials}
    </div>
    <div style={{ fontSize: 64, fontWeight: 800, marginTop: 34 }}>{name}</div>
    <Sub size={42} style={{ marginTop: 8 }}>
      {role}
    </Sub>
  </div>
);

export const Threat: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const words = "“If you raise the effing hot dog, I will kill you. Figure it out.”".split(" ");
  const span = e[3] - t[3] - 12;
  const black = prog(frame, t[3] - 14, 14);
  return (
    <Shell dur={dur} kicker="The threat">
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 120 }}>
        <Reveal at={mid(t, e, 0, 0.2)}>
          <NameCard initials="CJ" name="Craig Jelinek" role="Costco executive, later CEO" color={C.blue} />
        </Reveal>
        <Reveal at={t[1] + 10} out={t[2] + 30} style={{ width: 300, textAlign: "center" }}>
          <div style={{ fontSize: 84, fontWeight: 900 }}>$1.50</div>
          <div style={{ fontSize: 120, fontWeight: 900, color: C.red, lineHeight: 1 }}>↑ ?</div>
        </Reveal>
        <Reveal at={mid(t, e, 0, 0.62)}>
          <NameCard initials="JS" name="Jim Sinegal" role="Costco co-founder" color={C.yellow} />
        </Reveal>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "#05080F", opacity: black }}>
        <Center style={{ padding: "0 180px" }}>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 1.15, letterSpacing: -2 }}>
            {words.map((w, i) => (
              <span
                key={i}
                style={{
                  opacity: prog(frame, t[3] + (i / words.length) * span, 6),
                  color: i >= 10 ? C.yellow : C.text,
                }}
              >
                {w}{" "}
              </span>
            ))}
          </div>
          <Reveal at={e[3] - 8} style={{ marginTop: 50 }}>
            <Sub size={42}>Jim Sinegal, as later recounted by Craig Jelinek</Sub>
          </Reveal>
        </Center>
      </AbsoluteFill>
    </Shell>
  );
};

/* 2. They figured it out */
const FixCard: React.FC<{
  icon: React.ReactNode;
  name: string;
  fact: string;
  action: string;
  actionAt: number;
}> = ({ icon, name, fact, action, actionAt }) => (
  <div
    style={{
      width: 520,
      height: 690,
      background: C.panel,
      border: `3px solid ${C.line}`,
      borderRadius: 36,
      padding: 44,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <div style={{ height: 200, display: "flex", alignItems: "center" }}>{icon}</div>
    <div style={{ fontSize: 56, fontWeight: 800, marginTop: 20 }}>{name}</div>
    <Sub size={40} style={{ marginTop: 8 }}>
      {fact}
    </Sub>
    <Reveal at={actionAt} style={{ marginTop: 34 }}>
      <div style={{ fontSize: 44, fontWeight: 700, color: C.green, lineHeight: 1.2 }}>{action}</div>
    </Reveal>
  </div>
);

export const Figured: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const dim = 1 - 0.9 * prog(frame, mid(t, e, 4, 0.45), 20);
  return (
    <Shell dur={dur} kicker="“Figure it out”">
      <AbsoluteFill
        style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 50, top: 40, opacity: dim }}
      >
        <Reveal at={t[0] + 6}>
          <FixCard
            icon={<HotDog width={360} />}
            name="The hot dog"
            fact="$1.50 since 1985"
            action="Started making its own, in its own plants"
            actionAt={mid(t, e, 0, 0.45)}
          />
        </Reveal>
        <Reveal at={t[2] + 6}>
          <FixCard
            icon={<Cup width={120} />}
            name="The soda"
            fact="Included in the combo"
            action="Swapped its fountain supplier"
            actionAt={mid(t, e, 2, 0.55)}
          />
        </Reveal>
        <Reveal at={t[3] + 6}>
          <FixCard
            icon={<Chicken width={240} />}
            name="Rotisserie chicken"
            fact="$4.99 since 2009"
            action="Built a $450 million poultry plant in Nebraska"
            actionAt={mid(t, e, 3, 0.5)}
          />
        </Reveal>
      </AbsoluteFill>
      <Reveal at={t[1]} out={t[2] - 6} style={{ position: "absolute", left: 0, right: 0, bottom: 70, textAlign: "center" }}>
        <Sub size={46} color={C.text}>
          Owning the factory was cheaper than raising the price.
        </Sub>
      </Reveal>
      <Center>
        <Reveal at={mid(t, e, 4, 0.5)}>
          <Headline>
            The snack is doing a <span style={{ color: C.yellow }}>different job.</span>
          </Headline>
        </Reveal>
      </Center>
    </Shell>
  );
};

/* 3. Loss leader */
export const LossLeader: React.FC<SceneProps> = ({ t, e, dur }) => {
  const steps = ["Sell one thing at a loss", "Get people through the door", "Make it back on everything else"];
  return (
    <Shell dur={dur} kicker="Retail term">
      <div style={{ position: "absolute", left: 120, right: 120, top: 280 }}>
        <Reveal at={mid(t, e, 0, 0.18)}>
          <Headline size={170}>Loss leader</Headline>
        </Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 90 }}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <Reveal at={mid(t, e, 0, 0.36 + i * 0.2)} style={{ flex: 1 }}>
                <Pill color={i === 0 ? C.red : i === 2 ? C.green : C.line} style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {s}
                </Pill>
              </Reveal>
              {i < 2 ? (
                <Reveal at={mid(t, e, 0, 0.46 + i * 0.2)} y={0}>
                  <Arrow />
                </Reveal>
              ) : null}
            </React.Fragment>
          ))}
        </div>
        <Reveal at={t[1]} style={{ marginTop: 90 }}>
          <Sub size={54}>
            The supermarket classics: <span style={{ color: C.text, fontWeight: 700 }}>milk and eggs</span>
          </Sub>
        </Reveal>
      </div>
    </Shell>
  );
};

/* 4. Floor plan */
const PATH: [number, number][] = [
  [90, 610],
  [90, 110],
  [250, 110],
  [250, 470],
  [410, 470],
  [410, 110],
  [570, 110],
  [570, 470],
  [730, 470],
  [730, 300],
  [900, 300],
  [900, 492],
];
const segLen = PATH.slice(1).map((p, i) => Math.hypot(p[0] - PATH[i][0], p[1] - PATH[i][1]));
const totalLen = segLen.reduce((a, b) => a + b, 0);
const pointAt = (p: number): [number, number] => {
  let d = p * totalLen;
  for (let i = 0; i < segLen.length; i++) {
    if (d <= segLen[i]) {
      const k = d / segLen[i];
      return [PATH[i][0] + (PATH[i + 1][0] - PATH[i][0]) * k, PATH[i][1] + (PATH[i + 1][1] - PATH[i][1]) * k];
    }
    d -= segLen[i];
  }
  return PATH[PATH.length - 1];
};

export const FloorPlan: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [t[0] + 15, e[0] - 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const [x, y] = pointAt(p);
  const pulse = p >= 1 ? 1 + 0.06 * Math.sin((frame - e[0]) / 6) : 1;
  const label = { fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 30, fill: C.mute } as const;
  return (
    <Shell dur={dur} kicker="Where the hot dog sits">
      <svg width={1040} height={700} viewBox="0 0 1040 700" style={{ position: "absolute", left: 100, top: 210 }}>
        <rect x="20" y="40" width="1000" height="620" rx="24" fill={C.panel} stroke={C.line} strokeWidth="5" />
        {[170, 330, 490, 650].map((ax) => (
          <rect key={ax} x={ax - 28} y="150" width="56" height="280" rx="10" fill={C.line} />
        ))}
        <rect x="690" y="345" width="130" height="60" rx="10" fill={C.line} />
        <text x="755" y="385" textAnchor="middle" {...label} fontSize={24}>
          Checkout
        </text>
        <text x="90" y="695" textAnchor="middle" {...label}>
          Entrance
        </text>
        <g style={{ transformOrigin: "900px 580px", scale: String(pulse) }}>
          <rect x="800" y="520" width="200" height="120" rx="16" fill={p >= 1 ? C.yellow : C.line} />
          <text x="900" y="575" textAnchor="middle" {...label} fill={p >= 1 ? C.bg : C.mute} fontSize={28}>
            Food court
          </text>
          <text x="900" y="612" textAnchor="middle" {...label} fill={p >= 1 ? C.bg : C.mute} fontSize={26}>
            $1.50
          </text>
        </g>
        <text x="900" y="695" textAnchor="middle" {...label}>
          Exit
        </text>
        <polyline
          points={PATH.map((q) => q.join(",")).join(" ")}
          fill="none"
          stroke={C.blue}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLen}
          strokeDashoffset={totalLen * (1 - p)}
          opacity="0.55"
        />
        <circle cx={x} cy={y} r="20" fill={C.blue} stroke={C.text} strokeWidth="5" />
      </svg>
      <div style={{ position: "absolute", left: 1220, top: 250, width: 600 }}>
        <Reveal at={t[0] + 20} out={t[1] - 8}>
          <Headline size={84}>
            The hot dog is at the <span style={{ color: C.yellow }}>exit.</span>
          </Headline>
          <Sub style={{ marginTop: 30 }}>You have already shopped by the time you reach it.</Sub>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 1220, top: 250, width: 600 }}>
        <Reveal at={t[1] + 6} out={t[2] - 8}>
          <Sub>Not there to pull you in.</Sub>
          <Headline size={80} style={{ marginTop: 30 }}>
            There to shape the <span style={{ color: C.yellow }}>last thing you feel.</span>
          </Headline>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 1220, top: 230, width: 600 }}>
        <Reveal at={t[2] + 10} out={t[3] - 8}>
          <Pill style={{ textAlign: "left" }}>
            <Sub size={38}>Your shopping</Sub>
            <div style={{ fontSize: 110, fontWeight: 900 }}>$300.00</div>
          </Pill>
        </Reveal>
        <Reveal at={mid(t, e, 2, 0.55)} out={t[3] - 8} style={{ marginTop: 30 }}>
          <Pill color={C.yellow} style={{ textAlign: "left" }}>
            <Sub size={38}>Lunch on the way out</Sub>
            <div style={{ fontSize: 110, fontWeight: 900, color: C.yellow }}>$1.50</div>
          </Pill>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 1220, top: 300, width: 600 }}>
        <Reveal at={t[3] + 20}>
          <Sub>The feeling you leave with:</Sub>
          <Headline size={88} color={C.green} style={{ marginTop: 26 }}>
            This place is on my side.
          </Headline>
        </Reveal>
      </div>
    </Shell>
  );
};

/* 5. A hundred million */
export const HundredMillion: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const up = prog(frame, t[1], 24);
  return (
    <Shell dur={dur} kicker="That feeling has a number">
      <Center style={{ translate: `0px ${-230 * up}px`, scale: String(1 - 0.45 * up), opacity: 1 - 0.45 * up }}>
        <Reveal at={mid(t, e, 0, 0.38)}>
          <Count
            at={mid(t, e, 0, 0.4)}
            len={60}
            to={100_000_000}
            format={(n) => `${Math.round(n).toLocaleString("en-US")}+`}
            style={{ fontSize: 190, fontWeight: 900, letterSpacing: -6 }}
          />
          <Sub size={58} style={{ marginTop: 10 }}>
            hot dog combos sold every year
          </Sub>
        </Reveal>
      </Center>
      <Center style={{ top: 130 }}>
        <Reveal at={mid(t, e, 1, 0.45)} out={t[2] + 4}>
          <Sub>Each one repeats a single claim:</Sub>
          <Headline size={130} color={C.yellow} style={{ marginTop: 24 }}>
            We will not rip you off.
          </Headline>
        </Reveal>
      </Center>
      <Center style={{ top: 130 }}>
        <Reveal at={t[2] + 16}>
          <Headline size={110}>
            What is Costco <span style={{ color: C.yellow }}>really</span> selling?
          </Headline>
        </Reveal>
      </Center>
    </Shell>
  );
};

/* 6. Markup */
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
    <div style={{ opacity: prog(frame, at, 10), marginBottom: 46 }}>
      <div style={{ fontSize: 44, fontWeight: 600, color: C.mute, marginBottom: 12 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ height: 96, width: Math.max(8, width * p), background: color, borderRadius: 14 }} />
        <div style={{ fontSize: 84, fontWeight: 900, color, opacity: p }}>{value}</div>
      </div>
    </div>
  );
};

export const Markup: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const slices = [
    { w: 88, label: "The goods themselves", color: C.line },
    { w: 10, label: "Staff, rent, shipping", color: C.blue },
    { w: 2, label: "What is left", color: C.green },
  ];
  return (
    <Shell dur={dur} kicker="What most shoppers never see">
      <div style={{ position: "absolute", left: 120, right: 120, top: 190 }}>
        <Reveal at={t[1] - 6} out={t[3] - 8}>
          <Headline size={76} style={{ marginBottom: 50 }}>
            Markup on the products
          </Headline>
          <HBar at={t[1] + 20} label="Typical supermarket" value="25%+" width={1250} color={C.red} />
          <HBar at={mid(t, e, 2, 0.2)} label="Costco, brand names" value="about 14%" width={700} color={C.green} />
          <HBar at={mid(t, e, 2, 0.6)} label="Costco, Kirkland Signature" value="about 15%" width={750} color={C.green} />
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 120, right: 120, top: 330 }}>
        <Reveal at={t[3] + 6} out={t[4] - 6}>
          <Headline size={76}>Where each dollar of sales goes</Headline>
          <div style={{ display: "flex", height: 150, marginTop: 60, borderRadius: 20, overflow: "hidden", width: 1680 * prog(frame, t[3] + 14, 40) }}>
            {slices.map((s) => (
              <div key={s.label} style={{ flex: `0 0 ${(s.w / 100) * 1680}px`, background: s.color }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 70, marginTop: 44 }}>
            {slices.map((s, i) => (
              <Reveal key={s.label} at={t[3] + 40 + i * 28} y={0}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 44, fontWeight: 600 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: s.color }} />
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
          <Sub size={34} style={{ marginTop: 50 }}>
            Approximate proportions, for illustration
          </Sub>
        </Reveal>
      </div>
      <Center>
        <Reveal at={t[0] + 4} out={t[1] - 12}>
          <Headline size={110}>Here is the part most shoppers never see.</Headline>
        </Reveal>
      </Center>
      <Center>
        <Reveal at={t[4] + 4}>
          <Headline size={150}>
            So where is the <span style={{ color: C.yellow }}>profit?</span>
          </Headline>
        </Reveal>
      </Center>
    </Shell>
  );
};
