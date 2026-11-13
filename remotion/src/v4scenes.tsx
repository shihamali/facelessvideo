import React from "react";
import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { Arrow, C, Center, Count, Headline, Person, Pill, prog, Reveal, SceneProps, Shell, Sub } from "./lib";
import { Check, Chips, HBar, Item, Phase, Year } from "./v2scenes";

const mid = (t: number[], e: number[], i: number, f = 0.5) => Math.round(t[i] + (e[i] - t[i]) * f);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ---------- Illustrations ---------- */

const Token: React.FC<{ width: number; label: string }> = ({ width, label }) => (
  <svg width={width} viewBox="0 0 300 300">
    <circle cx="150" cy="150" r="140" fill="#60A5FA" />
    <circle cx="150" cy="150" r="112" fill="none" stroke="#1D4ED8" strokeWidth="8" />
    <text x="150" y="182" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="92" fill="#0B1220">
      {label}
    </text>
  </svg>
);

const Box: React.FC<{ title: string; sub: string; color?: string; fill?: number; fillColor?: string; width?: number }> = ({
  title,
  sub,
  color = C.line,
  fill,
  fillColor = C.green,
  width = 620,
}) => (
  <div style={{ width, background: C.panel, border: `4px solid ${color}`, borderRadius: 32, padding: "36px 44px", textAlign: "left" }}>
    <div style={{ fontSize: 64, fontWeight: 900 }}>{title}</div>
    <Sub size={42} style={{ marginTop: 6 }}>
      {sub}
    </Sub>
    {fill !== undefined ? (
      <div style={{ height: 70, borderRadius: 14, background: C.line, marginTop: 30, overflow: "hidden" }}>
        <div style={{ width: `${fill * 100}%`, height: "100%", background: fillColor }} />
      </div>
    ) : null}
  </div>
);

/* 0. Hook */
export const Hook: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const drop = interpolate(frame, [t[1] + 4, e[1]], [32, 0], clamp);
  const dim = 1 - 0.9 * prog(frame, t[3], 20);
  return (
    <Shell dur={dur}>
      <AbsoluteFill style={{ opacity: dim }}>
        <Center style={{ top: -80 }}>
          <Reveal at={t[0] + 6} out={t[2] - 8}>
            <Sub size={60} color={frame >= t[1] ? C.red : C.yellow}>
              {frame >= t[1] ? `November ${Math.min(11, 2 + Math.round(((32 - drop) / 32) * 9))}, 2022` : "November 2, 2022"}
            </Sub>
            <div style={{ fontSize: 300, fontWeight: 900, letterSpacing: -10, lineHeight: 1.05, color: drop < 1 ? C.red : C.text, fontVariantNumeric: "tabular-nums" }}>
              ${Math.round(drop)}B
            </div>
            <Sub size={56}>{drop < 1 ? "Bankrupt." : "what investors said FTX was worth"}</Sub>
          </Reveal>
        </Center>
        <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 60 }}>
          <Reveal at={t[2] + 6}>
            <Pill color={C.red} style={{ width: 760 }}>
              <div style={{ fontSize: 150, fontWeight: 900, color: C.red }}>≈ $8B</div>
              <Sub size={48}>of customer money missing, prosecutors said</Sub>
            </Pill>
          </Reveal>
          <Reveal at={mid(t, e, 2, 0.5)}>
            <Pill style={{ width: 760 }}>
              <div style={{ fontSize: 150, fontWeight: 900 }}>25 years</div>
              <Sub size={48}>the founder's prison sentence</Sub>
            </Pill>
          </Reveal>
        </AbsoluteFill>
      </AbsoluteFill>
      <Phase at={t[3] + 10}>
        <Sub size={58}>Strip away the crypto, and this is</Sub>
        <Headline size={120} style={{ marginTop: 24 }}>
          one of the <span style={{ color: C.yellow }}>oldest stories</span> in finance.
        </Headline>
      </Phase>
    </Shell>
  );
};

