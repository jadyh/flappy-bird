class Sprite {
  constructor(ctx, x, y, width, height, image) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.texture = null;
  }

  draw(angle = 0) {
    this.load();
    if (angle !== 0) {
      this.ctx.save();
      this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      this.ctx.rotate((angle * Math.PI) / 180);
      this.ctx.drawImage(
        this.texture,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height,
      );
      this.ctx.restore();
    } else {
      this.ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
    }
  }

  load() {
    this.texture = new Image();
    this.texture.src = this.image;
  }
}

export default Sprite;
