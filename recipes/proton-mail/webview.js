function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    let unreadCount = 0;
    // Take the counter element from the "Inbox" folder
    for (const counterElement of document.querySelectorAll(
      '[data-testid="navigation-link:inbox"] [data-testid="navigation-link:unread-count"]',
    )) {
      const unreadCounter = Dokomo.safeParseInt(counterElement.textContent);
      unreadCount = Math.max(unreadCount, unreadCounter);
    }

    Dokomo.setBadge(unreadCount);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
