function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const notificationBadge = document.querySelector(
      '.shopee-badge-x__sup--num',
    ).innerHTML;
    console.log(`Kal ${notificationBadge}`);
    Dokomo.setBadge(notificationBadge);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
// shopee-badge-x__sup shopee-badge-x__sup--num shopee-badge-x__sup--fixed
