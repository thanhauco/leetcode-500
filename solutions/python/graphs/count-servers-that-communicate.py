# LeetCode 1267 — Count Servers that Communicate (Medium)
# Category: Graphs · Approach: Row/Col Counts
# Time: O(m·n) | Space: O(m + n)
# Source: https://leetcode.com/problems/count-servers-that-communicate/

def count_servers(grid: list[list[int]]) -> int:
    rows = len(grid)
    cols = len(grid[0])
    row_cnt = [0] * rows
    col_cnt = [0] * cols
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                row_cnt[r] += 1
                col_cnt[c] += 1
    ans = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1 and (row_cnt[r] > 1 or col_cnt[c] > 1):
                ans += 1
    return ans
