# LeetCode 817 — Linked List Components (Medium)
# Category: Linked List · Approach: Run counting
# Time: O(n + m) | Space: O(m)
# Source: https://leetcode.com/problems/linked-list-components/

def num_components(values: list[int], nums: list[int]) -> int:
    in_set = set(nums)
    count = 0
    in_run = False
    for v in values:
        if v in in_set:
            if not in_run:
                count += 1
                in_run = True
        else:
            in_run = False
    return count
