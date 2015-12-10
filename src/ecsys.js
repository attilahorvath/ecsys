'use strict';

import Game from './ecsys/game';
import Entity from './ecsys/entity';

import Camera from './ecsys/components/camera';
import Position from './ecsys/components/position';
import Sprite from './ecsys/components/sprite';

import Gravity from './ecsys/systems/gravity';
import Renderer from './ecsys/systems/renderer';

module.exports.Game = Game;
module.exports.Entity = Entity;

module.exports.Components = {};

module.exports.Components.Camera = Camera;
module.exports.Components.Position = Position;
module.exports.Components.Sprite = Sprite;

module.exports.Systems = {};

module.exports.Systems.Gravity = Gravity;
module.exports.Systems.Renderer = Renderer;
