# LeetCode 316 — Remove Duplicate Letters (Medium)
# Category: Stack · Approach: Greedy stack
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/remove-duplicate-letters/

def remove_duplicate_letters(s: str) -> str:
    last = {c: i for i, c in enumerate(s)}
    stack: list[str] = []
    seen: set[str] = set()
    for i, c in enumerate(s):
        if c in seen:
            continue
        while stack and stack[-1] > c and last[stack[-1]] > i:
            seen.discard(stack.pop())
        stack.append(c)
        seen.add(c)
    return "".join(stack)
