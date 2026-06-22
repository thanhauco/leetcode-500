// LeetCode 388 — Longest Absolute File Path (Medium)
// Category: Stack · Approach: Stack
// Time: O(n) | Space: O(d)
// Source: https://leetcode.com/problems/longest-absolute-file-path/

function lengthLongestPath(input: string): number {
  const lines = input.split("\n");
  const stack: number[] = [];
  let maxLen = 0;
  for (const line of lines) {
    let depth = 0;
    while (line[depth] === "\t") depth++;
    const name = line.slice(depth);
    while (stack.length > depth) stack.pop();
    const prev = stack.length > 0 ? stack[stack.length - 1] : 0;
    const cur = prev + name.length + (stack.length > 0 ? 1 : 0);
    stack.push(cur);
    if (name.includes(".")) maxLen = Math.max(maxLen, cur);
  }
  return maxLen;
}