/* 1. The rise */
export const Rise: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="The rise">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Year year="2019">
        <Headline size={72}>FTX is founded by Sam Bankman-Fried</Headline>
        <Reveal at={mid(t, e, 0, 0.55)} style={{ marginTop: 24 }}>
          <Sub color={C.text}>An exchange: deposit money, trade cryptocurrencies.</Sub>
        </Reveal>
      </Year>
    </Phase>
    <Phase at={t[1] + 6} out={t[2] - 8}>
      <div style={{ display: "flex", alignItems: "stretch", justifyContent: "center", gap: 0 }}>
        <Box title="FTX" sub="The exchange" color={C.blue} />
        <Reveal at={mid(t, e, 1, 0.7)} y={0} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 220 }}>
          <div style={{ width: 12, height: 250, background: C.yellow, borderRadius: 6 }} />
        </Reveal>
        <Reveal at={mid(t, e, 1, 0.3)}>
          <Box title="Alameda Research" sub="The trading firm" color={C.red} />
        </Reveal>
      </div>
      <Reveal at={mid(t, e, 1, 0.72)} style={{ marginTop: 50 }}>
        <Headline size={76} color={C.yellow}>
          Same founder. Supposed to be separate.
        </Headline>
      </Reveal>
    </Phase>
    <Phase at={t[2] + 6} out={t[3] - 8}>
      <Sub size={56}>Within three years</Sub>
      <Headline size={170} style={{ marginTop: 10 }}>
        1 million+ users
      </Headline>
      <Reveal at={mid(t, e, 2, 0.6)} style={{ marginTop: 20 }}>
        <Sub size={56} color={C.text}>
          and some of the best-known investors in the world
        </Sub>
      </Reveal>
    </Phase>
    <Phase at={t[3] + 6} out={t[4] - 8}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, width: 1300, margin: "0 auto" }}>
        <Pill style={{ textAlign: "left", fontSize: 60 }}>
          An arena's naming rights: <span style={{ color: C.yellow }}>$135 million</span>
        </Pill>
        <Reveal at={mid(t, e, 3, 0.55)}>
          <Pill style={{ textAlign: "left", fontSize: 60 }}>A Super Bowl advertisement</Pill>
        </Reveal>
        <Reveal at={mid(t, e, 3, 0.78)}>
          <Pill style={{ textAlign: "left", fontSize: 60 }}>Endorsements from famous athletes</Pill>
        </Reveal>
      </div>
    </Phase>
    <Phase at={t[4] + 6} out={t[5] - 8}>
      <Headline size={84}>The founder's image</Headline>
      <div style={{ marginTop: 50 }}>
        <Chips items={["Messy hair", "Shorts", "A modest car", "Giving his fortune away", "Testifying to Congress"]} at={mid(t, e, 4, 0.2)} step={22} />
      </div>
    </Phase>
    <Phase at={t[5] + 6}>
      <Sub size={56}>January 2022: investors add $400 million, at a valuation of</Sub>
      <Headline size={230} color={C.green} style={{ marginTop: 10 }}>
        $32 billion
      </Headline>
    </Phase>
  </Shell>
);

