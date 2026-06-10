# LeetCode 250 — Count Univalue Subtrees (Medium)
# Category: Trees · Approach: Postorder
# Time: O(n) | Space: O(h)
# Source: https://leetcode.com/problems/count-univalue-subtrees/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def count_unival_subtrees(root: TreeNode) -> int:
    count = 0
    def dfs(n):
        nonlocal count
        if not n:
            return True
        l, r = dfs(n.left), dfs(n.right)
        if not l or not r:
            return False
        if n.left and n.left.val != n.val:
            return False
        if n.right and n.right.val != n.val:
            return False
        count += 1
        return True
    dfs(root)
    return count
