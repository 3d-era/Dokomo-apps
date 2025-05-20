function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    let messages = 0;

    const isTeamsV2 = window.location.href.includes('/v2/');

    let badges = document.querySelectorAll(
      '.activity-badge.dot-activity-badge .activity-badge',
    );

    if (isTeamsV2) {
      badges = document.querySelectorAll('.fui-Badge');
    }

    if (badges) {
      Array.prototype.forEach.call(badges, badge => {
        messages += Dokomo.safeParseInt(badge.textContent);
      });
    }

    const indirectMessages =
      document.querySelectorAll('.app-bar-mention').length;

    Dokomo.setBadge(messages, indirectMessages);
  };

  window.addEventListener('beforeunload', async () => {
    Dokomo.releaseServiceWorkers();
  });

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
  Dokomo.injectJSUnsafe(_path.default.join(__dirname, 'webview-unsafe.js'));
};
