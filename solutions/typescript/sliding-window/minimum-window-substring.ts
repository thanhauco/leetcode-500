// LeetCode 76 — Minimum Window Substring (Hard)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n + m) | Space: O(m)
// Source: https://leetcode.com/problems/minimum-window-substring/

function minWindow(s: string, t: string): string {
  if (t.length === 0 || s.length < t.length) return "";
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  const required = need.size;
  let formed = 0;
  const window = new Map<string, number>();
  let left = 0;
  let best: [number, number, number] = [Infinity, 0, 0];
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) ?? 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) formed++;
    while (formed === required) {
      if (right - left + 1 < best[0]) best = [right - left + 1, left, right];
      const lc = s[left];
      window.set(lc, window.get(lc)! - 1);
      if (need.has(lc) && window.get(lc)! < need.get(lc)!) formed--;
      left++;
    }
  }
  return best[0] === Infinity ? "" : s.substring(best[1], best[2] + 1);
}
