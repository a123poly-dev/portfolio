// Trackers load and events are sent only on the live domain. Everywhere else
// (localhost, Vercel previews) events print to the console, so reviews stay out
// of the numbers. Add ?analytics=live to a preview URL to test real loading.
const LIVE_HOSTS = ["apoly.pro", "www.apoly.pro"]

export const isLiveSite = () =>
  LIVE_HOSTS.includes(location.hostname) ||
  new URLSearchParams(location.search).get("analytics") === "live"
