# LeetCode 846 — Hand of Straights (Medium)
# Category: Greedy · Approach: Greedy from smallest
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/hand-of-straights/

from collections import Counter

def is_n_straight_hand(hand: list[int], group_size: int) -> bool:
    if len(hand) % group_size != 0:
        return False
    count = Counter(hand)
    for key in sorted(count):
        c = count[key]
        if c > 0:
            for v in range(key, key + group_size):
                if count[v] < c:
                    return False
                count[v] -= c
    return True
