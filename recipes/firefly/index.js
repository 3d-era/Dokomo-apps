module.exports = Dokomo =>
  class Firefly extends Dokomo {
    buildUrl(url) {
      return `${url}/`;
    }
  };
