// import soundworks client side
import * as soundworks from 'soundworks/client';

// import player experience
import PlayerExperience from './PlayerExperience.js';

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
  // mandatory configuration options received from the server through the html/default.ejs template
  const socketIO = window.CONFIG && window.CONFIG.SOCKET_CONFIG;
  const appName = window.CONFIG && window.CONFIG.APP_NAME;

  // initialize the 'player' client
  soundworks.client.init('player', { socketIO, appName });

  // create client side (player) experience
  const experience = new PlayerExperience(files, presets);

  // start the client
  soundworks.client.start();
});
