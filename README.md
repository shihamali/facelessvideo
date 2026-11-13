# Faceless video production

Scripts and a code-based video pipeline for a finance and business documentary channel.

- `videos/` — production packages (script, packaging, fact-check table) and caption files
- `tools/beats.json`, `tools/beats-02.json` — the narration as recorded for Videos 1 and 2, one entry per sentence group, tagged with its scene
- `tools/tts.py` — turns `beats.json` into `narration.wav`, `timings.json` and an `.srt` caption file, using the open-source Kokoro voice model (runs locally, no API key)
- `remotion/` — the animated video (Remotion). Scene timing is read from `src/data/timings-NN.json`, so visuals stay in sync with the narration

## Rebuild a video

The commands below are for Video 1. For Video 2 use `beats-02.json`, `narration-02.wav`, `timings-02.json`, `video-02-captions.srt` and the composition `AirlinesAreBanks`.

Voice model files (`kokoro-v1.0.onnx`, `voices-v1.0.bin`) come from the kokoro-onnx GitHub releases. Put them in a folder and pass it as the first argument.

```bash
pip install kokoro-onnx soundfile
```

```bash
python tools/tts.py <model-folder> tools/beats.json remotion/public/narration-01.wav remotion/src/data/timings-01.json videos/video-01-captions.srt
```

```bash
cd remotion && npm install && npx remotion render src/index.ts CostcoHotDog out/video-01-costco-hot-dog.mp4
```

The rendered `.mp4` files and the narration `.wav` files are not stored in git.
