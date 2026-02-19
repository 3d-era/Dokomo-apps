function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const directCountSelector = [
      ...document.querySelectorAll('[data-region="count-container"]'),
    ];
    const totalMessageCount = directCountSelector.reduce(
      (count, item) => count + Dokomo.safeParseInt(item.textContent),
      0,
    );

    Dokomo.setBadge(totalMessageCount, 0);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
