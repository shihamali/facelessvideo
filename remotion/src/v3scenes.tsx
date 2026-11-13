import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Arrow, Bottle, C, Center, Count, Headline, Person, Pill, prog, Reveal, SceneProps, Shell, Sub } from "./lib";
import { Check, Chips, HBar, Item, Phase, Strike, StoreIcon, Year } from "./v2scenes";

const mid = (t: number[], e: number[], i: number, f = 0.5) => Math.round(t[i] + (e[i] - t[i]) * f);

/* ---------- Illustrations ---------- */

/** A plain box store with a yellow sign band. */
const BoxStore: React.FC<{ width: number }> = ({ width }) => (
  <svg width={width} viewBox="0 0 400 260">
    <ellipse cx="200" cy="246" rx="190" ry="12" fill="#000" opacity="0.35" />
    <rect x="20" y="60" width="360" height="180" fill="#C9CFDA" />
    <rect x="20" y="60" width="360" height="56" fill="#FBBF24" />
    <rect x="60" y="76" width="200" height="24" rx="6" fill="#0B1220" />
    <rect x="160" y="150" width="80" height="90" fill="#2A3650" />
    <rect x="50" y="150" width="80" height="50" fill="#60A5FA" />
    <rect x="270" y="150" width="80" height="50" fill="#60A5FA" />
  </svg>
);

const Dot: React.FC<{ x: number; y: number; r: number; color: string; label?: string }> = ({ x, y, r, color, label }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={color} />
    {label ? (
      <text x={x} y={y + r + 44} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="34" fill={C.mute}>
        {label}
      </text>
    ) : null}
  </g>
);

/* 0. Hook */
export const Hook: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  return (
    <Shell dur={dur}>
      <div style={{ position: "absolute", left: 120, right: 120, top: 150 }}>
        <Reveal at={t[0] + 6} out={t[1] - 8}>
          <Count
            at={t[0] + 8}
            len={50}
            to={30000}
            format={(n) => `${Math.round(n).toLocaleString("en-US")}+`}
            style={{ fontSize: 230, fontWeight: 900, letterSpacing: -8, lineHeight: 1 }}
          />
          <Sub size={58} color={C.yellow} style={{ marginBottom: 50 }}>
            dollar stores in the United States
          </Sub>
          <HBar at={mid(t, e, 0, 0.5)} label="Dollar stores" value="30,000+" width={1100} color={C.yellow} />
          <HBar at={mid(t, e, 0, 0.66)} label="Every McDonald's and Walmart in the US, combined" value="about 18,000" width={660} color={C.mute} />
        </Reveal>
      </div>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 130, top: 300, scale: String(interpolate(frame, [t[1], dur], [1, 1.06], { extrapolateLeft: "clamp" })) }}>
          <Reveal at={t[1] + 6} out={t[3] - 8}>
            <BoxStore width={640} />
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 900, top: 260, width: 900 }}>
          <Reveal at={t[1] + 6} out={t[2] - 8}>
            <Sub size={54}>The biggest chain, Dollar General</Sub>
            <Headline size={150} style={{ marginTop: 10 }}>
              20,000+ stores
            </Headline>
            <Reveal at={mid(t, e, 1, 0.6)} style={{ marginTop: 30 }}>
              <Sub size={54} color={C.yellow}>
                and hundreds more every year
              </Sub>
            </Reveal>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 900, top: 250, width: 900 }}>
          <Reveal at={t[2] + 6} out={t[3] - 8}>
            <Sub size={54}>It does not look like a good business</Sub>
            {["Tiny prices", "Small towns", "Customers with little money"].map((s, i) => (
              <Reveal key={s} at={mid(t, e, 2, 0.36 + i * 0.2)} style={{ marginTop: 26 }}>
                <Pill color={C.red} style={{ textAlign: "left", fontSize: 60 }}>
                  {s}
                </Pill>
              </Reveal>
            ))}
          </Reveal>
        </div>
      </AbsoluteFill>
      <Phase at={t[3] + 6}>
        <Sub size={56}>And yet Dollar General alone sells more than</Sub>
        <Headline size={190} color={C.green} style={{ marginTop: 10 }}>
          $40 billion
        </Headline>
        <Sub size={56}>of goods a year.</Sub>
        <Reveal at={mid(t, e, 3, 0.8)} style={{ marginTop: 40 }}>
          <Headline size={110}>Here is how.</Headline>
        </Reveal>
      </Phase>
    </Shell>
  );
};

