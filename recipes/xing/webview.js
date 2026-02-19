function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  function getUnreadConversations() {
    Dokomo.setBadge(
      document.querySelector('#unread-conversations').textContent,
    );
  }

  Dokomo.loop(getUnreadConversations);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
