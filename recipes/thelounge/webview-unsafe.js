// Monkey patch ServiceWorker.postMessage so that it will actually post a notification in Dokomo:

function newPostMessage(options) {
  window.dokomo.displayNotification(options.title, options);
}

ServiceWorker.prototype.postMessage = newPostMessage;
