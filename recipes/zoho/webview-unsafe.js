// Wait for Dokomo to initialize
if (window.dokomo?.setBadge !== undefined) {
  window.dokomo.setBadge(
    window.dokomo.safeParseInt(window.zmfolAction?.getUnreadViewCount()) +
      window.dokomo.safeParseInt(
        document.querySelector('#wms_menu_unreadchats_cnt')?.textContent,
      ),
    window.dokomo.safeParseInt(
      window.zmTopBar?.topBandElements()?.notification?.children
        ?.notificationBadge?.textContent,
    ),
  );
}
