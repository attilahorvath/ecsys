'use strict';

import Game from './game';
import Entity from './entity';
import Position from './components/position';
import Camera from './components/camera';
import Gravity from './systems/gravity';
import Renderer from './systems/renderer';

let game = new Game();

game.addSystem(new Gravity);
game.addSystem(new Renderer);

game.addEntity(new Entity([new Position(10, 50)]));
game.addEntity(new Entity([new Position(50, 20)]));
game.addEntity(new Entity([new Position]));

game.addEntity(new Entity([new Camera()]));

game.run();
