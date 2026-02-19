function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const directCountElement = document.querySelector('.notification_count');
    let directCount = 0;
    if (directCountElement) {
      directCount = Dokomo.safeParseInt(directCountElement.textContent);
    }

    Dokomo.setBadge(directCount, 0);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
