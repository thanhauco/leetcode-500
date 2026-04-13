# LeetCode 988 — Smallest String Starting From Leaf (Medium)
# Category: Trees · Approach: DFS with prepend
# Time: O(n · h) | Space: O(h)
# Source: https://leetcode.com/problems/smallest-string-starting-from-leaf/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def smallest_from_leaf(root: TreeNode | None) -> str:
    best = None

    def dfs(node, suffix):
        nonlocal best
        if not node:
            return
        s = chr(97 + node.val) + suffix
        if not node.left and not node.right:
            if best is None or s < best:
                best = s
            return
        dfs(node.left, s)
        dfs(node.right, s)

    dfs(root, "")
    return best or ""
