module.exports = Dokomo => {
  class Mastodon extends Dokomo {
    validateServer(URL) {
      const api = `${URL}`;
      return new Promise((resolve, reject) => {
        $.get(api, () => {
          resolve();
        }).fail(reject);
      });
    }
  }

  return Mastodon;
};
