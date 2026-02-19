function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const element = document.querySelector(
      "[aria-label='Chat'] > div > div > p",
    );
    Dokomo.setBadge(element ? Dokomo.safeParseInt(element.textContent) : 0);
  };

  Dokomo.loop(getMessages);
  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
