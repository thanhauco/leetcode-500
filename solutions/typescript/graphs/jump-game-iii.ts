// LeetCode 1306 — Jump Game III (Medium)
// Category: Graphs · Approach: DFS
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/jump-game-iii/

function canReach(arr: number[], start: number): boolean {
  const n = arr.length;
  const seen = new Array(n).fill(false);
  const stack = [start];
  while (stack.length) {
    const i = stack.pop()!;
    if (seen[i]) continue;
    seen[i] = true;
    if (arr[i] === 0) return true;
    for (const nxt of [i + arr[i], i - arr[i]]) {
      if (nxt >= 0 && nxt < n && !seen[nxt]) stack.push(nxt);
    }
  }
  return false;
}
