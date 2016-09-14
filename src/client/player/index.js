import * as soundworks from 'soundworks/client';
import PlayerExperience from './PlayerExperience.js';
import viewTemplates from '../shared/viewTemplates';
import viewContent from '../shared/viewContent';

// list of files to load (passed to the experience)
const files = [
  'sounds/5920.MP3',
  'sounds/16332.mp3',
  'sounds/17288.mp3',
  'sounds/Mousse.wav',
];

const presets = {
  'white noise': {
    colors: ['#ffffff', '#000000'],
    synth: {
      file: 'white noise',
      resampling: 0,
      resamplingVar: 300,
    }
  },
  'tuba': {
    colors: ['#ff537e', '#74ffff'],
    synth: {
      file: 'tuba',
      resampling: 1200,
      resamplingVar: 100,
    }
  },
  'monks': {
    colors: ['#ffff00', '#ff6100'],
    synth: {
      file: 'monks',
      resampling: 400,
      resamplingVar: 600,
    }
  },
  'organ': {
    colors: ['#ffff00', '#bfff00'],
    synth: {
      file: 'organ',
      resampling: 1000,
      resamplingVar: 400,
    }
  },
  'cornemuse': {
    colors: ['#bfff00', '#74ffff'],
    synth: {
      file: 'cornemuse',
      resampling: 300,
      resamplingVar: 200,
    }
  }
}

// launch application when document is fully loaded
window.addEventListener('load', () => {
  // initialize the client with configuration received
  // from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  const config = window.soundworksConfig;
  soundworks.client.init(config.clientType, config);
  soundworks.client.setViewContentDefinitions(viewContent);
  soundworks.client.setViewTemplateDefinitions(viewTemplates);

  // create client side (player) experience
  const experience = new PlayerExperience(files, presets);

  // start the client
  soundworks.client.start();
});
