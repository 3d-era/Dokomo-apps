module.exports = Dokomo =>
  class Nextcloud extends Dokomo {
    buildUrl(url) {
      return `${url}/`;
    }
  };
