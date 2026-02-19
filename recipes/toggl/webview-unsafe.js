// only try to update badge once Dokomo API has finished loading
if (window.dokomo !== undefined && window.dokomo.setBadge !== undefined) {
  const timerRunning =
    window.toggl !== undefined &&
    !!window.toggl.store.getState().view.timer.timeEntry.start;

  // Treat running timer as a "non-direct" notification (default blue dot instead of urgent red "1")
  window.dokomo.setBadge(0, timerRunning ? 1 : 0);
}
