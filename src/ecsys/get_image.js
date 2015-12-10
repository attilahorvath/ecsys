'use strict';

const images = new Map();

let getImage = source => {
  if (typeof source === 'undefined' || !source) {
    return null;
  }

  let image = images.get(source);

  if (image) {
    return image.loaded ? image : null;
  } else {
    image = new Image();

    image.addEventListener('load', () => {
      image.loaded = true;
    });

    images.set(source, image);

    image.src = source;

    return getImage(source);
  }
};

export default getImage;
