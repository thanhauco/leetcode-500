# LeetCode 541 — Reverse String II (Easy)
# Category: Two Pointers · Approach: Simulation
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/reverse-string-ii/

def reverse_str(s: str, k: int) -> str:
    arr = list(s)
    for i in range(0, len(arr), 2 * k):
        left, right = i, min(i + k - 1, len(arr) - 1)
        while left < right:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1
    return "".join(arr)
