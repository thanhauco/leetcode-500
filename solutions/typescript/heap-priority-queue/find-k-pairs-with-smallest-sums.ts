// LeetCode 373 — Find K Pairs with Smallest Sums (Medium)
// Category: Heap / Priority Queue · Approach: Min-heap of frontier
// Time: O(k log k) | Space: O(k)
// Source: https://leetcode.com/problems/find-k-pairs-with-smallest-sums/

function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  const res: number[][] = [];
  if (!nums1.length || !nums2.length || k <= 0) return res;
  const heap: [number, number, number][] = []; // [sum, i, j]
  const push = (node: [number, number, number]): void => {
    heap.push(node);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = (): [number, number, number] => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      const m = heap.length;
      while (true) {
        let sm = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < m && heap[l][0] < heap[sm][0]) sm = l;
        if (r < m && heap[r][0] < heap[sm][0]) sm = r;
        if (sm === i) break;
        [heap[sm], heap[i]] = [heap[i], heap[sm]];
        i = sm;
      }
    }
    return top;
  };
  for (let i = 0; i < Math.min(nums1.length, k); i++) push([nums1[i] + nums2[0], i, 0]);
  while (heap.length && res.length < k) {
    const [, i, j] = pop();
    res.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) push([nums1[i] + nums2[j + 1], i, j + 1]);
  }
  return res;
}
