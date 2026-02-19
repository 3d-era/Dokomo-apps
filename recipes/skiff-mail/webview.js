function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const element = document.querySelector('div[href="/mail/inbox"]');
    const matches = element.textContent.match(/\d+/);
    const unreadCount = Dokomo.safeParseInt(matches ? matches[0] : 0);
    Dokomo.setBadge(unreadCount);
  };
  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
