import { audio } from 'soundworks/client';
const audioContext = audio.audioContext;

function createWhiteNoiseBuffer(length) {
  const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
  const channel = buffer.getChannelData(0);

  for (let i = 0; i < length; i++)
    channel[i] = Math.random() * 2 - 1;

  return buffer;
}

export default class Synthesizer extends audio.TimeEngine {
  constructor(buffers, period = 0.05) {
    super();

    this.buffers = [];
    this.buffers[0] = createWhiteNoiseBuffer(2 * audioContext.sampleRate);
    this.buffers = this.buffers.concat(buffers);
    this.bufferIndex = 0;
    this.period = period;
    this.gain = 0;
  }

  setBuffer(index) {
    this.bufferIndex = index;
  }

  setResamplingVar(value) {
    this.resamplingVar = value;
  }

  setResampling(value) {
    this.resampling = value;
  }

  setGain(val) {
    this.gain = val;
  }

  advanceTime(time) {
    if (this.gain === 0)
      return time + this.period;

    let gain = this.gain;
    gain = Math.min(Math.max(gain, 0.001), 1);
    gain *= 0.5;

    const now = audioContext.currentTime;
    const offset = Math.random() + 1;
    const duration = 0.2;
    const attack = 0.02;

    const env = audioContext.createGain();
    env.connect(audioContext.destination);
    env.gain.value = 0;
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(gain, now + attack);
    env.gain.linearRampToValueAtTime(0, now + duration);

    const source = audioContext.createBufferSource();
    source.connect(env);
    // console.log(this.bufferIndex, this.buffers[this.bufferIndex]);
    source.buffer = this.buffers[this.bufferIndex];
    const resamplingVar = (Math.random() * 0.5 - 1) * this.resamplingVar;
    source.playbackRate.value = Math.pow(2, (this.resampling + resamplingVar) / 1200);
    // source.resampling = this.resampling + Math.random() * this.resamplingVar;
    source.start(now, offset);
    source.stop(now + duration);

    this.gain = 0;
    return time + this.period;
  }
}
