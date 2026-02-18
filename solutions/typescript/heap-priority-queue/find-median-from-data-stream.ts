// LeetCode 295 — Find Median from Data Stream (Hard)
// Category: Heap / Priority Queue · Approach: Sorted insertion
// Time: O(log n) add, O(1) median | Space: O(n)
// Source: https://leetcode.com/problems/find-median-from-data-stream/

class MedianFinder {
  private values: number[] = [];

  addNum(num: number): void {
    let lo = 0, hi = this.values.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.values[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    this.values.splice(lo, 0, num);
  }

  findMedian(): number {
    const n = this.values.length, m = n >> 1;
    return n % 2 ? this.values[m] : (this.values[m - 1] + this.values[m]) / 2;
  }
}
