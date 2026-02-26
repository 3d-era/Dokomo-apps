function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const hasUnreads = !!document.querySelector(
      '.unread-icon,.contact aside p',
    );
    const count = document
      .querySelectorAll('.contact aside p')
      .values()
      .map(el => Dokomo.safeParseInt(el.textContent) || 1)
      .reduce((a, b) => a + b, 0);

    Dokomo.setBadge(count || +hasUnreads);
  };

  const getDialogTitle = () => {
    const username = location.pathname.match(/^\/inbox\/([^/]+)/)?.[1];
    Dokomo.setDialogTitle(username ?? null);
  };

  Dokomo.loop(() => {
    getMessages();
    getDialogTitle();
  });

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