/* 1. Where no one else will go */
const TOWNS: [number, number][] = [
  [1130, 210],
  [1420, 150],
  [1690, 270],
  [1210, 470],
  [1500, 420],
  [1720, 560],
  [1330, 660],
];

export const Where: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const drive = interpolate(frame, [t[3] + 20, mid(t, e, 3, 0.45)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Shell dur={dur} kicker="Where no one else will go" source="Share of stores: Dollar General's own figure">
      <AbsoluteFill style={{ opacity: 1 - prog(frame, t[2] - 10, 10) }}>
        <svg width={1920} height={1080} style={{ position: "absolute", opacity: prog(frame, t[0] + 6, 20) }}>
          <circle cx="520" cy="470" r={250} fill={C.panel} stroke={C.line} strokeWidth="5" />
          <text x="520" y="455" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="64" fill={C.text}>
            City
          </text>
          <text x="520" y="515" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="38" fill={C.mute}>
            100,000 people
          </text>
          {TOWNS.map(([x, y], i) => {
            const on = prog(frame, t[1] + 20 + i * 8, 12);
            return (
              <g key={i} opacity={prog(frame, mid(t, e, 0, 0.5) + i * 4, 12)}>
                <circle cx={x} cy={y} r={46} fill={C.panel} stroke={on > 0.5 ? C.yellow : C.line} strokeWidth="5" />
                <rect x={x - 20} y={y - 16} width={40} height={32} rx={5} fill={C.yellow} opacity={on} />
              </g>
            );
          })}
        </svg>
        <div style={{ position: "absolute", left: 120, top: 780, width: 800, textAlign: "center" }}>
          <Reveal at={mid(t, e, 0, 0.35)}>
            <Sub size={46} color={C.text}>
              A supercenter needs tens of thousands of shoppers nearby
            </Sub>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 1040, top: 780, width: 780, textAlign: "center" }}>
          <Reveal at={t[1] + 10}>
            <Sub size={46} color={C.yellow}>
              Dollar General saw the towns too small for that
            </Sub>
          </Reveal>
        </div>
      </AbsoluteFill>
      <Phase at={t[2] + 6} out={t[3] - 8}>
        <Sub size={56}>About</Sub>
        <Count at={t[2] + 8} len={45} to={80} format={(n) => `${Math.round(n)}%`} style={{ fontSize: 300, fontWeight: 900, color: C.yellow, lineHeight: 1 }} />
        <Sub size={56} color={C.text}>
          of its stores are in communities of 20,000 people or fewer
        </Sub>
      </Phase>
      <AbsoluteFill style={{ opacity: prog(frame, t[3] + 6, 14) * (1 - prog(frame, t[4] - 10, 10)) }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <line x1="360" y1="470" x2={360 + 1200 * drive} y2="470" stroke={C.line} strokeWidth="14" strokeDasharray="34 22" />
          <Dot x={360} y={470} r={70} color={C.panel} label="Your town" />
          <rect x={332} y={448} width={56} height={44} rx={6} fill={C.yellow} />
          <g opacity={drive}>
            <Dot x={1560} y={470} r={70} color={C.panel} label="Nearest supermarket" />
            <rect x={1525} y={442} width={70} height={56} rx={6} fill={C.green} />
          </g>
          <text x="960" y="420" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="52" fill={C.mute} opacity={drive}>
            a long drive
          </text>
        </svg>
        <Center style={{ top: 560, height: 360 }}>
          <Reveal at={mid(t, e, 3, 0.55)}>
            <Headline size={92}>
              Not the cheapest option. <span style={{ color: C.yellow }}>The closest one.</span>
            </Headline>
          </Reveal>
        </Center>
      </AbsoluteFill>
      <Phase at={t[4] + 6}>
        <Headline size={112}>
          Being closest is a kind of <span style={{ color: C.yellow }}>monopoly.</span>
        </Headline>
        <Reveal at={mid(t, e, 4, 0.4)} style={{ marginTop: 50 }}>
          <Sub size={54}>If the alternative is 40 minutes and a gallon of gas, you pay a little more for the milk.</Sub>
        </Reveal>
      </Phase>
    </Shell>
  );
};

