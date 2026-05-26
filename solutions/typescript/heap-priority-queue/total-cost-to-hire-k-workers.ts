// LeetCode 2462 — Total Cost to Hire K Workers (Medium)
// Category: Heap / Priority Queue · Approach: Two Heaps
// Time: O((k + candidates) log candidates) | Space: O(candidates)
// Source: https://leetcode.com/problems/total-cost-to-hire-k-workers/

function totalCost(costs: number[], k: number, candidates: number): number {
  const push = (h: number[], x: number) => {
    h.push(x); let i = h.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (h[i] < h[p]) { [h[i], h[p]] = [h[p], h[i]]; i = p; } else break; }
  };
  const pop = (h: number[]): number => {
    const top = h[0], last = h.pop()!;
    if (h.length) {
      h[0] = last; let i = 0;
      for (;;) { let l = 2 * i + 1, r = 2 * i + 2, s = i;
        if (l < h.length && h[l] < h[s]) s = l;
        if (r < h.length && h[r] < h[s]) s = r;
        if (s === i) break; [h[i], h[s]] = [h[s], h[i]]; i = s; }
    }
    return top;
  };
  const n = costs.length;
  const left: number[] = [], right: number[] = [];
  let i = 0, j = n - 1;
  while (left.length < candidates && i <= j) push(left, costs[i++]);
  while (right.length < candidates && i <= j) push(right, costs[j--]);
  let total = 0;
  for (let h = 0; h < k; h++) {
    const lv = left.length ? left[0] : Infinity;
    const rv = right.length ? right[0] : Infinity;
    if (lv <= rv) { total += pop(left); if (i <= j) push(left, costs[i++]); }
    else { total += pop(right); if (i <= j) push(right, costs[j--]); }
  }
  return total;
}
