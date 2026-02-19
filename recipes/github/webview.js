function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const newCountMatch = document
      .querySelector('a.h6[href^="/notifications?query="]')
      ?.textContent?.match(/\d+/);
    Dokomo.setBadge(
      Dokomo.safeParseInt(
        document.querySelector('li[data-item-id="inbox"] .Counter')
          ?.textContent,
      ) + Dokomo.safeParseInt(newCountMatch ? newCountMatch[0] : 0),
      document.querySelectorAll(
        '#AppHeader-notifications-button.AppHeader-button--hasIndicator, ' +
          '[data-target="notification-indicator.badge"]:not([hidden])',
      ).length,
    );
  };
  Dokomo.loop(getMessages);
  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
