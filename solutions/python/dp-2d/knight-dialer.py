# LeetCode 935 — Knight Dialer (Medium)
# Category: 2-D Dynamic Programming · Approach: Layered DP
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/knight-dialer/

def knight_dialer(n: int) -> int:
    MOD = 10 ** 9 + 7
    moves = [[4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
             [], [0, 1, 7], [2, 6], [1, 3], [2, 4]]
    dp = [1] * 10
    for _ in range(n - 1):
        nxt = [0] * 10
        for d in range(10):
            for m in moves[d]:
                nxt[m] = (nxt[m] + dp[d]) % MOD
        dp = nxt
    return sum(dp) % MOD
