const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const Game = {
  state: "menu",
  score: 0,
  lives: 3,
  wave: 1,
  multiplier: 1,

  start() {
    this.state = "playing";
    document.getElementById("menu").style.display = "none";
    loop();
  }
};

const Player = {
  x: 120,
  y: canvas.height/2,
  lasers: [],
  cooldown: 0
};

let enemies = [];
let particles = [];

document.addEventListener("mousemove", e => Player.y = e.clientY);

document.addEventListener("click", () => {
  if (Game.state !== "playing") return;
  if (Player.cooldown <= 0) {
    Player.lasers.push({x: Player.x+40, y: Player.y});
    Audio.shoot();
    Player.cooldown = 8;
  }
});

function spawnEnemy() {
  enemies.push({
    x: canvas.width,
    y: Math.random()*canvas.height,
    speed: 2 + Game.wave*0.2,
    hp: 1
  });
}

function update() {
  if (Game.state !== "playing") return;

  if (Player.cooldown > 0) Player.cooldown--;

  if (Math.random() < 0.02) spawnEnemy();

  // LASERS
  Player.lasers.forEach((l,i)=>{
    l.x += 10;

    enemies.forEach((e,j)=>{
      if (Math.hypot(l.x-e.x,l.y-e.y)<20) {
        enemies.splice(j,1);
        Player.lasers.splice(i,1);

        Game.score += 1 * Game.multiplier;
        Effects.hit();
      }
    });
  });

  // ENEMIES
  enemies.forEach((e,i)=>{
    e.x -= e.speed;

    if (e.x < 0) {
      Game.lives--;
      enemies.splice(i,1);
      Effects.shake(5);
    }
  });

  if (Game.lives <= 0) {
    Game.state = "gameover";
    localStorage.setItem("highScore", Math.max(Game.score, localStorage.getItem("highScore")||0));
  }

  UI.update();
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="cyan";
  ctx.fillRect(Player.x,Player.y,40,20);

  ctx.fillStyle="red";
  Player.lasers.forEach(l=>{
    ctx.fillRect(l.x,l.y,10,2);
  });

  enemies.forEach(e=>{
    ctx.fillStyle="orange";
    ctx.beginPath();
    ctx.arc(e.x,e.y,20,0,Math.PI*2);
    ctx.fill();
  });
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
