# LeetCode 402 — Remove K Digits (Medium)
# Category: Stack · Approach: Monotonic stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/remove-k-digits/

def remove_k_digits(num: str, k: int) -> str:
    stack: list[str] = []
    for d in num:
        while k > 0 and stack and stack[-1] > d:
            stack.pop()
            k -= 1
        stack.append(d)
    if k > 0:
        stack = stack[:-k]
    res = "".join(stack).lstrip("0")
    return res or "0"
