module.exports = Dokomo =>
  class SteamChat extends Dokomo {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replaceAll(/(Dokomo|Electron)\/\S+ \([^)]+\)/g, '')
        .trim();
    }
  };
