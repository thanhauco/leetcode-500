# LeetCode 929 — Unique Email Addresses (Medium)
# Category: Arrays & Hashing · Approach: Normalize
# Time: O(n * k) | Space: O(n * k)
# Source: https://leetcode.com/problems/unique-email-addresses/

def num_unique_emails(emails: list[str]) -> int:
    seen: set[str] = set()
    for email in emails:
        local, domain = email.split("@")
        local = local.split("+")[0].replace(".", "")
        seen.add(local + "@" + domain)
    return len(seen)
