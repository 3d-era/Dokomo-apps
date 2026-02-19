function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const unreadMessageCountElement = document.querySelector(
      '#notifications-anchor .badge',
    );
    const unreadMessagesCount = Dokomo.safeParseInt(
      unreadMessageCountElement.textContent,
    );
    Dokomo.setBadge(unreadMessagesCount, 0);
  };
  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
