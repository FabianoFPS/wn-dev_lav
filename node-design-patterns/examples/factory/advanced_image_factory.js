class Image {}
class PNGImage extends Image {}
class JPGImage extends Image {}
class GIFImage extends Image {}

function createImage(type) {
  const supportedImageTypes = {
    jpg: JPGImage,
    png: PNGImage,
    gif: GIFImage,
  };

  return new (supportedImageTypes[type] || Image)();
}

module.exports = {
  createImage,
  Image,
  PNGImage,
  JPGImage,
  GIFImage,
};
