// LeetCode 445 — Add Two Numbers II (Medium)
// Category: Linked List · Approach: Reverse + add
// Time: O(m + n) | Space: O(m + n)
// Source: https://leetcode.com/problems/add-two-numbers-ii/

function addTwoNumbers(l1: number[], l2: number[]): number[] {
  const a = l1.slice().reverse();
  const b = l2.slice().reverse();
  const out: number[] = [];
  let carry = 0;
  for (let i = 0; i < Math.max(a.length, b.length) || carry; i++) {
    const sum = (a[i] ?? 0) + (b[i] ?? 0) + carry;
    out.push(sum % 10);
    carry = Math.floor(sum / 10);
  }
  return out.reverse();
}
