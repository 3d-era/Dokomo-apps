module.exports = Dokomo =>
  class Grammarly extends Dokomo {
    async validateUrl() {
      return true;
    }
  };
