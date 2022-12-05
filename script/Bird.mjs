import Sprite from "./Sprite.mjs";

// Bird sprite
class Bird extends Sprite {
  constructor(ctx, x, y, width, height, image) {
    super(ctx, x, y, width, height, image);
    this.gravity = 0.5;
    this.velocity = 0;
  }

  // Update bird position and move it inside the canvas
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  // Make the bird jump
  jump() {
    this.velocity = -10;
  }
}

export default Bird;
