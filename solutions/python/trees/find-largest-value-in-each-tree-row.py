# LeetCode 515 — Find Largest Value in Each Tree Row (Medium)
# Category: Trees · Approach: Level-order BFS
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/find-largest-value-in-each-tree-row/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def largest_values(root: TreeNode | None) -> list[int]:
    if not root:
        return []
    res: list[int] = []
    level = [root]
    while level:
        res.append(max(node.val for node in level))
        nxt: list[TreeNode] = []
        for node in level:
            if node.left:
                nxt.append(node.left)
            if node.right:
                nxt.append(node.right)
        level = nxt
    return res