/* 2. A store built to be cheap */
export const Box: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const missing = ["Bakery", "Deli counter", "Pharmacy", "Fresh produce (often)"];
  return (
    <Shell dur={dur} kicker="A store built to be cheap">
      <AbsoluteFill style={{ opacity: 1 - prog(frame, t[4] - 10, 10) }}>
        <Reveal at={t[0] + 6} style={{ position: "absolute", left: 120, top: 330 }}>
          <BoxStore width={620} />
        </Reveal>
        <div style={{ position: "absolute", left: 880, top: 220, width: 920 }}>
          <Reveal at={t[0] + 20} out={t[1] - 8}>
            <Headline size={84}>A plain metal box</Headline>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 40, marginTop: 50 }}>
              <div style={{ width: 380, height: 380, background: C.line, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 700, color: C.mute }}>
                Supermarket
              </div>
              <Reveal at={mid(t, e, 0, 0.6)}>
                <div style={{ width: 150, height: 150, background: C.yellow, borderRadius: 10 }} />
                <Sub size={40} color={C.yellow} style={{ marginTop: 10 }}>
                  Dollar store
                </Sub>
              </Reveal>
            </div>
            <Sub size={34} style={{ marginTop: 20 }}>
              Floor area, roughly to scale
            </Sub>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 880, top: 260, width: 920 }}>
          <Reveal at={t[1] + 6} out={t[2] - 8}>
            {missing.map((s, i) => {
              const at = t[1] + 10 + ((e[1] - t[1]) * i) / 4.6;
              return (
                <Reveal key={s} at={at} style={{ marginBottom: 26 }}>
                  <Strike at={at + 16}>
                    <Headline size={84} color={C.mute}>
                      {s}
                    </Headline>
                  </Strike>
                </Reveal>
              );
            })}
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 880, top: 300, width: 920 }}>
          <Reveal at={t[2] + 6} out={t[3] - 8}>
            <Check size={72}>Cheap land, at the edge of town</Check>
            <Reveal at={mid(t, e, 2, 0.55)} style={{ marginTop: 40 }}>
              <Check size={72}>Leased, not owned</Check>
            </Reveal>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 880, top: 230, width: 920 }}>
          <Reveal at={t[3] + 6}>
            <Sub size={54}>On a shift, often just</Sub>
            <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 20 }}>
              <Person width={110} color={C.yellow} />
              <Person width={110} color={C.yellow} />
              <Headline size={100}>1 or 2 people</Headline>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 50 }}>
              {["Register", "Truck", "Shelves"].map((s, i) => (
                <Reveal key={s} at={mid(t, e, 3, 0.5 + i * 0.15)}>
                  <Pill style={{ fontSize: 50, padding: "22px 40px" }}>{s}</Pill>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </AbsoluteFill>
      <Phase at={t[4] + 6}>
        <Sub size={56}>Low rent and a tiny payroll</Sub>
        <Headline size={96} style={{ marginTop: 30 }}>
          A profit on sales a supermarket would call <span style={{ color: C.yellow }}>a failure</span>
        </Headline>
      </Phase>
    </Shell>
  );
};

/* 3. The price tag */
const Offer: React.FC<{ where: string; size: string; price: string; unit: string; hot?: boolean; unitAt: number; bottle: number }> = ({
  where,
  size,
  price,
  unit,
  hot,
  unitAt,
  bottle,
}) => (
  <div
    style={{
      width: 640,
      background: C.panel,
      border: `4px solid ${hot ? C.red : C.line}`,
      borderRadius: 32,
      padding: "36px 46px",
      textAlign: "left",
      display: "flex",
      gap: 30,
      alignItems: "flex-end",
    }}
  >
    <div style={{ width: 170, display: "flex", justifyContent: "center" }}>
      <Bottle width={bottle} color={hot ? C.yellow : C.blue} />
    </div>
    <div>
      <Sub size={40}>{where}</Sub>
      <Sub size={40} color={C.text}>
        {size}
      </Sub>
      <div style={{ fontSize: 110, fontWeight: 900, lineHeight: 1.1 }}>{price}</div>
      <Reveal at={unitAt}>
        <div style={{ fontSize: 60, fontWeight: 900, color: hot ? C.red : C.green }}>{unit}</div>
      </Reveal>
    </div>
  </div>
);

export const Price: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="The price tag">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Sub size={56}>The promise in the name</Sub>
      <Headline size={120} color={C.yellow} style={{ marginTop: 30 }}>
        You can afford everything in here.
      </Headline>
    </Phase>
    <Phase at={t[1] + 6} out={t[2] - 8}>
      <Sub size={56}>For a household living week to week</Sub>
      <Headline size={100} style={{ marginTop: 30 }}>
        A small price <span style={{ color: C.yellow }}>today</span> matters more than a good deal over a month
      </Headline>
    </Phase>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Reveal at={t[2] + 6} out={t[4] - 8}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Headline size={76}>But look at what you get for it</Headline>
        </div>
        <div style={{ display: "flex", gap: 60 }}>
          <Offer where="Supermarket" size="Large, 100 oz" price="$12.00" unit="12¢ per oz" unitAt={mid(t, e, 3, 0.7)} bottle={150} />
          <Offer where="Dollar store" size="Small, 25 oz" price="$4.00" unit="16¢ per oz" hot unitAt={mid(t, e, 3, 0.78)} bottle={80} />
        </div>
        <div style={{ textAlign: "center", marginTop: 36, height: 70 }}>
          <Reveal at={mid(t, e, 3, 0.86)}>
            <Sub size={52} color={C.red}>
              A third more per ounce. Illustrative example.
            </Sub>
          </Reveal>
        </div>
      </Reveal>
    </AbsoluteFill>
    <Phase at={t[4] + 6} out={t[5] - 8}>
      <Sub size={56}>What journalists have found on real shelves</Sub>
      <Headline size={100} style={{ marginTop: 30 }}>
        Lower at the register. <span style={{ color: C.red }}>Higher per unit.</span>
      </Headline>
    </Phase>
    <Phase at={t[5] + 6}>
      <Headline size={140} color={C.yellow}>
        It is expensive to be poor.
      </Headline>
      <Reveal at={mid(t, e, 5, 0.4)} style={{ marginTop: 50 }}>
        <Sub size={56} color={C.text}>
          The $4 bottle, again and again, costs more over the year.
        </Sub>
      </Reveal>
    </Phase>
  </Shell>
);

