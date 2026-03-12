# LeetCode 700 — Search in a Binary Search Tree (Easy)
# Category: Trees · Approach: BST walk
# Time: O(h) | Space: O(1)
# Source: https://leetcode.com/problems/search-in-a-binary-search-tree/

def search_bst(root, val: int):
    node = root
    while node:
        if node.val == val:
            return node
        node = node.left if val < node.val else node.right
    return None
