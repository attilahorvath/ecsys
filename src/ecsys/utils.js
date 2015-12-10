'use strict';

const FRAMERATE = 60;

let getCurrentTime = typeof performance !== 'undefined' ?
  () => performance.now() :
  () => Date.now();

let requestNextFrame = typeof requestAnimationFrame !== 'undefined' ?
  callback => requestAnimationFrame(callback) :
  callback => setTimeout(callback, 1000 / FRAMERATE);

export { getCurrentTime, requestNextFrame };