/* 4. What sells and what earns */
export const Margins: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const w = prog(frame, mid(t, e, 0, 0.6), 40);
  return (
    <Shell dur={dur} kicker="What sells, and what earns">
      <div style={{ position: "absolute", left: 120, right: 120, top: 200 }}>
        <Reveal at={t[0] + 6}>
          <Headline size={76}>What Dollar General sells</Headline>
          <div style={{ display: "flex", height: 150, marginTop: 40, borderRadius: 20, overflow: "hidden", width: 1680 * Math.max(0.02, w) }}>
            <div style={{ flex: "0 0 1344px", background: C.blue, display: "flex", alignItems: "center", paddingLeft: 40, fontSize: 54, fontWeight: 800, color: C.bg, whiteSpace: "nowrap" }}>
              Everyday basics: about four fifths
            </div>
            <div style={{ flex: "0 0 336px", background: C.yellow }} />
          </div>
        </Reveal>
        <div style={{ display: "flex", gap: 40, marginTop: 50 }}>
          <div style={{ flex: "0 0 1100px" }}>
            <Reveal at={t[0] + 30}>
              <Sub size={46}>Food, cleaning products, paper towels, toiletries</Sub>
            </Reveal>
            <Reveal at={t[1] + 6} style={{ marginTop: 26 }}>
              <Headline size={64}>Low margin. There to bring you in every week.</Headline>
            </Reveal>
          </div>
          <div style={{ flex: 1 }}>
            <Reveal at={t[2] + 6}>
              <Sub size={46} color={C.yellow}>
                Seasonal, toys, homeware, party supplies
              </Sub>
              <Headline size={64} color={C.yellow} style={{ marginTop: 26 }}>
                Better profits.
              </Headline>
            </Reveal>
          </div>
        </div>
        <Reveal at={t[3] + 6} style={{ marginTop: 50 }}>
          <Pill color={C.green} style={{ fontSize: 54, textAlign: "left" }}>
            Plus store brands, which cost the chain less than the famous names.
          </Pill>
        </Reveal>
      </div>
    </Shell>
  );
};

