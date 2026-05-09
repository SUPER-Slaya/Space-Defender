const Audio = {
  ctx: new (AudioContext||webkitAudioContext)(),

  shoot() {
    let o = this.ctx.createOscillator();
    let g = this.ctx.createGain();
    o.connect(g); g.connect(this.ctx.destination);
    o.frequency.value = 600;
    g.gain.value = 0.05;
    g.gain.exponentialRampToValueAtTime(0.0001,this.ctx.currentTime+0.05);
    o.start(); o.stop(this.ctx.currentTime+0.05);
  }
};
