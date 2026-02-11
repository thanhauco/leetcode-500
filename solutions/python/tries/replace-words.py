# LeetCode 648 — Replace Words (Medium)
# Category: Tries · Approach: Trie prefix
# Time: O(total chars) | Space: O(dictionary chars)
# Source: https://leetcode.com/problems/replace-words/

def replace_words(dictionary: list[str], sentence: str) -> str:
    trie: dict = {}
    for root in dictionary:
        node = trie
        for ch in root:
            node = node.setdefault(ch, {})
        node["$"] = True

    def shortest_root(word: str) -> str:
        node = trie
        prefix: list[str] = []
        for ch in word:
            if ch not in node:
                return word
            prefix.append(ch)
            node = node[ch]
            if "$" in node:
                return "".join(prefix)
        return word

    return " ".join(shortest_root(w) for w in sentence.split())
