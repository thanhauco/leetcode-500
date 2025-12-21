/**
 * Web-app data access layer. Re-exports the workspace dataset so components
 * import from a single local path (`@/data`) and the underlying source can be
 * swapped without touching the UI.
 */
export * from "@leetcode-500/data";
