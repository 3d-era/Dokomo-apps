function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const elements = document.querySelectorAll(
      'div#chat_list > ul#chat_grp_lst > li#item_chat > dl#chat_count > span#new',
    );
    let count = elements[0]
      ? (count = Dokomo.safeParseInt(elements[0].textContent))
      : 0;

    Dokomo.setBadge(count);
  };
  Dokomo.loop(getMessages);

  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
