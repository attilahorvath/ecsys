'use strict';

const expect = require('chai').expect;
const Game = require('../lib/ecsys/game').default;

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  describe('Run', () => {
    it('returns true', () => {
      // expect(game.run()).to.equal(true);
    });
  });
});
