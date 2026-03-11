# LeetCode 538 — Convert BST to Greater Tree (Medium)
# Category: Trees · Approach: Reverse inorder
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/convert-bst-to-greater-tree/

def convert_bst(root):
    running = 0
    def go(node) -> None:
        nonlocal running
        if not node:
            return
        go(node.right)
        running += node.val
        node.val = running
        go(node.left)
    go(root)
    return root
