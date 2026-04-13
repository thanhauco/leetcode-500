# LeetCode 662 — Maximum Width of Binary Tree (Medium)
# Category: Trees · Approach: Indexed BFS
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/maximum-width-of-binary-tree/

from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def width_of_binary_tree(root: TreeNode | None) -> int:
    if not root:
        return 0
    best = 0
    q = deque([(root, 0)])
    while q:
        first = q[0][1]
        width = q[-1][1] - first + 1
        best = max(best, width)
        for _ in range(len(q)):
            node, idx = q.popleft()
            idx -= first
            if node.left:
                q.append((node.left, 2 * idx))
            if node.right:
                q.append((node.right, 2 * idx + 1))
    return best
