# LeetCode 93 — Restore IP Addresses (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/restore-ip-addresses/

def restore_ip_addresses(s: str) -> list[str]:
    res: list[str] = []
    n = len(s)

    def valid(seg: str) -> bool:
        if len(seg) == 1:
            return True
        return seg[0] != "0" and int(seg) <= 255

    def dfs(start: int, parts: list[str]) -> None:
        if len(parts) == 4:
            if start == n:
                res.append(".".join(parts))
            return
        for length in range(1, 4):
            if start + length > n:
                break
            seg = s[start:start + length]
            if valid(seg):
                dfs(start + length, parts + [seg])

    dfs(0, [])
    return res
