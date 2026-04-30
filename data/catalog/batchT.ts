import type { Problem } from "../types.ts";

/**
 * Batch T — graphs, advanced-graphs, and heap / priority-queue.
 * Every record ships working Python + TypeScript plus a runnable runner + tests.
 * Each `runner.jsReference` is hand-verified against its `tests`.
 */
export const batchT: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1306,
    slug: "jump-game-iii",
    title: "Jump Game III",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["BFS", "DFS", "Graph Traversal"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/jump-game-iii/",
    description:
      "Given an array of non-negative integers and a starting index, from any index `i` you may move to `i + arr[i]` or `i - arr[i]` if it stays in bounds. Determine whether you can reach any index whose value is `0`.",
    examples: [
      { input: "arr = [4,2,3,0,3,1,2], start = 5", output: "true", explanation: "5 → 4 → 1 → 3 lands on a zero." },
      { input: "arr = [3,0,2,1,2], start = 2", output: "false", explanation: "The only zero at index 1 is never reachable." },
    ],
    constraints: ["1 ≤ arr.length ≤ 5 * 10^4", "0 ≤ arr[i] < arr.length", "0 ≤ start < arr.length"],
    intuition:
      "Treat each index as a graph node with up to two outgoing edges (left and right jumps). A simple traversal from the start, marking visited indices, answers reachability without revisiting any node.",
    approach: [
      "Maintain a visited array and a stack seeded with the start index.",
      "Pop an index; if already visited, skip it, otherwise mark it.",
      "If its value is 0, return true.",
      "Push i + arr[i] and i - arr[i] when they fall inside the array.",
      "Return false once the stack empties without finding a zero.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each index is enqueued at most once." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def can_reach(arr: list[int], start: int) -> bool:
    n = len(arr)
    seen = [False] * n
    stack = [start]
    while stack:
        i = stack.pop()
        if seen[i]:
            continue
        seen[i] = True
        if arr[i] == 0:
            return True
        for nxt in (i + arr[i], i - arr[i]):
            if 0 <= nxt < n and not seen[nxt]:
                stack.append(nxt)
    return False`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function canReach(arr: number[], start: number): boolean {
  const n = arr.length;
  const seen = new Array(n).fill(false);
  const stack = [start];
  while (stack.length) {
    const i = stack.pop()!;
    if (seen[i]) continue;
    seen[i] = true;
    if (arr[i] === 0) return true;
    for (const nxt of [i + arr[i], i - arr[i]]) {
      if (nxt >= 0 && nxt < n && !seen[nxt]) stack.push(nxt);
    }
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "canReach",
      comparison: "deep",
      jsStarter: `function canReach(arr, start) {
  // Return true if some reachable index holds the value 0.
  // TODO: implement
}`,
      jsReference: `function canReach(arr, start) {
  const n = arr.length;
  const seen = new Array(n).fill(false);
  const stack = [start];
  while (stack.length) {
    const i = stack.pop();
    if (seen[i]) continue;
    seen[i] = true;
    if (arr[i] === 0) return true;
    for (const nxt of [i + arr[i], i - arr[i]]) {
      if (nxt >= 0 && nxt < n && !seen[nxt]) stack.push(nxt);
    }
  }
  return false;
}`,
    },
    tests: [
      { name: "reachable from 5", args: [[4, 2, 3, 0, 3, 1, 2], 5], expected: true },
      { name: "reachable from 0", args: [[4, 2, 3, 0, 3, 1, 2], 0], expected: true },
      { name: "unreachable zero", args: [[3, 0, 2, 1, 2], 2], expected: false },
      { name: "start on zero", args: [[0], 0], expected: true },
    ],
    hints: ["Model the two jumps as graph edges.", "Mark visited indices to avoid cycles."],
    relatedIds: [55, 45],
  },
  {
    id: 1791,
    slug: "find-center-of-star-graph",
    title: "Find Center of Star Graph",
    difficulty: "Easy",
    category: "graphs",
    patterns: ["Graph", "Degree Counting"],
    companies: ["amazon", "google"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/find-center-of-star-graph/",
    description:
      "A star graph on `n` nodes has one center connected to every other node, and no other edges. Given its edge list, return the center node.",
    examples: [
      { input: "edges = [[1,2],[2,3],[4,2]]", output: "2", explanation: "Node 2 appears in every edge." },
      { input: "edges = [[1,2],[5,1],[1,3],[1,4]]", output: "1" },
    ],
    constraints: ["3 ≤ n ≤ 10^5", "edges.length == n - 1", "Each edge connects two distinct nodes."],
    intuition:
      "The center is the only node present in all edges, so it must be shared by the first two edges. Comparing those two edges immediately reveals it in constant time.",
    approach: [
      "Take the first two edges.",
      "The center is whichever endpoint of edge one also appears in edge two.",
      "Return that shared endpoint.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "Only two edges are inspected." },
    solutions: [
      {
        language: "python",
        label: "Two-Edge Check",
        code: `def find_center(edges: list[list[int]]) -> int:
    a, b = edges[0]
    c, d = edges[1]
    return a if a in (c, d) else b`,
      },
      {
        language: "typescript",
        label: "Two-Edge Check",
        code: `function findCenter(edges: number[][]): number {
  const [a, b] = edges[0];
  const [c, d] = edges[1];
  return a === c || a === d ? a : b;
}`,
      },
    ],
    runner: {
      entry: "findCenter",
      comparison: "deep",
      jsStarter: `function findCenter(edges) {
  // Return the center node of the star graph.
  // TODO: implement
}`,
      jsReference: `function findCenter(edges) {
  const [a, b] = edges[0];
  const [c, d] = edges[1];
  return a === c || a === d ? a : b;
}`,
    },
    tests: [
      { name: "center 2", args: [[[1, 2], [2, 3], [4, 2]]], expected: 2 },
      { name: "center 1", args: [[[1, 2], [5, 1], [1, 3], [1, 4]]], expected: 1 },
      { name: "minimal star", args: [[[3, 1], [3, 2]]], expected: 3 },
    ],
    hints: ["The center is in every edge.", "Two edges are enough to identify it."],
    relatedIds: [997],
  },
  {
    id: 997,
    slug: "find-the-town-judge",
    title: "Find the Town Judge",
    difficulty: "Easy",
    category: "graphs",
    patterns: ["Graph", "Degree Counting"],
    companies: ["amazon", "google", "apple"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/find-the-town-judge/",
    description:
      "In a town of `n` people, a judge trusts nobody and is trusted by everyone else. Given a list of `trust` pairs `[a, b]` meaning `a` trusts `b`, return the judge's label, or `-1` if there is no such person.",
    examples: [
      { input: "n = 2, trust = [[1,2]]", output: "2", explanation: "Person 2 is trusted by 1 and trusts no one." },
      { input: "n = 3, trust = [[1,3],[2,3],[3,1]]", output: "-1", explanation: "Person 3 trusts someone, so cannot be judge." },
    ],
    constraints: ["1 ≤ n ≤ 1000", "0 ≤ trust.length ≤ n * (n - 1)", "All trust pairs are distinct."],
    intuition:
      "Give each person a score of +1 for every incoming trust and -1 for every outgoing trust. The judge is the unique person whose score reaches exactly n - 1: trusted by all others and trusting none.",
    approach: [
      "Create a score array over the n people.",
      "For each pair [a, b], decrement a and increment b.",
      "Scan for a person whose score equals n - 1 and return them.",
      "Return -1 if none qualifies.",
    ],
    complexity: { time: "O(n + e)", space: "O(n)", note: "e is the number of trust pairs." },
    solutions: [
      {
        language: "python",
        label: "Score Counting",
        code: `def find_judge(n: int, trust: list[list[int]]) -> int:
    score = [0] * (n + 1)
    for a, b in trust:
        score[a] -= 1
        score[b] += 1
    for i in range(1, n + 1):
        if score[i] == n - 1:
            return i
    return -1`,
      },
      {
        language: "typescript",
        label: "Score Counting",
        code: `function findJudge(n: number, trust: number[][]): number {
  const score = new Array(n + 1).fill(0);
  for (const [a, b] of trust) {
    score[a]--;
    score[b]++;
  }
  for (let i = 1; i <= n; i++) {
    if (score[i] === n - 1) return i;
  }
  return -1;
}`,
      },
    ],
    runner: {
      entry: "findJudge",
      comparison: "deep",
      jsStarter: `function findJudge(n, trust) {
  // Return the judge's label, or -1.
  // TODO: implement
}`,
      jsReference: `function findJudge(n, trust) {
  const score = new Array(n + 1).fill(0);
  for (const [a, b] of trust) {
    score[a]--;
    score[b]++;
  }
  for (let i = 1; i <= n; i++) {
    if (score[i] === n - 1) return i;
  }
  return -1;
}`,
    },
    tests: [
      { name: "judge 2", args: [2, [[1, 2]]], expected: 2 },
      { name: "judge 3", args: [3, [[1, 3], [2, 3]]], expected: 3 },
      { name: "no judge", args: [3, [[1, 3], [2, 3], [3, 1]]], expected: -1 },
      { name: "single person", args: [1, []], expected: 1 },
    ],
    hints: ["Net trust = in-degree minus out-degree.", "The judge has in-degree n-1 and out-degree 0."],
    relatedIds: [1791],
  },
  {
    id: 1376,
    slug: "time-needed-to-inform-all-employees",
    title: "Time Needed to Inform All Employees",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "Tree", "Graph Traversal"],
    companies: ["amazon", "google", "microsoft", "uber"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/time-needed-to-inform-all-employees/",
    description:
      "A company forms a tree rooted at `headID`, where `manager[i]` is employee i's direct manager. Each manager takes `informTime[i]` minutes to pass news to all direct reports. Return the total minutes until every employee is informed.",
    examples: [
      {
        input: "n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]",
        output: "1",
        explanation: "Everyone reports directly to the head, who takes 1 minute.",
      },
      {
        input: "n = 1, headID = 0, manager = [-1], informTime = [0]",
        output: "0",
        explanation: "No one to inform.",
      },
    ],
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ headID < n", "manager forms a valid tree rooted at headID."],
    intuition:
      "The last person to hear the news sits at the end of the slowest chain of command. Summing informTime along each root-to-leaf path and taking the maximum gives the answer.",
    approach: [
      "Build a children list from the manager array.",
      "DFS from headID, returning informTime[node] plus the max time among its subtrees.",
      "A leaf contributes only its own informTime (typically 0).",
      "The DFS result at the head is the total time.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each node is visited once." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def num_of_minutes(n: int, head_id: int, manager: list[int], inform_time: list[int]) -> int:
    children: list[list[int]] = [[] for _ in range(n)]
    for i in range(n):
        if manager[i] != -1:
            children[manager[i]].append(i)

    def dfs(u: int) -> int:
        best = 0
        for c in children[u]:
            best = max(best, dfs(c))
        return inform_time[u] + best

    return dfs(head_id)`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function numOfMinutes(n: number, headID: number, manager: number[], informTime: number[]): number {
  const children: number[][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    if (manager[i] !== -1) children[manager[i]].push(i);
  }
  const dfs = (u: number): number => {
    let best = 0;
    for (const c of children[u]) best = Math.max(best, dfs(c));
    return informTime[u] + best;
  };
  return dfs(headID);
}`,
      },
    ],
    runner: {
      entry: "numOfMinutes",
      comparison: "deep",
      jsStarter: `function numOfMinutes(n, headID, manager, informTime) {
  // Return the minutes until everyone is informed.
  // TODO: implement
}`,
      jsReference: `function numOfMinutes(n, headID, manager, informTime) {
  const children = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    if (manager[i] !== -1) children[manager[i]].push(i);
  }
  const dfs = (u) => {
    let best = 0;
    for (const c of children[u]) best = Math.max(best, dfs(c));
    return informTime[u] + best;
  };
  return dfs(headID);
}`,
    },
    tests: [
      { name: "flat tree", args: [6, 2, [2, 2, -1, 2, 2, 2], [0, 0, 1, 0, 0, 0]], expected: 1 },
      { name: "single node", args: [1, 0, [-1], [0]], expected: 0 },
      { name: "deep chain", args: [4, 0, [-1, 0, 1, 2], [1, 2, 3, 0]], expected: 6 },
    ],
    hints: ["Build the tree from manager pointers.", "Answer is the longest weighted root-to-leaf path."],
    relatedIds: [1306],
  },
  {
    id: 2492,
    slug: "minimum-score-of-a-path-between-two-cities",
    title: "Minimum Score of a Path Between Two Cities",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["BFS", "Connected Components", "Graph Traversal"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/",
    description:
      "Cities `1..n` are joined by weighted roads. The score of a path is the smallest road weight it uses, and you may revisit roads freely. Return the minimum possible score of any path between city 1 and city n.",
    examples: [
      {
        input: "n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]",
        output: "5",
        explanation: "Cities 1 and 4 share a component whose lightest road is 5.",
      },
      {
        input: "n = 4, roads = [[1,2,2],[1,3,4],[3,4,7]]",
        output: "2",
        explanation: "The lightest road reachable from city 1 weighs 2.",
      },
    ],
    constraints: ["2 ≤ n ≤ 10^5", "1 ≤ roads.length ≤ 10^5", "The graph is connected."],
    intuition:
      "Because revisiting roads is allowed, any road inside the connected component containing city 1 can be folded into a path. The answer is simply the lightest road reachable from city 1.",
    approach: [
      "Build an adjacency list of weighted edges.",
      "Traverse the component containing city 1 (BFS or DFS).",
      "Track the minimum weight among every edge seen during the traversal.",
      "Return that minimum.",
    ],
    complexity: { time: "O(n + e)", space: "O(n + e)", note: "Single traversal of one component." },
    solutions: [
      {
        language: "python",
        label: "BFS",
        code: `def min_score(n: int, roads: list[list[int]]) -> int:
    adj: list[list[tuple[int, int]]] = [[] for _ in range(n + 1)]
    for a, b, d in roads:
        adj[a].append((b, d))
        adj[b].append((a, d))
    seen = [False] * (n + 1)
    seen[1] = True
    stack = [1]
    best = float("inf")
    while stack:
        u = stack.pop()
        for v, d in adj[u]:
            best = min(best, d)
            if not seen[v]:
                seen[v] = True
                stack.append(v)
    return best`,
      },
      {
        language: "typescript",
        label: "BFS",
        code: `function minScore(n: number, roads: number[][]): number {
  const adj: [number, number][][] = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, d] of roads) {
    adj[a].push([b, d]);
    adj[b].push([a, d]);
  }
  const seen = new Array(n + 1).fill(false);
  seen[1] = true;
  const stack = [1];
  let best = Infinity;
  while (stack.length) {
    const u = stack.pop()!;
    for (const [v, d] of adj[u]) {
      best = Math.min(best, d);
      if (!seen[v]) {
        seen[v] = true;
        stack.push(v);
      }
    }
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "minScore",
      comparison: "deep",
      jsStarter: `function minScore(n, roads) {
  // Return the minimum edge weight reachable from city 1.
  // TODO: implement
}`,
      jsReference: `function minScore(n, roads) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, d] of roads) {
    adj[a].push([b, d]);
    adj[b].push([a, d]);
  }
  const seen = new Array(n + 1).fill(false);
  seen[1] = true;
  const stack = [1];
  let best = Infinity;
  while (stack.length) {
    const u = stack.pop();
    for (const [v, d] of adj[u]) {
      best = Math.min(best, d);
      if (!seen[v]) {
        seen[v] = true;
        stack.push(v);
      }
    }
  }
  return best;
}`,
    },
    tests: [
      { name: "min edge 5", args: [4, [[1, 2, 9], [2, 3, 6], [2, 4, 5], [1, 4, 7]]], expected: 5 },
      { name: "min edge 2", args: [4, [[1, 2, 2], [1, 3, 4], [3, 4, 7]]], expected: 2 },
      { name: "chain", args: [3, [[1, 2, 5], [2, 3, 3]]], expected: 3 },
    ],
    hints: ["Revisiting roads is free.", "Find the lightest edge in city 1's component."],
    relatedIds: [1319],
  },
  {
    id: 1557,
    slug: "minimum-number-of-vertices-to-reach-all-nodes",
    title: "Minimum Number of Vertices to Reach All Nodes",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["Graph", "In-degree"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/",
    description:
      "Given a directed acyclic graph with `n` nodes and a list of directed edges, return the smallest set of nodes from which every node is reachable.",
    examples: [
      {
        input: "n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]",
        output: "[0,3]",
        explanation: "Only nodes 0 and 3 have no incoming edge.",
      },
      {
        input: "n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]",
        output: "[0,2,3]",
      },
    ],
    constraints: ["2 ≤ n ≤ 10^5", "The graph is a DAG", "All edges are distinct."],
    intuition:
      "A node with any incoming edge can be reached from somewhere else, so it never needs to be a starting point. The minimal set is exactly the nodes with in-degree zero.",
    approach: [
      "Count incoming edges for every node.",
      "Collect all nodes whose in-degree is zero.",
      "Return that collection.",
    ],
    complexity: { time: "O(n + e)", space: "O(n)", note: "One pass over edges." },
    solutions: [
      {
        language: "python",
        label: "In-degree",
        code: `def find_smallest_set_of_vertices(n: int, edges: list[list[int]]) -> list[int]:
    indeg = [0] * n
    for _, v in edges:
        indeg[v] += 1
    return [i for i in range(n) if indeg[i] == 0]`,
      },
      {
        language: "typescript",
        label: "In-degree",
        code: `function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
  const indeg = new Array(n).fill(0);
  for (const [, v] of edges) indeg[v]++;
  const res: number[] = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) res.push(i);
  return res;
}`,
      },
    ],
    runner: {
      entry: "findSmallestSetOfVertices",
      comparison: "canonical",
      jsStarter: `function findSmallestSetOfVertices(n, edges) {
  // Return nodes with no incoming edge.
  // TODO: implement
}`,
      jsReference: `function findSmallestSetOfVertices(n, edges) {
  const indeg = new Array(n).fill(0);
  for (const [, v] of edges) indeg[v]++;
  const res = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) res.push(i);
  return res;
}`,
    },
    tests: [
      { name: "two roots", args: [6, [[0, 1], [0, 2], [2, 5], [3, 4], [4, 2]]], expected: [0, 3] },
      { name: "three roots", args: [5, [[0, 1], [2, 1], [3, 1], [1, 4], [2, 4]]], expected: [0, 2, 3] },
      { name: "no edges", args: [3, []], expected: [0, 1, 2] },
    ],
    hints: ["Reachable nodes have positive in-degree.", "Keep only the zero-in-degree nodes."],
    relatedIds: [2492],
  },
  {
    id: 1319,
    slug: "number-of-operations-to-make-network-connected",
    title: "Number of Operations to Make Network Connected",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["Union Find", "Connected Components"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
    description:
      "You have `n` computers and a list of existing cables `connections`. You may unplug any cable and reconnect it elsewhere. Return the minimum number of moves to connect all computers, or `-1` if it is impossible.",
    examples: [
      { input: "n = 4, connections = [[0,1],[0,2],[1,2]]", output: "1", explanation: "Move the redundant cable to computer 3." },
      { input: "n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]", output: "-1", explanation: "Only 4 cables for 6 computers." },
    ],
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ connections.length ≤ n * (n - 1) / 2", "No duplicate cables."],
    intuition:
      "You need at least n - 1 cables to span n computers; with fewer it is hopeless. Otherwise, every extra (redundant) cable can be moved to merge two components, so the answer is the number of components minus one.",
    approach: [
      "If there are fewer than n - 1 cables, return -1.",
      "Union the endpoints of every cable, counting components.",
      "Return components - 1.",
    ],
    complexity: { time: "O(n + e α(n))", space: "O(n)", note: "Near-linear union-find." },
    solutions: [
      {
        language: "python",
        label: "Union Find",
        code: `def make_connected(n: int, connections: list[list[int]]) -> int:
    if len(connections) < n - 1:
        return -1
    parent = list(range(n))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    comp = n
    for a, b in connections:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            comp -= 1
    return comp - 1`,
      },
      {
        language: "typescript",
        label: "Union Find",
        code: `function makeConnected(n: number, connections: number[][]): number {
  if (connections.length < n - 1) return -1;
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  let comp = n;
  for (const [a, b] of connections) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      comp--;
    }
  }
  return comp - 1;
}`,
      },
    ],
    runner: {
      entry: "makeConnected",
      comparison: "deep",
      jsStarter: `function makeConnected(n, connections) {
  // Return min moves to connect all computers, or -1.
  // TODO: implement
}`,
      jsReference: `function makeConnected(n, connections) {
  if (connections.length < n - 1) return -1;
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  let comp = n;
  for (const [a, b] of connections) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      comp--;
    }
  }
  return comp - 1;
}`,
    },
    tests: [
      { name: "one move", args: [4, [[0, 1], [0, 2], [1, 2]]], expected: 1 },
      { name: "two moves", args: [6, [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]]], expected: 2 },
      { name: "impossible", args: [6, [[0, 1], [0, 2], [0, 3], [1, 2]]], expected: -1 },
    ],
    hints: ["You need n-1 cables minimum.", "Redundant cables bridge components."],
    relatedIds: [2316, 2492],
  },
  {
    id: 2316,
    slug: "count-unreachable-pairs-of-nodes-in-an-undirected-graph",
    title: "Count Unreachable Pairs of Nodes in an Undirected Graph",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["Union Find", "Connected Components"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/",
    description:
      "Given an undirected graph with `n` nodes and an edge list, count the pairs of distinct nodes that lie in different connected components (i.e., cannot reach each other).",
    examples: [
      {
        input: "n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]",
        output: "14",
        explanation: "Components of size 4, 2, and 1 give 4·2 + 4·1 + 2·1 = 14 cross pairs.",
      },
      { input: "n = 3, edges = [[0,1],[0,2],[1,2]]", output: "0", explanation: "Everything is connected." },
    ],
    constraints: ["1 ≤ n ≤ 10^5", "0 ≤ edges.length ≤ 2 * 10^5", "No self-loops or duplicate edges."],
    intuition:
      "Two nodes are unreachable exactly when they sit in different components. Tracking component sizes with union-find lets each component contribute size·(n − size) cross pairs; halving the total removes the double counting.",
    approach: [
      "Union all edges, maintaining a size per root.",
      "For each root, add size · (n − size).",
      "Divide the accumulated sum by 2 to avoid counting each pair twice.",
    ],
    complexity: { time: "O(n + e α(n))", space: "O(n)", note: "Union-find with sizes." },
    solutions: [
      {
        language: "python",
        label: "Union Find",
        code: `def count_pairs(n: int, edges: list[list[int]]) -> int:
    parent = list(range(n))
    size = [1] * n

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            size[rb] += size[ra]

    total = 0
    for i in range(n):
        if find(i) == i:
            total += size[i] * (n - size[i])
    return total // 2`,
      },
      {
        language: "typescript",
        label: "Union Find",
        code: `function countPairs(n: number, edges: number[][]): number {
  const parent = Array.from({ length: n }, (_, i) => i);
  const size = new Array(n).fill(1);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      size[rb] += size[ra];
    }
  }
  let total = 0;
  for (let i = 0; i < n; i++) {
    if (find(i) === i) total += size[i] * (n - size[i]);
  }
  return total / 2;
}`,
      },
    ],
    runner: {
      entry: "countPairs",
      comparison: "deep",
      jsStarter: `function countPairs(n, edges) {
  // Return the number of node pairs in different components.
  // TODO: implement
}`,
      jsReference: `function countPairs(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const size = new Array(n).fill(1);
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      size[rb] += size[ra];
    }
  }
  let total = 0;
  for (let i = 0; i < n; i++) {
    if (find(i) === i) total += size[i] * (n - size[i]);
  }
  return total / 2;
}`,
    },
    tests: [
      { name: "three components", args: [7, [[0, 2], [0, 5], [2, 4], [1, 6], [5, 4]]], expected: 14 },
      { name: "fully connected", args: [3, [[0, 1], [0, 2], [1, 2]]], expected: 0 },
      { name: "all isolated", args: [4, []], expected: 6 },
    ],
    hints: ["Group nodes by component.", "Cross-component pairs = size·(n−size), halved."],
    relatedIds: [1319],
  },
  {
    id: 1267,
    slug: "count-servers-that-communicate",
    title: "Count Servers that Communicate",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["Grid", "Counting"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 46,
    leetcodeUrl: "https://leetcode.com/problems/count-servers-that-communicate/",
    description:
      "A grid holds servers (`1`) and empty cells (`0`). Two servers communicate if they share a row or column. Return how many servers can communicate with at least one other server.",
    examples: [
      { input: "grid = [[1,0],[0,1]]", output: "0", explanation: "Each server is alone in its row and column." },
      { input: "grid = [[1,0],[1,1]]", output: "3", explanation: "All three servers share a row or column with another." },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 ≤ m, n ≤ 250", "grid[i][j] is 0 or 1."],
    intuition:
      "A server communicates precisely when its row or its column holds more than one server. Counting servers per row and per column first makes the test a simple lookup.",
    approach: [
      "Tally the number of servers in each row and each column.",
      "Scan every server cell.",
      "Count it if its row total or column total exceeds one.",
    ],
    complexity: { time: "O(m·n)", space: "O(m + n)", note: "Two passes over the grid." },
    solutions: [
      {
        language: "python",
        label: "Row/Col Counts",
        code: `def count_servers(grid: list[list[int]]) -> int:
    rows = len(grid)
    cols = len(grid[0])
    row_cnt = [0] * rows
    col_cnt = [0] * cols
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                row_cnt[r] += 1
                col_cnt[c] += 1
    ans = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1 and (row_cnt[r] > 1 or col_cnt[c] > 1):
                ans += 1
    return ans`,
      },
      {
        language: "typescript",
        label: "Row/Col Counts",
        code: `function countServers(grid: number[][]): number {
  const rows = grid.length, cols = grid[0].length;
  const rowCnt = new Array(rows).fill(0);
  const colCnt = new Array(cols).fill(0);
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1) { rowCnt[r]++; colCnt[c]++; }
  let ans = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1 && (rowCnt[r] > 1 || colCnt[c] > 1)) ans++;
  return ans;
}`,
      },
    ],
    runner: {
      entry: "countServers",
      comparison: "deep",
      jsStarter: `function countServers(grid) {
  // Return the count of communicating servers.
  // TODO: implement
}`,
      jsReference: `function countServers(grid) {
  const rows = grid.length, cols = grid[0].length;
  const rowCnt = new Array(rows).fill(0);
  const colCnt = new Array(cols).fill(0);
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1) { rowCnt[r]++; colCnt[c]++; }
  let ans = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1 && (rowCnt[r] > 1 || colCnt[c] > 1)) ans++;
  return ans;
}`,
    },
    tests: [
      { name: "all alone", args: [[[1, 0], [0, 1]]], expected: 0 },
      { name: "three communicate", args: [[[1, 0], [1, 1]]], expected: 3 },
      { name: "two clusters", args: [[[1, 1, 0, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 1]]], expected: 4 },
    ],
    hints: ["Count servers per row and column.", "A lone server in both directions is isolated."],
    relatedIds: [1615],
  },
  {
    id: 1615,
    slug: "maximal-network-rank",
    title: "Maximal Network Rank",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["Graph", "Degree Counting"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/maximal-network-rank/",
    description:
      "For `n` cities joined by bidirectional `roads`, the network rank of two cities is the count of roads touching either one, where a road directly between them is counted only once. Return the maximum network rank over all city pairs.",
    examples: [
      {
        input: "n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]",
        output: "4",
        explanation: "Pair (0,1): degrees 2 and 3, minus the shared road, gives 4.",
      },
      {
        input: "n = 5, roads = [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]",
        output: "5",
      },
    ],
    constraints: ["2 ≤ n ≤ 100", "0 ≤ roads.length ≤ n * (n - 1) / 2", "No duplicate roads or self-loops."],
    intuition:
      "The rank of a pair is the sum of their degrees, reduced by one when a road connects them directly. Recording degrees and direct adjacency lets you evaluate every pair quickly.",
    approach: [
      "Compute the degree of each city and mark which pairs share a direct road.",
      "For every unordered pair, sum their degrees and subtract one if directly connected.",
      "Track and return the maximum.",
    ],
    complexity: { time: "O(n^2 + e)", space: "O(n^2)", note: "Adjacency matrix over up to 100 cities." },
    solutions: [
      {
        language: "python",
        label: "Degree + Adjacency",
        code: `def maximal_network_rank(n: int, roads: list[list[int]]) -> int:
    deg = [0] * n
    connected = [[False] * n for _ in range(n)]
    for a, b in roads:
        deg[a] += 1
        deg[b] += 1
        connected[a][b] = connected[b][a] = True
    ans = 0
    for i in range(n):
        for j in range(i + 1, n):
            rank = deg[i] + deg[j] - (1 if connected[i][j] else 0)
            ans = max(ans, rank)
    return ans`,
      },
      {
        language: "typescript",
        label: "Degree + Adjacency",
        code: `function maximalNetworkRank(n: number, roads: number[][]): number {
  const deg = new Array(n).fill(0);
  const connected: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));
  for (const [a, b] of roads) {
    deg[a]++; deg[b]++;
    connected[a][b] = connected[b][a] = true;
  }
  let ans = 0;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      const rank = deg[i] + deg[j] - (connected[i][j] ? 1 : 0);
      ans = Math.max(ans, rank);
    }
  return ans;
}`,
      },
    ],
    runner: {
      entry: "maximalNetworkRank",
      comparison: "deep",
      jsStarter: `function maximalNetworkRank(n, roads) {
  // Return the maximum network rank over all city pairs.
  // TODO: implement
}`,
      jsReference: `function maximalNetworkRank(n, roads) {
  const deg = new Array(n).fill(0);
  const connected = Array.from({ length: n }, () => new Array(n).fill(false));
  for (const [a, b] of roads) {
    deg[a]++; deg[b]++;
    connected[a][b] = connected[b][a] = true;
  }
  let ans = 0;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      const rank = deg[i] + deg[j] - (connected[i][j] ? 1 : 0);
      ans = Math.max(ans, rank);
    }
  return ans;
}`,
    },
    tests: [
      { name: "rank 4", args: [4, [[0, 1], [0, 3], [1, 2], [1, 3]]], expected: 4 },
      { name: "rank 5", args: [5, [[0, 1], [0, 3], [1, 2], [1, 3], [2, 3], [2, 4]]], expected: 5 },
      { name: "disjoint hubs", args: [8, [[0, 1], [1, 2], [2, 3], [2, 4], [5, 6], [5, 7]]], expected: 5 },
    ],
    hints: ["Rank = deg(a) + deg(b) minus a shared road.", "Only 100 cities, so check all pairs."],
    relatedIds: [1267],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Advanced Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1129,
    slug: "shortest-path-with-alternating-colors",
    title: "Shortest Path with Alternating Colors",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["BFS", "State BFS", "Shortest Path"],
    companies: ["amazon", "google", "uber"],
    frequency: 51,
    leetcodeUrl: "https://leetcode.com/problems/shortest-path-with-alternating-colors/",
    description:
      "A directed graph on `n` nodes has red and blue edges. Starting at node 0, find the shortest path length to each node such that edge colors alternate along the path. Return an array of length `n` with `-1` where no such path exists.",
    examples: [
      { input: "n = 3, redEdges = [[0,1],[1,2]], blueEdges = []", output: "[0,1,-1]", explanation: "Node 2 needs a blue edge after a red one, but none exists." },
      { input: "n = 3, redEdges = [[0,1],[0,2]], blueEdges = [[1,0]]", output: "[0,1,1]" },
    ],
    constraints: ["1 ≤ n ≤ 100", "Edges may repeat or form self-loops", "0 ≤ from, to < n."],
    intuition:
      "Distance depends not just on the node but on the color of the last edge used, so each node is split into a red-arrival state and a blue-arrival state. A breadth-first search over these doubled states yields the shortest alternating path.",
    approach: [
      "Build separate red and blue adjacency lists.",
      "Track distance per (node, lastColor) state; seed node 0 with both colors at distance 0.",
      "BFS, expanding only edges of the opposite color to the last one used.",
      "For each node, take the smaller of its two state distances, or -1 if unreached.",
    ],
    complexity: { time: "O(n + e)", space: "O(n + e)", note: "States are at most 2n." },
    solutions: [
      {
        language: "python",
        label: "State BFS",
        code: `from collections import deque


def shortest_alternating_paths(n: int, red_edges: list[list[int]], blue_edges: list[list[int]]) -> list[int]:
    adj = [[[], []] for _ in range(n)]  # adj[u][0]=red, adj[u][1]=blue
    for u, v in red_edges:
        adj[u][0].append(v)
    for u, v in blue_edges:
        adj[u][1].append(v)
    INF = float("inf")
    dist = [[INF, INF] for _ in range(n)]
    dist[0] = [0, 0]
    q = deque([(0, 0), (0, 1)])
    while q:
        node, last = q.popleft()
        nxt_color = last ^ 1
        for nb in adj[node][nxt_color]:
            if dist[nb][nxt_color] == INF:
                dist[nb][nxt_color] = dist[node][last] + 1
                q.append((nb, nxt_color))
    return [-1 if min(a, b) == INF else min(a, b) for a, b in dist]`,
      },
      {
        language: "typescript",
        label: "State BFS",
        code: `function shortestAlternatingPaths(n: number, redEdges: number[][], blueEdges: number[][]): number[] {
  const adj: [number[], number[]][] = Array.from({ length: n }, () => [[], []]);
  for (const [u, v] of redEdges) adj[u][0].push(v);
  for (const [u, v] of blueEdges) adj[u][1].push(v);
  const INF = Infinity;
  const dist: [number, number][] = Array.from({ length: n }, () => [INF, INF]);
  dist[0] = [0, 0];
  const q: [number, number][] = [[0, 0], [0, 1]];
  let head = 0;
  while (head < q.length) {
    const [node, last] = q[head++];
    const nxt = last ^ 1;
    for (const nb of adj[node][nxt]) {
      if (dist[nb][nxt] === INF) {
        dist[nb][nxt] = dist[node][last] + 1;
        q.push([nb, nxt]);
      }
    }
  }
  return dist.map(([a, b]) => (Math.min(a, b) === INF ? -1 : Math.min(a, b)));
}`,
      },
    ],
    runner: {
      entry: "shortestAlternatingPaths",
      comparison: "deep",
      jsStarter: `function shortestAlternatingPaths(n, redEdges, blueEdges) {
  // Return shortest alternating-color path length to each node.
  // TODO: implement
}`,
      jsReference: `function shortestAlternatingPaths(n, redEdges, blueEdges) {
  const adj = Array.from({ length: n }, () => [[], []]);
  for (const [u, v] of redEdges) adj[u][0].push(v);
  for (const [u, v] of blueEdges) adj[u][1].push(v);
  const INF = Infinity;
  const dist = Array.from({ length: n }, () => [INF, INF]);
  dist[0] = [0, 0];
  const q = [[0, 0], [0, 1]];
  let head = 0;
  while (head < q.length) {
    const [node, last] = q[head++];
    const nxt = last ^ 1;
    for (const nb of adj[node][nxt]) {
      if (dist[nb][nxt] === INF) {
        dist[nb][nxt] = dist[node][last] + 1;
        q.push([nb, nxt]);
      }
    }
  }
  return dist.map(([a, b]) => (Math.min(a, b) === INF ? -1 : Math.min(a, b)));
}`,
    },
    tests: [
      { name: "no alternation", args: [3, [[0, 1], [1, 2]], []], expected: [0, 1, -1] },
      { name: "blue dead end", args: [3, [[0, 1]], [[2, 1]]], expected: [0, 1, -1] },
      { name: "both colors", args: [3, [[0, 1], [0, 2]], [[1, 0]]], expected: [0, 1, 1] },
      { name: "parallel edges", args: [2, [[0, 1]], [[0, 1]]], expected: [0, 1] },
    ],
    hints: ["State = (node, last edge color).", "BFS over doubled states gives shortest lengths."],
    relatedIds: [1334],
  },
  {
    id: 1334,
    slug: "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
    title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Floyd-Warshall", "All-Pairs Shortest Path"],
    companies: ["amazon", "google", "uber", "bloomberg"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
    description:
      "Given `n` cities, weighted bidirectional `edges`, and a `distanceThreshold`, find the city that can reach the fewest other cities within the threshold distance. If several tie, return the one with the largest label.",
    examples: [
      {
        input: "n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4",
        output: "3",
        explanation: "Cities 0 and 3 both reach only two others; the larger label is 3.",
      },
      {
        input: "n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2",
        output: "0",
      },
    ],
    constraints: ["2 ≤ n ≤ 100", "1 ≤ edges.length ≤ n * (n - 1) / 2", "1 ≤ weight, distanceThreshold ≤ 10^4."],
    intuition:
      "With at most 100 cities, computing all-pairs shortest paths via Floyd–Warshall is cheap. Then a single pass counts each city's reachable neighbors and picks the best, favoring larger labels on ties.",
    approach: [
      "Initialize a distance matrix with the given edges and zero on the diagonal.",
      "Run Floyd–Warshall to fill in all shortest paths.",
      "For each city, count cities within the threshold.",
      "Iterate ascending and keep the city with the smallest count (ties favor the later, larger index).",
    ],
    complexity: { time: "O(n^3)", space: "O(n^2)", note: "Floyd–Warshall over n ≤ 100." },
    solutions: [
      {
        language: "python",
        label: "Floyd-Warshall",
        code: `def find_the_city(n: int, edges: list[list[int]], distance_threshold: int) -> int:
    INF = float("inf")
    d = [[INF] * n for _ in range(n)]
    for i in range(n):
        d[i][i] = 0
    for u, v, w in edges:
        d[u][v] = min(d[u][v], w)
        d[v][u] = min(d[v][u], w)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if d[i][k] + d[k][j] < d[i][j]:
                    d[i][j] = d[i][k] + d[k][j]
    ans_city, ans_count = -1, INF
    for i in range(n):
        cnt = sum(1 for j in range(n) if j != i and d[i][j] <= distance_threshold)
        if cnt <= ans_count:
            ans_count, ans_city = cnt, i
    return ans_city`,
      },
      {
        language: "typescript",
        label: "Floyd-Warshall",
        code: `function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
  const INF = 1e9;
  const d = Array.from({ length: n }, () => new Array(n).fill(INF));
  for (let i = 0; i < n; i++) d[i][i] = 0;
  for (const [u, v, w] of edges) {
    d[u][v] = Math.min(d[u][v], w);
    d[v][u] = Math.min(d[v][u], w);
  }
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j];
  let ansCity = -1, ansCount = INF;
  for (let i = 0; i < n; i++) {
    let cnt = 0;
    for (let j = 0; j < n; j++) if (j !== i && d[i][j] <= distanceThreshold) cnt++;
    if (cnt <= ansCount) { ansCount = cnt; ansCity = i; }
  }
  return ansCity;
}`,
      },
    ],
    runner: {
      entry: "findTheCity",
      comparison: "deep",
      jsStarter: `function findTheCity(n, edges, distanceThreshold) {
  // Return the city with the fewest reachable neighbors (ties -> larger label).
  // TODO: implement
}`,
      jsReference: `function findTheCity(n, edges, distanceThreshold) {
  const INF = 1e9;
  const d = Array.from({ length: n }, () => new Array(n).fill(INF));
  for (let i = 0; i < n; i++) d[i][i] = 0;
  for (const [u, v, w] of edges) {
    d[u][v] = Math.min(d[u][v], w);
    d[v][u] = Math.min(d[v][u], w);
  }
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j];
  let ansCity = -1, ansCount = INF;
  for (let i = 0; i < n; i++) {
    let cnt = 0;
    for (let j = 0; j < n; j++) if (j !== i && d[i][j] <= distanceThreshold) cnt++;
    if (cnt <= ansCount) { ansCount = cnt; ansCity = i; }
  }
  return ansCity;
}`,
    },
    tests: [
      { name: "tie favors 3", args: [4, [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], 4], expected: 3 },
      { name: "city 0", args: [5, [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], 2], expected: 0 },
      { name: "all unreachable", args: [2, [[0, 1, 5]], 4], expected: 1 },
    ],
    hints: ["Compute all-pairs shortest paths.", "Ties break toward the larger index."],
    relatedIds: [1129, 1135],
  },
  {
    id: 1514,
    slug: "path-with-maximum-probability",
    title: "Path with Maximum Probability",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Dijkstra", "Shortest Path"],
    companies: ["amazon", "google", "uber", "databricks"],
    frequency: 53,
    leetcodeUrl: "https://leetcode.com/problems/path-with-maximum-probability/",
    description:
      "An undirected graph has `n` nodes and edges with success probabilities. Return the maximum probability of reaching `end` from `start` along any path, or `0` if no path exists.",
    examples: [
      {
        input: "n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2",
        output: "0.25",
        explanation: "Path 0→1→2 yields 0.5·0.5 = 0.25, beating the direct edge's 0.2.",
      },
      {
        input: "n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2",
        output: "0.3",
      },
    ],
    constraints: ["2 ≤ n ≤ 10^4", "0 ≤ edges.length ≤ 2·10^4", "0 ≤ succProb[i] ≤ 1."],
    intuition:
      "Multiplying probabilities means longer paths shrink the result, so the best path maximizes a product. A Dijkstra-style search with a max-heap on probability always settles each node with its best achievable value first.",
    approach: [
      "Build an adjacency list of (neighbor, probability).",
      "Seed a max-heap with (1.0, start) and a best-probability array.",
      "Pop the highest-probability node; if it is end, return its probability.",
      "Relax neighbors by multiplying, pushing improvements onto the heap.",
      "Return 0 if end is never settled.",
    ],
    complexity: { time: "O((n + e) log n)", space: "O(n + e)", note: "Heap-based best-first search." },
    solutions: [
      {
        language: "python",
        label: "Dijkstra (max-heap)",
        code: `import heapq


def max_probability(n: int, edges: list[list[int]], succ_prob: list[float], start: int, end: int) -> float:
    adj: list[list[tuple[int, float]]] = [[] for _ in range(n)]
    for i, (u, v) in enumerate(edges):
        adj[u].append((v, succ_prob[i]))
        adj[v].append((u, succ_prob[i]))
    best = [0.0] * n
    best[start] = 1.0
    heap = [(-1.0, start)]
    while heap:
        neg_p, node = heapq.heappop(heap)
        p = -neg_p
        if node == end:
            return p
        if p < best[node]:
            continue
        for nb, ep in adj[node]:
            np = p * ep
            if np > best[nb]:
                best[nb] = np
                heapq.heappush(heap, (-np, nb))
    return 0.0`,
      },
      {
        language: "typescript",
        label: "Dijkstra (max-heap)",
        code: `function maxProbability(n: number, edges: number[][], succProb: number[], start: number, end: number): number {
  const adj: [number, number][][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    adj[u].push([v, succProb[i]]);
    adj[v].push([u, succProb[i]]);
  }
  const best = new Array(n).fill(0);
  best[start] = 1;
  // Simple array-backed max-heap by probability.
  const heap: [number, number][] = [[1, start]];
  const up = (i: number) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[i][0] > heap[p][0]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break;
    }
  };
  const down = (i: number) => {
    for (;;) {
      let l = 2 * i + 1, r = 2 * i + 2, b = i;
      if (l < heap.length && heap[l][0] > heap[b][0]) b = l;
      if (r < heap.length && heap[r][0] > heap[b][0]) b = r;
      if (b === i) break;
      [heap[i], heap[b]] = [heap[b], heap[i]]; i = b;
    }
  };
  while (heap.length) {
    const [p, node] = heap[0];
    const last = heap.pop()!;
    if (heap.length) { heap[0] = last; down(0); }
    if (node === end) return p;
    if (p < best[node]) continue;
    for (const [nb, ep] of adj[node]) {
      const np = p * ep;
      if (np > best[nb]) { best[nb] = np; heap.push([np, nb]); up(heap.length - 1); }
    }
  }
  return 0;
}`,
      },
    ],
    runner: {
      entry: "maxProbability",
      comparison: "approx",
      jsStarter: `function maxProbability(n, edges, succProb, start, end) {
  // Return the maximum success probability from start to end.
  // TODO: implement
}`,
      jsReference: `function maxProbability(n, edges, succProb, start, end) {
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    adj[u].push([v, succProb[i]]);
    adj[v].push([u, succProb[i]]);
  }
  const best = new Array(n).fill(0);
  best[start] = 1;
  const heap = [[1, start]];
  const up = (i) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[i][0] > heap[p][0]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break;
    }
  };
  const down = (i) => {
    for (;;) {
      let l = 2 * i + 1, r = 2 * i + 2, b = i;
      if (l < heap.length && heap[l][0] > heap[b][0]) b = l;
      if (r < heap.length && heap[r][0] > heap[b][0]) b = r;
      if (b === i) break;
      [heap[i], heap[b]] = [heap[b], heap[i]]; i = b;
    }
  };
  while (heap.length) {
    const [p, node] = heap[0];
    const last = heap.pop();
    if (heap.length) { heap[0] = last; down(0); }
    if (node === end) return p;
    if (p < best[node]) continue;
    for (const [nb, ep] of adj[node]) {
      const np = p * ep;
      if (np > best[nb]) { best[nb] = np; heap.push([np, nb]); up(heap.length - 1); }
    }
  }
  return 0;
}`,
    },
    tests: [
      { name: "two-hop wins", args: [3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.2], 0, 2], expected: 0.25, tolerance: 1e-6 },
      { name: "direct wins", args: [3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.3], 0, 2], expected: 0.3, tolerance: 1e-6 },
      { name: "no path", args: [3, [[0, 1]], [0.5], 0, 2], expected: 0, tolerance: 1e-6 },
    ],
    hints: ["Maximize a product of probabilities.", "Use a max-heap Dijkstra variant."],
    relatedIds: [1334, 1102],
  },
  {
    id: 1135,
    slug: "connecting-cities-with-minimum-cost",
    title: "Connecting Cities With Minimum Cost",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Minimum Spanning Tree", "Kruskal", "Union Find"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 49,
    premium: true,
    leetcodeUrl: "https://leetcode.com/problems/connecting-cities-with-minimum-cost/",
    description:
      "Cities labeled `1..n` can be linked by weighted `connections`. Return the minimum total cost to connect every city, or `-1` if it cannot be done.",
    examples: [
      { input: "n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]", output: "6", explanation: "Use the cost-1 and cost-5 links." },
      { input: "n = 4, connections = [[1,2,3],[3,4,4]]", output: "-1", explanation: "The two pairs can never be joined." },
    ],
    constraints: ["1 ≤ n ≤ 10^4", "1 ≤ connections.length ≤ 10^4", "1 ≤ cost ≤ 10^5."],
    intuition:
      "Connecting all cities at minimum cost is precisely a minimum spanning tree. Sorting edges by cost and greedily uniting disjoint cities (Kruskal) builds it; if fewer than n - 1 edges are accepted, the graph is disconnected.",
    approach: [
      "Sort connections by ascending cost.",
      "Use union-find; for each edge joining two components, add its cost and increment a used counter.",
      "If exactly n - 1 edges are used, return the total cost.",
      "Otherwise the cities cannot all be connected, so return -1.",
    ],
    complexity: { time: "O(e log e)", space: "O(n)", note: "Kruskal dominated by the sort." },
    solutions: [
      {
        language: "python",
        label: "Kruskal MST",
        code: `def minimum_cost(n: int, connections: list[list[int]]) -> int:
    parent = list(range(n + 1))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    total = used = 0
    for a, b, c in sorted(connections, key=lambda e: e[2]):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            total += c
            used += 1
    return total if used == n - 1 else -1`,
      },
      {
        language: "typescript",
        label: "Kruskal MST",
        code: `function minimumCost(n: number, connections: number[][]): number {
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  const sorted = connections.slice().sort((a, b) => a[2] - b[2]);
  let total = 0, used = 0;
  for (const [a, b, c] of sorted) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      total += c;
      used++;
    }
  }
  return used === n - 1 ? total : -1;
}`,
      },
    ],
    runner: {
      entry: "minimumCost",
      comparison: "deep",
      jsStarter: `function minimumCost(n, connections) {
  // Return the MST cost, or -1 if disconnected.
  // TODO: implement
}`,
      jsReference: `function minimumCost(n, connections) {
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  const sorted = connections.slice().sort((a, b) => a[2] - b[2]);
  let total = 0, used = 0;
  for (const [a, b, c] of sorted) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      total += c;
      used++;
    }
  }
  return used === n - 1 ? total : -1;
}`,
    },
    tests: [
      { name: "mst 6", args: [3, [[1, 2, 5], [1, 3, 6], [2, 3, 1]]], expected: 6 },
      { name: "disconnected", args: [4, [[1, 2, 3], [3, 4, 4]]], expected: -1 },
      { name: "chain mst", args: [4, [[1, 2, 1], [2, 3, 2], [3, 4, 3], [1, 4, 10]]], expected: 6 },
    ],
    hints: ["This is a minimum spanning tree.", "Kruskal with union-find; check edge count."],
    relatedIds: [1334],
  },
  {
    id: 1102,
    slug: "path-with-maximum-minimum-value",
    title: "Path With Maximum Minimum Value",
    difficulty: "Medium",
    category: "advanced-graphs",
    patterns: ["Dijkstra", "Max-Heap", "Grid"],
    companies: ["amazon", "google", "uber"],
    frequency: 45,
    premium: true,
    leetcodeUrl: "https://leetcode.com/problems/path-with-maximum-minimum-value/",
    description:
      "From the top-left to the bottom-right of an integer grid, moving in four directions, the score of a path is its smallest cell value. Return the maximum score achievable.",
    examples: [
      { input: "grid = [[5,4,5],[1,2,6],[7,4,6]]", output: "4", explanation: "Every path to the corner must pass through a cell ≤ 4." },
      { input: "grid = [[2,2,1,2,2,2],[1,2,2,2,1,2]]", output: "2" },
    ],
    constraints: ["1 ≤ m, n ≤ 100", "0 ≤ grid[i][j] ≤ 10^9", "Movement is 4-directional."],
    intuition:
      "To maximize the minimum cell on the path, always expand toward the largest reachable cell next. A best-first (max-heap) search settles cells in decreasing value, and the running minimum when you first reach the corner is the answer.",
    approach: [
      "Push the start cell into a max-heap keyed by value and mark visited lazily.",
      "Pop the largest-value frontier cell, lowering the running minimum to its value.",
      "If it is the destination, return the running minimum.",
      "Push unvisited 4-directional neighbors and continue.",
    ],
    complexity: { time: "O(m·n log(m·n))", space: "O(m·n)", note: "Dijkstra-style max-min search." },
    solutions: [
      {
        language: "python",
        label: "Dijkstra (max-min)",
        code: `import heapq


def maximum_minimum_path(grid: list[list[int]]) -> int:
    n, m = len(grid), len(grid[0])
    seen = [[False] * m for _ in range(n)]
    heap = [(-grid[0][0], 0, 0)]
    ans = grid[0][0]
    while heap:
        neg_v, r, c = heapq.heappop(heap)
        if seen[r][c]:
            continue
        seen[r][c] = True
        ans = min(ans, -neg_v)
        if r == n - 1 and c == m - 1:
            return ans
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m and not seen[nr][nc]:
                heapq.heappush(heap, (-grid[nr][nc], nr, nc))
    return ans`,
      },
      {
        language: "typescript",
        label: "Dijkstra (max-min)",
        code: `function maximumMinimumPath(grid: number[][]): number {
  const n = grid.length, m = grid[0].length;
  const seen = Array.from({ length: n }, () => new Array(m).fill(false));
  const heap: [number, number, number][] = [[grid[0][0], 0, 0]];
  const up = (i: number) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[i][0] > heap[p][0]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break;
    }
  };
  const down = (i: number) => {
    for (;;) {
      let l = 2 * i + 1, r = 2 * i + 2, b = i;
      if (l < heap.length && heap[l][0] > heap[b][0]) b = l;
      if (r < heap.length && heap[r][0] > heap[b][0]) b = r;
      if (b === i) break;
      [heap[i], heap[b]] = [heap[b], heap[i]]; i = b;
    }
  };
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let ans = grid[0][0];
  while (heap.length) {
    const [v, r, c] = heap[0];
    const last = heap.pop()!;
    if (heap.length) { heap[0] = last; down(0); }
    if (seen[r][c]) continue;
    seen[r][c] = true;
    ans = Math.min(ans, v);
    if (r === n - 1 && c === m - 1) return ans;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < m && !seen[nr][nc]) {
        heap.push([grid[nr][nc], nr, nc]); up(heap.length - 1);
      }
    }
  }
  return ans;
}`,
      },
    ],
    runner: {
      entry: "maximumMinimumPath",
      comparison: "deep",
      jsStarter: `function maximumMinimumPath(grid) {
  // Return the maximum possible minimum value along a corner-to-corner path.
  // TODO: implement
}`,
      jsReference: `function maximumMinimumPath(grid) {
  const n = grid.length, m = grid[0].length;
  const seen = Array.from({ length: n }, () => new Array(m).fill(false));
  const heap = [[grid[0][0], 0, 0]];
  const up = (i) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[i][0] > heap[p][0]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break;
    }
  };
  const down = (i) => {
    for (;;) {
      let l = 2 * i + 1, r = 2 * i + 2, b = i;
      if (l < heap.length && heap[l][0] > heap[b][0]) b = l;
      if (r < heap.length && heap[r][0] > heap[b][0]) b = r;
      if (b === i) break;
      [heap[i], heap[b]] = [heap[b], heap[i]]; i = b;
    }
  };
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let ans = grid[0][0];
  while (heap.length) {
    const [v, r, c] = heap[0];
    const last = heap.pop();
    if (heap.length) { heap[0] = last; down(0); }
    if (seen[r][c]) continue;
    seen[r][c] = true;
    ans = Math.min(ans, v);
    if (r === n - 1 && c === m - 1) return ans;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < m && !seen[nr][nc]) {
        heap.push([grid[nr][nc], nr, nc]); up(heap.length - 1);
      }
    }
  }
  return ans;
}`,
    },
    tests: [
      { name: "blocked by 4", args: [[[5, 4, 5], [1, 2, 6], [7, 4, 6]]], expected: 4 },
      { name: "single cell", args: [[[5]]], expected: 5 },
      { name: "start dominates", args: [[[1, 2], [3, 4]]], expected: 1 },
    ],
    hints: ["Expand toward the largest reachable cell.", "Track the running minimum until you reach the corner."],
    relatedIds: [1514],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Heap / Priority Queue
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 2336,
    slug: "smallest-number-in-infinite-set",
    title: "Smallest Number in Infinite Set",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "Design"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/smallest-number-in-infinite-set/",
    description:
      "Design a set that initially contains every positive integer. Support `popSmallest()`, which removes and returns the current smallest element, and `addBack(num)`, which restores `num` if it was previously removed.",
    examples: [
      {
        input: 'ops = ["SmallestInfiniteSet","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest"], args = [[],[2],[],[],[],[1],[],[],[]]',
        output: "[null,null,1,2,3,null,1,4,5]",
        explanation: "After popping 1,2,3, adding back 1 lets the next pop return 1 again.",
      },
    ],
    constraints: ["1 ≤ num ≤ 1000", "At most 1000 calls total", "addBack only restores previously popped numbers."],
    intuition:
      "Numbers never yet popped form a contiguous run starting at some counter, so a single integer tracks them. Only the smaller numbers that were added back need a min-heap (and a set to dedupe), and a pop prefers the heap's minimum when it beats the counter.",
    approach: [
      "Keep a counter `cur` for the smallest never-popped integer and an empty min-heap plus a presence set.",
      "popSmallest: if the heap's min is below `cur`, pop it; otherwise return `cur` and advance it.",
      "addBack(num): if num is below `cur` and not already queued, push it onto the heap and mark it present.",
    ],
    complexity: { time: "O(log k) per op", space: "O(k)", note: "k = count of added-back numbers." },
    solutions: [
      {
        language: "python",
        label: "Counter + Min-Heap",
        code: `import heapq


class SmallestInfiniteSet:
    def __init__(self) -> None:
        self.cur = 1
        self.heap: list[int] = []
        self.in_set: set[int] = set()

    def popSmallest(self) -> int:
        if self.heap:
            x = heapq.heappop(self.heap)
            self.in_set.discard(x)
            return x
        x = self.cur
        self.cur += 1
        return x

    def addBack(self, num: int) -> None:
        if num < self.cur and num not in self.in_set:
            self.in_set.add(num)
            heapq.heappush(self.heap, num)`,
      },
      {
        language: "typescript",
        label: "Counter + Min-Heap",
        code: `class SmallestInfiniteSet {
  private cur = 1;
  private heap: number[] = [];
  private inSet = new Set<number>();

  private up(i: number): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[i] < this.heap[p]) { [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]]; i = p; } else break;
    }
  }
  private down(i: number): void {
    for (;;) {
      let l = 2 * i + 1, r = 2 * i + 2, s = i;
      if (l < this.heap.length && this.heap[l] < this.heap[s]) s = l;
      if (r < this.heap.length && this.heap[r] < this.heap[s]) s = r;
      if (s === i) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]]; i = s;
    }
  }

  popSmallest(): number {
    if (this.heap.length) {
      const top = this.heap[0];
      const last = this.heap.pop()!;
      if (this.heap.length) { this.heap[0] = last; this.down(0); }
      this.inSet.delete(top);
      return top;
    }
    return this.cur++;
  }

  addBack(num: number): void {
    if (num < this.cur && !this.inSet.has(num)) {
      this.inSet.add(num);
      this.heap.push(num);
      this.up(this.heap.length - 1);
    }
  }
}`,
      },
    ],
    runner: {
      entry: "runSet",
      comparison: "deep",
      jsStarter: `function runSet(ops, args) {
  // Replay the operations and return an array of results.
  // "SmallestInfiniteSet"/"addBack" return null; "popSmallest" returns a number.
  // TODO: implement
}`,
      jsReference: `function runSet(ops, args) {
  const out = [];
  let cur = 1;
  const inSet = new Set();
  const heap = [];
  const up = (i) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[i] < heap[p]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break;
    }
  };
  const down = (i) => {
    for (;;) {
      let l = 2 * i + 1, r = 2 * i + 2, s = i;
      if (l < heap.length && heap[l] < heap[s]) s = l;
      if (r < heap.length && heap[r] < heap[s]) s = r;
      if (s === i) break;
      [heap[i], heap[s]] = [heap[s], heap[i]]; i = s;
    }
  };
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i], a = args[i] || [];
    if (op === "SmallestInfiniteSet") { cur = 1; inSet.clear(); heap.length = 0; out.push(null); }
    else if (op === "popSmallest") {
      if (heap.length) {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length) { heap[0] = last; down(0); }
        inSet.delete(top);
        out.push(top);
      } else out.push(cur++);
    } else if (op === "addBack") {
      const num = a[0];
      if (num < cur && !inSet.has(num)) { inSet.add(num); heap.push(num); up(heap.length - 1); }
      out.push(null);
    }
  }
  return out;
}`,
    },
    tests: [
      {
        name: "add back 1 and 2",
        args: [
          ["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"],
          [[], [2], [], [], [], [1], [], [], []],
        ],
        expected: [null, null, 1, 2, 3, null, 1, 4, 5],
      },
      {
        name: "restore smallest",
        args: [
          ["SmallestInfiniteSet", "popSmallest", "popSmallest", "addBack", "popSmallest"],
          [[], [], [], [1], []],
        ],
        expected: [null, 1, 2, null, 1],
      },
    ],
    hints: ["Track never-popped numbers with one counter.", "Use a heap only for added-back values."],
    relatedIds: [1845],
  },
  {
    id: 2462,
    slug: "total-cost-to-hire-k-workers",
    title: "Total Cost to Hire K Workers",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "Two Heaps"],
    companies: ["amazon", "google", "microsoft", "uber"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/total-cost-to-hire-k-workers/",
    description:
      "You hire `k` workers in rounds. Each round you may pick from the first or last `candidates` remaining workers, always choosing the lowest cost (ties go to the smaller index). Return the total hiring cost.",
    examples: [
      {
        input: "costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4",
        output: "11",
        explanation: "Hire cost 2 (front), cost 2 (back), then cost 7 (front): total 11.",
      },
      { input: "costs = [1,2,4,1], k = 3, candidates = 3", output: "4" },
    ],
    constraints: ["1 ≤ costs.length ≤ 10^5", "1 ≤ costs[i] ≤ 10^5", "1 ≤ k, candidates ≤ costs.length."],
    intuition:
      "Only the cheapest among the front and back windows can ever be hired next, so two min-heaps — one growing from the left, one from the right — capture all candidates. Each hire pops the cheaper heap and pulls in the next worker from that side.",
    approach: [
      "Fill a left heap from the front and a right heap from the back, up to `candidates` each, with two pointers i and j.",
      "Repeat k times: compare the heap minimums and pop the cheaper (ties favor the left/front heap).",
      "Refill the side just used with the next inner worker when the pointers still allow it.",
      "Accumulate and return the total cost.",
    ],
    complexity: { time: "O((k + candidates) log candidates)", space: "O(candidates)", note: "Two bounded heaps." },
    solutions: [
      {
        language: "python",
        label: "Two Heaps",
        code: `import heapq


def total_cost(costs: list[int], k: int, candidates: int) -> int:
    n = len(costs)
    left: list[int] = []
    right: list[int] = []
    i, j = 0, n - 1
    while len(left) < candidates and i <= j:
        heapq.heappush(left, costs[i]); i += 1
    while len(right) < candidates and i <= j:
        heapq.heappush(right, costs[j]); j -= 1
    total = 0
    for _ in range(k):
        lv = left[0] if left else float("inf")
        rv = right[0] if right else float("inf")
        if lv <= rv:
            total += heapq.heappop(left)
            if i <= j:
                heapq.heappush(left, costs[i]); i += 1
        else:
            total += heapq.heappop(right)
            if i <= j:
                heapq.heappush(right, costs[j]); j -= 1
    return total`,
      },
      {
        language: "typescript",
        label: "Two Heaps",
        code: `function totalCost(costs: number[], k: number, candidates: number): number {
  const push = (h: number[], x: number) => {
    h.push(x); let i = h.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (h[i] < h[p]) { [h[i], h[p]] = [h[p], h[i]]; i = p; } else break; }
  };
  const pop = (h: number[]): number => {
    const top = h[0], last = h.pop()!;
    if (h.length) {
      h[0] = last; let i = 0;
      for (;;) { let l = 2 * i + 1, r = 2 * i + 2, s = i;
        if (l < h.length && h[l] < h[s]) s = l;
        if (r < h.length && h[r] < h[s]) s = r;
        if (s === i) break; [h[i], h[s]] = [h[s], h[i]]; i = s; }
    }
    return top;
  };
  const n = costs.length;
  const left: number[] = [], right: number[] = [];
  let i = 0, j = n - 1;
  while (left.length < candidates && i <= j) push(left, costs[i++]);
  while (right.length < candidates && i <= j) push(right, costs[j--]);
  let total = 0;
  for (let h = 0; h < k; h++) {
    const lv = left.length ? left[0] : Infinity;
    const rv = right.length ? right[0] : Infinity;
    if (lv <= rv) { total += pop(left); if (i <= j) push(left, costs[i++]); }
    else { total += pop(right); if (i <= j) push(right, costs[j--]); }
  }
  return total;
}`,
      },
    ],
    runner: {
      entry: "totalCost",
      comparison: "deep",
      jsStarter: `function totalCost(costs, k, candidates) {
  // Return the total cost of hiring k workers.
  // TODO: implement
}`,
      jsReference: `function totalCost(costs, k, candidates) {
  const push = (h, x) => {
    h.push(x); let i = h.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (h[i] < h[p]) { [h[i], h[p]] = [h[p], h[i]]; i = p; } else break; }
  };
  const pop = (h) => {
    const top = h[0], last = h.pop();
    if (h.length) {
      h[0] = last; let i = 0;
      for (;;) { let l = 2 * i + 1, r = 2 * i + 2, s = i;
        if (l < h.length && h[l] < h[s]) s = l;
        if (r < h.length && h[r] < h[s]) s = r;
        if (s === i) break; [h[i], h[s]] = [h[s], h[i]]; i = s; }
    }
    return top;
  };
  const n = costs.length;
  const left = [], right = [];
  let i = 0, j = n - 1;
  while (left.length < candidates && i <= j) push(left, costs[i++]);
  while (right.length < candidates && i <= j) push(right, costs[j--]);
  let total = 0;
  for (let h = 0; h < k; h++) {
    const lv = left.length ? left[0] : Infinity;
    const rv = right.length ? right[0] : Infinity;
    if (lv <= rv) { total += pop(left); if (i <= j) push(left, costs[i++]); }
    else { total += pop(right); if (i <= j) push(right, costs[j--]); }
  }
  return total;
}`,
    },
    tests: [
      { name: "front and back", args: [[17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4], expected: 11 },
      { name: "overlapping windows", args: [[1, 2, 4, 1], 3, 3], expected: 4 },
      { name: "single worker", args: [[10], 1, 1], expected: 10 },
    ],
    hints: ["Maintain two min-heaps from both ends.", "Ties prefer the smaller index (front)."],
    relatedIds: [2336],
  },
  {
    id: 1962,
    slug: "remove-stones-to-minimize-the-total",
    title: "Remove Stones to Minimize the Total",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "Greedy"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/remove-stones-to-minimize-the-total/",
    description:
      "Given an array `piles` and an integer `k`, perform `k` operations. Each operation picks any pile and removes `floor(pile / 2)` stones from it. Return the minimum total number of stones remaining.",
    examples: [
      { input: "piles = [5,4,9], k = 2", output: "12", explanation: "Halve 9→5 then 5→3: total 5+4+3 = 12." },
      { input: "piles = [4,3,6,7], k = 3", output: "12" },
    ],
    constraints: ["1 ≤ piles.length ≤ 10^5", "1 ≤ piles[i] ≤ 10^4", "1 ≤ k ≤ 10^5."],
    intuition:
      "Removing floor(pile/2) takes away the most stones when the pile is largest, and these greedy choices are independent. A max-heap always exposes the biggest pile so each operation maximizes the stones removed.",
    approach: [
      "Build a max-heap from the piles and track the running sum.",
      "k times: pop the largest pile, remove floor(pile/2) from the sum, and push the reduced pile back.",
      "Return the remaining sum after all operations.",
    ],
    complexity: { time: "O((n + k) log n)", space: "O(n)", note: "Each operation is one heap pop/push." },
    solutions: [
      {
        language: "python",
        label: "Max-Heap",
        code: `import heapq


def min_stone_sum(piles: list[int], k: int) -> int:
    heap = [-p for p in piles]
    heapq.heapify(heap)
    total = sum(piles)
    for _ in range(k):
        x = -heapq.heappop(heap)
        removed = x // 2
        total -= removed
        heapq.heappush(heap, -(x - removed))
    return total`,
      },
      {
        language: "typescript",
        label: "Max-Heap",
        code: `function minStoneSum(piles: number[], k: number): number {
  const heap: number[] = [];
  const push = (x: number) => {
    heap.push(x); let i = heap.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (heap[i] > heap[p]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break; }
  };
  const pop = (): number => {
    const top = heap[0], last = heap.pop()!;
    if (heap.length) {
      heap[0] = last; let i = 0;
      for (;;) { let l = 2 * i + 1, r = 2 * i + 2, b = i;
        if (l < heap.length && heap[l] > heap[b]) b = l;
        if (r < heap.length && heap[r] > heap[b]) b = r;
        if (b === i) break; [heap[i], heap[b]] = [heap[b], heap[i]]; i = b; }
    }
    return top;
  };
  let total = 0;
  for (const p of piles) { push(p); total += p; }
  for (let h = 0; h < k; h++) {
    const x = pop();
    const removed = Math.floor(x / 2);
    total -= removed;
    push(x - removed);
  }
  return total;
}`,
      },
    ],
    runner: {
      entry: "minStoneSum",
      comparison: "deep",
      jsStarter: `function minStoneSum(piles, k) {
  // Return the minimum total stones after k halving operations.
  // TODO: implement
}`,
      jsReference: `function minStoneSum(piles, k) {
  const heap = [];
  const push = (x) => {
    heap.push(x); let i = heap.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (heap[i] > heap[p]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break; }
  };
  const pop = () => {
    const top = heap[0], last = heap.pop();
    if (heap.length) {
      heap[0] = last; let i = 0;
      for (;;) { let l = 2 * i + 1, r = 2 * i + 2, b = i;
        if (l < heap.length && heap[l] > heap[b]) b = l;
        if (r < heap.length && heap[r] > heap[b]) b = r;
        if (b === i) break; [heap[i], heap[b]] = [heap[b], heap[i]]; i = b; }
    }
    return top;
  };
  let total = 0;
  for (const p of piles) { push(p); total += p; }
  for (let h = 0; h < k; h++) {
    const x = pop();
    const removed = Math.floor(x / 2);
    total -= removed;
    push(x - removed);
  }
  return total;
}`,
    },
    tests: [
      { name: "two ops", args: [[5, 4, 9], 2], expected: 12 },
      { name: "three ops", args: [[4, 3, 6, 7], 3], expected: 12 },
      { name: "floor halving", args: [[2, 4, 1], 2], expected: 4 },
    ],
    hints: ["Always halve the largest pile.", "A max-heap exposes it in log time."],
    relatedIds: [2530],
  },
  {
    id: 2530,
    slug: "maximal-score-after-applying-k-operations",
    title: "Maximal Score After Applying K Operations",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "Greedy"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/maximal-score-after-applying-k-operations/",
    description:
      "Starting from a score of 0, apply `k` operations to `nums`. Each operation adds the largest current element to the score, then replaces that element with `ceil(element / 3)`. Return the maximum achievable score.",
    examples: [
      { input: "nums = [10,10,10,10,10], k = 5", output: "50", explanation: "Each pick adds 10 once, totaling 50." },
      { input: "nums = [1,10,3,3,3], k = 3", output: "17", explanation: "Take 10, then 4, then 3: 10 + 4 + 3 = 17." },
    ],
    constraints: ["1 ≤ nums.length ≤ 10^5", "1 ≤ nums[i] ≤ 10^9", "1 ≤ k ≤ 10^5."],
    intuition:
      "Each operation should grab the largest available value, since adding more now and shrinking it only by a third leaves the biggest gain. A max-heap repeatedly yields that maximum and accepts the reduced replacement.",
    approach: [
      "Heapify nums into a max-heap.",
      "k times: pop the maximum, add it to the score, and push back ceil(max / 3).",
      "Return the accumulated score.",
    ],
    complexity: { time: "O((n + k) log n)", space: "O(n)", note: "Greedy max-heap selection." },
    solutions: [
      {
        language: "python",
        label: "Max-Heap",
        code: `import heapq
from math import ceil


def max_kelements(nums: list[int], k: int) -> int:
    heap = [-x for x in nums]
    heapq.heapify(heap)
    score = 0
    for _ in range(k):
        x = -heapq.heappop(heap)
        score += x
        heapq.heappush(heap, -ceil(x / 3))
    return score`,
      },
      {
        language: "typescript",
        label: "Max-Heap",
        code: `function maxKelements(nums: number[], k: number): number {
  const heap: number[] = [];
  const push = (x: number) => {
    heap.push(x); let i = heap.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (heap[i] > heap[p]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break; }
  };
  const pop = (): number => {
    const top = heap[0], last = heap.pop()!;
    if (heap.length) {
      heap[0] = last; let i = 0;
      for (;;) { let l = 2 * i + 1, r = 2 * i + 2, b = i;
        if (l < heap.length && heap[l] > heap[b]) b = l;
        if (r < heap.length && heap[r] > heap[b]) b = r;
        if (b === i) break; [heap[i], heap[b]] = [heap[b], heap[i]]; i = b; }
    }
    return top;
  };
  for (const x of nums) push(x);
  let score = 0;
  for (let h = 0; h < k; h++) {
    const x = pop();
    score += x;
    push(Math.ceil(x / 3));
  }
  return score;
}`,
      },
    ],
    runner: {
      entry: "maxKelements",
      comparison: "deep",
      jsStarter: `function maxKelements(nums, k) {
  // Return the maximum score after k operations.
  // TODO: implement
}`,
      jsReference: `function maxKelements(nums, k) {
  const heap = [];
  const push = (x) => {
    heap.push(x); let i = heap.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (heap[i] > heap[p]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break; }
  };
  const pop = () => {
    const top = heap[0], last = heap.pop();
    if (heap.length) {
      heap[0] = last; let i = 0;
      for (;;) { let l = 2 * i + 1, r = 2 * i + 2, b = i;
        if (l < heap.length && heap[l] > heap[b]) b = l;
        if (r < heap.length && heap[r] > heap[b]) b = r;
        if (b === i) break; [heap[i], heap[b]] = [heap[b], heap[i]]; i = b; }
    }
    return top;
  };
  for (const x of nums) push(x);
  let score = 0;
  for (let h = 0; h < k; h++) {
    const x = pop();
    score += x;
    push(Math.ceil(x / 3));
  }
  return score;
}`,
    },
    tests: [
      { name: "all tens", args: [[10, 10, 10, 10, 10], 5], expected: 50 },
      { name: "mixed", args: [[1, 10, 3, 3, 3], 3], expected: 17 },
      { name: "single reused", args: [[5], 2], expected: 7 },
    ],
    hints: ["Greedily take the largest value each step.", "Replace it with ceil(x/3)."],
    relatedIds: [1962],
  },
  {
    id: 1845,
    slug: "seat-reservation-manager",
    title: "Seat Reservation Manager",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "Design"],
    companies: ["amazon", "google", "microsoft", "doordash"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/seat-reservation-manager/",
    description:
      "Manage seats numbered `1..n`, all initially free. `reserve()` claims and returns the smallest free seat; `unreserve(seatNumber)` releases a seat back to the free pool.",
    examples: [
      {
        input: 'ops = ["SeatManager","reserve","reserve","unreserve","reserve","reserve","reserve","reserve","unreserve"], args = [[5],[],[],[2],[],[],[],[],[5]]',
        output: "[null,1,2,null,2,3,4,5,null]",
        explanation: "Seat 2 is freed then reserved again before higher seats.",
      },
    ],
    constraints: ["1 ≤ n ≤ 10^5", "1 ≤ seatNumber ≤ n", "At most 10^5 calls; reserve only when a seat is free."],
    intuition:
      "Seats never yet reserved form a contiguous block starting from a counter, so one integer tracks them. Freed seats below that counter go into a min-heap, and reserve simply prefers the heap's smallest when it is below the counter.",
    approach: [
      "Track `next`, the smallest never-reserved seat, and a min-heap of freed seats.",
      "reserve: pop the heap if it holds a seat; otherwise return `next` and advance it.",
      "unreserve(seat): push the seat onto the heap so it can be reclaimed.",
    ],
    complexity: { time: "O(log n) per op", space: "O(n)", note: "Heap holds only freed seats." },
    solutions: [
      {
        language: "python",
        label: "Counter + Min-Heap",
        code: `import heapq


class SeatManager:
    def __init__(self, n: int) -> None:
        self.next = 1
        self.heap: list[int] = []

    def reserve(self) -> int:
        if self.heap:
            return heapq.heappop(self.heap)
        seat = self.next
        self.next += 1
        return seat

    def unreserve(self, seat_number: int) -> None:
        heapq.heappush(self.heap, seat_number)`,
      },
      {
        language: "typescript",
        label: "Counter + Min-Heap",
        code: `class SeatManager {
  private next = 1;
  private heap: number[] = [];

  constructor(_n: number) {}

  private up(i: number): void {
    while (i > 0) { const p = (i - 1) >> 1; if (this.heap[i] < this.heap[p]) { [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]]; i = p; } else break; }
  }
  private down(i: number): void {
    for (;;) { let l = 2 * i + 1, r = 2 * i + 2, s = i;
      if (l < this.heap.length && this.heap[l] < this.heap[s]) s = l;
      if (r < this.heap.length && this.heap[r] < this.heap[s]) s = r;
      if (s === i) break; [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]]; i = s; }
  }

  reserve(): number {
    if (this.heap.length) {
      const top = this.heap[0], last = this.heap.pop()!;
      if (this.heap.length) { this.heap[0] = last; this.down(0); }
      return top;
    }
    return this.next++;
  }

  unreserve(seatNumber: number): void {
    this.heap.push(seatNumber);
    this.up(this.heap.length - 1);
  }
}`,
      },
    ],
    runner: {
      entry: "runSeatManager",
      comparison: "deep",
      jsStarter: `function runSeatManager(ops, args) {
  // Replay the operations and return an array of results.
  // "SeatManager"/"unreserve" return null; "reserve" returns a seat number.
  // TODO: implement
}`,
      jsReference: `function runSeatManager(ops, args) {
  const out = [];
  let next = 1;
  const heap = [];
  const up = (i) => {
    while (i > 0) { const p = (i - 1) >> 1; if (heap[i] < heap[p]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break; }
  };
  const down = (i) => {
    for (;;) { let l = 2 * i + 1, r = 2 * i + 2, s = i;
      if (l < heap.length && heap[l] < heap[s]) s = l;
      if (r < heap.length && heap[r] < heap[s]) s = r;
      if (s === i) break; [heap[i], heap[s]] = [heap[s], heap[i]]; i = s; }
  };
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i], a = args[i] || [];
    if (op === "SeatManager") { next = 1; heap.length = 0; out.push(null); }
    else if (op === "reserve") {
      if (heap.length) {
        const top = heap[0], last = heap.pop();
        if (heap.length) { heap[0] = last; down(0); }
        out.push(top);
      } else out.push(next++);
    } else if (op === "unreserve") {
      heap.push(a[0]); up(heap.length - 1); out.push(null);
    }
  }
  return out;
}`,
    },
    tests: [
      {
        name: "reuse freed seat",
        args: [
          ["SeatManager", "reserve", "reserve", "unreserve", "reserve", "reserve", "reserve", "reserve", "unreserve"],
          [[5], [], [], [2], [], [], [], [], [5]],
        ],
        expected: [null, 1, 2, null, 2, 3, 4, 5, null],
      },
      {
        name: "free two then reserve",
        args: [
          ["SeatManager", "reserve", "reserve", "reserve", "unreserve", "unreserve", "reserve"],
          [[3], [], [], [], [1], [2], []],
        ],
        expected: [null, 1, 2, 3, null, null, 1],
      },
    ],
    hints: ["Track never-reserved seats with a counter.", "Freed seats live in a min-heap."],
    relatedIds: [2336],
  },
];

export default batchT;
