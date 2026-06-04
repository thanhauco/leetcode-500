# LeetCode 433 — Minimum Genetic Mutation (Medium)
# Category: Graphs · Approach: BFS
# Time: O(B · L · 4) | Space: O(B)
# Source: https://leetcode.com/problems/minimum-genetic-mutation/

from collections import deque

def min_mutation(start: str, end: str, bank: list[str]) -> int:
    valid = set(bank)
    if end not in valid:
        return -1
    queue = deque([(start, 0)])
    seen = {start}
    while queue:
        gene, steps = queue.popleft()
        if gene == end:
            return steps
        for i in range(len(gene)):
            for ch in "ACGT":
                if ch == gene[i]:
                    continue
                mut = gene[:i] + ch + gene[i + 1:]
                if mut in valid and mut not in seen:
                    seen.add(mut)
                    queue.append((mut, steps + 1))
    return -1
