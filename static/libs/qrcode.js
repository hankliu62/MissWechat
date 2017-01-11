const qrcodeAlgObjCache = []
const QRCodeAlg = require('arale-qrcode/lib/qrcodealg')
const AraleQRCode = require('arale-qrcode')

/**
* 计算矩阵点的前景色
* @param {Obj} config
* @param {Number} config.row 点x坐标
* @param {Number} config.col 点y坐标
* @param {Number} config.count 矩阵大小
* @param {Number} config.options 组件的options
* @return {String}
*/
const getForeGround = function getForeGround (config) {
  const options = config.options;
  if (options.pdground && (config.row > 1 && config.row < 5 &&
    config.col > 1 && config.col < 5 || config.row > config.count - 6 &&
    config.row < config.count - 2 && config.col > 1 &&
    config.col < 5 || config.row > 1 && config.row < 5 &&
    config.col > config.count - 6 && config.col < config.count - 2)) {
    return options.pdground
  }
  return options.foreground
}

/**
* 获取当前屏幕的设备像素比 devicePixelRatio/backingStore
* @param {context} 当前 canvas 上下文，可以为 window
*/
const getPixelRatio = function getPixelRatio (context) {
  const backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1

  return (window.devicePixelRatio || 1) / backingStore
}

/**
 * 二维码构造函数，主要用于绘制
 * @param  {参数列表} opt 传递参数
 * @return {}
 */
class Qrcode {
  constructor (opt) {
    if (typeof opt === 'string') {
      // 只编码ASCII字符串
      opt = { text: opt };
    }
    // 设置默认参数
    this.options = Object.assign({}, {
      text: '',
      render: '',
      size: 256,
      correctLevel: 3,
      background: '#ffffff',
      foreground: '#000000',
      image: '',
      imageSize: 30
    }, opt)
  }

  createCanvas (qrCodeAlg, resolve, reject) {
    const options = this.options
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const count = qrCodeAlg.getModuleCount()
    const ratio = getPixelRatio(ctx)
    const size = options.size
    const ratioSize = size * ratio
    const ratioImgSize = options.imageSize * ratio
    // preload img
    const loadImage = function loadImage (url, callback) {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous')
      img.src = url;
      img.onload = function () {
        callback(this);
        img.onload = null;
      }
    }

    // 计算每个点的长宽
    const tileW = (ratioSize / count).toPrecision(4)
    const tileH = (ratioSize / count).toPrecision(4)

    canvas.width = ratioSize
    canvas.height = ratioSize
    canvas.style.width = size + 'px'
    canvas.style.height = size + 'px'

    // 绘制
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        const w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW)
        const h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW)
        const foreground = getForeGround({
          row: row,
          col: col,
          count: count,
          options: options
        })
        ctx.fillStyle = qrCodeAlg.modules[row][col] ? foreground : options.background
        ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h)
      }
    }
    if (options.image) {
      loadImage(options.image, function (img) {
        const x = ((ratioSize - ratioImgSize) / 2).toFixed(2)
        const y = ((ratioSize - ratioImgSize) / 2).toFixed(2)
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(x - 10, x - 10, ratioImgSize + 20, ratioImgSize + 20)
        ctx.drawImage(img, x, y, ratioImgSize, ratioImgSize)
        resolve(canvas)
      });
    } else {
      resolve(canvas)
    }
  }

  create () {
    // 使用QRCodeAlg创建二维码结构
    let qrCodeAlg = null;
    let shouldAlgQrcode = true
    for (let i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
      if (qrcodeAlgObjCache[i].text === this.options.text &&
        qrcodeAlgObjCache[i].text.correctLevel === this.options.correctLevel) {
        qrCodeAlg = qrcodeAlgObjCache[i].obj
        shouldAlgQrcode = false
        break
      }
    }

    if (shouldAlgQrcode) {
      qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel)
      qrcodeAlgObjCache.push({ text: this.options.text, correctLevel: this.options.correctLevel, obj: qrCodeAlg })
    }

    return new Promise(function (resolve, reject) {
      if (this.options.render) {
        switch (this.options.render) {
          case 'canvas':
            this.createCanvas(qrCodeAlg, resolve, reject)
            break;
          case 'table':
            resolve(AraleQRCode.createTable(qrCodeAlg))
            break;
          case 'svg':
            resolve(AraleQRCode.createSVG(qrCodeAlg))
            break;
          default:
            resolve(AraleQRCode.createDefault(qrCodeAlg))
        }
      } else {
        this.createCanvas(qrCodeAlg, resolve, reject)
      }
    }.bind(this))
  }
}

export default Qrcode
