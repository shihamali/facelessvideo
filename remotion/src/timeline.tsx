import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { C, SceneProps } from "./lib";

export const FPS = 30;
const TAIL_SECONDS = 12;
const LEAD_SECONDS = 0.5;

export type Timings = { total: number; beats: { scene: string; text: string; start: number; end: number }[] };

export const totalFrames = (timings: Timings) => Math.ceil((timings.total + TAIL_SECONDS) * FPS);

type Scene = { key: string; from: number; dur: number; t: number[]; e: number[] };

const buildScenes = (timings: Timings): Scene[] => {
  const groups: { key: string; beats: Timings["beats"] }[] = [];
  for (const b of timings.beats) {
    const last = groups[groups.length - 1];
    if (last && last.key === b.scene) last.beats.push(b);
    else groups.push({ key: b.scene, beats: [b] });
  }
  const starts = groups.map((g, i) => (i === 0 ? 0 : Math.round((g.beats[0].start - LEAD_SECONDS) * FPS)));
  return groups.map((g, i) => {
    const from = starts[i];
    const end = i === groups.length - 1 ? totalFrames(timings) : starts[i + 1];
    return {
      key: g.key,
      from,
      dur: end - from,
      t: g.beats.map((b) => Math.round(b.start * FPS) - from),
      e: g.beats.map((b) => Math.round(b.end * FPS) - from),
    };
  });
};

/** Builds a video whose scenes are timed from the narration timings file. */
export const makeVideo = (timings: Timings, components: Record<string, React.FC<SceneProps>>, audio: string): React.FC => {
  const scenes = buildScenes(timings);
  const Video: React.FC = () => (
    <AbsoluteFill style={{ background: C.bg }}>
      <Audio src={staticFile(audio)} />
      {scenes.map((s) => {
        const Comp = components[s.key];
        return (
          <Sequence key={s.key} name={s.key} from={s.from} durationInFrames={s.dur}>
            <Comp t={s.t} e={s.e} dur={s.dur} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
  return Video;
};
