// LeetCode 2530 — Maximal Score After Applying K Operations (Medium)
// Category: Heap / Priority Queue · Approach: Max-Heap
// Time: O((n + k) log n) | Space: O(n)
// Source: https://leetcode.com/problems/maximal-score-after-applying-k-operations/

function maxKelements(nums: number[], k: number): number {
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
  for (const x of nums) push(x);
  let score = 0;
  for (let h = 0; h < k; h++) {
    const x = pop();
    score += x;
    push(Math.ceil(x / 3));
  }
  return score;
}
