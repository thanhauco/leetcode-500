// LeetCode 402 — Remove K Digits (Medium)
// Category: Stack · Approach: Monotonic stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/remove-k-digits/

function removeKdigits(num: string, k: number): string {
  const stack: string[] = [];
  for (const d of num) {
    while (k > 0 && stack.length && stack[stack.length - 1] > d) {
      stack.pop();
      k--;
    }
    stack.push(d);
  }
  while (k > 0) {
    stack.pop();
    k--;
  }
  const res = stack.join("").replace(/^0+/, "");
  return res === "" ? "0" : res;
}
