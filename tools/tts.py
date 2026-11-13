"""Generate narration.wav, timings.json and captions.srt from beats.json using Kokoro (local TTS)."""
import json, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

model_dir, beats_path, out_wav, out_json, out_srt = sys.argv[1:6]
VOICE, SPEED = "am_michael", 0.88
GAP_BEAT, GAP_SCENE, LEAD = 0.55, 1.2, 0.6

k = Kokoro(f"{model_dir}/kokoro-v1.0.onnx", f"{model_dir}/voices-v1.0.bin")
beats = json.load(open(beats_path))
chunks, timings, t, sr = [], [], LEAD, 24000
chunks.append(np.zeros(int(LEAD * sr), dtype=np.float32))
for i, b in enumerate(beats):
    samples, sr = k.create(b.get("say", b["text"]), voice=VOICE, speed=SPEED, lang="en-us")
    samples = np.asarray(samples, dtype=np.float32)
    dur = len(samples) / sr
    timings.append({"scene": b["scene"], "text": b["text"], "start": round(t, 3), "end": round(t + dur, 3)})
    last = i == len(beats) - 1
    gap = 0 if last else (GAP_SCENE if beats[i + 1]["scene"] != b["scene"] else GAP_BEAT)
    chunks += [samples, np.zeros(int(gap * sr), dtype=np.float32)]
    t += dur + gap
    print(i, round(dur, 2), b["text"][:50], flush=True)
audio = np.concatenate(chunks)
audio = audio / max(1e-6, np.abs(audio).max()) * 0.89
sf.write(out_wav, audio, sr)
json.dump({"total": round(len(audio) / sr, 3), "beats": timings}, open(out_json, "w"), indent=1)

def ts(x):
    h, m, s = int(x // 3600), int(x % 3600 // 60), x % 60
    return f"{h:02}:{m:02}:{s:06.3f}".replace(".", ",")
with open(out_srt, "w") as f:
    for i, b in enumerate(timings, 1):
        f.write(f"{i}\n{ts(b['start'])} --> {ts(b['end'])}\n{b['text']}\n\n")
