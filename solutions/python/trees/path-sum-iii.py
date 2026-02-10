# LeetCode 437 — Path Sum III (Medium)
# Category: Trees · Approach: Prefix sum
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/path-sum-iii/

from collections import defaultdict

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def path_sum(root: TreeNode | None, target: int) -> int:
    counts: dict[int, int] = defaultdict(int)
    counts[0] = 1

    def dfs(node: TreeNode | None, prefix: int) -> int:
        if not node:
            return 0
        prefix += node.val
        total = counts[prefix - target]
        counts[prefix] += 1
        total += dfs(node.left, prefix) + dfs(node.right, prefix)
        counts[prefix] -= 1
        return total

    return dfs(root, 0)
