# LeetCode 345 — Reverse Vowels of a String (Easy)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/reverse-vowels-of-a-string/

def reverse_vowels(s: str) -> str:
    vowels = set("aeiouAEIOU")
    arr = list(s)
    left, right = 0, len(arr) - 1
    while left < right:
        if arr[left] not in vowels:
            left += 1
        elif arr[right] not in vowels:
            right -= 1
        else:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1
    return "".join(arr)
