// Import Soundworks server side Experience
import { Experience } from 'soundworks/server';

/**
 * Server-side 'player' experience.
 */
export default class PlayerExperience extends Experience {
  /**
   *
   */
  constructor(clientType) {
    super(clientType);

    this.placer = this.require('placer');

    this.sharedParams = this.require('shared-params');
    this.sharedParams.addNumber('minMagnitude', 'minMagnitude', 0, 1, 0.001, 0.05);
    this.sharedParams.addNumber('maxMagnitude', 'maxMagnitude', 0, 1, 0.001, 0.1);
    // name, label, options, value
    this.sharedParams.addEnum('audioFile', 'audioFile', ['white noise', 'monks', 'cornemuse', 'tuba', 'organ'], 'white noise');

    this.sharedParams.addNumber('pitch', 'pitch', -1200, 1200, 1, 0);
    this.sharedParams.addNumber('pitchVar', 'pitchVar', -1200, 1200, 1, 0);
  }

  enter(client) {
    super.enter(client);
  }

  exit(client) {
    super.exit(client);
  }
}
