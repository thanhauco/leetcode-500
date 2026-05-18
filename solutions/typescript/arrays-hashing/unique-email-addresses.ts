// LeetCode 929 — Unique Email Addresses (Medium)
// Category: Arrays & Hashing · Approach: Normalize
// Time: O(n * k) | Space: O(n * k)
// Source: https://leetcode.com/problems/unique-email-addresses/

function numUniqueEmails(emails: string[]): number {
  const seen = new Set<string>();
  for (const email of emails) {
    const [rawLocal, domain] = email.split("@");
    const local = rawLocal.split("+")[0].replace(/\./g, "");
    seen.add(local + "@" + domain);
  }
  return seen.size;
}
