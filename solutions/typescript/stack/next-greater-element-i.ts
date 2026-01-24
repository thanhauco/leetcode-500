// LeetCode 496 — Next Greater Element I (Easy)
// Category: Stack · Approach: Monotonic Stack
// Time: O(n + m) | Space: O(n)
// Source: https://leetcode.com/problems/next-greater-element-i/

function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const nge = new Map<number, number>();
  const st: number[] = [];
  for (const x of nums2) {
    while (st.length && st[st.length - 1] < x) {
      nge.set(st.pop()!, x);
    }
    st.push(x);
  }
  return nums1.map((x) => nge.get(x) ?? -1);
}
