// LeetCode 93 — Restore IP Addresses (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/restore-ip-addresses/

function restoreIpAddresses(s: string): string[] {
  const res: string[] = [];
  const n = s.length;
  const valid = (seg: string): boolean =>
    seg.length === 1 || (seg[0] !== "0" && Number(seg) <= 255);
  const dfs = (start: number, parts: string[]): void => {
    if (parts.length === 4) {
      if (start === n) res.push(parts.join("."));
      return;
    }
    for (let len = 1; len <= 3 && start + len <= n; len++) {
      const seg = s.slice(start, start + len);
      if (valid(seg)) dfs(start + len, [...parts, seg]);
    }
  };
  dfs(0, []);
  return res;
}
