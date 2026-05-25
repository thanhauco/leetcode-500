// LeetCode 2336 — Smallest Number in Infinite Set (Medium)
// Category: Heap / Priority Queue · Approach: Counter + Min-Heap
// Time: O(log k) per op | Space: O(k)
// Source: https://leetcode.com/problems/smallest-number-in-infinite-set/

class SmallestInfiniteSet {
  private cur = 1;
  private heap: number[] = [];
  private inSet = new Set<number>();

  private up(i: number): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[i] < this.heap[p]) { [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]]; i = p; } else break;
    }
  }
  private down(i: number): void {
    for (;;) {
      let l = 2 * i + 1, r = 2 * i + 2, s = i;
      if (l < this.heap.length && this.heap[l] < this.heap[s]) s = l;
      if (r < this.heap.length && this.heap[r] < this.heap[s]) s = r;
      if (s === i) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]]; i = s;
    }
  }

  popSmallest(): number {
    if (this.heap.length) {
      const top = this.heap[0];
      const last = this.heap.pop()!;
      if (this.heap.length) { this.heap[0] = last; this.down(0); }
      this.inSet.delete(top);
      return top;
    }
    return this.cur++;
  }

  addBack(num: number): void {
    if (num < this.cur && !this.inSet.has(num)) {
      this.inSet.add(num);
      this.heap.push(num);
      this.up(this.heap.length - 1);
    }
  }
}
