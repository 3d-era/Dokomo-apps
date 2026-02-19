module.exports = Dokomo =>
  class CustomWebsite extends Dokomo {
    async validateUrl() {
      return true;
    }
  };
