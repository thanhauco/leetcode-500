# LeetCode 698 — Partition to K Equal Sum Subsets (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(k * 2^n) | Space: O(n)
# Source: https://leetcode.com/problems/partition-to-k-equal-sum-subsets/

def can_partition_k_subsets(nums: list[int], k: int) -> bool:
    total = sum(nums)
    if total % k != 0:
        return False
    target = total // k
    nums.sort(reverse=True)
    if nums[0] > target:
        return False
    used = [False] * len(nums)

    def dfs(count: int, bucket: int, start: int) -> bool:
        if count == k:
            return True
        if bucket == target:
            return dfs(count + 1, 0, 0)
        for i in range(start, len(nums)):
            if used[i] or bucket + nums[i] > target:
                continue
            used[i] = True
            if dfs(count, bucket + nums[i], i + 1):
                return True
            used[i] = False
            if bucket == 0:
                break
        return False

    return dfs(0, 0, 0)
