# LeetCode 38 — Count and Say (Medium)
# Category: Math & Geometry · Approach: Simulation
# Time: O(n * m) | Space: O(m)
# Source: https://leetcode.com/problems/count-and-say/

def count_and_say(n: int) -> str:
    s = "1"
    for _ in range(n - 1):
        out: list[str] = []
        i = 0
        while i < len(s):
            j = i
            while j < len(s) and s[j] == s[i]:
                j += 1
            out.append(str(j - i))
            out.append(s[i])
            i = j
        s = "".join(out)
    return s
