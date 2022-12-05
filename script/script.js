import Background from "./Background.mjs";
import Bird from "./Bird.mjs";
import Pipe from "./Pipe.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("start_btn");
const scoreHolder = document.querySelector(".score");
const width = canvas.width;
const height = canvas.height;
const bird = new Bird(ctx, 100, 100, 70, 70, "assets/bird.png");

bird.rotateDegree = 0;

const birdDimension = {
  width: 20,
  height: 20,
};

const background = new Background(
  ctx,
  0,
  0,
  width,
  height,
  "assets/background.jpg",
);

const background2 = new Background(
  ctx,
  width,
  0,
  width,
  height,
  "assets/background.jpg",
);

let score = 0;
let gameInfo = {
  gameRunning: false,
  isDead: false,
  running: null,
};

setTimeout(() => {
  ctx.fillStyle = "white";
  ctx.font = '18px "Press Start 2P"';
  ctx.fillText("Press start to start playing", width / 2 - 250, height / 2);
  canvas.addEventListener("click", jump);
}, 50);

const pipe = new Pipe(ctx, width, height);

function addPipe() {
  pipe.add();
}

function drawPipe() {
  pipe.draw();
}

function movePipe() {
  pipe.move();
}

function draw() {
  if (gameInfo.isDead) return;
  ctx.clearRect(0, 0, width, height);
  background.draw();
  background.move();
  background2.draw();
  background2.move();
  drawPipe();
  movePipe();
  bird.draw(bird.rotateDegree);
  bird.update();
  // If bird fell down due to the gravity or hit the top
  if (
    bird.y + birdDimension.height >= height ||
    bird.y + birdDimension.height <= 0
  ) {
    setTimeout(() => {
      endGame();
    }, 10);
  }

  // If bird hit the pipe, end the game
  if (
    (bird.y + birdDimension.height > pipe._pipe[0][0].y &&
      bird.x + birdDimension.width + 25 > pipe._pipe[0][0].x &&
      bird.x + birdDimension.width <
        pipe._pipe[0][0].x + pipe._pipe[0][0].width) ||
    (bird.y + birdDimension.height <
      pipe._pipe[0][1].y + pipe._pipe[0][1].height &&
      bird.x + birdDimension.width + 20 > pipe._pipe[0][1].x &&
      bird.x + birdDimension.width <
        pipe._pipe[0][1].x + pipe._pipe[0][1].width)
  )
    endGame();

  // If bird passed the pipe, increase score
  if (
    bird.x + birdDimension.width > pipe._pipe[0][0].x &&
    bird.x + birdDimension.width < pipe._pipe[0][0].x + pipe._pipe[0][0].width
  )
    increaseScore();
}

function startGame() {
  gameInfo.gameRunning = true;
  // Start adding pipes
  addPipe();
  gameInfo.running = setInterval(draw, 1000 / 60);
}

function jump() {
  bird.rotateDegree = -20;
  setTimeout(() => {
    bird.rotateDegree = 0;
  }, 200);
  if (gameInfo.gameRunning) bird.jump();
}

function increaseScore() {
  score++;
  scoreHolder.innerText = "Score: " + parseInt(score / 26);
}

function endGame() {
  clearInterval(gameInfo.running);
  gameInfo.running = false;
  gameInfo.gameRunning = false;
  gameInfo.isDead = true;
  startBtn.disabled = false;
  startBtn.innerText = "Restart";
  ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "white";
  ctx.font = '20px "Press Start 2P"';
  ctx.fillText("Game Over", width / 2 - 100, height / 2 - 20);
  ctx.fillText("Score: " + score, width / 2 - 90, height / 2 + 20);
  ctx.fillText("Click restart to play again", width / 2 - 250, height - 100);
}

startBtn.addEventListener("click", () => {
  if (!gameInfo.gameRunning) {
    if (gameInfo.isDead) {
      window.location.reload();
    }
    startGame();
    startBtn.disabled = true;
  }
  startBtn.disabled = true;
});

document.addEventListener("keydown", (e) => {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) jump();
});
