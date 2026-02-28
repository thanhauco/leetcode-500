# LeetCode 127 — Word Ladder (Hard)
# Category: Advanced Graphs · Approach: BFS
# Time: O(N * L * 26) | Space: O(N * L)
# Source: https://leetcode.com/problems/word-ladder/

from collections import deque
from string import ascii_lowercase


def ladder_length(begin_word: str, end_word: str, word_list: list[str]) -> int:
    words = set(word_list)
    if end_word not in words:
        return 0
    queue: deque[tuple[str, int]] = deque([(begin_word, 1)])
    words.discard(begin_word)
    while queue:
        word, steps = queue.popleft()
        if word == end_word:
            return steps
        for i in range(len(word)):
            for ch in ascii_lowercase:
                cand = word[:i] + ch + word[i + 1:]
                if cand in words:
                    words.discard(cand)
                    queue.append((cand, steps + 1))
    return 0