/* 2. What an exchange is supposed to do */
export const Exchange: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  return (
    <Shell dur={dur} kicker="The one rule">
      <Phase at={mid(t, e, 0, 0.45)} out={t[1] - 8}>
        <Headline size={120}>An exchange holds its customers' money.</Headline>
        <Reveal at={mid(t, e, 0, 0.8)} style={{ marginTop: 30 }}>
          <Headline size={120} color={C.yellow}>
            It does not own it.
          </Headline>
        </Reveal>
      </Phase>
      <Phase at={t[1] + 6} out={t[2] - 8}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
          <Pill style={{ width: 520 }}>
            <Sub size={44}>You deposit</Sub>
            <div style={{ fontSize: 120, fontWeight: 900 }}>$1,000</div>
          </Pill>
          <Reveal at={mid(t, e, 1, 0.3)} y={0}>
            <Arrow size={80} />
          </Reveal>
          <Reveal at={mid(t, e, 1, 0.35)}>
            <Pill color={C.green} style={{ width: 620 }}>
              <Sub size={44}>The exchange keeps</Sub>
              <div style={{ fontSize: 120, fontWeight: 900, color: C.green }}>$1,000</div>
            </Pill>
          </Reveal>
        </div>
        <Reveal at={mid(t, e, 1, 0.65)} style={{ marginTop: 50 }}>
          <Sub size={56} color={C.text}>
            Ready to hand back whenever you ask.
          </Sub>
        </Reveal>
      </Phase>
      <Phase at={t[2] + 6} out={t[3] - 8}>
        <Sub size={56}>Its income: a small fee on every trade</Sub>
        <Reveal at={mid(t, e, 2, 0.5)} style={{ marginTop: 30 }}>
          <Headline size={150} color={C.green}>
            about $1 billion
          </Headline>
          <Sub size={56}>in reported revenue, 2021</Sub>
        </Reveal>
      </Phase>
      <Phase at={t[3] + 6}>
        <Sub size={56}>The exchange did not need to gamble.</Sub>
        <Reveal at={mid(t, e, 3, 0.45)} style={{ marginTop: 30, opacity: prog(frame, mid(t, e, 3, 0.45), 20) }}>
          <Headline size={110}>
            The trouble was <span style={{ color: C.red }}>the company next door.</span>
          </Headline>
        </Reveal>
      </Phase>
    </Shell>
  );
};

/* 3. The back door */
export const Alameda: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const drain = interpolate(frame, [t[4] + 20, e[4]], [0, 1], clamp);
  const show = prog(frame, t[0] + 6, 20) * (1 - prog(frame, t[5] - 10, 10));
  return (
    <Shell dur={dur} kicker="The back door" source="Account privileges: trial testimony of FTX co-founder Gary Wang, October 2023">
      <AbsoluteFill style={{ opacity: show }}>
        <div style={{ position: "absolute", left: 120, top: 190, display: "flex", alignItems: "center", gap: 40 }}>
          <Box title="FTX" sub="Customer deposits" color={C.blue} fill={1 - 0.75 * drain} width={700} />
          <div style={{ width: 200, textAlign: "center", opacity: prog(frame, t[4] + 10, 14) }}>
            <Arrow size={130} color={C.red} />
          </div>
          <Box
            title="Alameda Research"
            sub="Large, risky bets"
            color={interpolateColors(prog(frame, t[1], 20), [0, 1], [C.line, C.red])}
            fill={0.06 + 0.8 * drain}
            fillColor={C.red}
            width={700}
          />
        </div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 560 }}>
          <Reveal at={t[0] + 20} out={t[1] - 8}>
            <Headline size={76}>A trading firm, betting with borrowed money.</Headline>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 560 }}>
          <Reveal at={t[1] + 6} out={t[2] - 8}>
            <Headline size={76}>
              Inside FTX's software, its account was <span style={{ color: C.red }}>not like anyone else's.</span>
            </Headline>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 545 }}>
          <Reveal at={t[2] + 6} out={t[3] - 8}>
            <Sub size={46}>Special privileges, written into the code:</Sub>
            <Reveal at={mid(t, e, 2, 0.45)} style={{ marginTop: 18 }}>
              <Check size={62}>Could keep trading with a negative balance</Check>
            </Reveal>
            <Reveal at={mid(t, e, 2, 0.7)} style={{ marginTop: 18 }}>
              <Check size={62}>
                A credit line raised to <span style={{ color: C.red }}>$65 billion</span>
              </Check>
            </Reveal>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 545 }}>
          <Reveal at={t[3] + 6} out={t[4] - 8}>
            <Sub size={46}>Credit lines</Sub>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 14 }}>
              <div style={{ width: 10, height: 64, background: C.mute, borderRadius: 4 }} />
              <div style={{ fontSize: 56, fontWeight: 800, color: C.mute }}>Ordinary customers: millions</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 14 }}>
              <div style={{ width: 900 * prog(frame, t[3] + 20, 40), height: 64, background: C.red, borderRadius: 10 }} />
              <div style={{ fontSize: 56, fontWeight: 800, color: C.red }}>Alameda: $65 billion</div>
            </div>
            <Reveal at={mid(t, e, 3, 0.6)} style={{ marginTop: 22 }}>
              <Sub size={46} color={C.text}>
                None of it disclosed to the public.
              </Sub>
            </Reveal>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 560 }}>
          <Reveal at={t[4] + 6}>
            <Headline size={76}>It could take money out almost without limit.</Headline>
            <Reveal at={mid(t, e, 4, 0.55)} style={{ marginTop: 20 }}>
              <Headline size={76} color={C.red}>
                The money belonged to FTX's customers.
              </Headline>
            </Reveal>
          </Reveal>
        </div>
      </AbsoluteFill>
      <Phase at={t[5] + 6}>
        <Sub size={56}>Where it went, according to the evidence at trial</Sub>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 50, width: 1400 }}>
          {["Trading bets", "Venture investments", "Property in the Bahamas", "Political donations"].map((s, i) => (
            <Reveal key={s} at={mid(t, e, 5, 0.25 + i * 0.17)}>
              <Pill style={{ fontSize: 58 }}>{s}</Pill>
            </Reveal>
          ))}
        </div>
      </Phase>
    </Shell>
  );
};

