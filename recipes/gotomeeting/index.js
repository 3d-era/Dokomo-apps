module.exports = Dokomo =>
  class Gotomeeting extends Dokomo {
    overrideUserAgent() {
      return window.navigator.userAgent.replaceAll(
        /(Dokomo|Electron)\/\S+ \([^)]+\)/g,
        '',
      );
    }
  };
