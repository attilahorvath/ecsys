(function() {
  'use strict';

  TwinTanks.Systems.TankSystem = {
    componentTypes: ['Tank'],

    updateEntity: function(deltaTime, entity, components) {
      var tank = components[0];

      if (!tank.timerStarted) {
        this.game.addTimer(function() {
          var position = this.game.getComponent(entity, 'Position');

          this.game.createEntityFromTemplate('Smoke', [
            ['Position', { x: position.x, y: position.y }],
            ['Rotation', { angle: Math.random() * Math.PI * 2 }]
          ]);
        }.bind(this), 700, true);

        tank.timerStarted = true;
      }
    }
  };
})();