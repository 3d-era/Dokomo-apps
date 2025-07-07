function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const count = Dokomo.safeParseInt(
      document.querySelector(
        'a[data-test-folder-name="Inbox"] span[data-test-id="displayed-count"]',
      )?.textContent,
    );
    Dokomo.setBadge(count);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
