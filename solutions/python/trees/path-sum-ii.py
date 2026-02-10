# LeetCode 113 — Path Sum II (Medium)
# Category: Trees · Approach: DFS backtracking
# Time: O(n²) | Space: O(h)
# Source: https://leetcode.com/problems/path-sum-ii/

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def path_sum(root: TreeNode | None, target: int) -> list[list[int]]:
    result: list[list[int]] = []

    def dfs(node: TreeNode | None, remaining: int, trail: list[int]) -> None:
        if not node:
            return
        trail.append(node.val)
        remaining -= node.val
        if not node.left and not node.right and remaining == 0:
            result.append(trail.copy())
        else:
            dfs(node.left, remaining, trail)
            dfs(node.right, remaining, trail)
        trail.pop()

    dfs(root, target, [])
    return result
