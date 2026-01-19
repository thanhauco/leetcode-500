// LeetCode 703 — Kth Largest Element in a Stream (Easy)
// Category: Heap / Priority Queue · Approach: Sorted insert (clear)
// Time: O(log k) per add | Space: O(k)
// Source: https://leetcode.com/problems/kth-largest-element-in-a-stream/

class KthLargest {
  private k: number;
  private nums: number[];

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.nums = [...nums].sort((a, b) => a - b);
  }

  add(val: number): number {
    // Insert keeping ascending order; the kth largest sits k from the end.
    let i = this.nums.length;
    this.nums.push(val);
    while (i > 0 && this.nums[i - 1] > val) {
      this.nums[i] = this.nums[i - 1];
      i--;
    }
    this.nums[i] = val;
    return this.nums[this.nums.length - this.k];
  }
}
