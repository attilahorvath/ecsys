'use strict';

class Gravity {
  constructor(strength) {
    this.strength = strength || 0.1;
  }

  update(deltaTime) {
    this.game.forEachEntity(entity => {
      if (entity.components.position) {
        entity.components.position.y += deltaTime * this.strength;
      }
    });
  }
}

export default Gravity;