/* 5. The machine */
export const Machine: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const parts = ["Small box", "Cheap land", "Two staff", "Basic goods"];
  const n = Math.floor(interpolate(frame, [t[2] + 6, e[2]], [1, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <Shell dur={dur} kicker="A machine you can copy anywhere">
      <Phase at={t[0] + 6} out={t[1] - 8}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, width: 1300 }}>
          {parts.map((s, i) => (
            <Reveal key={s} at={mid(t, e, 0, 0.5 + i * 0.11)}>
              <Pill style={{ fontSize: 70 }}>{s}</Pill>
            </Reveal>
          ))}
        </div>
      </Phase>
      <Phase at={t[1] + 6} out={t[2] - 8}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <Pill style={{ width: 440, fontSize: 56 }}>Costs little to open</Pill>
          <Reveal at={mid(t, e, 1, 0.3)} y={0}>
            <Arrow />
          </Reveal>
          <Reveal at={mid(t, e, 1, 0.35)}>
            <Pill style={{ width: 440, fontSize: 56 }}>Pays back quickly</Pill>
          </Reveal>
          <Reveal at={mid(t, e, 1, 0.6)} y={0}>
            <Arrow />
          </Reveal>
          <Reveal at={mid(t, e, 1, 0.65)}>
            <Pill color={C.yellow} style={{ width: 440, fontSize: 56, color: C.yellow }}>
              Open another
            </Pill>
          </Reveal>
        </div>
      </Phase>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 120, top: 220, width: 900 }}>
          <Reveal at={t[2] + 6} out={t[3] - 8}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 70px)", gap: 16 }}>
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} style={{ width: 70, height: 56, borderRadius: 8, background: C.yellow, opacity: i < n ? 1 : 0.08 }} />
              ))}
            </div>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 1090, top: 260, width: 720 }}>
          <Reveal at={t[2] + 6} out={t[3] - 8}>
            <Sub size={50}>At its peak, Dollar General opened around</Sub>
            <Headline size={130} color={C.yellow}>
              1,000 stores a year
            </Headline>
            <Reveal at={mid(t, e, 2, 0.6)} style={{ marginTop: 20 }}>
              <Sub size={56} color={C.text}>
                Nearly three a day.
              </Sub>
            </Reveal>
          </Reveal>
        </div>
      </AbsoluteFill>
      <Phase at={t[3] + 6}>
        <Sub size={56}>It works in hard times, too</Sub>
        <Headline size={100} style={{ marginTop: 30 }}>
          Budgets tighten. Shoppers <span style={{ color: C.yellow }}>trade down.</span>
        </Headline>
      </Phase>
    </Shell>
  );
};

/* 6. The dollar is gone */
export const Dollar: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="One thing has changed">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Headline size={130}>The dollar itself.</Headline>
    </Phase>
    <Phase at={t[1] + 6} out={t[2] - 8}>
      <Sub size={56}>Dollar Tree's price for everything</Sub>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30, marginTop: 50 }}>
        <Pill style={{ width: 430 }}>
          <div style={{ fontSize: 120, fontWeight: 900 }}>$1.00</div>
          <Sub size={40}>for 30 years</Sub>
        </Pill>
        <Reveal at={mid(t, e, 1, 0.38)} y={0}>
          <Arrow />
        </Reveal>
        <Reveal at={mid(t, e, 1, 0.42)}>
          <Pill color={C.yellow} style={{ width: 430 }}>
            <div style={{ fontSize: 120, fontWeight: 900, color: C.yellow }}>$1.25</div>
            <Sub size={40}>from 2021</Sub>
          </Pill>
        </Reveal>
        <Reveal at={mid(t, e, 1, 0.7)} y={0}>
          <Arrow />
        </Reveal>
        <Reveal at={mid(t, e, 1, 0.74)}>
          <Pill color={C.red} style={{ width: 430 }}>
            <div style={{ fontSize: 96, fontWeight: 900, color: C.red, lineHeight: 1.5, whiteSpace: "nowrap" }}>up to $7</div>
            <Sub size={40}>some items today</Sub>
          </Pill>
        </Reveal>
      </div>
    </Phase>
    <Phase at={t[2] + 6} out={t[3] - 8}>
      <Sub size={56}>Dollar General never had a one dollar rule</Sub>
      <Reveal at={mid(t, e, 2, 0.5)} style={{ marginTop: 30 }}>
        <Headline size={112}>
          The name describes a <span style={{ color: C.yellow }}>feeling</span>, not a price.
        </Headline>
      </Reveal>
    </Phase>
    <Phase at={t[3] + 6}>
      <Headline size={100}>The sign sets what you expect to pay.</Headline>
      <Reveal at={mid(t, e, 3, 0.5)} style={{ marginTop: 40 }}>
        <Headline size={84} color={C.yellow}>
          Most people never check the math.
        </Headline>
      </Reveal>
    </Phase>
  </Shell>
);

