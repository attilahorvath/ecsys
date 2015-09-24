(function() {
  'use strict';

  window.LockSmith = {
    Systems: {},

    run: function() {
      var game = new Ecsys.Game({ width: 320, height: 320 });

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
      game.systems.push(LockSmith.Systems.BodySystem);
      game.systems.push(LockSmith.Systems.DialSystem);

      game.initialize();

      game.createEntity([
        ['Position', { x: 160, y: 70 }],
        ['Size', { width: 98, height: 164 }],
        ['Sprite', { source: 'images/shackle.png' }],
        ['Offset', { x: 50, y: 0 }],
        ['Drawable']
      ], 'Shackle');

      game.createEntity([
        ['Position', { x: 160, y: 220 }],
        ['Size', { width: 160, height: 160 }],
        ['Sprite', { source: 'images/body.png' }],
        ['Offset', { x: 80, y: 80 }],
        ['Body'],
        ['Drawable']
      ], 'Body');

      game.createEntity([
        ['Position', { x: 160, y: 220 }],
        ['Size', { width: 108, height: 100 }],
        ['Sprite', { source: 'images/dial.png' }],
        ['Offset', { x: 50, y: 50 }],
        ['Drawable'],
        ['KeyboardInput', { inputHandlers: [LockSmith.KeyboardInputHandlers.dial] }],
        ['Dial']
      ], 'Dial');

      game.createEntity([
        ['Position', { x: 160, y: 10 }],
        ['Size', { width: 320, height: 240 }],
        ['Text', { text: 'Level 1', align: 'center' }],
        ['Drawable']
      ], 'Level');

      game.createEntity([
        ['Position', { x: 160, y: 220 }],
        ['Size', { width: 320, height: 240 }],
        ['Text', { font: 'bold 15px sans-serif', baseline: 'middle', align: 'center', text: '1' }],
        ['Drawable']
      ], 'Progress');

      game.createEntity([
        ['Position', { x: 0, y: 0 }],
        ['Size', { width: 320, height: 320 }],
        ['Camera', { canvasX: 0, canvasY: 0 }]
      ], 'Camera');

      game.main();
    }
  };
})();