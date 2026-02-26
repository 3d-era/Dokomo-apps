function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    let directMessages = 0;
    let indirectMessages = 0;
    const notificationElement = document.querySelector(
      '.yj-notifications-indicator-count',
    );
    const newMessagesElement = document.querySelector(
      '.yj-thread-list--new-messages-notice:not(.is-hidden) .yj-thread-list--new-message-text',
    );

    if (notificationElement) {
      directMessages = Dokomo.safeParseInt(notificationElement.textContent);
    }

    if (newMessagesElement) {
      indirectMessages = Dokomo.safeParseInt(
        newMessagesElement.textContent.match(/\d+/)[0],
      );
    }

    Dokomo.setBadge(directMessages, indirectMessages);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
