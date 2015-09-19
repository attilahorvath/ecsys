(function() {
  'use strict';

  Ecsys.Systems.MouseInputSystem = {
    BUTTONS: { left: 1, right: 2, middle: 4, back: 8, forward: 16 },

    restrictPosition: true,
    captureRightClick: false,

    componentTypes: ['MouseInput'],

    initialize: function() {
      this.mousePosition = { x: 0, y: 0 };
      this.previousPosition = { x: 0, y: 0 };
      this.deltaPosition = { x: 0, y: 0 };

      this.buttonsDown = {};
      this.lastDown = {};
      this.justPressed = {};
      this.justReleased = {};

      this.canvas = this.game.getCanvas();

      addEventListener('mousemove', function(event) {
        var newPosition = { x: event.clientX - this.canvas.offsetLeft, y: event.clientY - this.canvas.offsetTop };

        if (!this.restrictPosition || (newPosition.x >= 0 && newPosition.y >= 0 && newPosition.x <= this.canvas.width && newPosition.y <= this.canvas.height)) {
          this.mousePosition = newPosition;
        }
      }.bind(this));

      addEventListener('mousedown', function(event) {
        this.buttonsDown = {};

        for (var button in this.BUTTONS) {
          if (event.buttons & this.BUTTONS[button]) {
            this.buttonsDown[button] = true;
          }
        }
      }.bind(this));

      addEventListener('mouseup', function(event) {
        this.buttonsDown = {};

        for (var button in this.BUTTONS) {
          if (event.buttons & this.BUTTONS[button] != 0) {
            this.buttonsDown[button] = true;
          }
        }
      }.bind(this));

      addEventListener('contextmenu', function(event) {
        if (this.captureRightClick) {
          event.preventDefault();
        }
      }.bind(this));
    },

    update: function(deltaTime) {
      this.deltaPosition = { x: this.mousePosition.x - this.previousPosition.x, y: this.mousePosition.y - this.previousPosition.y };

      this.justPressed = {};
      this.justReleased = {};

      for (var button in this.buttonsDown) {
        if (!this.lastDown[button]) {
          this.justPressed[button] = true;
        }
      }

      for (var button in this.lastDown) {
        if (!this.buttonsDown[button]) {
          this.justReleased[button] = true;
        }
      }

      this.game.forEachEntity(function (entity, components) {
        var mouseInput = components[0];

        var inputHandlers = mouseInput.inputHandlers || [Ecsys.MouseInputHandlers.pointer];

        for (var i = 0; i < inputHandlers.length; i++) {
          inputHandlers[i](this, entity, mouseInput, deltaTime);
        }
      }.bind(this), this.componentTypes);

      this.previousPosition = this.mousePosition;

      this.lastDown = Ecsys.Utils.clone(this.buttonsDown);
    }
  };
})();