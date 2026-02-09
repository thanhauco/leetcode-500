# LeetCode 199 — Binary Tree Right Side View (Medium)
# Category: Trees · Approach: BFS
# Time: O(n) | Space: O(w)
# Source: https://leetcode.com/problems/binary-tree-right-side-view/

from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def right_side_view(root: TreeNode | None) -> list[int]:
    if not root:
        return []
    view: list[int] = []
    queue = deque([root])
    while queue:
        size = len(queue)
        for i in range(size):
            node = queue.popleft()
            if i == size - 1:
                view.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return view
