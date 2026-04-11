# LeetCode 1325 — Delete Leaves With a Given Value (Medium)
# Category: Trees · Approach: Post-order delete
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/delete-leaves-with-a-given-value/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def remove_leaf_nodes(root: TreeNode | None, target: int) -> TreeNode | None:
    if not root:
        return None
    root.left = remove_leaf_nodes(root.left, target)
    root.right = remove_leaf_nodes(root.right, target)
    if not root.left and not root.right and root.val == target:
        return None
    return root
