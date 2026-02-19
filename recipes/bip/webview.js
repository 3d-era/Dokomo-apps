function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const elements = document.querySelectorAll(
      '.contact-list__message__unread-badge-counter',
    );
    let count = 0;
    for (const element of elements) {
      count += Dokomo.safeParseInt(element.textContent);
    }
    Dokomo.setBadge(count, 0);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
