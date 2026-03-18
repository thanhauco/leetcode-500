// LeetCode 698 — Partition to K Equal Sum Subsets (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(k * 2^n) | Space: O(n)
// Source: https://leetcode.com/problems/partition-to-k-equal-sum-subsets/

function canPartitionKSubsets(nums: number[], k: number): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % k !== 0) return false;
  const target = total / k;
  nums.sort((a, b) => b - a);
  if (nums[0] > target) return false;
  const used = new Array<boolean>(nums.length).fill(false);
  const dfs = (count: number, bucket: number, start: number): boolean => {
    if (count === k) return true;
    if (bucket === target) return dfs(count + 1, 0, 0);
    for (let i = start; i < nums.length; i++) {
      if (used[i] || bucket + nums[i] > target) continue;
      used[i] = true;
      if (dfs(count, bucket + nums[i], i + 1)) return true;
      used[i] = false;
      if (bucket === 0) break;
    }
    return false;
  };
  return dfs(0, 0, 0);
}
