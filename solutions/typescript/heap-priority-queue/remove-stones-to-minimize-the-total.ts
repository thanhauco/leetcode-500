// LeetCode 1962 — Remove Stones to Minimize the Total (Medium)
// Category: Heap / Priority Queue · Approach: Max-Heap
// Time: O((n + k) log n) | Space: O(n)
// Source: https://leetcode.com/problems/remove-stones-to-minimize-the-total/

function minStoneSum(piles: number[], k: number): number {
  const heap: number[] = [];
  const push = (x: number) => {
    heap.push(x); let i = heap.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (heap[i] > heap[p]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break; }
  };
  const pop = (): number => {
    const top = heap[0], last = heap.pop()!;
    if (heap.length) {
      heap[0] = last; let i = 0;
      for (;;) { let l = 2 * i + 1, r = 2 * i + 2, b = i;
        if (l < heap.length && heap[l] > heap[b]) b = l;
        if (r < heap.length && heap[r] > heap[b]) b = r;
        if (b === i) break; [heap[i], heap[b]] = [heap[b], heap[i]]; i = b; }
    }
    return top;
  };
  let total = 0;
  for (const p of piles) { push(p); total += p; }
  for (let h = 0; h < k; h++) {
    const x = pop();
    const removed = Math.floor(x / 2);
    total -= removed;
    push(x - removed);
  }
  return total;
}
