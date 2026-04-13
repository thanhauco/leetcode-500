# LeetCode 1161 — Maximum Level Sum of a Binary Tree (Medium)
# Category: Trees · Approach: Level-order BFS
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def max_level_sum(root: TreeNode | None) -> int:
    best = float("-inf")
    ans = 1
    level = [root]
    depth = 0
    while level:
        depth += 1
        total = sum(node.val for node in level)
        if total > best:
            best = total
            ans = depth
        nxt: list[TreeNode] = []
        for node in level:
            if node.left:
                nxt.append(node.left)
            if node.right:
                nxt.append(node.right)
        level = nxt
    return ans
