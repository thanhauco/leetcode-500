import type { Company } from "./types.ts";

/**
 * Companies whose 2025-2026 interview loops most frequently feature these
 * problems. `slug` values are referenced from each problem's `companies` array.
 */
export const companies: Company[] = [
  { slug: "amazon", name: "Amazon", tier: "FAANG", color: "#ff9900" },
  { slug: "google", name: "Google", tier: "FAANG", color: "#4285f4" },
  { slug: "meta", name: "Meta", tier: "FAANG", color: "#0866ff" },
  { slug: "apple", name: "Apple", tier: "FAANG", color: "#a2aaad" },
  { slug: "netflix", name: "Netflix", tier: "FAANG", color: "#e50914" },
  { slug: "microsoft", name: "Microsoft", tier: "Big Tech", color: "#00a4ef" },
  { slug: "bloomberg", name: "Bloomberg", tier: "Finance", color: "#000000" },
  { slug: "adobe", name: "Adobe", tier: "Big Tech", color: "#ff0000" },
  { slug: "uber", name: "Uber", tier: "Big Tech", color: "#000000" },
  { slug: "linkedin", name: "LinkedIn", tier: "Big Tech", color: "#0a66c2" },
  { slug: "oracle", name: "Oracle", tier: "Big Tech", color: "#f80000" },
  { slug: "bytedance", name: "ByteDance / TikTok", tier: "Big Tech", color: "#fe2c55" },
  { slug: "salesforce", name: "Salesforce", tier: "Big Tech", color: "#00a1e0" },
  { slug: "goldman-sachs", name: "Goldman Sachs", tier: "Finance", color: "#6b8fb5" },
  { slug: "nvidia", name: "Nvidia", tier: "Big Tech", color: "#76b900" },
  { slug: "atlassian", name: "Atlassian", tier: "Unicorn", color: "#0052cc" },
  { slug: "stripe", name: "Stripe", tier: "Unicorn", color: "#635bff" },
  { slug: "databricks", name: "Databricks", tier: "Unicorn", color: "#ff3621" },
  { slug: "snowflake", name: "Snowflake", tier: "Unicorn", color: "#29b5e8" },
  { slug: "airbnb", name: "Airbnb", tier: "Big Tech", color: "#ff5a5f" },
  { slug: "doordash", name: "DoorDash", tier: "Unicorn", color: "#ff3008" },
  { slug: "pinterest", name: "Pinterest", tier: "Big Tech", color: "#e60023" },
  { slug: "coinbase", name: "Coinbase", tier: "Unicorn", color: "#0052ff" },
  { slug: "tesla", name: "Tesla", tier: "Big Tech", color: "#cc0000" },
];

export const companyBySlug: Record<string, Company> = Object.fromEntries(
  companies.map((c) => [c.slug, c]),
);
