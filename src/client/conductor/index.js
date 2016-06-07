import * as soundworks from 'soundworks/client';
// import PlayerExperience from './PlayerExperience.js';

// launch application when document is fully loaded
window.addEventListener('load', () => {
  // mandatory configuration options received from the server through the html/default.ejs template
  const socketIO = window.CONFIG && window.CONFIG.SOCKET_CONFIG;
  const appName = window.CONFIG && window.CONFIG.APP_NAME;

  soundworks.client.init('conductor', { socketIO, appName });
  soundworks.client.require('shared-params', { hasGui: true });
  // start the client
  soundworks.client.start();
});
