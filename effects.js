const Effects = {
  shakePower: 0,

  shake(p) {
    this.shakePower = p;
  },

  hit() {
    this.shake(3);
  }
};
