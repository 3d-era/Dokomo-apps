function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
<<<<<<< HEAD
  // TODO: If your SNAME service has unread messages, uncomment these lines to implement the logic for updating the badges
  // const getMessages = () => {
  //   // TODO: Insert your notification-finding code here
  //   Dokomo.setBadge(0, 0);
  // };
  // Dokomo.loop(getMessages);

=======
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

>>>>>>> main
  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
