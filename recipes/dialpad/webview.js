function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    let unreadCount = 0;
    $.each(
      $('[data-qa-has-unreads]'),
      (idx, item) =>
        (unreadCount += Dokomo.safeParseInt(
          item.attributes['data-qa-has-unreads'].value,
        )),
    );

    Dokomo.setBadge(unreadCount);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'whitemode.css'));
};
