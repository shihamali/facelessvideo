import React from "react";
import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import {
  Arrow,
  Bottle,
  C,
  Center,
  Count,
  Headline,
  HotDog,
  MemberCard,
  Person,
  Pill,
  Plane,
  prog,
  Reveal,
  SceneProps,
  Shell,
  Stamp,
  Sub,
} from "./lib";

const mid = (t: number[], e: number[], i: number, f = 0.5) => Math.round(t[i] + (e[i] - t[i]) * f);

/* 7. Membership */
const VBar: React.FC<{ at: number; h: number; color: string; value: string; label: string }> = ({
  at,
  h,
  color,
  value,
  label,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 34);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 420, opacity: prog(frame, at, 10) }}>
      <div style={{ fontSize: 92, fontWeight: 900, color, opacity: p }}>{value}</div>
      <div style={{ width: 300, height: h * p, background: color, borderRadius: "18px 18px 0 0", marginTop: 14 }} />
      <div style={{ fontSize: 44, fontWeight: 600, color: C.mute, marginTop: 22 }}>{label}</div>
    </div>
  );
};

export const Membership: React.FC<SceneProps> = ({ t, e, dur }) => {
  return (
    <Shell dur={dur} kicker="The real product" source="Source: Costco results for fiscal 2025 (year ended August 31, 2025)">
      <AbsoluteFill>
        <Reveal at={t[0] + 6} out={t[3] - 8} style={{ position: "absolute", left: 120, top: 300, rotate: "-5deg" }}>
          <MemberCard width={620} />
        </Reveal>
        <div style={{ position: "absolute", left: 880, top: 200, width: 920 }}>
          <Reveal at={mid(t, e, 0, 0.42)} out={t[1] - 8} style={{ display: "flex", gap: 40 }}>
            <Pill style={{ flex: 1 }}>
              <div style={{ fontSize: 130, fontWeight: 900 }}>$65</div>
              <Sub size={40}>a year, standard</Sub>
            </Pill>
            <Reveal at={mid(t, e, 0, 0.68)} style={{ flex: 1 }}>
              <Pill color={C.yellow}>
                <div style={{ fontSize: 130, fontWeight: 900, color: C.yellow }}>$130</div>
                <Sub size={40}>a year, executive</Sub>
              </Pill>
            </Reveal>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 880, top: 250, width: 920 }}>
          <Reveal at={t[1] + 6} out={t[3] - 8}>
            <Count
              at={t[1] + 10}
              len={50}
              to={5.3}
              format={(n) => `$${n.toFixed(1)} billion`}
              style={{ fontSize: 150, fontWeight: 900, color: C.green, letterSpacing: -4 }}
            />
            <Sub style={{ marginTop: 6 }}>in membership fees a year</Sub>
          </Reveal>
          <Reveal at={mid(t, e, 2, 0.45)} out={t[3] - 8} style={{ marginTop: 60 }}>
            <Headline size={66}>
              Costs almost nothing to supply. <span style={{ color: C.green }}>Nearly all profit.</span>
            </Headline>
          </Reveal>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "flex-end", gap: 60, paddingBottom: 150 }}>
        <VBar at={mid(t, e, 3, 0.12)} h={520} color={C.mute} value="$8.1B" label="Total profit" />
        <VBar at={mid(t, e, 3, 0.3)} h={340} color={C.green} value="$5.3B" label="Membership fees" />
        <Reveal at={mid(t, e, 3, 0.55)} style={{ width: 520, alignSelf: "center" }}>
          <div style={{ fontSize: 60, fontWeight: 600, color: C.mute }}>Fees equal about</div>
          <div style={{ fontSize: 210, fontWeight: 900, color: C.yellow, lineHeight: 1 }}>65%</div>
          <div style={{ fontSize: 60, fontWeight: 600, color: C.mute }}>of profit</div>
        </Reveal>
      </AbsoluteFill>
    </Shell>
  );
};

