# LeetCode 526 — Beautiful Arrangement (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(k) | Space: O(n)
# Source: https://leetcode.com/problems/beautiful-arrangement/

def count_arrangement(n: int) -> int:
    used = [False] * (n + 1)

    def backtrack(pos: int) -> int:
        if pos > n:
            return 1
        total = 0
        for v in range(1, n + 1):
            if not used[v] and (v % pos == 0 or pos % v == 0):
                used[v] = True
                total += backtrack(pos + 1)
                used[v] = False
        return total

    return backtrack(1)
