function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  function getNotifications() {
    let unreadNotifications = 0;
    for (const notificationCounterElement of document.querySelectorAll(
      '.notification__count',
    )) {
      unreadNotifications += Dokomo.safeParseInt(
        notificationCounterElement.textContent,
      );
    }

    Dokomo.setBadge(unreadNotifications);
  }
  Dokomo.loop(getNotifications);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