/* 8. Reframe */
export const Reframe: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const strike = prog(frame, mid(t, e, 0, 0.42), 16);
  return (
    <Shell dur={dur} kicker="In other words" source="Renewal rate: Costco, fiscal 2025">
      <Center>
        <Reveal at={t[0] + 6} out={t[2] - 8}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Headline size={84} color={C.mute}>
              A store that charges a fee
            </Headline>
            <div style={{ position: "absolute", left: 0, top: "54%", height: 9, borderRadius: 5, background: C.red, width: `${strike * 100}%` }} />
          </div>
          <Reveal at={mid(t, e, 0, 0.55)} style={{ marginTop: 50 }}>
            <Headline size={112}>
              A <span style={{ color: C.yellow }}>membership business</span> that runs a store
            </Headline>
          </Reveal>
          <Reveal at={t[1] + 6} style={{ marginTop: 60 }}>
            <Sub size={52}>The warehouse exists to make the membership worth renewing.</Sub>
          </Reveal>
        </Reveal>
      </Center>
      <Center>
        <Reveal at={t[2] + 6}>
          <div style={{ display: "flex", gap: 26, justifyContent: "center" }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Person
                key={i}
                width={120}
                color={interpolateColors(prog(frame, mid(t, e, 2, 0.3) + i * 5, 10), [0, 1], [C.line, i < 9 ? C.green : C.line])}
              />
            ))}
          </div>
          <Reveal at={mid(t, e, 2, 0.4)} style={{ marginTop: 70 }}>
            <Headline size={100}>
              About <span style={{ color: C.green }}>9 in 10</span> members renew
            </Headline>
            <Sub style={{ marginTop: 20 }}>92.3% in the United States and Canada</Sub>
          </Reveal>
        </Reveal>
      </Center>
    </Shell>
  );
};

/* 9. Hot dog math */
export const HotDogMath: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const chain = ["Honest prices", "Trust", "Renewals", "Fee profit"];
  return (
    <Shell dur={dur} kicker="Now the hot dog makes sense">
      <div style={{ position: "absolute", left: 120, right: 120, top: 290 }}>
        <Reveal at={mid(t, e, 0, 0.35)} out={t[2] - 8}>
          <Sub size={48}>Charging 50¢ more on every hot dog</Sub>
          <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 14 }}>
            <div style={{ height: 110, width: 18, background: C.red, borderRadius: 6 }} />
            <div style={{ fontSize: 84, fontWeight: 900, color: C.red }}>tens of millions</div>
          </div>
          <Reveal at={t[1] + 6} style={{ marginTop: 80 }}>
            <Sub size={48}>Membership fees</Sub>
            <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 14 }}>
              <div style={{ height: 110, width: 1100 * prog(frame, t[1] + 10, 40), background: C.green, borderRadius: 14 }} />
              <div style={{ fontSize: 84, fontWeight: 900, color: C.green }}>$5.3 billion</div>
            </div>
          </Reveal>
          <Reveal at={mid(t, e, 1, 0.5)} style={{ marginTop: 70 }}>
            <Sub size={50} color={C.text}>
              …and the fees depend on members believing the prices are honest.
            </Sub>
          </Reveal>
        </Reveal>
      </div>
      <Center>
        <Reveal at={t[2] + 4}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, justifyContent: "center" }}>
            {chain.map((c, i) => (
              <React.Fragment key={c}>
                <Reveal at={t[2] + 8 + i * 14}>
                  <Pill color={i === 3 ? C.green : i === 0 ? C.yellow : C.line} style={{ width: 340 }}>
                    {c}
                  </Pill>
                </Reveal>
                {i < 3 ? (
                  <Reveal at={t[2] + 14 + i * 14} y={0}>
                    <Arrow />
                  </Reveal>
                ) : null}
              </React.Fragment>
            ))}
          </div>
          <Reveal at={mid(t, e, 2, 0.5)} style={{ marginTop: 90 }}>
            <Headline size={88}>
              Trading that for hot dog money would be a <span style={{ color: C.red }}>terrible deal.</span>
            </Headline>
          </Reveal>
        </Reveal>
      </Center>
    </Shell>
  );
};

