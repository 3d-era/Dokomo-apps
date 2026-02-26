function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  function getMessages() {
    let direct = 0;
    let indirect = 0;
    const DokomoData = document.querySelector('#DokomoMessages').dataset;
    if (DokomoData) {
      direct = DokomoData.direct;
      indirect = DokomoData.indirect;
    }

    Dokomo.setBadge(direct, indirect);
  }

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
  Dokomo.loop(getMessages);
};
