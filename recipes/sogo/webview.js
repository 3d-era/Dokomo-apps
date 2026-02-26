function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    let count = 0;
    for (const e of document.querySelectorAll('.sg-counter-badge')) {
      if (e.textContent && e.textContent !== '') {
        count += Number.parseInt(e.textContent);
      }
    }
    Dokomo.setBadge(count, 0);
  };
  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
