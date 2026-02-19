function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const directMessages = $(
      '.module_btn.lonely_btn.white_btn.globalHeader__btn.accountDropdownBtn',
    )?.textContent;

    Dokomo.setBadge(directMessages);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
