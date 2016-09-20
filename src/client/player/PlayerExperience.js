// Import Soundworks library (client side)
import * as soundworks from 'soundworks/client';
import * as math from 'soundworks/utils/math';
import PlayerRenderer from './PlayerRenderer';
import Synthesizer from './Synthesizer';

const audioContext = soundworks.audioContext;

const viewTemplate = `
  <canvas class="background"></canvas>
  <div class="foreground">
    <div class="section-top flex-middle"></div>
    <div class="section-center flex-center">
      <p id="value"><%= title %></p>
    </div>
    <div class="section-bottom flex-middle"></div>
  </div>
`;

const audioFiles = ['white noise', 'monks', 'cornemuse', 'tuba', 'organ'];

const scheduler = soundworks.audio.getSimpleScheduler();

/**
 * `player` experience.
 * This experience plays a sound when it starts, and plays another sound when
 * other clients join the experience.
 */
export default class PlayerExperience extends soundworks.Experience {
  constructor(files, presets) {
    super();

    this.presets = presets;
    this.preset = null;

    this.platform = this.require('platform', { features: ['web-audio'] });
    this.placer = this.require('placer');
    this.motionInput = this.require('motion-input', { 
      descriptors: ['acceleration']
    });
    this.sharedParams = this.require('shared-params');
    this.loader = this.require('loader', { files });

    this.processStream = this.processStream.bind(this);
  }

  init() {
    this.preset = this.presets[this.placer.label];
    // initialize the view
    this.viewTemplate = viewTemplate;
    this.viewContent = { title: `` };
    this.viewCtor = soundworks.CanvasView;
    this.view = this.createView();

    this.magnitude = 0;
    this.lastMagnitude = 0;
    this.lastLastMagnitude = 0;

    this.minMagnitude = 0.23;
    this.maxMagnitude = 0.24;
    this.scale = math.getScaler(this.minMagnitude, this.maxMagnitude, 0, 1);

    this.synth = new Synthesizer(this.loader.buffers);
  }

  start() {
    super.start(); // don't forget this

    if (!this.hasStarted)
      this.init();

    this.show();

    if (this.motionInput.isAvailable('acceleration'))
      this.motionInput.addListener('acceleration', this.processStream);
    else
      alert('This application only works on a mobile device');

    // initialize rendering
    this.renderer = new PlayerRenderer(this.preset.colors);
    this.view.addRenderer(this.renderer);
    // this given function is called before each update (`Renderer.render`) of the canvas
    this.view.setPreRender(function(ctx, dt) {
      ctx.save();
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, ctx.width, ctx.height);
      ctx.restore();
    });

    // for dev
    this.sharedParams.addParamListener('minMagnitude', (val) => {
      this.minMagnitude = val;
      this.scale = math.getScaler(this.minMagnitude, this.maxMagnitude, 0, 1);
    });

    this.sharedParams.addParamListener('maxMagnitude', (val) => {
      this.maxMagnitude = val;
      this.scale = math.getScaler(this.minMagnitude, this.maxMagnitude, 0, 1);
    });

    this.sharedParams.addParamListener('audioFile', (value, index) => {
      this.synth.setBuffer(audioFiles.indexOf(value));
    });

    this.sharedParams.addParamListener('pitch', (value) => {
      this.synth.setResampling(value);
    });

    this.sharedParams.addParamListener('pitchVar', (value) => {
      this.synth.setResamplingVar(value);
    });

    // apply preset after sharedParams
    this.synth.setBuffer(audioFiles.indexOf(this.preset.synth.file));
    this.synth.setResampling(this.preset.synth.resampling);
    this.synth.setResamplingVar(this.preset.synth.resamplingVar);

    scheduler.add(this.synth);
  }

  processStream(data) {
    // switch values
    this.lastLastMagnitude = this.lastMagnitude;
    this.lastMagnitude = this.magnitude;

    this.magnitude = Math.sqrt(data[0] * data[0] + data[1] * data[1] + data[2] * data[2]);

    if (this.magnitude <= this.maxMagnitude && this.magnitude >= this.minMagnitude) {
      // back from a peak
      if (this.magnitude < this.lastMagnitude &&
        this.lastMagnitude > this.lastLastMagnitude &&
        this.lastMagnitude > this.maxMagnitude
      ) {
        this.normMagnitude = 0;
      }

      this.normMagnitude = this.scale(this.magnitude);
    } else {
      this.normMagnitude = 0;
    }

    this.renderer.opacity = this.normMagnitude;
    this.synth.setGain(this.normMagnitude);
  }
}





