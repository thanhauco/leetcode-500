# LeetCode 373 — Find K Pairs with Smallest Sums (Medium)
# Category: Heap / Priority Queue · Approach: Min-heap of frontier
# Time: O(k log k) | Space: O(k)
# Source: https://leetcode.com/problems/find-k-pairs-with-smallest-sums/

import heapq

def k_smallest_pairs(nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:
    if not nums1 or not nums2 or k <= 0:
        return []
    heap: list[tuple[int, int, int]] = []
    for i in range(min(len(nums1), k)):
        heapq.heappush(heap, (nums1[i] + nums2[0], i, 0))
    res: list[list[int]] = []
    while heap and len(res) < k:
        _, i, j = heapq.heappop(heap)
        res.append([nums1[i], nums2[j]])
        if j + 1 < len(nums2):
            heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
    return res
