function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = function getMessages() {
    const notificationsCounter = document.querySelector(
      '.js-notificationsCounter',
    );
    Dokomo.setBadge(Dokomo.safeParseInt(notificationsCounter.textContent));
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
