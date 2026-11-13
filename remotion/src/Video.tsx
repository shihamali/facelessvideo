import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import timings from "./data/timings.json";
import { C, SceneProps } from "./lib";
import { Figured, FloorPlan, Hook, HundredMillion, LossLeader, Markup, Threat } from "./scenesA";
import { HotDogMath, Kirkland, Limits, Membership, Outro, Payoff, Reframe, Sku, Supplier } from "./scenesB";

export const FPS = 30;
const TAIL_SECONDS = 12;
const LEAD_SECONDS = 0.5;

const COMPONENTS: Record<string, React.FC<SceneProps>> = {
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
};

export const TOTAL_FRAMES = Math.ceil((timings.total + TAIL_SECONDS) * FPS);

type Scene = { key: string; from: number; dur: number; t: number[]; e: number[] };

const buildScenes = (): Scene[] => {
  const groups: { key: string; beats: typeof timings.beats }[] = [];
  for (const b of timings.beats) {
    const last = groups[groups.length - 1];
    if (last && last.key === b.scene) last.beats.push(b);
    else groups.push({ key: b.scene, beats: [b] });
  }
  const starts = groups.map((g, i) => (i === 0 ? 0 : Math.round((g.beats[0].start - LEAD_SECONDS) * FPS)));
  return groups.map((g, i) => {
    const from = starts[i];
    const end = i === groups.length - 1 ? TOTAL_FRAMES : starts[i + 1];
    return {
      key: g.key,
      from,
      dur: end - from,
      t: g.beats.map((b) => Math.round(b.start * FPS) - from),
      e: g.beats.map((b) => Math.round(b.end * FPS) - from),
    };
  });
};

export const Video: React.FC = () => {
  const scenes = buildScenes();
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Audio src={staticFile("narration.wav")} />
      {scenes.map((s) => {
        const Comp = COMPONENTS[s.key];
        return (
          <Sequence key={s.key} name={s.key} from={s.from} durationInFrames={s.dur}>
            <Comp t={s.t} e={s.e} dur={s.dur} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
