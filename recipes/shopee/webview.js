function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    const count = document.querySelector(
      '.src-pages-Entry-index__counts--1f4Va',
    );
    Dokomo.setBadge(count ? Dokomo.safeParseInt(count.textContent) : 0);
    // });
  };
  Dokomo.loop(getMessages);

  waitForElm('#shopee-mini-chat-embedded').then(() => {
    console.log('Element is ready');
    const head = document.querySelector('.FAQGyh');
    head.remove();
  });

  waitForElm('.cffkI8').then(e => {
    e.style.display = 'none';
  });

  const dokomoNav = document.createElement('div');
  dokomoNav.classList.add('dokomo-nav');
  dokomoNav.innerHTML = `<div class="dokomo-nav-inner"><div class="src-pages-Entry-index__logo-wrapper--IqLfz"><div class="icon-home"><a href="/">🏠</a></div><div class="icon"><a href="javascript:history.back()">⬅️</a></div><div class="icon"><a href="javascript:history.forward()">➡️</a></div></div></div>`;
  // dokomoNav.appendChild(dokomo_content);

  waitForElm('#shopee-mini-chat-embedded').then(elm => {
    insertAfter(elm, dokomoNav);
  });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function waitForElm(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  Dokomo.injectCSS(_path.default.join(__dirname, 'style.css'));
  // const path = require('path');
  // Dokomo.injectJSUnsafe(path.join(__dirname, 'scripts.js'))
};
