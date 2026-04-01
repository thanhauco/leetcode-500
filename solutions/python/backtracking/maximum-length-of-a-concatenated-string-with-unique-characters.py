# LeetCode 1239 — Maximum Length of a Concatenated String with Unique Characters (Medium)
# Category: Backtracking · Approach: Bitmask backtracking
# Time: O(2^n) | Space: O(n)
# Source: https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/

def max_length(arr: list[str]) -> int:
    masks: list[tuple[int, int]] = []
    for s in arr:
        m = 0
        ok = True
        for ch in s:
            b = 1 << (ord(ch) - 97)
            if m & b:
                ok = False
                break
            m |= b
        if ok:
            masks.append((m, len(s)))

    best = 0

    def dfs(i: int, cur: int, length: int) -> None:
        nonlocal best
        best = max(best, length)
        for j in range(i, len(masks)):
            mask, size = masks[j]
            if cur & mask == 0:
                dfs(j + 1, cur | mask, length + size)

    dfs(0, 0, 0)
    return best
