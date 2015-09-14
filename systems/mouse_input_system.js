(function() {
  'use strict';

  Ecsys.Systems.MouseInputSystem = {
    restrictPosition: true,
    componentTypes: ['MouseInput'],

    initialize: function() {
      this.mousePosition = { x: 0, y: 0 };
      this.previousPosition = { x: 0, y: 0 };
      this.deltaPosition = { x: 0, y: 0 };

      this.canvas = this.game.getCanvas();

      addEventListener('mousemove', function(event) {
        var newPosition = { x: event.clientX - this.canvas.offsetLeft, y: event.clientY - this.canvas.offsetTop };

        if (!this.restrictPosition || (newPosition.x >= 0 && newPosition.y >= 0 && newPosition.x <= this.canvas.width && newPosition.y <= this.canvas.height)) {
          this.mousePosition = newPosition;
        }
      }.bind(this));
    },

    update: function(deltaTime) {
      this.deltaPosition = { x: this.mousePosition.x - this.previousPosition.x, y: this.mousePosition.y - this.previousPosition.y };

      this.game.forEachEntity(function (entity, components) {
        var mouseInput = components[0];

        var inputHandlers = mouseInput.inputHandlers || [Ecsys.InputHandlers.pointer];

        for (var i = 0; i < inputHandlers.length; i++) {
          inputHandlers[i](this, entity, mouseInput, deltaTime);
        }
      }.bind(this), this.componentTypes);

      this.previousPosition = this.mousePosition;
    }
  };
})();