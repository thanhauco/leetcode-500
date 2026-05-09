# LeetCode 997 — Find the Town Judge (Easy)
# Category: Graphs · Approach: Score Counting
# Time: O(n + e) | Space: O(n)
# Source: https://leetcode.com/problems/find-the-town-judge/

def find_judge(n: int, trust: list[list[int]]) -> int:
    score = [0] * (n + 1)
    for a, b in trust:
        score[a] -= 1
        score[b] += 1
    for i in range(1, n + 1):
        if score[i] == n - 1:
            return i
    return -1
