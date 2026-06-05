# LeetCode 646 — Maximum Length of Pair Chain (Medium)
# Category: Intervals · Approach: Greedy by end
# Time: O(n log n) | Space: O(1)
# Source: https://leetcode.com/problems/maximum-length-of-pair-chain/

def find_longest_chain(pairs: list[list[int]]) -> int:
    pairs.sort(key=lambda p: p[1])
    count = 0
    end = float("-inf")
    for a, b in pairs:
        if a > end:
            count += 1
            end = b
    return count
