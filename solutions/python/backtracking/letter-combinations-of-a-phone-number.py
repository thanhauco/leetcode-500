# LeetCode 17 — Letter Combinations of a Phone Number (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(4^n · n) | Space: O(n)
# Source: https://leetcode.com/problems/letter-combinations-of-a-phone-number/

def letter_combinations(digits: str) -> list[str]:
    if not digits:
        return []
    mapping = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
    }
    res: list[str] = []

    def dfs(i: int, cur: str) -> None:
        if i == len(digits):
            res.append(cur)
            return
        for ch in mapping[digits[i]]:
            dfs(i + 1, cur + ch)

    dfs(0, "")
    return res
