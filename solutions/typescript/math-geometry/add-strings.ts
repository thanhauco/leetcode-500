// LeetCode 415 — Add Strings (Easy)
// Category: Math & Geometry · Approach: Column Addition
// Time: O(max(n, m)) | Space: O(max(n, m))
// Source: https://leetcode.com/problems/add-strings/

function addStrings(num1: string, num2: string): string {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  const out: string[] = [];
  while (i >= 0 || j >= 0 || carry) {
    let total = carry;
    if (i >= 0) total += num1.charCodeAt(i--) - 48;
    if (j >= 0) total += num2.charCodeAt(j--) - 48;
    out.push(String(total % 10));
    carry = Math.floor(total / 10);
  }
  return out.reverse().join("");
}
