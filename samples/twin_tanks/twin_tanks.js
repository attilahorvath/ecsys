(function() {
  'use strict';

  window.TwinTanks = {
    Systems: {},

    run: function() {
      var game = new Ecsys.Game({ width: 640, height: 480 });

      game.systems.push(Ecsys.Systems.KeyboardInputSystem);
      game.systems.push(Ecsys.Systems.MouseInputSystem);
      game.systems.push(Ecsys.Systems.AnimationSystem);
      game.systems.push(Ecsys.Systems.ShakeSystem);
      game.systems.push(Ecsys.Systems.MovementSystem);
      game.systems.push(Ecsys.Systems.RotationSystem);
      game.systems.push(Ecsys.Systems.GlueSystem);
      game.systems.push(Ecsys.Systems.CollisionSystem);
      game.systems.push(Ecsys.Systems.CameraSystem);
      game.systems.push(Ecsys.Systems.LifetimeSystem);
      game.systems.push(TwinTanks.Systems.TankSystem);

      game.initialize();

      for (var y = -1280; y < 1280; y += 128) {
        for (var x = -1280; x < 1280; x += 128) {
          game.createEntity([
            ['Position', { x: x, y: y }],
            ['Size', { width: 128, height: 128 }],
            ['Sprite', { source: 'images/grass.jpg' }],
            ['Drawable']
          ]);
        }
      }

      game.setTemplate('Tank', [
        ['Position', { x: 0, y: 0 }],
        ['Size', { width: 32, height: 32 }],
        ['Offset', { x: 16, y: 16 }],
        ['Velocity', { x: 0, y: 0, setRotation: true }],
        ['KeyboardInput', { speed: 0.1, inputHandlers: [Ecsys.KeyboardInputHandlers.keyboardMovement, TwinTanks.KeyboardInputHandlers.fire] }],
        ['Shake', { intensity: 1.1 }],
        ['Sprite', { source: 'images/tank.png' }],
        ['Drawable'],
        ['Tank']
      ]);

      game.setTemplate('Camera', [
        ['Position', { x: 0, y: 0 }],
        ['Size', { width: 320, height: 480 }],
        ['Camera', { canvasX: 0, canvasY: 0 }]
      ]);

      game.setTemplate('Bullet', [
        ['Position', { x: 0, y: 0 }],
        ['Size', { width: 16, height: 16 }],
        ['Offset', { x: 8, y: 8 }],
        ['Velocity', { x: 0, y: 0, setRotation: true }],
        ['Sprite', { source: 'images/bullet.png' }],
        ['Drawable']
      ]);

      game.setTemplate('Smoke', [
        ['Position', { x: 0, y: 0 }],
        ['Size', { width: 32, height: 32 }],
        ['Offset', { x: 16, y: 16 }],
        ['Transparency', { alpha: 0.9 }],
        ['Sprite', { source: 'images/smoke.png' }],
        ['Drawable'],
        ['Scaling', { x: 1, y: 1 }],
        ['Animations', [
          { component: 'Transparency', property: 'alpha', target: 0, duration: 1000 },
          { component: 'Scaling', target: { x: 5, y: 5 }, duration: 1000 }
        ]],
        ['Lifetime', { timeout: 1000 }]
      ]);

      var tankA = game.createEntityFromTemplate('Tank', [], 'TankA');

      var tankB = game.createEntityFromTemplate('Tank', [
        ['Position', { x: 0, y: 100 }],
        ['KeyboardInput', { speed: 0.1, bindings: { up: 87, down: 83, left: 65, right: 68, fire: 70 }, inputHandlers: [Ecsys.KeyboardInputHandlers.keyboardMovement, TwinTanks.KeyboardInputHandlers.fire] }],
        ['Sprite', { source: 'images/tank2.png' }]
      ], 'TankB');

      var cameraA = game.createEntityFromTemplate('Camera', [
        ['Glue', { target: tankA, offset: { x: -150, y: -230 } }]
      ], 'CameraA');

      var cameraB = game.createEntityFromTemplate('Camera', [
        ['Camera', { canvasX: 320, canvasY: 0 }],
        ['Glue', { target: tankB, offset: { x: -150, y: -230 } }]
      ], 'CameraB');

      game.main();
    }
  };
})();