/* 4. The token */
export const TokenScene: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const sell = interpolate(frame, [mid(t, e, 3, 0.55), e[3]], [0, 1], clamp);
  const W = 1000;
  const pts = Array.from({ length: 40 }).map((_, i) => {
    const x = 60 + (i / 39) * (W - 120);
    const flat = 110 + 10 * Math.sin(i * 1.3);
    const k = Math.max(0, (i - 22) / 17);
    return [x, flat + 260 * Math.pow(k, 0.6)];
  });
  const shown = pts.filter((_, i) => i <= 22 + sell * 17);
  return (
    <Shell dur={dur} kicker="How the hole stayed hidden">
      <AbsoluteFill style={{ opacity: 1 - prog(frame, t[4] - 10, 10) }}>
        <Reveal at={mid(t, e, 0, 0.6)} style={{ position: "absolute", left: 150, top: 330, rotate: `${Math.sin(frame / 40) * 4}deg` }}>
          <Token width={420} label="FTT" />
        </Reveal>
        <div style={{ position: "absolute", left: 740, top: 280, width: 1060 }}>
          <Reveal at={t[0] + 6} out={t[1] - 8}>
            <Headline size={92}>How could a hole that size stay hidden?</Headline>
            <Reveal at={mid(t, e, 0, 0.62)} style={{ marginTop: 34 }}>
              <Sub size={60} color={C.yellow}>
                Part of the answer: a token called FTT.
              </Sub>
            </Reveal>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 740, top: 270, width: 1060 }}>
          <Reveal at={t[1] + 6} out={t[2] - 8}>
            <Check size={68}>A digital coin created by FTX itself</Check>
            <Reveal at={mid(t, e, 1, 0.5)} style={{ marginTop: 34 }}>
              <Check size={68}>A little of it traded each day</Check>
            </Reveal>
            <Reveal at={mid(t, e, 1, 0.75)} style={{ marginTop: 40 }}>
              <Headline size={76} color={C.yellow}>
                So it had a market price.
              </Headline>
            </Reveal>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 740, top: 250, width: 1060 }}>
          <Reveal at={t[2] + 6} out={t[3] - 8}>
            <Sub size={50}>Alameda's assets, on paper</Sub>
            <div style={{ display: "flex", height: 130, borderRadius: 18, overflow: "hidden", marginTop: 20, width: 1040 * Math.max(0.03, prog(frame, t[2] + 14, 40)) }}>
              <div style={{ flex: "0 0 560px", background: C.blue, display: "flex", alignItems: "center", paddingLeft: 30, fontSize: 48, fontWeight: 800, color: C.bg, whiteSpace: "nowrap" }}>
                FTT and related tokens
              </div>
              <div style={{ flex: "0 0 480px", background: C.line }} />
            </div>
            <Sub size={34} style={{ marginTop: 14 }}>
              Proportions illustrative
            </Sub>
            <Reveal at={mid(t, e, 2, 0.6)} style={{ marginTop: 30 }}>
              <Headline size={76}>
                Counted at market price: <span style={{ color: C.yellow }}>billions of dollars.</span>
              </Headline>
            </Reveal>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 740, top: 230, width: 1060 }}>
          <Reveal at={t[3] + 6}>
            <Headline size={60}>The price, if you try to sell it all</Headline>
            <svg width={W} height={440} style={{ marginTop: 10 }}>
              <line x1="60" y1="410" x2={W - 40} y2="410" stroke={C.line} strokeWidth="4" />
              <line x1="60" y1="40" x2="60" y2="410" stroke={C.line} strokeWidth="4" />
              <polyline points={shown.map((p) => p.join(",")).join(" ")} fill="none" stroke={sell > 0 ? C.red : C.blue} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Sub size={34}>Illustrative</Sub>
          </Reveal>
        </div>
      </AbsoluteFill>
      <Phase at={t[4] + 6}>
        <Sub size={56}>One company's wealth was largely a coin invented by its sister company.</Sub>
        <Headline size={96} style={{ marginTop: 34 }}>
          A balance sheet holding itself up by <span style={{ color: C.yellow }}>its own bootstraps.</span>
        </Headline>
      </Phase>
    </Shell>
  );
};

