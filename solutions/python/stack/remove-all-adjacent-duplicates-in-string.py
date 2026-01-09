# LeetCode 1047 — Remove All Adjacent Duplicates In String (Easy)
# Category: Stack · Approach: Stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/

def remove_duplicates(s: str) -> str:
    stack: list[str] = []
    for c in s:
        if stack and stack[-1] == c:
            stack.pop()
        else:
            stack.append(c)
    return "".join(stack)
