# LeetCode 513 — Find Bottom Left Tree Value (Medium)
# Category: Trees · Approach: Level-order BFS
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/find-bottom-left-tree-value/

from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def find_bottom_left_value(root: TreeNode | None) -> int:
    q = deque([root])
    ans = root.val
    while q:
        ans = q[0].val
        for _ in range(len(q)):
            node = q.popleft()
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
    return ans
