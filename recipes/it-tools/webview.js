function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const notifications = document.querySelectorAll('.notification-badge');
    Dokomo.setBadge(notifications.length);
  };
  Dokomo.loop(getMessages);
  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
