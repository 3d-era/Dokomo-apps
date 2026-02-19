function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  function parseQuery(query) {
    const el = document.querySelector(query);
    return el && Dokomo.safeParseInt(el.textContent);
  }

  const getMessages = () => {
    const el = document.querySelector('.msgCount');
    let count;

    if (el && el.textContent) {
      count = Dokomo.safeParseInt(el.textContent.replaceAll(/[ ()]/gi, ''));
    } else {
      const countMessages = parseQuery(
        'mat-nav-list a[gv-test-id="sidenav-messages"] span.navItemBadge',
      );
      const countCalls = parseQuery(
        'mat-nav-list a[gv-test-id="sidenav-calls"] span.navItemBadge',
      );
      const countVoicemails = parseQuery(
        'mat-nav-list a[gv-test-id="sidenav-voicemail"] span.navItemBadge',
      );
      count = countMessages + countCalls + countVoicemails;
    }

    Dokomo.setBadge(count);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
