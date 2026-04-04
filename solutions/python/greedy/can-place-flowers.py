# LeetCode 605 — Can Place Flowers (Easy)
# Category: Greedy · Approach: Greedy scan
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/can-place-flowers/

def can_place_flowers(flowerbed: list[int], n: int) -> bool:
    bed = flowerbed[:]
    for i in range(len(bed)):
        if n <= 0:
            break
        if bed[i] == 0:
            left = i == 0 or bed[i - 1] == 0
            right = i == len(bed) - 1 or bed[i + 1] == 0
            if left and right:
                bed[i] = 1
                n -= 1
    return n <= 0
