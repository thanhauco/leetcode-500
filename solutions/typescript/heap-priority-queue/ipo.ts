// LeetCode 502 — IPO (Hard)
// Category: Heap / Priority Queue · Approach: Greedy + max-heap
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/ipo/

function findMaximizedCapital(
  k: number,
  w: number,
  profits: number[],
  capital: number[],
): number {
  const n = profits.length;
  const order = [...Array(n).keys()].sort((a, b) => capital[a] - capital[b]);
  const heap: number[] = []; // binary max-heap of affordable profits
  const push = (x: number): void => {
    heap.push(x);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p] >= heap[i]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = (): number => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      const m = heap.length;
      while (true) {
        let big = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < m && heap[l] > heap[big]) big = l;
        if (r < m && heap[r] > heap[big]) big = r;
        if (big === i) break;
        [heap[big], heap[i]] = [heap[i], heap[big]];
        i = big;
      }
    }
    return top;
  };
  let p = 0;
  for (let t = 0; t < k; t++) {
    while (p < n && capital[order[p]] <= w) push(profits[order[p++]]);
    if (heap.length === 0) break;
    w += pop();
  }
  return w;
}
