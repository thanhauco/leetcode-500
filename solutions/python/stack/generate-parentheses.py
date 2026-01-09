# LeetCode 22 — Generate Parentheses (Medium)
# Category: Stack · Approach: Backtracking
# Time: O(4^n / √n) | Space: O(n)
# Source: https://leetcode.com/problems/generate-parentheses/

def generate_parenthesis(n: int) -> list[str]:
    res: list[str] = []

    def backtrack(cur: str, open_count: int, close_count: int) -> None:
        if len(cur) == 2 * n:
            res.append(cur)
            return
        if open_count < n:
            backtrack(cur + "(", open_count + 1, close_count)
        if close_count < open_count:
            backtrack(cur + ")", open_count, close_count + 1)

    backtrack("", 0, 0)
    return res
