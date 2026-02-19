function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const directSelector = document.querySelectorAll(
      '.app-navigation-entry-utils-counter.highlighted',
    );
    const direct = directSelector
      ? Dokomo.safeParseInt(directSelector.length)
      : 0;

    const indirectSelector = document.querySelectorAll(
      '.app-navigation-entry-utils-counter:not(.highlighted)',
    );
    const indirect = indirectSelector
      ? Dokomo.safeParseInt(indirectSelector.length)
      : 0;

    Dokomo.setBadge(direct, indirect);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
