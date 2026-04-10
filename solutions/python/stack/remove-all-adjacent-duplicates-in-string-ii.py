# LeetCode 1209 — Remove All Adjacent Duplicates in String II (Medium)
# Category: Stack · Approach: Stack of counts
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/

def remove_duplicates(s: str, k: int) -> str:
    stack: list[list] = []  # [char, count]
    for ch in s:
        if stack and stack[-1][0] == ch:
            stack[-1][1] += 1
            if stack[-1][1] == k:
                stack.pop()
        else:
            stack.append([ch, 1])
    return "".join(ch * count for ch, count in stack)
