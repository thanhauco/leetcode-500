// LeetCode 541 — Reverse String II (Easy)
// Category: Two Pointers · Approach: Simulation
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/reverse-string-ii/

function reverseStr(s: string, k: number): string {
  const arr = s.split("");
  for (let i = 0; i < arr.length; i += 2 * k) {
    let left = i;
    let right = Math.min(i + k - 1, arr.length - 1);
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return arr.join("");
}
