# 🔎 How to recognize the pattern

The hardest part of an interview is often **mapping a new problem to a known technique**.
Use the cues below — they resolve the large majority of questions.

## Decision flow

```mermaid
flowchart TD
    Start([Read the problem]) --> Q1{Input sorted<br/>or monotonic?}
    Q1 -- yes --> BS[🔍 Binary Search]
    Q1 -- no --> Q2{Contiguous<br/>subarray / substring?}
    Q2 -- yes --> SW[🪟 Sliding Window]
    Q2 -- no --> Q3{Pairs / triplets<br/>or palindrome?}
    Q3 -- yes --> TP[↔️ Two Pointers]
    Q3 -- no --> Q4{Need fast lookup<br/>or counting?}
    Q4 -- yes --> AH[🔢 Arrays & Hashing]
    Q4 -- no --> Q5{Nesting / matching<br/>or next-greater?}
    Q5 -- yes --> ST[📚 Stack]
    Q5 -- no --> Q6{Tree or graph<br/>structure?}
    Q6 -- yes --> Q7{Weighted edges /<br/>shortest path?}
    Q7 -- yes --> AG[🧭 Advanced Graphs]
    Q7 -- no --> GR[🕸️ Graphs / 🌳 Trees]
    Q6 -- no --> Q8{Enumerate all<br/>combinations?}
    Q8 -- yes --> BT[🎯 Backtracking]
    Q8 -- no --> Q9{Optimal value with<br/>overlapping subproblems?}
    Q9 -- yes --> DP[📈 Dynamic Programming]
    Q9 -- no --> GD[💰 Greedy / 📐 Math]

    classDef q fill:#f59e0b,stroke:#b45309,color:#1f2937,font-weight:bold
    classDef a fill:#22c55e,stroke:#15803d,color:#06230f,font-weight:bold
    classDef s fill:#6366f1,stroke:#4338ca,color:#fff,font-weight:bold
    class Start s
    class Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9 q
    class BS,SW,TP,AH,ST,AG,GR,BT,DP,GD a
```

## Keyword → pattern cheat sheet

| If the prompt says… | Reach for |
| --- | --- |
| "sorted array", "find the boundary", "minimize the maximum" | 🔍 Binary Search |
| "longest/shortest substring", "window", "at most K" | 🪟 Sliding Window |
| "two numbers", "pair", "palindrome", "remove duplicates in place" | ↔️ Two Pointers |
| "count occurrences", "seen before", "group by" | 🔢 Arrays & Hashing |
| "valid parentheses", "next greater", "evaluate expression" | 📚 Stack |
| "level order", "ancestor", "path sum" | 🌳 Trees |
| "prefix", "autocomplete", "dictionary of words" | 🔤 Tries |
| "top K", "K closest", "median of a stream", "merge K" | ⛰️ Heap |
| "all permutations/combinations/subsets", "generate every…" | 🎯 Backtracking |
| "islands", "connected", "shortest steps", "course schedule" | 🕸️ Graphs |
| "cheapest/fastest path with weights", "minimum spanning tree" | 🧭 Advanced Graphs |
| "number of ways", "min/max cost", "can you reach" | 📈/🧮 DP |
| "maximum profit with one local choice", "intervals" | 💰 Greedy / 📅 Intervals |
| "appears once", "without using +", "power of two" | 🔟 Bit Manipulation |

## A reliable problem-solving loop

1. **Restate** the problem in your own words and write 1–2 tiny examples.
2. **Brute force first** — get *a* correct solution and its complexity.
3. **Find the bottleneck** — what is the brute force repeating?
4. **Match a pattern** using the cues above to remove that repetition.
5. **Dry-run** on an edge case (empty, single element, all duplicates).
6. **Code, then test** in the [playground](../web) against the provided cases.

> See **[categories.md](categories.md)** for the pattern reference and
> **[roadmap.md](roadmap.md)** for a study schedule.
