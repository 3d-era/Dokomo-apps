module.exports = Dokomo =>
  class Instagram extends Dokomo {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replaceAll(/(Dokomo|Electron)\/\S+ \([^)]+\)/g, '')
        .trim();
    }
  };
