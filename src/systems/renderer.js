'use strict';

class Renderer {
  constructor(canvasSelector) {
    // TODO Use canvasSelector

    if (typeof document !== 'undefined') {
      this.canvas = document.createElement('canvas');
      document.body.appendChild(this.canvas);

      this.context = this.canvas.getContext('2d');
    }
  }

  update() {
    if (this.canvas) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.game.forEachEntity(entity => {
        if (entity.components.position) {
          this.context.fillRect(entity.components.position.x, entity.components.position.y, 10, 10);
        }
      });
    }
  }
}

export default Renderer;
