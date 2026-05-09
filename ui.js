const UI = {
  update() {
    document.getElementById("score").innerText = Game.score;
    document.getElementById("lives").innerText = Game.lives;
    document.getElementById("wave").innerText = Game.wave;
  }
};
