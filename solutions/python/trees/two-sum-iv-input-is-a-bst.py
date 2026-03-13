# LeetCode 653 — Two Sum IV - Input is a BST (Easy)
# Category: Trees · Approach: DFS + set
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/two-sum-iv-input-is-a-bst/

def find_target(root, k: int) -> bool:
    seen: set[int] = set()
    def dfs(node) -> bool:
        if not node:
            return False
        if k - node.val in seen:
            return True
        seen.add(node.val)
        return dfs(node.left) or dfs(node.right)
    return dfs(root)
