function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const count = document.querySelector(
      'a[data-test-folder-name="Inbox"] span[data-test-id="displayed-count"], [data-test-id="menu-list-item"]:has([aria-label="Inbox"]) [data-test-id="badge"] > span',
    ).textContent;
    Dokomo.setBadge(count);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
