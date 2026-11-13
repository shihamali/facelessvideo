import React from "react";
import { Composition, Still } from "remotion";
import timings01 from "./data/timings-01.json";
import timings02 from "./data/timings-02.json";
import timings03 from "./data/timings-03.json";
import { FPS, makeVideo, totalFrames } from "./timeline";
import { Figured, FloorPlan, Hook, HundredMillion, LossLeader, Markup, Threat } from "./scenesA";
import { HotDogMath, Kirkland, Limits, Membership, Outro, Payoff, Reframe, Sku, Supplier } from "./scenesB";
import * as V2 from "./v2scenes";
import * as V3 from "./v3scenes";
import { Thumb01, Thumb02, Thumb03 } from "./thumbs";

const CostcoHotDog = makeVideo(
  timings01,
  {
    hook: Hook,
    threat: Threat,
    figured: Figured,
    lossleader: LossLeader,
    floorplan: FloorPlan,
    hundredmillion: HundredMillion,
    markup: Markup,
    membership: Membership,
    reframe: Reframe,
    hotdogmath: HotDogMath,
    sku: Sku,
    supplier: Supplier,
    kirkland: Kirkland,
    limits: Limits,
    payoff: Payoff,
    outro: Outro,
  },
  "narration-01.wav",
);

const AirlinesAreBanks = makeVideo(
  timings02,
  {
    hook: V2.Hook,
    origin: V2.Origin,
    thesale: V2.TheSale,
    whybanks: V2.WhyBanks,
    scale: V2.Scale,
    flying: V2.Flying,
    keystroke: V2.Keystroke,
    currency: V2.Currency,
    inflation: V2.Inflation,
    spend: V2.Spend,
    status: V2.Status,
    pitch: V2.Pitch,
    collateral: V2.Collateral,
    catch: V2.Catch,
    payoff: V2.Payoff,
    outro: V2.Outro,
  },
  "narration-02.wav",
);

const DollarStores = makeVideo(
  timings03,
  {
    hook: V3.Hook,
    where: V3.Where,
    box: V3.Box,
    price: V3.Price,
    margins: V3.Margins,
    machine: V3.Machine,
    dollar: V3.Dollar,
    town: V3.Town,
    cost: V3.Cost,
    limits: V3.Limits,
    you: V3.You,
    payoff: V3.Payoff,
    outro: V3.Outro,
  },
  "narration-03.wav",
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="CostcoHotDog" component={CostcoHotDog} durationInFrames={totalFrames(timings01)} fps={FPS} width={1920} height={1080} />
      <Composition id="AirlinesAreBanks" component={AirlinesAreBanks} durationInFrames={totalFrames(timings02)} fps={FPS} width={1920} height={1080} />
      <Composition id="DollarStores" component={DollarStores} durationInFrames={totalFrames(timings03)} fps={FPS} width={1920} height={1080} />
      <Still id="Thumb01" component={Thumb01} width={1280} height={720} />
      <Still id="Thumb02" component={Thumb02} width={1280} height={720} />
      <Still id="Thumb03" component={Thumb03} width={1280} height={720} />
    </>
  );
};
