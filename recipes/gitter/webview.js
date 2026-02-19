function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    // get unread messages
    let directCount = 0;
    for (const node of document.querySelectorAll('div.unread-indicator')) {
      directCount += Dokomo.safeParseInt(node.textContent);
    }

    const channelMentionCount =
      document.querySelectorAll('.mention-indicator').length;

    // set Dokomo badge
    Dokomo.setBadge(directCount, channelMentionCount);
  };

  Dokomo.loop(getMessages);

  // Hide download message
  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
