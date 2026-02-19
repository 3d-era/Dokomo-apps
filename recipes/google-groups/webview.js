function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    let countImportant = 0;
    const unReadConversationCount = document.querySelectorAll('.NHlkZc');
    if (unReadConversationCount.length > 0) {
      countImportant = Dokomo.safeParseInt(
        unReadConversationCount[0].textContent,
      );
    }
    Dokomo.setBadge(countImportant, 0);
  };
  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
