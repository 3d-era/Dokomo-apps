function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getInnerInt = selector => {
    const element = document.querySelector(selector);
    return element && Dokomo.safeParseInt(element.textContent);
  };

  const getMessages = () => {
    const direct =
      getInnerInt("header div[data-role='unread-notification-count']") ||
      getInnerInt('a.has-notifs div.notif-count') ||
      0;

    Dokomo.setBadge(direct);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
