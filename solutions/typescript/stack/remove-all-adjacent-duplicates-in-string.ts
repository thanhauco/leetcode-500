// LeetCode 1047 — Remove All Adjacent Duplicates In String (Easy)
// Category: Stack · Approach: Stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/

function removeDuplicates(s: string): string {
  const st: string[] = [];
  for (const c of s) {
    if (st.length && st[st.length - 1] === c) st.pop();
    else st.push(c);
  }
  return st.join("");
}
