// LeetCode 347 — Top K Frequent Elements (Medium)
// Category: Arrays & Hashing · Approach: Bucket sort
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/top-k-frequent-elements/

function topKFrequent(nums: number[], k: number): number[] {
  const count = new Map<number, number>();
  for (const x of nums) count.set(x, (count.get(x) ?? 0) + 1);
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [val, freq] of count) buckets[freq].push(val);
  const res: number[] = [];
  for (let f = buckets.length - 1; f >= 1 && res.length < k; f--) {
    for (const val of buckets[f]) {
      res.push(val);
      if (res.length === k) break;
    }
  }
  return res;
}
