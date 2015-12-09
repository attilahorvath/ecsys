'use strict';

class Position {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  get type() {
    return 'position';
  }
}

export default Position;
