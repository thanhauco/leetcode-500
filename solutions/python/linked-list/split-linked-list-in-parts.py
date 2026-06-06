# LeetCode 725 — Split Linked List in Parts (Medium)
# Category: Linked List · Approach: Compute sizes
# Time: O(n + k) | Space: O(n)
# Source: https://leetcode.com/problems/split-linked-list-in-parts/

def split_list_to_parts(head: list[int], k: int) -> list[list[int]]:
    n = len(head)
    base, rem = divmod(n, k)
    result = []
    idx = 0
    for i in range(k):
        size = base + (1 if i < rem else 0)
        result.append(head[idx:idx + size])
        idx += size
    return result
