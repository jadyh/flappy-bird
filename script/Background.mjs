import Sprite from "./Sprite.mjs";

// Background class to generate backgrounds
class Background extends Sprite {
  constructor(ctx, x, y, width, height, image) {
    super(ctx, x, y, width, height, image);
    this.speed = 2;
  }

  // Move the background with the character
  move() {
    this.x -= this.speed;
    if (this.x <= -this.width) {
      // When the background exit the canvas put it back at the start, to generate the illusion of infinity background
      this.x = this.width;
    }
  }
}

export default Background;