/* 5. Nine days */
const DAYS = [2, 6, 8, 9, 11];
// Which timeline marker is active on each beat
const ACTIVE = [0, 1, 1, 1, 1, 3, 4, 4];

export const Collapse: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  let beat = 0;
  for (let i = 0; i < t.length; i++) if (frame >= t[i]) beat = i;
  const active = ACTIVE[beat];
  const x = (d: number) => 200 + ((d - 2) / 9) * 1520;
  const cards: React.ReactNode[] = [
    <>
      <Sub size={50}>CoinDesk reports on Alameda's balance sheet</Sub>
      <Headline size={88} style={{ marginTop: 16 }}>
        It shows how much of it is <span style={{ color: C.blue }}>FTT.</span>
      </Headline>
    </>,
    <>
      <Sub size={50}>The head of Binance, FTX's biggest rival</Sub>
      <Headline size={84} style={{ marginTop: 16 }}>
        “We will sell our FTT”: more than <span style={{ color: C.red }}>$500 million</span>
      </Headline>
    </>,
    <>
      <Headline size={88}>The price of FTT falls.</Headline>
      <Headline size={88} color={C.yellow} style={{ marginTop: 20 }}>
        Customers ask for their money back.
      </Headline>
    </>,
    <>
      <Sub size={50}>This is a bank run</Sub>
      <Headline size={84} style={{ marginTop: 16 }}>
        The one test an honest exchange can <span style={{ color: C.green }}>always pass.</span>
      </Headline>
    </>,
    <>
      <Headline size={120} color={C.red}>
        The money was not there.
      </Headline>
      <Sub size={56} color={C.text} style={{ marginTop: 20 }}>
        Within days, FTX stops processing withdrawals.
      </Sub>
    </>,
    <>
      <Sub size={50}>November 8: Binance says it will buy FTX</Sub>
      <Headline size={96} style={{ marginTop: 16 }}>
        November 9: <span style={{ color: C.red }}>it walks away.</span>
      </Headline>
    </>,
    <>
      <Headline size={120} color={C.red}>
        FTX files for bankruptcy.
      </Headline>
      <Sub size={56} color={C.text} style={{ marginTop: 20 }}>
        Its founder resigns.
      </Sub>
    </>,
    <>
      <Headline size={76}>“Never in my career have I seen such a complete failure of corporate controls…”</Headline>
      <Sub size={44} style={{ marginTop: 26 }}>
        John J. Ray III, FTX's new chief executive, who had overseen Enron's bankruptcy
      </Sub>
    </>,
  ];
  return (
    <Shell dur={dur} kicker="Nine days in November 2022">
      <svg width={1920} height={300} style={{ position: "absolute", top: 170 }}>
        <line x1={x(2)} y1="110" x2={x(11)} y2="110" stroke={C.line} strokeWidth="10" strokeLinecap="round" />
        <line x1={x(2)} y1="110" x2={x(DAYS[active])} y2="110" stroke={C.red} strokeWidth="10" strokeLinecap="round" />
        {DAYS.map((d, i) => (
          <g key={d}>
            <circle cx={x(d)} cy="110" r={i === active ? 30 : 20} fill={i <= active ? C.red : C.line} stroke={C.bg} strokeWidth="6" />
            <text x={x(d)} y="200" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize={i === active ? 54 : 40} fill={i === active ? C.text : C.mute}>
              Nov {d}
            </text>
          </g>
        ))}
      </svg>
      {cards.map((c, i) => (
        <Center key={i} style={{ top: 420, height: 520 }}>
          <Reveal at={t[i] + 6} out={i < cards.length - 1 ? t[i + 1] - 8 : undefined}>
            {c}
          </Reveal>
        </Center>
      ))}
    </Shell>
  );
};

