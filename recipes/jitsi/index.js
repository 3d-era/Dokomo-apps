module.exports = Dokomo =>
  class Jitsi extends Dokomo {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replaceAll(/(Dokomo|Electron)\/\S+ \([^)]+\)/g, '')
        .trim();
    }
  };
