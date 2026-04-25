// LeetCode 1209 — Remove All Adjacent Duplicates in String II (Medium)
// Category: Stack · Approach: Stack of counts
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/

function removeDuplicates(s: string, k: number): string {
  const stack: [string, number][] = [];
  for (const ch of s) {
    const top = stack[stack.length - 1];
    if (top && top[0] === ch) {
      top[1] += 1;
      if (top[1] === k) stack.pop();
    } else {
      stack.push([ch, 1]);
    }
  }
  return stack.map(([ch, count]) => ch.repeat(count)).join("");
}
