# LeetCode 394 — Decode String (Medium)
# Category: Stack · Approach: Two Stacks
# Time: O(output length) | Space: O(output length)
# Source: https://leetcode.com/problems/decode-string/

def decode_string(s: str) -> str:
    num_stack: list[int] = []
    str_stack: list[str] = []
    cur = ""
    num = 0
    for c in s:
        if c.isdigit():
            num = num * 10 + int(c)
        elif c == "[":
            num_stack.append(num)
            str_stack.append(cur)
            num, cur = 0, ""
        elif c == "]":
            rep = num_stack.pop()
            cur = str_stack.pop() + cur * rep
        else:
            cur += c
    return cur
