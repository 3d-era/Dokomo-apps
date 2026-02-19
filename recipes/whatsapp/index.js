module.exports = Dokomo =>
  class Messenger extends Dokomo {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replaceAll(/(Dokomo|Electron)\/\S+ \([^)]+\)/g, '')
        .trim();
    }

    modifyRequestHeaders() {
      return [
        {
          headers: {
            'user-agent': window.navigator.userAgent
              .replaceAll(/(Dokomo|Electron)\/\S+ \([^)]+\)/g, '')
              .trim(),
          },
          requestFilters: {
            urls: ['*://*/*'],
          },
        },
      ];
    }
  };
