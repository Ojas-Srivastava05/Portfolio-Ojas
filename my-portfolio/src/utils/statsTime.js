/** Human-readable relative time since `timestampMs`. */
export function formatSyncedAge(timestampMs, nowMs = Date.now()) {
  if (timestampMs == null) return "";
  let sec = Math.floor((nowMs - timestampMs) / 1000);
  if (sec < 0) sec = 0;
  if (sec < 12) return "just now";
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  return `${hr}h ago`;
}
