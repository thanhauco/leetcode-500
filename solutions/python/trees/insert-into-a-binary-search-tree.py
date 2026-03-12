# LeetCode 701 — Insert into a Binary Search Tree (Medium)
# Category: Trees · Approach: Iterative insert
# Time: O(h) | Space: O(1)
# Source: https://leetcode.com/problems/insert-into-a-binary-search-tree/

def insert_into_bst(root, val: int):
    new_node = TreeNode(val)
    if not root:
        return new_node
    node = root
    while True:
        if val < node.val:
            if node.left:
                node = node.left
            else:
                node.left = new_node
                break
        else:
            if node.right:
                node = node.right
            else:
                node.right = new_node
                break
    return root
