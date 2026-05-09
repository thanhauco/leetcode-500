# LeetCode 1306 — Jump Game III (Medium)
# Category: Graphs · Approach: DFS
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/jump-game-iii/

def can_reach(arr: list[int], start: int) -> bool:
    n = len(arr)
    seen = [False] * n
    stack = [start]
    while stack:
        i = stack.pop()
        if seen[i]:
            continue
        seen[i] = True
        if arr[i] == 0:
            return True
        for nxt in (i + arr[i], i - arr[i]):
            if 0 <= nxt < n and not seen[nxt]:
                stack.append(nxt)
    return False
