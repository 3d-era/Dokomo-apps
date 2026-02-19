module.exports = Dokomo =>
  class Zimbra extends Dokomo {
    async validateUrl() {
      return true;
    }
  };
