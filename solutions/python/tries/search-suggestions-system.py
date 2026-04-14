# LeetCode 1268 — Search Suggestions System (Medium)
# Category: Tries · Approach: Sort + prefix filter
# Time: O(p log p + p·L) | Space: O(1)
# Source: https://leetcode.com/problems/search-suggestions-system/

def suggested_products(products: list[str], search_word: str) -> list[list[str]]:
    products = sorted(products)
    res: list[list[str]] = []
    prefix = ""
    for ch in search_word:
        prefix += ch
        matches: list[str] = []
        for p in products:
            if p.startswith(prefix):
                matches.append(p)
                if len(matches) == 3:
                    break
        res.append(matches)
    return res
