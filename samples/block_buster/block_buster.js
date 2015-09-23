(function() {
  'use strict';

  window.BlockBuster = {
    Systems: {},

    run: function() {
      var game = new Ecsys.Game({ hideCursor: true });

      game.systems.push(Ecsys.Systems.KeyboardInputSystem);
      game.systems.push(Ecsys.Systems.MouseInputSystem);
      game.systems.push(Ecsys.Systems.AnimationSystem);
      game.systems.push(Ecsys.Systems.ShakeSystem);
      game.systems.push(Ecsys.Systems.MovementSystem);
      game.systems.push(Ecsys.Systems.GlueSystem);
      game.systems.push(Ecsys.Systems.CollisionSystem);
      game.systems.push(Ecsys.Systems.CameraSystem);
      game.systems.push(Ecsys.Systems.LifetimeSystem);

      game.initialize();

      var camera = game.createEntity([
        ['Position', { x: 0, y: 0 }],
        ['Size', { width: 320, height: 240 }],
        ['Camera', { canvasX: 0, canvasY: 0 }],
        ['KeyboardInput', { speed: 0.1, bindings: { up: 87, down: 83, left: 65, right: 68 } }]
      ], 'Camera');

      var paddle = game.createEntity([
        ['Position', { x: 0, y: 220 }],
        ['MouseInput', { velocity: { x: 1, y: 0 }, inputHandlers: [Ecsys.MouseInputHandlers.pointer, BlockBuster.MouseInputHandlers.paddle] }],
        ['Size', { width: 80, height: 20 }],
        ['Offset', { x: 40, y: 10 }],
        ['Constraints', { minimum: { x: 0, y: 0 }, maximum: { x: 240, y: 240 } }],
        ['Sprite'],
        ['Drawable'],
        ['Paddle']
      ], 'Paddle');

      var topWall = game.createEntity([
        ['Position', { x: 0, y: 0 }],
        ['Size', { width: 320, height: 5 }],
        ['Sprite'],
        ['Drawable']
      ]);

      var leftWall = game.createEntity([
        ['Position', { x: 0, y: 0 }],
        ['Size', { width: 5, height: 240 }],
        ['Sprite'],
        ['Drawable']
      ]);

      var rightWall = game.createEntity([
        ['Position', { x: 315, y: 0 }],
        ['Size', { width: 5, height: 240 }],
        ['Sprite'],
        ['Drawable']
      ]);

      var ball = game.createEntity([
        ['Position', { x: -2, y: 205 }],
        ['Velocity', { x: 0.1, y: -0.1 }],
        ['Size', { width: 10, height: 10 }],
        ['Glue', { target: paddle, offset: { x: -2, y: -15 } }],
        ['Offset', { x: 5, y: 5 }],
        ['Sprite'],
        ['Drawable'],
        ['Ball']
      ]);

      for (var x = 0; x < 3; x++) {
        for (var y = 0; y <= 3; y++) {
          var block = game.createEntity([
            ['Position', { x: 20 + x * 100, y: 20 + y * 30 }],
            ['Size', { width: 80, height: 20 }],
            ['Sprite'],
            ['Drawable'],
            ['Block']
          ]);
        }
      }

      game.main();
    }
  };
})();