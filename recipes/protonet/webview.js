function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const unreadPrivateMessages = Dokomo.safeParseInt(
      $('.messages .unread-meeps').text(),
    );
    const unreadGroupMessages = Dokomo.safeParseInt(
      $('.today .unread-meeps').text(),
    );

    Dokomo.setBadge(unreadPrivateMessages + unreadGroupMessages);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
