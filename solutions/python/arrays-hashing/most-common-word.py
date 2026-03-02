# LeetCode 819 — Most Common Word (Easy)
# Category: Arrays & Hashing · Approach: Regex + Counter
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/most-common-word/

import re
from collections import Counter


def most_common_word(paragraph: str, banned: list[str]) -> str:
    ban = {w.lower() for w in banned}
    words = re.findall(r"[a-z]+", paragraph.lower())
    counts = Counter(w for w in words if w not in ban)
    return counts.most_common(1)[0][0]
