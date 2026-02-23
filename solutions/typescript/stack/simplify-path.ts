// LeetCode 71 — Simplify Path (Medium)
// Category: Stack · Approach: Stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/simplify-path/

function simplifyPath(path: string): string {
  const stack: string[] = [];
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (stack.length) stack.pop();
    } else {
      stack.push(part);
    }
  }
  return "/" + stack.join("/");
}