/* 6. The trial */
export const Trial: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="The trial">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Sub size={56}>December 2022</Sub>
      <Headline size={120} style={{ marginTop: 20 }}>
        Arrested in the Bahamas.
      </Headline>
    </Phase>
    <Phase at={t[1] + 6} out={t[2] - 8}>
      <Sub size={56}>New York, autumn 2023</Sub>
      <div style={{ display: "flex", justifyContent: "center", gap: 50, marginTop: 40 }}>
        {[0, 1, 2].map((i) => (
          <Reveal key={i} at={mid(t, e, 1, 0.2 + i * 0.1)}>
            <Person width={150} color={C.yellow} />
          </Reveal>
        ))}
      </div>
      <Reveal at={mid(t, e, 1, 0.3)} style={{ marginTop: 40 }}>
        <Headline size={84}>Three of his closest colleagues testified against him</Headline>
      </Reveal>
      <Reveal at={mid(t, e, 1, 0.82)} style={{ marginTop: 24 }}>
        <Sub size={54} color={C.yellow}>
          All three had pleaded guilty.
        </Sub>
      </Reveal>
    </Phase>
    <Phase at={t[2] + 6} out={t[3] - 8}>
      <Sub size={56}>His own testimony</Sub>
      <Headline size={104} style={{ marginTop: 24 }}>
        Mistakes, he said. <span style={{ color: C.mute }}>Not fraud.</span>
      </Headline>
    </Phase>
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 60 }}>
      <Reveal at={t[3] + 6} out={t[4] - 8}>
        <Pill color={C.red} style={{ width: 760 }}>
          <Sub size={48}>The jury's verdict</Sub>
          <div style={{ fontSize: 130, fontWeight: 900, color: C.red }}>Guilty, 7 of 7</div>
          <Sub size={44}>after a few hours of deliberation</Sub>
        </Pill>
      </Reveal>
      <Reveal at={mid(t, e, 3, 0.6)} out={t[4] - 8}>
        <Pill style={{ width: 760 }}>
          <Sub size={48}>The sentence, March 2024</Sub>
          <div style={{ fontSize: 130, fontWeight: 900 }}>25 years</div>
          <Sub size={44}>in federal prison</Sub>
        </Pill>
      </Reveal>
    </AbsoluteFill>
    <Phase at={t[4] + 6}>
      <Year year="2026">
        <Headline size={76}>An appeals court upholds the conviction</Headline>
        <Sub color={C.text} style={{ marginTop: 20 }}>
          Unanimously, in June.
        </Sub>
      </Year>
    </Phase>
  </Shell>
);

