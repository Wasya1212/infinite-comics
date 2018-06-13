module.exports = class Image {
  constructor(image) {
    this.path = image.path;
    this.size = image.size;
    this.originalName = image.originalName;
    this.name = image.name;
    this.fullName = image.fullName;
    this.meta = {
      width: image.width,
      height: image.height,
      type: image.type,
      modifyDate: image.modifyDate,
      author: image.author,
      format: image.format
    };
  }

  static get defaultOriginalImage() {
    return { id: 1, path: 'avatar-original.png' };
  }

  static get defaultCompressedImage() {
    return { id: 1, path: 'avatar.png' };
  }
}
