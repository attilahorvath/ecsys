'use strict';

const FRAMERATE = 60;

let getCurrentTime = () => {
  if (typeof performance !== 'undefined') {
    return performance.now();
  } else {
    return Date.now();
  }
};

let requestNextFrame = callback => {
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(callback);
  } else {
    setTimeout(callback, 1000 / FRAMERATE);
  }
};

export { getCurrentTime, requestNextFrame };
