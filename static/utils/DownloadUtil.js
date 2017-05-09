import ObjectUtil from './ObjectUtil'
import RestUtil from './RestUtil'
import QueryStringUtil from './QueryStringUtil'
import { API_FILES_DOWNLOAD } from '../constants/apis'
import config from '../config/config'
import DetectUtil from 'detect-user-agent'

function downloadByIframe (url) {
  let iframe = document.getElementById('myIframe');
  if (iframe) {
    iframe.src = url;
  } else {
    iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    iframe.id = 'myIframe';
    document.body.appendChild(iframe);
  }
}

class DownloadUtil {
  static getBase64Image (dataURL, type) {
    return new Promise(function (resolve, reject) {
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        type = type === 'jpg' ? 'jpeg' : type
        const base64DataURL = canvas.toDataURL(`image/${type}`)
        resolve(base64DataURL)
      }
      image.src = dataURL
    });
  }

  static async download (dataURL, filename = ObjectUtil.generateObjectId()) {
    const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    if (DetectUtil.browser.safari || DetectUtil.browser.firefox) {
      const params = { url: dataURL, filename }
      downloadByIframe(`${config.service_domain}${API_FILES_DOWNLOAD}${QueryStringUtil.stringify(params, true)}`)
    } else if ('download' in saveLink) {
      saveLink.download = filename
      const base64DataURL = await DownloadUtil.getBase64Image(dataURL, filename.split('.')[1] || 'png');
      saveLink.href = base64DataURL
      saveLink.target = '_blank'
      const event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      saveLink.dispatchEvent(event)
    } else {
      const params = { url: dataURL, filename }
      downloadByIframe(`${config.service_domain}${API_FILES_DOWNLOAD}${QueryStringUtil.stringify(params, true)}`)
    }
  }
}

export default DownloadUtil
