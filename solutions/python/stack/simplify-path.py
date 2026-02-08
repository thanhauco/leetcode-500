# LeetCode 71 — Simplify Path (Medium)
# Category: Stack · Approach: Stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/simplify-path/

def simplify_path(path: str) -> str:
    stack: list[str] = []
    for part in path.split("/"):
        if part == "" or part == ".":
            continue
        if part == "..":
            if stack:
                stack.pop()
        else:
            stack.append(part)
    return "/" + "/".join(stack)
