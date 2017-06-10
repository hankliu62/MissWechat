import Vue from 'vue'
import NotificationVue from './Notification'

const NotificationConstructor = Vue.extend(NotificationVue)

const intervalHeight = 20
const navId = 'navbar'
const observers = []
const defaultOptions = {
  isBelowNav: true,
  type: 'success',
  isClosable: true,
  content: '',
  isBodyTarget: true,
  onClose: function () {}
}

NotificationConstructor.prototype.bindObserverEventHandler = function (type, handler) {
  this.eventHandlers = this.eventHandlers || {}
  this.eventHandlers[type] = handler
}

NotificationConstructor.prototype.close = function () {
  const subjectHeight = this.$el.getBoundingClientRect().height + intervalHeight
  const subjectIndex = this.index
  this.broadcast('close', subjectIndex, subjectHeight)
  this.$el && this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  observers.splice(this.index, 1)
  this.onClose && this.onClose()
  this.timer && clearTimeout(this.timer)
  this.$destory && this.$destory()
}

NotificationConstructor.prototype.broadcast = function (type, ...args) {
  for (const observer of (this.observers || [])) {
    observer.eventHandlers[type].call(observer, this, ...args)
  }
}

const observerCloseEventHandler = function (subject, subjectIndex, subjectHeight) {
  const observer = this
  const observerIndex = observer.index
  if (observerIndex < subjectIndex) {
    const observerTop = observer.$el.getBoundingClientRect().top
    observer.$el.style.top = `${observerTop - subjectHeight}px`
    observer.observers = observer.observers.filter(item => item.index !== subjectIndex)
  } else {
    observer.index = observerIndex - 1
  }
}

const observerCreateEventHandler = function (subject) {
  const observer = this
  observer.observers.push(subject)
  // const observerIndex = observer.index
  const subjectHeight = subject.$el.getBoundingClientRect().height + intervalHeight;
  const observerTop = observer.$el.getBoundingClientRect().top
  observer.$el.style.top = `${observerTop + subjectHeight}px`
}

const initStyle = function (instance, options) {
  let top = intervalHeight;
  if (options.isBodyTarget && options.isBelowNav) {
    const nav = document.getElementById(navId)
    if (nav) {
      const navHeight = nav.getBoundingClientRect().height;
      top = intervalHeight + navHeight
      // console.log(navHeight)
    }
  }
  instance.$el.style.top = `${top}px`;
}

const addStyles = function (instance, styles = {}) {
  for (const key in styles) {
    if (styles.hasOwnProperty(key)) {
      instance.$el.style[key] = styles[key];
    }
  }
}

const Notification = function (options = {}) {
  options = { ...defaultOptions, ...options }
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target)
  }
  options.target = options.target || document.body
  if (options.target !== document.body) {
    options.isBodyTarget = false
  } else {
    options.isBodyTarget = true
  }
  options.index = observers.length
  options.observers = [...observers]

  const instance = new NotificationConstructor({
    el: document.createElement('div'),
    data: options
  })

  initStyle(instance, options)
  addStyles(instance, { display: 'none' })
  const parent = options.target
  parent.appendChild(instance.$el)
  addStyles(instance, { display: 'block' })
  instance.bindObserverEventHandler('close', observerCloseEventHandler)
  instance.bindObserverEventHandler('create', observerCreateEventHandler);
  instance.broadcast('create')
  observers.push(instance)
  return instance
}

export default Notification
