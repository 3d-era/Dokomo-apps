function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = (Dokomo, settings) => {
  const telegramVersion = document
    .querySelector('meta[property="og:url"]')
    ?.getAttribute('content');

  const isWebK = telegramVersion?.includes('/k/');

  // There are two different Telegram versions for internal competition
  // Read more: https://bugs.telegram.org/c/4002/public
  const webZCount = () => {
    let directCount = 0;
    let groupCount = 0;

    const directCountSelector = document.querySelectorAll(
      '.chat-list .ListItem.private .ChatBadge.unread:not(.muted)',
    );
    const groupCountSelector = document.querySelectorAll(
      '.chat-list .ListItem.group .ChatBadge.unread:not(.muted)',
    );

    for (const badge of directCountSelector) {
      directCount += Dokomo.safeParseInt(badge.textContent);
    }

    for (const badge of groupCountSelector) {
      groupCount += Dokomo.safeParseInt(badge.textContent);
    }

    Dokomo.setBadge(directCount, groupCount);
  };

  const webKCount = () => {
    let directCount = 0;
    let groupCount = 0;

    const elements = document.querySelectorAll('.rp:not(.is-muted)');

    for (const element of elements) {
      const subtitleBadge = element.querySelector('.dialog-subtitle-badge');

      if (subtitleBadge) {
        const parsedValue = Dokomo.safeParseInt(subtitleBadge.textContent);

        if (element.dataset.peerId > 0) {
          directCount += parsedValue;
        } else {
          groupCount += parsedValue;
        }
      }
    }

    Dokomo.setBadge(directCount, groupCount);
  };

  const getMessages = () => {
    if (isWebK) {
      webKCount();
    } else {
      webZCount();
    }
  };

  const getActiveDialogTitle = () => {
    let element;

    element = isWebK
      ? document.querySelector('.top .peer-title')
      : document.querySelector('.chat-list .ListItem .title > h3');

    Dokomo.setDialogTitle(element ? element.textContent : '');
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  Dokomo.loop(loopFunc);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));

  // This is a hack to get the telegram web app to open links in Dokomo (otherwise it asks to deeplink and open with any tg:// protocol handler)
  window.onload(() => {});

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

          if (
            settings.trapLinkClicks === true ||
            url.includes('t.me') ||
            url.includes('web.telegram.org')
          ) {
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
