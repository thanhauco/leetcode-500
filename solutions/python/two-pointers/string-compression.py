# LeetCode 443 — String Compression (Medium)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/string-compression/

def compress(chars: list[str]) -> int:
    write = 0
    read = 0
    n = len(chars)
    while read < n:
        ch = chars[read]
        count = 0
        while read < n and chars[read] == ch:
            read += 1
            count += 1
        chars[write] = ch
        write += 1
        if count > 1:
            for d in str(count):
                chars[write] = d
                write += 1
    return write
