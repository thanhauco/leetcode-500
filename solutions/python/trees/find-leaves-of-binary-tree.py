# LeetCode 366 — Find Leaves of Binary Tree (Medium)
# Category: Trees · Approach: Post-order
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/find-leaves-of-binary-tree/

def find_leaves(root: "TreeNode") -> list[list[int]]:
    res: list[list[int]] = []
    def height(node):
        if not node:
            return -1
        h = 1 + max(height(node.left), height(node.right))
        if h == len(res):
            res.append([])
        res[h].append(node.val)
        return h
    height(root)
    return res