/* 7. What it does to a town */
const Side: React.FC<{ title: string; color: string; children: React.ReactNode }> = ({ title, color, children }) => (
  <div style={{ width: 800, background: C.panel, border: `4px solid ${color}`, borderRadius: 32, padding: "40px 50px", textAlign: "left", minHeight: 480 }}>
    <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 5, color, textTransform: "uppercase" }}>{title}</div>
    <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.18, marginTop: 24 }}>{children}</div>
  </div>
);

export const Town: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="What it does to a town" source="Count of communities: Institute for Local Self-Reliance (advocacy group)">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Headline size={120}>So what happens to the town?</Headline>
      <Reveal at={mid(t, e, 0, 0.5)} style={{ marginTop: 40 }}>
        <Sub size={60} color={C.yellow}>
          This is where the story gets contested.
        </Sub>
      </Reveal>
    </Phase>
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 50 }}>
      <Reveal at={t[1] + 6} out={t[3] - 8}>
        <Side title="The chains say" color={C.green}>
          We bring affordable basics to places other retailers abandoned.
          <Reveal at={mid(t, e, 1, 0.6)} y={0}>
            <Sub size={44} style={{ marginTop: 24 }}>
              For many communities, that is simply true.
            </Sub>
          </Reveal>
        </Side>
      </Reveal>
      <Reveal at={t[2] + 6} out={t[3] - 8}>
        <Side title="Critics say" color={C.red}>
          The stores do not just fill a gap. They widen it.
          <Reveal at={mid(t, e, 2, 0.45)} y={0}>
            <Sub size={44} style={{ marginTop: 24 }}>
              A grocer on thin margins can fail after losing a slice of its sales.
            </Sub>
          </Reveal>
        </Side>
      </Reveal>
    </AbsoluteFill>
    <Phase at={t[3] + 6} out={t[4] - 8}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
        <Pill style={{ width: 480, fontSize: 52 }}>Grocer loses sales</Pill>
        <Reveal at={t[3] + 30} y={0}>
          <Arrow />
        </Reveal>
        <Reveal at={t[3] + 36}>
          <Pill color={C.red} style={{ width: 480, fontSize: 52, color: C.red }}>
            Grocer closes
          </Pill>
        </Reveal>
        <Reveal at={mid(t, e, 3, 0.55)} y={0}>
          <Arrow />
        </Reveal>
        <Reveal at={mid(t, e, 3, 0.6)}>
          <Pill color={C.yellow} style={{ width: 480, fontSize: 52, color: C.yellow }}>
            Dollar store is all that is left
          </Pill>
        </Reveal>
      </div>
      <Sub size={50} style={{ marginTop: 50 }}>
        And the town has lost its only source of fresh food.
      </Sub>
    </Phase>
    <Phase at={t[4] + 6} out={t[5] - 8}>
      <Year year="75+">
        <Headline size={72}>communities have blocked a proposed dollar store since 2019</Headline>
        <Reveal at={mid(t, e, 4, 0.7)} style={{ marginTop: 24 }}>
          <Sub color={C.text}>Some cities now limit how close together the stores can be.</Sub>
        </Reveal>
      </Year>
    </Phase>
    <Phase at={t[5] + 6}>
      <Sub size={56}>Rescue the town, or drain it?</Sub>
      <Headline size={100} style={{ marginTop: 30 }}>
        It seems to depend on <span style={{ color: C.yellow }}>what was there before.</span>
      </Headline>
    </Phase>
  </Shell>
);

