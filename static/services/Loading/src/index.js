import Vue from 'vue'
import LoadingVue from './Loading'

const LoadingConstructor = Vue.extend(LoadingVue);

const defaultOptions = {
  text: null,
  fullscreen: true,
  body: false,
  lock: false,
  customClass: ''
}

let fullscreenLoading

LoadingConstructor.prototype.originalPosition = ''
LoadingConstructor.prototype.originalOverflow = ''

LoadingConstructor.prototype.close = function () {
  if (this.fullscreen && this.originalOverflow !== 'hidden') {
    document.body.style.overflow = this.originalOverflow
  }

  if (this.fullscreen || this.body) {
    document.body.style.position = this.originalPosition
  } else {
    this.target.style.position = this.originalPosition;
  }

  if (this.fullscreen) {
    fullscreenLoading = null
  }

  this.$el && this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  this.$destroy()
}

const addStyle = function (options, parent, instance) {
  let maskStyle = {}
  if (options.fullscreen) {
    instance.originalPosition = document.body.style.position
    instance.originalOverflow = document.body.style.overflow
  } else if (options.body) {
    instance.originalPosition = document.body.style.position

    const positionProperties = ['top', 'left']
    for (const property of positionProperties) {
      const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
      const value = options.target.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll]
      maskStyle[property] = `${value}px`
    }

    const sizeProperties = ['height', 'width']
    for (const property of sizeProperties) {
      maskStyle[property] = `${options.target.getBoundingClientRect()[property]}px`
    }
  } else {
    instance.originalPosition = parent.style.position
  }
  for (const property in maskStyle) {
    if (maskStyle.hasOwnProperty(property)) {
      instance.$el.style[property] = maskStyle[property]
    }
  }
}

const Loading = function (options = {}) {
  options = { ...defaultOptions, ...options }
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target)
  }
  options.target = options.target || document.body
  if (options.target !== document.body) {
    options.fullscreen = false
  } else {
    options.body = true
  }
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading
  }

  let parent = options.body ? document.body : options.target
  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  })

  addStyle(options, parent, instance)
  if (instance.originalPosition !== 'absolute') {
    parent.style.position = 'relative'
  }
  if (options.fullscreen && options.lock) {
    parent.style.overflow = 'hidden'
  }
  parent.appendChild(instance.$el)
  if (options.fullscreen) {
    fullscreenLoading = instance
  }
  return instance
}

export default Loading
