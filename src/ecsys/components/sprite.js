'use strict';

class Sprite {
  constructor(image) {
    this.image = image;
  }

  get type() {
    return 'sprite';
  }
}

export default Sprite;