/* 8. The cost of running lean */
export const Cost: React.FC<SceneProps> = ({ t, dur }) => (
  <Shell dur={dur} kicker="The cost of running lean">
    <Phase at={t[0] + 6} out={t[1] - 8}>
      <Headline size={110}>
        Running that lean has costs. <span style={{ color: C.red }}>Some land on other people.</span>
      </Headline>
    </Phase>
    <div style={{ position: "absolute", left: 120, right: 120, top: 180, display: "flex", flexDirection: "column", gap: 26 }}>
      <Reveal at={t[1] + 6}>
        <Item n={1}>Blocked aisles and piled stockrooms: repeated federal safety fines.</Item>
      </Reveal>
      <Reveal at={t[2] + 6}>
        <Item n={2}>Shelf price and register price not matching: settlements in several states.</Item>
      </Reveal>
      <Reveal at={t[3] + 6}>
        <Item n={3}>Pennsylvania: failed over 40% of pricing inspections, the state said. The chain says it corrects errors.</Item>
      </Reveal>
      <Reveal at={t[4] + 6}>
        <Item n={4}>Robberies at stores with one worker on shift: a risk the employee carries.</Item>
      </Reveal>
    </div>
  </Shell>
);

/* 9. It does not always work */
export const Limits: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="It does not always work">
    <div style={{ position: "absolute", left: 120, right: 120, top: 200 }}>
      <Reveal at={t[0] + 6} out={t[2] - 8}>
        <Headline size={76} style={{ marginBottom: 44 }}>
          Dollar Tree and Family Dollar
        </Headline>
        <HBar at={mid(t, e, 0, 0.45)} label="2015: bought for" value="about $9 billion" width={1100} color={C.blue} />
        <HBar at={t[1] + 10} label="2025: sold for" value="about $1 billion" width={122} color={C.red} />
      </Reveal>
    </div>
    <Phase at={t[2] + 6} out={t[3] - 8}>
      <Sub size={56}>Dollar General's profit, fiscal 2024</Sub>
      <Headline size={220} color={C.red} style={{ marginTop: 10 }}>
        down a third
      </Headline>
      <Reveal at={mid(t, e, 2, 0.6)} style={{ marginTop: 20 }}>
        <Sub size={56} color={C.text}>
          Its customers ran short of money to spend.
        </Sub>
      </Reveal>
    </Phase>
    <Phase at={t[3] + 6}>
      <Headline size={100}>
        A business built on customers with no slack is exposed <span style={{ color: C.red }}>when they have even less.</span>
      </Headline>
    </Phase>
  </Shell>
);

/* 10. What to do with this */
export const You: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const ring = prog(frame, mid(t, e, 1, 0.45), 20);
  return (
    <Shell dur={dur} kicker="What to do with this">
      <Phase at={t[0] + 6} out={t[1] - 8}>
        <Headline size={84}>Some things there are a real bargain</Headline>
        <div style={{ marginTop: 50 }}>
          <Chips items={["Greeting cards", "Party supplies", "Seasonal goods", "Many store brands"]} at={mid(t, e, 0, 0.4)} step={16} color={C.green} />
        </div>
      </Phase>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 140, top: 300, width: 760 }}>
          <Reveal at={t[1] + 6} out={t[2] - 8}>
            <div style={{ background: C.text, borderRadius: 24, padding: "36px 46px", color: C.bg, position: "relative" }}>
              <div style={{ fontSize: 40, fontWeight: 700 }}>Laundry detergent, 25 oz</div>
              <div style={{ fontSize: 170, fontWeight: 900, lineHeight: 1.05 }}>$4.00</div>
              <div style={{ fontSize: 40, fontWeight: 700, display: "inline-block", padding: "6px 14px" }}>16.0¢ per oz</div>
              <div
                style={{
                  position: "absolute",
                  left: 30,
                  bottom: 24,
                  width: 330,
                  height: 76,
                  border: `8px solid ${C.red}`,
                  borderRadius: 40,
                  opacity: ring,
                  scale: String(1.4 - 0.4 * ring),
                }}
              />
            </div>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 1000, top: 290, width: 800 }}>
          <Reveal at={t[1] + 16} out={t[2] - 8}>
            <Sub size={54}>Ignore the big price.</Sub>
            <Headline size={88} style={{ marginTop: 20 }}>
              Find the price <span style={{ color: C.yellow }}>per ounce, per sheet, per load.</span>
            </Headline>
            <Reveal at={mid(t, e, 1, 0.7)} style={{ marginTop: 30 }}>
              <Sub size={48}>Usually in small type on the shelf label.</Sub>
            </Reveal>
          </Reveal>
        </div>
      </AbsoluteFill>
      <Phase at={t[2] + 6}>
        <Sub size={56}>If the unit price is higher, you are not saving money.</Sub>
        <Headline size={104} color={C.yellow} style={{ marginTop: 30 }}>
          You are renting a lower price for a week.
        </Headline>
      </Phase>
    </Shell>
  );
};

