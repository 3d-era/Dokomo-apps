function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Dokomo => {
  const getMessages = () => {
    let notifications = 0;
    let indirectNotifications = 0;

    const notificationElement = document.querySelector('#notifications_amount');
    const ticketElement = document.querySelector(
      "a[href='tickets.php'] > span",
    );
    const callElement = document.querySelector('#queue_amount');

    if (notificationElement) {
      notifications = Dokomo.safeParseInt(
        notificationElement.getAttribute('datacount'),
      );
    }

    if (ticketElement !== null) {
      indirectNotifications = Dokomo.safeParseInt(ticketElement.textContent);
    }

    if (callElement) {
      indirectNotifications += Dokomo.safeParseInt(
        callElement.getAttribute('datacount'),
      );
    }

    Dokomo.setBadge(notifications, indirectNotifications);
  };

  Dokomo.loop(getMessages);
  Dokomo.injectCSS(_path.default.join(__dirname, 'service.css'));
};
