import { Renderer } from 'soundworks/client';

/**
 * A simple canvas renderer.
 * The class renders a dot moving over the screen and rebouncing on the edges.
 */
export default class PlayerRenderer extends Renderer {
  constructor(colors) {
    super(0); // update rate = 0: synchronize updates to frame rate

    this.colors = colors;
    this.colorsLength = colors.length;
    this.opacity = false;
  }

  /**
   * Initialize rederer state.
   * @param {Number} dt - time since last update in seconds.
   */
  init() {

  }

  /**
   * Update rederer state.
   * @param {Number} dt - time since last update in seconds.
   */
  update(dt) {

  }

  /**
   * Draw into canvas.
   * Method is called by animation frame loop in current frame rate.
   * @param {CanvasRenderingContext2D} ctx - canvas 2D rendering context
   */
  render(ctx) {
    ctx.restore();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.colors[0];
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    ctx.restore();

    if (this.opacity !== 0) {
      ctx.save();
      ctx.globalAlpha = 1 - this.opacity;
      ctx.fillStyle = this.colors[1];
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      ctx.save();
    }
  }
}
