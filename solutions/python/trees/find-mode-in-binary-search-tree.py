# LeetCode 501 — Find Mode in Binary Search Tree (Easy)
# Category: Trees · Approach: Counting
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/find-mode-in-binary-search-tree/

from collections import Counter

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def find_mode(root: TreeNode) -> list[int]:
    cnt = Counter()
    def dfs(n):
        if not n:
            return
        cnt[n.val] += 1
        dfs(n.left); dfs(n.right)
    dfs(root)
    if not cnt:
        return []
    hi = max(cnt.values())
    return [v for v, c in cnt.items() if c == hi]
