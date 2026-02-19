function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const badges = document
      .querySelector('home-assistant')
      .shadowRoot.querySelector('home-assistant-main')
      .shadowRoot.querySelector('ha-sidebar')
      .shadowRoot.querySelectorAll('.notification-badge');
    if (badges.length > 0) {
      const count = Dokomo.safeParseInt(
        badges[0].textContent.replaceAll(/[^\p{N}]/gu, ''),
      );
      Dokomo.setBadge(count);
    } else {
      Dokomo.setBadge(0);
    }
  };
  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
