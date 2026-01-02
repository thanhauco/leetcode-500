# LeetCode 139 — Word Break (Medium)
# Category: 1-D Dynamic Programming · Approach: DP
# Time: O(n^2) | Space: O(n)
# Source: https://leetcode.com/problems/word-break/

def word_break(s: str, word_dict: list[str]) -> bool:
    words = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[n]
