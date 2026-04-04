# LeetCode 455 — Assign Cookies (Easy)
# Category: Greedy · Approach: Two pointers
# Time: O(n log n + m log m) | Space: O(1)
# Source: https://leetcode.com/problems/assign-cookies/

def find_content_children(g: list[int], s: list[int]) -> int:
    g.sort()
    s.sort()
    child = cookie = 0
    while child < len(g) and cookie < len(s):
        if s[cookie] >= g[child]:
            child += 1
        cookie += 1
    return child
