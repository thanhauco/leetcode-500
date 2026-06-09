# LeetCode 388 — Longest Absolute File Path (Medium)
# Category: Stack · Approach: Stack
# Time: O(n) | Space: O(d)
# Source: https://leetcode.com/problems/longest-absolute-file-path/

def length_longest_path(input: str) -> int:
    stack: list[int] = []
    max_len = 0
    for line in input.split("\n"):
        depth = 0
        while depth < len(line) and line[depth] == "\t":
            depth += 1
        name = line[depth:]
        while len(stack) > depth:
            stack.pop()
        prev = stack[-1] if stack else 0
        cur = prev + len(name) + (1 if stack else 0)
        stack.append(cur)
        if "." in name:
            max_len = max(max_len, cur)
    return max_len
