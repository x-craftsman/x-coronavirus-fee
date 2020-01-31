export default class Notification {
  constructor (handle) {
    this.windowHandle = handle
  }
  success (title, message) {
    this.showNotification('success', title, message)
  }
  info (title, message) {
    this.showNotification('info', title, message)
  }
  warning (title, message) {
    this.showNotification('warning', title, message)
  }
  error (title, message) {
    this.showNotification('error', title, message)
  }
  httpError (title, context) {
    const { data, status, statusText } = context
    var message = `(${data.errors[0].code})${data.errors[0].message}`
    this.showNotification('error', `${title} : ${status}-${statusText}`, message)
  }
  showNotification (type, title, message) {
    this.windowHandle[type]({
      message: title,
      description: message
    })
  }
}
