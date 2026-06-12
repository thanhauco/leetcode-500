# LeetCode 508 — Most Frequent Subtree Sum (Medium)
# Category: Trees · Approach: Postorder
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/most-frequent-subtree-sum/

from collections import Counter

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def find_frequent_tree_sum(root: TreeNode) -> list[int]:
    cnt = Counter()
    def dfs(n):
        if not n:
            return 0
        s = n.val + dfs(n.left) + dfs(n.right)
        cnt[s] += 1
        return s
    dfs(root)
    if not cnt:
        return []
    hi = max(cnt.values())
    return [s for s, c in cnt.items() if c == hi]
