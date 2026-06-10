# LeetCode 958 — Check Completeness of a Binary Tree (Medium)
# Category: Trees · Approach: BFS gap check
# Time: O(n) | Space: O(w)
# Source: https://leetcode.com/problems/check-completeness-of-a-binary-tree/

from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def is_complete_tree(root: TreeNode) -> bool:
    q = deque([root])
    seen_null = False
    while q:
        node = q.popleft()
        if node is None:
            seen_null = True
        else:
            if seen_null:
                return False
            q.append(node.left)
            q.append(node.right)
    return True
