(function() {
  'use strict';

  Ecsys.Systems.MouseInputSystem = {
    initialize: function() {
      this.mousePosition = { x: 0, y: 0 };
      this.previousPosition = { x: 0, y: 0 };

      this.canvas = this.game.getCanvas();

      addEventListener('mousemove', function(event) {
        var newPosition = { x: event.clientX - this.canvas.offsetLeft, y: event.clientY - this.canvas.offsetTop };

        if (newPosition.x >= 0 && newPosition.y >= 0 && newPosition.x <= this.canvas.width && newPosition.y <= this.canvas.height) {
          this.mousePosition = newPosition;
        }
      }.bind(this));
    },

    update: function(deltaTime) {
      var deltaPosition = { x: this.mousePosition.x - this.previousPosition.x, y: this.mousePosition.y - this.previousPosition.y };

      for (var i = 0; i < this.game.getEntityCount(); i++) {
        if (this.game.hasComponents(i, 'Position', 'MouseInput')) {
          var position = this.game.getComponent(i, 'Position');
          var mouseInput = this.game.getComponent(i, 'MouseInput');
          var velocity = this.game.getComponent(i, 'Velocity') || this.game.setComponent(i, 'Velocity', { x: 0, y: 0 });

          var mouseVelocity = mouseInput.velocity || { x: 1, y: 1 };

          velocity.x = (deltaPosition.x * mouseVelocity.x) / deltaTime;
          velocity.y = (deltaPosition.y * mouseVelocity.y) / deltaTime;
        }
      }

      this.previousPosition = this.mousePosition;
    }
  };
})();