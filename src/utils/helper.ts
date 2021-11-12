import { message } from 'antd'

/**
 * 计算百分比
 * @example
 * totalPercentage(8589934592, 225492992)  // => 98
 */
export function totalPercentage(totalmem: number, freemem: number) {
  return Math.floor((totalmem - freemem) / totalmem * 100)
}

// 全屏浏览器
export function fullscreen() {
  try {
    const docElm = document.documentElement as any
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen()
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen()
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen()
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen()
    }
  } catch {
    message.warn('您所使用的浏览器不支持全屏')
  }
}

// 退出全屏浏览器
export function exitFullscreen() {
  try {
    const doc = document as any
    if (doc.exitFullscreen) {
      doc.exitFullscreen()
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen()
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen()
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen()
    }
  } catch {
    message.warn('您所使用的浏览器不支持退出全屏, 请按ESC')
  }
}

// 异步休眠 time 秒
export function sleep (time = 1000): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    }, time)
  })
}


// 随机字符串
export function randomCode(num = 4) {
  const CODE = 'qwertyuipasdfghjklxcvbnm13456789'
  let data = ''

  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * CODE.length)
    data += CODE[random]
  }

  return data
}
