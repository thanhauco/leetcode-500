# LeetCode 205 — Isomorphic Strings (Easy)
# Category: Arrays & Hashing · Approach: Two Maps
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/isomorphic-strings/

def is_isomorphic(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    map_st, map_ts = {}, {}
    for a, b in zip(s, t):
        if a in map_st or b in map_ts:
            if map_st.get(a) != b or map_ts.get(b) != a:
                return False
        else:
            map_st[a] = b
            map_ts[b] = a
    return True
