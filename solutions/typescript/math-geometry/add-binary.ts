// LeetCode 67 — Add Binary (Easy)
// Category: Math & Geometry · Approach: Column Addition
// Time: O(max(n, m)) | Space: O(max(n, m))
// Source: https://leetcode.com/problems/add-binary/

function addBinary(a: string, b: string): string {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const out: string[] = [];
  while (i >= 0 || j >= 0 || carry) {
    let total = carry;
    if (i >= 0) total += a.charCodeAt(i--) - 48;
    if (j >= 0) total += b.charCodeAt(j--) - 48;
    out.push(String(total & 1));
    carry = total >> 1;
  }
  return out.reverse().join("");
}
