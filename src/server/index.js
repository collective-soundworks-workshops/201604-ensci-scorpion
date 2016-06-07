// Enable sourceMaps in node
import 'source-map-support/register';

// Import Soundworks library (server side) and server side experience
import * as soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';

// Initialize application with configuration options.
soundworks.server.init({
  appName: 'Scorpion',
  port: 8000,
  setup: {
    labels: ['white noise', 'tuba', 'monks', 'organ', 'cornemuse'],
    maxClientsPerPosition: 20,
  }
});
const experience = new PlayerExperience(['player', 'conductor']);
soundworks.server.start();
