class ImageUtil {
  static getSize (image) {
    return new Promise(function (resolve, reject) {
      if (image instanceof Image) {
        resolve({ width: image.width, height: image.height })
      } else if (Object.prototype.toString.call(image).slice(8, -1) === 'String') {
        var createImage = new Image()
        createImage.onload = function () {
          resolve({ width: createImage.width, height: createImage.height })
        }
        createImage.onerror = function () {
          reject({ width: 0, height: 0 })
        }
        createImage.src = image
      } else {
        reject({ width: 0, height: 0 })
      }
    });
  }
}

export default ImageUtil