/* 11. Payoff */
export const Payoff: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  return (
    <Shell dur={dur}>
      <div style={{ position: "absolute", left: 110, top: 330, scale: String(interpolate(frame, [0, dur], [1.05, 1])) }}>
        <BoxStore width={640} />
      </div>
      <div style={{ position: "absolute", left: 880, top: 240, width: 940 }}>
        <Reveal at={t[0] + 8} out={t[1] - 8}>
          <Headline size={88} color={C.mute}>
            The genius is not the low price.
          </Headline>
          <Reveal at={mid(t, e, 0, 0.42)} style={{ marginTop: 30 }}>
            <Headline size={84} color={C.yellow}>
              It is knowing where a low price matters more than a good one.
            </Headline>
          </Reveal>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 880, top: 270, width: 940 }}>
        <Reveal at={t[1] + 6} out={t[2] - 8}>
          <Check size={66}>Goes where there is no competition</Check>
          <Reveal at={mid(t, e, 1, 0.35)} style={{ marginTop: 30 }}>
            <Check size={66}>Builds a store that costs almost nothing</Check>
          </Reveal>
          <Reveal at={mid(t, e, 1, 0.68)} style={{ marginTop: 30 }}>
            <Check size={66}>Sells in sizes that feel affordable</Check>
          </Reveal>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 880, top: 290, width: 940 }}>
        <Reveal at={t[2] + 6}>
          <Headline size={100}>A brilliant business.</Headline>
          <Reveal at={mid(t, e, 2, 0.4)} style={{ marginTop: 30 }}>
            <Headline size={84} color={C.yellow}>
              A good neighbor? That is a different question.
            </Headline>
          </Reveal>
        </Reveal>
      </div>
    </Shell>
  );
};

/* 12. Outro */
export const Outro: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Shell dur={dur + 1000}>
        <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", gap: 140, paddingTop: 270 }}>
          <Reveal at={t[0] + 6} out={t[1] - 6} style={{ width: 660, textAlign: "center" }}>
            <div style={{ height: 252, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <StoreIcon width={250} />
            </div>
            <Sub size={54} color={C.text} style={{ marginTop: 30 }}>
              Dollar stores hide a high price behind a small one.
            </Sub>
          </Reveal>
          <Reveal at={mid(t, e, 0, 0.42)} out={t[1] - 6} style={{ width: 660, textAlign: "center" }}>
            <div style={{ height: 252, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 104, fontWeight: 900, color: C.red, whiteSpace: "nowrap" }}>
              $32B → $0
            </div>
            <Sub size={54} color={C.text} style={{ marginTop: 30 }}>
              Next: a company that vanished in about a week.
            </Sub>
          </Reveal>
        </AbsoluteFill>
        <Center style={{ top: -90 }}>
          <Reveal at={t[1] + 6}>
            <div style={{ background: C.panel, border: `4px solid ${C.blue}`, borderRadius: 40, padding: "56px 80px", width: 1400 }}>
              <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 8, color: C.blue }}>NEXT</div>
              <Headline size={84} style={{ textAlign: "left", marginTop: 20 }}>
                How a <span style={{ color: C.red }}>$32 billion</span> company vanished in a week
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
