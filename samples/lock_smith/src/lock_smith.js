'use strict';

import { Game, Entity, Components, Systems } from 'ecsys';

let game = new Game();

game.addSystem(new Systems.Renderer);

game.addEntity(new Entity([new Components.Position(10, 10), new Components.Sprite('images/body.png')]));
game.addEntity(new Entity([new Components.Camera]));

game.run();
