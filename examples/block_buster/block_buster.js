(function() {
  'use strict';

  window.BlockBuster = {
    Systems: {},

    run: function() {
      var game = new Ecsys.Game('#game');

      game.systems.push(Ecsys.Systems.KeyboardInputSystem);
      game.systems.push(Ecsys.Systems.MouseInputSystem);
      game.systems.push(Ecsys.Systems.AnimationSystem);
      game.systems.push(Ecsys.Systems.ShakeSystem);
      game.systems.push(Ecsys.Systems.MovementSystem);
      game.systems.push(Ecsys.Systems.GlueSystem);
      game.systems.push(Ecsys.Systems.CollisionSystem);
      game.systems.push(Ecsys.Systems.CameraSystem);

      game.initialize();

      var camera = game.createEntity('Camera');
      game.setComponent(camera, 'Position', { x: 0, y: 0 });
      game.setComponent(camera, 'Size', { width: 320, height: 240 });
      game.setComponent(camera, 'Camera', { canvasX: 0, canvasY: 0 });

      var paddle = game.createEntity('Paddle');
      game.setComponent(paddle, 'Position', { x: 0, y: 220 });
      game.setComponent(paddle, 'MouseInput', { velocity: { x: 1, y: 0 } });
      game.setComponent(paddle, 'Size', { width: 80, height: 20 });
      game.setComponent(paddle, 'Offset', { x: 40, y: 10 });
      game.setComponent(paddle, 'Constraints', { minimum: { x: 0, y: 0 }, maximum: { x: 240, y: 240 } });
      game.setComponent(paddle, 'Sprite');
      game.setComponent(paddle, 'Paddle');

      var topWall = game.createEntity();
      game.setComponent(topWall, 'Position', { x: 0, y: 0 });
      game.setComponent(topWall, 'Size', { width: 320, height: 5 });
      game.setComponent(topWall, 'Sprite');

      var leftWall = game.createEntity();
      game.setComponent(leftWall, 'Position', { x: 0, y: 0 });
      game.setComponent(leftWall, 'Size', { width: 5, height: 240 });
      game.setComponent(leftWall, 'Sprite');

      var rightWall = game.createEntity();
      game.setComponent(rightWall, 'Position', { x: 315, y: 0 });
      game.setComponent(rightWall, 'Size', { width: 5, height: 240 });
      game.setComponent(rightWall, 'Sprite');

      var ball = game.createEntity('Ball');
      game.setComponent(ball, 'Position', { x: -2, y: 205 });
      game.setComponent(ball, 'Size', { width: 10, height: 10 });
      game.setComponent(ball, 'Glue', { target: paddle, offset: { x: -2, y: -15 } });
      game.setComponent(ball, 'Offset', { x: 5, y: 5 });
      game.setComponent(ball, 'Sprite');
      game.setComponent(ball, 'Ball');

      for (var x = 0; x < 3; x++) {
        for (var y = 0; y <= 3; y++) {
          var block = game.createEntity();
          game.setComponent(block, 'Position', { x: 20 + x * 100, y: 20 + y * 30 });
          game.setComponent(block, 'Size', { width: 80, height: 20 });
          game.setComponent(block, 'Sprite');
          game.setComponent(block, 'Block');
        }
      }

      game.main();
    }
  };
})();