import Sprite from "./Sprite.mjs";

// Generate random number between 2 ranges
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Pipe class to generate pipes
class Pipe extends Sprite {
  constructor(ctx, width, height) {
    super(ctx);
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.pipeDimensions = {
      width: 80,
      height: 200,
    };
    this._pipe = [];
    this.track = 0;
    this.speed = 3;
  }
  add(x, y, width, height) {
    // Add 2 pipes one on top and one on bottom
    this._pipe.push([
      new Sprite(
        this.ctx,
        this.width,
        this.height - this.pipeDimensions.height + random(2, 100), // randomize the height of the pipe
        this.pipeDimensions.width,
        this.pipeDimensions.height,
        "assets/pipe.png",
      ),
      new Sprite(
        this.ctx,
        this.width,
        0 - random(2, 30),
        this.pipeDimensions.width,
        this.pipeDimensions.height,
        "assets/pipe.png",
      ),
    ]);
  }

  draw() {
    this._pipe.forEach((pipe) => {
      pipe[0].draw();
      pipe[1].draw(180); // rotate 180 degree
    });
  }

  // Move the pipes with the screen
  move() {
    this._pipe.forEach((pipe) => {
      pipe[0].x -= this.speed;
      pipe[1].x -= this.speed;
      if (pipe[0].x <= this.width / 2) {
        if (this.track == 1) this.add();
        if (this.track == 2) {
          setTimeout(() => {
            this.add();
          }, 1000);
        }
        this.track++;
      }
      if (pipe[0].x <= -pipe[0].width || pipe[1].x <= -pipe[1].width) {
        this._pipe.shift();
        this.add();
        console.log(this._pipe);
      }
    });
  }
}

export default Pipe;
