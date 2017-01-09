import ObjectUtil from './ObjectUtil'
import RestUtil from './RestUtil'
import { API_FILES_DOWNLOAD } from '../constants/apis'

class DownloadUtil {
  static async download (dataUrl, filename = ObjectUtil.generateObjectId()) {
    const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    if ('download' in saveLink) {
      saveLink.download = filename
      saveLink.href = dataUrl
      saveLink.target = '_blank'
      const event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      saveLink.dispatchEvent(event)
    } else {
      const params = {
        url: encodeURIComponent(dataUrl),
        filename
      }
      const response = await RestUtil.get(API_FILES_DOWNLOAD, { params })
      console.log(response)
    }
  }
}

export default DownloadUtil