/* 7. What happened to the money */
export const Money: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="What happened to the money">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Headline size={130}>And the customers?</Headline>
      <Reveal at={mid(t, e, 0, 0.5)} style={{ marginTop: 34 }}>
        <Sub size={60} color={C.yellow}>
          Here the story takes an odd turn.
        </Sub>
      </Reveal>
    </Phase>
    <Phase at={t[1] + 6} out={t[2] - 8}>
      <Sub size={56}>Two years of recovering assets</Sub>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, width: 1300, margin: "40px auto 0" }}>
        <Reveal at={mid(t, e, 1, 0.4)}>
          <Pill color={C.green} style={{ textAlign: "left", fontSize: 58 }}>
            Some investments turned out to be valuable
          </Pill>
        </Reveal>
        <Reveal at={mid(t, e, 1, 0.75)}>
          <Pill color={C.green} style={{ textAlign: "left", fontSize: 58 }}>
            Crypto prices recovered
          </Pill>
        </Reveal>
      </div>
    </Phase>
    <Phase at={t[2] + 6} out={t[3] - 8}>
      <Sub size={56}>The plan approved in 2024: most customers get back</Sub>
      <Headline size={96} style={{ marginTop: 24 }}>
        The dollar value of their account <span style={{ color: C.yellow }}>on the day of the bankruptcy</span>, plus interest
      </Headline>
    </Phase>
    <div style={{ position: "absolute", left: 120, right: 120, top: 210 }}>
      <Reveal at={t[3] + 6}>
        <Headline size={72} style={{ marginBottom: 40 }}>
          But that was the bottom of the market
        </Headline>
        <HBar at={mid(t, e, 3, 0.25)} label="One Bitcoin, as paid out (November 2022 value)" value="about $17,000" width={220} color={C.mute} />
        <HBar at={mid(t, e, 3, 0.6)} label="One Bitcoin, by the time the money arrived" value="many times higher" width={1050} color={C.yellow} />
        <Sub size={34}>Bar lengths illustrative</Sub>
      </Reveal>
    </div>
  </Shell>
);

/* 8. Why nobody saw it */
const Reason: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ width: 540, minHeight: 500, background: C.panel, border: `3px solid ${C.line}`, borderRadius: 32, padding: "40px 44px", textAlign: "left" }}>
    <div style={{ fontSize: 62, fontWeight: 900, lineHeight: 1.1, color: C.yellow }}>{title}</div>
    <Sub size={44} color={C.text} style={{ marginTop: 26 }}>
      {children}
    </Sub>
  </div>
);

export const Lessons: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="Why nobody saw it">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Headline size={110}>So why did nobody see it?</Headline>
      <Reveal at={mid(t, e, 0, 0.62)} style={{ marginTop: 44 }}>
        <Sub size={56} color={C.text}>
          Sequoia Capital, one of its investors, wrote its entire stake down to <span style={{ color: C.red, fontWeight: 800 }}>zero.</span>
        </Sub>
      </Reveal>
    </Phase>
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 40, top: 30 }}>
      <Reveal at={t[1] + 6} out={t[4] - 8}>
        <Reason title="Nobody was checking">Run from the Bahamas. Many of its companies had never held a board meeting.</Reason>
      </Reveal>
      <Reveal at={t[2] + 6} out={t[4] - 8}>
        <Reason title="Fast growth looks like proof">Asking awkward questions feels like missing out.</Reason>
      </Reveal>
      <Reveal at={t[3] + 6} out={t[4] - 8}>
        <Reason title="The image">A founder who seems indifferent to money is easy to trust with yours.</Reason>
      </Reveal>
    </AbsoluteFill>
    <Phase at={t[4] + 6} out={t[5] - 8}>
      <Sub size={56}>The real warning sign was structural, and public</Sub>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 30 }}>
        <Pill color={C.yellow} style={{ fontSize: 56, color: C.yellow, padding: "20px 50px" }}>
          One person in control of both
        </Pill>
        <div style={{ display: "flex", gap: 60, marginTop: 40 }}>
          <Reveal at={mid(t, e, 4, 0.5)}>
            <Box title="An exchange" sub="that held customer money" color={C.blue} />
          </Reveal>
          <Reveal at={mid(t, e, 4, 0.75)}>
            <Box title="A trading firm" sub="that needed money" color={C.red} />
          </Reveal>
        </div>
      </div>
    </Phase>
    <Phase at={t[5] + 6}>
      <Sub size={56}>A conflict of interest so basic that</Sub>
      <Headline size={96} style={{ marginTop: 24 }}>
        traditional finance spent a century <span style={{ color: C.yellow }}>building walls against it.</span>
      </Headline>
    </Phase>
  </Shell>
);

