# LeetCode 450 — Delete Node in a BST (Medium)
# Category: Trees · Approach: BST delete
# Time: O(h) | Space: O(h)
# Source: https://leetcode.com/problems/delete-node-in-a-bst/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def delete_node(root: TreeNode, key: int):
    if not root:
        return None
    if key < root.val:
        root.left = delete_node(root.left, key)
    elif key > root.val:
        root.right = delete_node(root.right, key)
    else:
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        m = root.right
        while m.left:
            m = m.left
        root.val = m.val
        root.right = delete_node(root.right, m.val)
    return root