/* 10. Product count */
const Grid: React.FC<{ n: number; cols: number; at: number; color: string }> = ({ n, cols, at, color }) => {
  const frame = useCurrentFrame();
  const shown = interpolate(frame, [at, at + 36], [0, n], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 22px)`, gap: 6 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: color, opacity: i < shown ? 1 : 0 }} />
      ))}
    </div>
  );
};
const BRANDS = ["#EF4444", "#F97316", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#F472B6", "#22D3EE", "#A3E635", "#FB7185"];

export const Sku: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const gone = prog(frame, mid(t, e, 2, 0.12), 24);
  return (
    <Shell dur={dur} kicker="How the prices get that low">
      <Center>
        <Reveal at={t[0] + 6} out={t[1] - 8}>
          <Headline size={104}>How does Costco get prices that low to begin with?</Headline>
          <Reveal at={mid(t, e, 0, 0.72)} style={{ marginTop: 50 }}>
            <Sub size={60} color={C.yellow}>
              A choice that looks like a weakness.
            </Sub>
          </Reveal>
        </Reveal>
      </Center>
      <div style={{ position: "absolute", left: 120, right: 120, top: 180, display: "flex", gap: 110 }}>
        <Reveal at={t[1] + 4}>
          <Sub size={44}>Typical supermarket</Sub>
          <div style={{ fontSize: 110, fontWeight: 900, color: C.red, marginBottom: 20 }}>30,000+</div>
          <Grid n={300} cols={30} at={t[1] + 10} color={C.red} />
        </Reveal>
        <Reveal at={mid(t, e, 1, 0.6)}>
          <Sub size={44}>Costco</Sub>
          <div style={{ fontSize: 110, fontWeight: 900, color: C.green, marginBottom: 20 }}>about 4,000</div>
          <Grid n={40} cols={10} at={mid(t, e, 1, 0.62)} color={C.green} />
          <Sub size={32} style={{ marginTop: 20 }}>
            Each square is 100 products
          </Sub>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 120, right: 120, top: 700, display: "flex", alignItems: "flex-end", gap: 60 }}>
        <Reveal at={t[2]} style={{ display: "flex", gap: 14 }}>
          {BRANDS.map((c, i) => (
            <div key={c} style={{ opacity: i === 0 ? 1 : 1 - gone }}>
              <Bottle width={70} color={c} />
            </div>
          ))}
        </Reveal>
        <Reveal at={mid(t, e, 2, 0.15)}>
          <Headline size={70}>One kind of ketchup.</Headline>
          <Sub size={44}>You do not get to choose much.</Sub>
        </Reveal>
      </div>
    </Shell>
  );
};

/* 11. Supplier */
export const Supplier: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  const win = prog(frame, t[1] + 6, 30);
  const checks = ["Less to stock", "Less to track", "Less to throw away"];
  return (
    <Shell dur={dur} kicker="The supplier's side">
      <AbsoluteFill style={{ opacity: 1 - prog(frame, t[2] - 10, 10) }}>
        <div style={{ position: "absolute", left: 120, right: 120, top: 190 }}>
          <Reveal at={t[0] + 6} out={t[1] - 4}>
            <Headline size={80}>Supermarket: ten brands fight for one shelf</Headline>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 120, right: 120, top: 190 }}>
          <Reveal at={t[1] + 6}>
            <Headline size={80}>
              Costco: the winner gets the <span style={{ color: C.yellow }}>whole shelf</span>
            </Headline>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 180, right: 180, top: 370 }}>
          <Reveal at={mid(t, e, 0, 0.3)}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 30px" }}>
              {BRANDS.map((c) => (
                <Bottle key={c} width={110} color={interpolateColors(win, [0, 1], [c, BRANDS[0]])} />
              ))}
            </div>
            <div style={{ height: 26, background: C.line, borderRadius: 8, marginTop: -4 }} />
          </Reveal>
          <Reveal at={mid(t, e, 1, 0.5)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30, marginTop: 60 }}>
            <Pill style={{ width: 520 }}>Enormous order</Pill>
            <Arrow />
            <Pill color={C.green} style={{ width: 520, color: C.green }}>
              Enormous discount
            </Pill>
          </Reveal>
        </div>
      </AbsoluteFill>
      <AbsoluteFill>
        <Reveal at={t[2] + 6} style={{ position: "absolute", left: 160, top: 300 }}>
          <svg width={620} height={560} viewBox="0 0 620 560">
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <rect key={`${r}${c}`} x={40 + c * 182} y={40 + r * 142} width={172} height={132} rx={12} fill="#C9975B" stroke="#8A6234" strokeWidth={6} />
              )),
            )}
            <rect x="20" y="470" width="580" height="26" rx="6" fill="#8A6234" />
            {[40, 280, 520].map((x) => (
              <rect key={x} x={x} y="496" width="60" height="44" fill="#6F4E28" />
            ))}
          </svg>
        </Reveal>
        <div style={{ position: "absolute", left: 920, top: 280, width: 880 }}>
          <Reveal at={t[2] + 6}>
            <Headline size={80}>Fewer products means:</Headline>
          </Reveal>
          {checks.map((c, i) => (
            <Reveal key={c} at={mid(t, e, 2, 0.1 + i * 0.1)} style={{ marginTop: 34 }}>
              <div style={{ fontSize: 64, fontWeight: 700 }}>
                <span style={{ color: C.green }}>✓</span> {c}
              </div>
            </Reveal>
          ))}
          <Reveal at={mid(t, e, 2, 0.48)} style={{ marginTop: 60 }}>
            <Sub size={50} color={C.yellow}>
              Goods arrive on pallets and are sold from the same pallets.
            </Sub>
          </Reveal>
        </div>
      </AbsoluteFill>
    </Shell>
  );
};

/* 12. Kirkland */
export const Kirkland: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="And if the supplier says no">
    <Center>
      <Reveal at={t[0] + 6} out={t[1] - 8}>
        <Sub size={56}>When a supplier will not give a good enough price,</Sub>
        <Headline size={130} style={{ marginTop: 30 }}>
          Costco <span style={{ color: C.yellow }}>makes its own.</span>
        </Headline>
      </Reveal>
    </Center>
    <Center>
      <Reveal at={t[1] + 6}>
        <Sub size={56}>Kirkland Signature sells</Sub>
        <Headline size={150} color={C.green} style={{ marginTop: 20 }}>
          tens of billions of dollars
        </Headline>
        <Sub size={56} style={{ marginTop: 20 }}>
          of goods a year
        </Sub>
        <Reveal at={mid(t, e, 1, 0.65)} style={{ marginTop: 50 }}>
          <Sub size={48} color={C.text}>
            More than many famous brands.
          </Sub>
        </Reveal>
      </Reveal>
    </Center>
  </Shell>
);

/* 13. Limits */
const Catch: React.FC<{ n: number; title: string; sub?: React.ReactNode }> = ({ n, title, sub }) => (
  <div
    style={{
      display: "flex",
      gap: 36,
      alignItems: "flex-start",
      background: C.panel,
      border: `3px solid ${C.line}`,
      borderRadius: 28,
      padding: "30px 40px",
      minHeight: 150,
    }}
  >
    <div style={{ fontSize: 84, fontWeight: 900, color: C.red, lineHeight: 1, width: 70 }}>{n}</div>
    <div>
      <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
      {sub}
    </div>
  </div>
);

export const Limits: React.FC<SceneProps> = ({ t, e, dur }) => (
  <Shell dur={dur} kicker="The catch">
    <Center>
      <Reveal at={t[0] + 6} out={t[1] - 8}>
        <Headline size={120}>
          None of this is charity. It does <span style={{ color: C.red }}>not work for everyone.</span>
        </Headline>
      </Reveal>
    </Center>
    <div style={{ position: "absolute", left: 120, right: 120, top: 190, display: "flex", flexDirection: "column", gap: 34 }}>
      <Reveal at={t[1] + 6}>
        <Catch
          n={1}
          title="You need storage space, a car, and cash up front"
          sub={
            <Reveal at={mid(t, e, 1, 0.6)} y={0}>
              <Sub size={44} style={{ marginTop: 10 }}>
                Bulk is only a bargain if you can afford it today.
              </Sub>
            </Reveal>
          }
        />
      </Reveal>
      <Reveal at={t[2] + 6}>
        <Catch
          n={2}
          title="The layout is built to make you wander"
          sub={
            <Reveal at={t[3] + 6} y={0}>
              <Sub size={44} style={{ marginTop: 10 }}>
                The low prices are real. So is the $300 receipt.
              </Sub>
            </Reveal>
          }
        />
      </Reveal>
      <Reveal at={t[4] + 6}>
        <Catch
          n={3}
          title="The fee does rise"
          sub={
            <Sub size={44} style={{ marginTop: 10 }}>
              $60 to $65 in 2024, the first increase since 2017.
            </Sub>
          }
        />
      </Reveal>
      <Reveal at={mid(t, e, 5, 0.4)} style={{ marginTop: 14 }}>
        <Sub size={46} color={C.yellow} style={{ textAlign: "center" }}>
          The whole machine runs on members feeling they got the better half of the deal.
        </Sub>
      </Reveal>
    </div>
  </Shell>
);

/* 14. Payoff */
export const Payoff: React.FC<SceneProps> = ({ t, e, dur }) => {
  const frame = useCurrentFrame();
  return (
    <Shell dur={dur}>
      <div style={{ position: "absolute", left: 110, top: 320, scale: String(interpolate(frame, [0, dur], [1.05, 1])) }}>
        <HotDog width={800} />
      </div>
      <Stamp at={mid(t, e, 2, 0.72)} color={C.green} style={{ left: 300, top: 690 }}>
        $1.50: SAFE
      </Stamp>
      <div style={{ position: "absolute", left: 960, top: 250, width: 860 }}>
        <Reveal at={t[0] + 10}>
          <Headline size={100} color={C.mute}>
            Not a product.
          </Headline>
        </Reveal>
        <Reveal at={mid(t, e, 0, 0.42)} style={{ marginTop: 16 }}>
          <Headline size={90} color={C.yellow}>
            An advertisement.
          </Headline>
        </Reveal>
        <Reveal at={mid(t, e, 1, 0.4)} style={{ marginTop: 56 }}>
          <Sub size={52} color={C.text}>
            It buys the one thing the profit depends on: your belief that the price is fair.
          </Sub>
        </Reveal>
        <Reveal at={mid(t, e, 2, 0.75)} style={{ marginTop: 50 }}>
          <Sub size={40}>Costco's finance chief, 2024</Sub>
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
            <HotDog width={480} />
            <Sub size={54} color={C.text} style={{ marginTop: 30 }}>
              Costco hides its business behind a hot dog.
            </Sub>
          </Reveal>
          <Reveal at={mid(t, e, 0, 0.55)} out={t[1] - 6} style={{ width: 640, textAlign: "center" }}>
            <div style={{ height: 252, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plane width={400} />
            </div>
            <Sub size={54} color={C.text} style={{ marginTop: 30 }}>
              Airlines hide theirs behind a seat.
            </Sub>
          </Reveal>
        </AbsoluteFill>
        <Center style={{ top: -90 }}>
          <Reveal at={t[1] + 6}>
            <div style={{ background: C.panel, border: `4px solid ${C.blue}`, borderRadius: 40, padding: "56px 80px", width: 1400 }}>
              <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 8, color: C.blue }}>NEXT</div>
              <div style={{ display: "flex", alignItems: "center", gap: 50, marginTop: 20 }}>
                <Plane width={220} />
                <Headline size={84} style={{ textAlign: "left" }}>
                  Airlines aren't airlines anymore. They're banks.
                </Headline>
              </div>
            </div>
          </Reveal>
        </Center>
        <Center style={{ top: 640, bottom: 0, height: 300 }}>
          <Reveal at={t[2] + 6}>
            <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
              <div style={{ background: C.red, borderRadius: 24, padding: "26px 60px", fontSize: 60, fontWeight: 900, letterSpacing: 3 }}>
                SUBSCRIBE
              </div>
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