/* 9. What to take from it */
export const You: React.FC<SceneProps> = ({ t, dur }) => (
  <Shell dur={dur} kicker="The lessons are not about crypto">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Headline size={120}>
        The lessons are <span style={{ color: C.yellow }}>not really about crypto.</span>
      </Headline>
    </Phase>
    <div style={{ position: "absolute", left: 120, right: 120, top: 200, display: "flex", flexDirection: "column", gap: 34 }}>
      <Reveal at={t[1] + 6}>
        <Item n={1}>Ask where your money actually sits, and who else can touch it. A balance on a screen is a promise, not a vault.</Item>
      </Reveal>
      <Reveal at={t[2] + 6}>
        <Item n={2}>An asset is only worth what it would fetch if you had to sell it. A price on paper is not the same thing.</Item>
      </Reveal>
      <Reveal at={t[3] + 6}>
        <Item n={3}>When the owner also runs the biggest customer, lender or trading partner, someone should be asking hard questions.</Item>
      </Reveal>
    </div>
  </Shell>
);

/* 10. Payoff */
export const Payoff: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur}>
    <Phase at={t[0] + 8} out={t[1] - 8}>
      <Headline size={88} color={C.mute}>
        FTX did not fail because crypto is complicated.
      </Headline>
      <Reveal at={mid(t, e, 0, 0.42)} style={{ marginTop: 40 }}>
        <Headline size={104}>
          It failed because customer money was treated as <span style={{ color: C.red }}>the company's own.</span>
        </Headline>
      </Reveal>
    </Phase>
    <Phase at={t[1] + 6}>
      <Count at={t[1] + 6} len={1} to={32} format={() => "$32 billion"} style={{ fontSize: 200, fontWeight: 900, color: C.yellow, letterSpacing: -6 }} />
      <Sub size={56} style={{ marginTop: 10 }}>
        rested on one thing:
      </Sub>
      <Reveal at={mid(t, e, 1, 0.5)} style={{ marginTop: 30 }}>
        <Headline size={92}>people not asking for their money back all at once.</Headline>
      </Reveal>
    </Phase>
  </Shell>
);

/* 11. Outro */
export const Outro: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Shell dur={dur + 1000}>
        <Center style={{ top: -60 }}>
          <Reveal at={t[0] + 6} out={t[1] - 6}>
            <Sub size={56}>Next</Sub>
            <Headline size={200} color={C.green} style={{ marginTop: 10 }}>
              $100,000
            </Headline>
            <Reveal at={mid(t, e, 0, 0.3)} style={{ marginTop: 10 }}>
              <Sub size={60} color={C.text}>
                used to mean you had made it.
              </Sub>
            </Reveal>
            <Reveal at={mid(t, e, 0, 0.55)} style={{ marginTop: 24 }}>
              <Headline size={84} color={C.red}>
                Today, many who earn it feel broke.
              </Headline>
            </Reveal>
          </Reveal>
        </Center>
        <Center style={{ top: -90 }}>
          <Reveal at={t[1] + 6}>
            <div style={{ background: C.panel, border: `4px solid ${C.blue}`, borderRadius: 40, padding: "56px 80px", width: 1400 }}>
              <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 8, color: C.blue }}>NEXT</div>
              <Headline size={84} style={{ textAlign: "left", marginTop: 20 }}>
                Why <span style={{ color: C.green }}>$100,000</span> a year feels broke now
              </Headline>
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
