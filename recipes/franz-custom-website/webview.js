function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = (Dokomo, settings) => {
  Dokomo.injectCSS(_path.default.join(__dirname, 'style.css'));

  // TODO: See how this can be moved into the main dokomo app and sent as an ipc message for opening with a new window or same Dokomo recipe's webview based on user's preferences
  document.addEventListener(
    'click',
    event => {
      const link = event.target.closest('a[href^="http"]');
      const button = event.target.closest('button[title^="http"]');

      if (link || button) {
        const url = link
          ? link.getAttribute('href')
          : button.getAttribute('title');

        if (!Dokomo.isImage(link)) {
          event.preventDefault();
          event.stopPropagation();

          if (settings.trapLinkClicks === true) {
            window.location.href = url;
          } else {
            Dokomo.openNewWindow(url);
          }
        }
      }
    },
    true,
  );
};
