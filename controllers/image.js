module.exports = poolConnection => {
  return class Image {
    constructor(image) {
      this.url = image.url;
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

    save() {
      return poolConnection.insert(Image.tableName, {
        url: this.url,
        size: this.size,
        originalName: this.originalName,
        name: this.name,
        fullName: this.fullName,
        meta: JSON.stringify(this.meta)
      });
    }

    static get tableName() {
      return 'images';
    }

    static get defaultOriginalImage() {
      return { id: 0, url: 'avatar-original.png' };
    }

    static get defaultCompressedImage() {
      return { id: 0, url: 'avatar.png' };
    }
  }
}
