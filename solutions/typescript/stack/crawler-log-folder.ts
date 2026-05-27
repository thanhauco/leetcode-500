// LeetCode 1598 — Crawler Log Folder (Easy)
// Category: Stack · Approach: Depth Counter
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/crawler-log-folder/

function minOperations(logs: string[]): number {
  let depth = 0;
  for (const op of logs) {
    if (op === "../") depth = Math.max(0, depth - 1);
    else if (op !== "./") depth++;
  }
  return depth;
}
