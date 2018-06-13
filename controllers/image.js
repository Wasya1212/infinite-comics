class Class {
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
}