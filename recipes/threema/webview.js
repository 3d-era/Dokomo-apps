function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const elements = document.querySelectorAll(
      '.badge.unread-count:not(.ng-hide)',
    );
    let count = 0;

    for (const element of elements) {
      try {
        count += Dokomo.safeParseInt(element.textContent);
      } catch (error) {
        console.error(error);
      }
    }

    // set Dokomo badge
    Dokomo.setBadge(count);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
