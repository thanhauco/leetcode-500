# LeetCode 222 — Count Complete Tree Nodes (Easy)
# Category: Trees · Approach: DFS count
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/count-complete-tree-nodes/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def count_nodes(root: TreeNode | None) -> int:
    if not root:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)
