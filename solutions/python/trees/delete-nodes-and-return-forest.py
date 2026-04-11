# LeetCode 1110 — Delete Nodes And Return Forest (Medium)
# Category: Trees · Approach: Post-order prune
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/delete-nodes-and-return-forest/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def del_nodes(root: TreeNode | None, to_delete: list[int]) -> list[TreeNode]:
    targets = set(to_delete)
    forest: list[TreeNode] = []

    def dfs(node, is_root):
        if not node:
            return None
        deleted = node.val in targets
        if is_root and not deleted:
            forest.append(node)
        node.left = dfs(node.left, deleted)
        node.right = dfs(node.right, deleted)
        return None if deleted else node

    dfs(root, True)
    return forest
