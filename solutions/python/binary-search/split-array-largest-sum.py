# LeetCode 410 — Split Array Largest Sum (Hard)
# Category: Binary Search · Approach: Binary search on answer
# Time: O(n log(sum)) | Space: O(1)
# Source: https://leetcode.com/problems/split-array-largest-sum/

def split_array(nums: list[int], k: int) -> int:
    def feasible(cap: int) -> bool:
        parts, cur = 1, 0
        for x in nums:
            if cur + x > cap:
                parts += 1
                cur = 0
            cur += x
        return parts <= k

    lo, hi = max(nums), sum(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
