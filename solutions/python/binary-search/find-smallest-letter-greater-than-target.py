# LeetCode 744 — Find Smallest Letter Greater Than Target (Easy)
# Category: Binary Search · Approach: Upper Bound
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/find-smallest-letter-greater-than-target/

def next_greatest_letter(letters: list[str], target: str) -> str:
    lo, hi = 0, len(letters)
    while lo < hi:
        mid = (lo + hi) // 2
        if letters[mid] > target:
            hi = mid
        else:
            lo = mid + 1
    return letters[lo] if lo < len(letters) else letters[0]
