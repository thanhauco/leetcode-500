import type { Problem } from "../types.ts";

/**
 * Batch S — twenty binary-tree and binary-search problems. Tree problems use
 * LeetCode level-order array I/O (null = missing child); the tree is rebuilt
 * inside `runner.jsReference` and tree-shaped outputs are returned as trimmed
 * level-order arrays. Every record ships hand-verified tests.
 */
export const batchS: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Trees
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 2236,
    slug: "root-equals-sum-of-children",
    title: "Root Equals Sum of Children",
    difficulty: "Easy",
    category: "trees",
    patterns: ["Tree", "Math"],
    companies: ["amazon", "microsoft"],
    frequency: 30,
    leetcodeUrl: "https://leetcode.com/problems/root-equals-sum-of-children/",
    description:
      "You are given a tiny binary tree made of exactly three nodes: a root and its two leaf children. Return `true` when the root's value equals the sum of the two children's values. The playground encodes the tree as a level-order array.",
    examples: [
      { input: "root = [10,4,6]", output: "true", explanation: "4 + 6 = 10." },
      { input: "root = [5,3,1]", output: "false", explanation: "3 + 1 = 4 ≠ 5." },
    ],
    intuition:
      "There is no traversal to do: the tree always has a root and two leaves. Build the three nodes and compare the root value directly against the sum of its left and right child values.",
    approach: [
      "Build the tree from the level-order array.",
      "Read root.val, root.left.val, and root.right.val.",
      "Return whether root.val equals left + right.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "Exactly three nodes." },
    solutions: [
      {
        language: "python",
        label: "Direct",
        code: `# TreeNode has .val, .left, .right
def check_tree(root: "TreeNode") -> bool:
    return root.val == root.left.val + root.right.val`,
      },
      {
        language: "typescript",
        label: "Direct",
        code: `function checkTree(root: TreeNode): boolean {
  return root.val === root.left!.val + root.right!.val;
}`,
      },
    ],
    runner: {
      entry: "checkTree",
      comparison: "deep",
      jsStarter: `function checkTree(level) {
  // 'level' is the 3-node tree as a level-order array. Return root === left + right.
  // TODO: implement
}`,
      jsReference: `function checkTree(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const r = build(level);
  return r.val === r.left.val + r.right.val;
}`,
    },
    tests: [
      { name: "equal", args: [[10, 4, 6]], expected: true },
      { name: "not equal", args: [[5, 3, 1]], expected: false },
      { name: "balanced ones", args: [[2, 1, 1]], expected: true },
      { name: "too big root", args: [[20, 7, 8]], expected: false },
    ],
    hints: ["No recursion needed.", "Compare root.val to left.val + right.val."],
    relatedIds: [104, 938],
  },
  {
    id: 872,
    slug: "leaf-similar-trees",
    title: "Leaf-Similar Trees",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "google", "meta"],
    frequency: 42,
    leetcodeUrl: "https://leetcode.com/problems/leaf-similar-trees/",
    description:
      "Reading a binary tree's leaves from left to right produces its leaf-value sequence. Given two trees, return `true` when both produce the same leaf-value sequence. Each tree is passed as a level-order array.",
    examples: [
      { input: "root1 = [1,2,3], root2 = [4,2,3]", output: "true", explanation: "Both yield leaves [2, 3]." },
      { input: "root1 = [1,2,3], root2 = [1,3,2]", output: "false", explanation: "[2, 3] vs [3, 2]." },
    ],
    intuition:
      "Collect each tree's leaves with a left-to-right depth-first walk, then compare the two sequences element by element. A leaf is simply a node with no children.",
    approach: [
      "Build both trees from their level-order arrays.",
      "DFS each tree (left before right); record a value whenever a node has no children.",
      "Return true only if the two leaf sequences are identical.",
    ],
    complexity: { time: "O(n + m)", space: "O(n + m)", note: "n, m = node counts." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def leaf_similar(root1: "TreeNode", root2: "TreeNode") -> bool:
    def leaves(node, out):
        if not node:
            return
        if not node.left and not node.right:
            out.append(node.val)
            return
        leaves(node.left, out)
        leaves(node.right, out)
    a, b = [], []
    leaves(root1, a)
    leaves(root2, b)
    return a == b`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const leaves = (n: TreeNode | null, out: number[]): void => {
    if (!n) return;
    if (!n.left && !n.right) { out.push(n.val); return; }
    leaves(n.left, out);
    leaves(n.right, out);
  };
  const a: number[] = [], b: number[] = [];
  leaves(root1, a);
  leaves(root2, b);
  return a.length === b.length && a.every((v, i) => v === b[i]);
}`,
      },
    ],
    runner: {
      entry: "leafSimilar",
      comparison: "deep",
      jsStarter: `function leafSimilar(a, b) {
  // 'a' and 'b' are trees as level-order arrays. Return true if leaf sequences match.
  // TODO: implement
}`,
      jsReference: `function leafSimilar(a, b) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  function leaves(n, out) {
    if (!n) return;
    if (!n.left && !n.right) { out.push(n.val); return; }
    leaves(n.left, out);
    leaves(n.right, out);
  }
  const la = [], lb = [];
  leaves(build(a), la);
  leaves(build(b), lb);
  if (la.length !== lb.length) return false;
  for (let i = 0; i < la.length; i++) if (la[i] !== lb[i]) return false;
  return true;
}`,
    },
    tests: [
      { name: "same leaves", args: [[1, 2, 3], [4, 2, 3]], expected: true },
      { name: "swapped order", args: [[1, 2, 3], [1, 3, 2]], expected: false },
      { name: "single nodes", args: [[5], [5]], expected: true },
      { name: "different leaf", args: [[1, 2, 3], [1, 2, 4]], expected: false },
    ],
    hints: ["A leaf has no left and no right child.", "Compare sequences, not sets."],
    relatedIds: [104, 938],
  },
  {
    id: 783,
    slug: "minimum-distance-between-bst-nodes",
    title: "Minimum Distance Between BST Nodes",
    difficulty: "Easy",
    category: "trees",
    patterns: ["BST", "In-order Traversal"],
    companies: ["google", "amazon"],
    frequency: 38,
    leetcodeUrl: "https://leetcode.com/problems/minimum-distance-between-bst-nodes/",
    description:
      "Given the root of a binary search tree, return the smallest absolute difference between the values of any two distinct nodes. The tree is supplied as a level-order array.",
    examples: [
      { input: "root = [4,2,6,1,3]", output: "1", explanation: "Consecutive values 1,2,3,4 differ by 1." },
      { input: "root = [5,3,8]", output: "2", explanation: "Closest pair is 3 and 5." },
    ],
    intuition:
      "An in-order traversal of a BST visits values in sorted order. The minimum difference between any two nodes must therefore be the minimum gap between two adjacent values in that sorted stream.",
    approach: [
      "Build the tree and run an in-order traversal, collecting values in sorted order.",
      "Scan adjacent pairs and track the smallest difference.",
      "Return that minimum.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Stores the in-order values." },
    solutions: [
      {
        language: "python",
        label: "In-order",
        code: `def min_diff_in_bst(root: "TreeNode") -> int:
    vals = []
    def ino(node):
        if not node:
            return
        ino(node.left)
        vals.append(node.val)
        ino(node.right)
    ino(root)
    return min(b - a for a, b in zip(vals, vals[1:]))`,
      },
      {
        language: "typescript",
        label: "In-order",
        code: `function minDiffInBST(root: TreeNode | null): number {
  const vals: number[] = [];
  const ino = (n: TreeNode | null): void => {
    if (!n) return;
    ino(n.left);
    vals.push(n.val);
    ino(n.right);
  };
  ino(root);
  let best = Infinity;
  for (let i = 1; i < vals.length; i++) best = Math.min(best, vals[i] - vals[i - 1]);
  return best;
}`,
      },
    ],
    runner: {
      entry: "minDiffInBST",
      comparison: "deep",
      jsStarter: `function minDiffInBST(level) {
  // 'level' is a BST as a level-order array. Return the minimum node-value difference.
  // TODO: implement
}`,
      jsReference: `function minDiffInBST(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const vals = [];
  (function ino(n) { if (!n) return; ino(n.left); vals.push(n.val); ino(n.right); })(build(level));
  let best = Infinity;
  for (let i = 1; i < vals.length; i++) best = Math.min(best, vals[i] - vals[i - 1]);
  return best;
}`,
    },
    tests: [
      { name: "gap one", args: [[4, 2, 6, 1, 3]], expected: 1 },
      { name: "three nodes", args: [[5, 3, 8]], expected: 2 },
      { name: "spread out", args: [[1, 0, 48, null, null, 12, 49]], expected: 1 },
      { name: "right lean", args: [[236, 104, 701, null, 227, null, 911]], expected: 9 },
    ],
    hints: ["In-order of a BST is sorted.", "Min gap is between neighbors."],
    relatedIds: [530, 938],
  },
  {
    id: 938,
    slug: "range-sum-of-bst",
    title: "Range Sum of BST",
    difficulty: "Easy",
    category: "trees",
    patterns: ["BST", "DFS"],
    companies: ["amazon", "meta", "google", "microsoft"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/range-sum-of-bst/",
    description:
      "Given a binary search tree plus an inclusive range [low, high], add up the values of every node whose value lands inside that range and return the total. The tree arrives as a level-order array.",
    examples: [
      { input: "root = [10,5,15,3,7,null,18], low = 7, high = 15", output: "32", explanation: "10 + 15 + 7 = 32." },
      { input: "root = [5,3,7], low = 3, high = 5", output: "8", explanation: "5 + 3 = 8." },
    ],
    intuition:
      "Visit every node once; whenever its value falls within [low, high], add it to a running total. (A BST lets you prune branches, but a plain DFS over all nodes is already correct.)",
    approach: [
      "Build the tree from the level-order array.",
      "DFS every node, adding values that satisfy low ≤ val ≤ high.",
      "Return the accumulated sum.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def range_sum_bst(root: "TreeNode", low: int, high: int) -> int:
    if not root:
        return 0
    inside = root.val if low <= root.val <= high else 0
    return inside + range_sum_bst(root.left, low, high) + range_sum_bst(root.right, low, high)`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
  if (!root) return 0;
  const inside = root.val >= low && root.val <= high ? root.val : 0;
  return inside + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
}`,
      },
    ],
    runner: {
      entry: "rangeSumBST",
      comparison: "deep",
      jsStarter: `function rangeSumBST(level, low, high) {
  // 'level' is a BST as a level-order array. Sum node values within [low, high].
  // TODO: implement
}`,
      jsReference: `function rangeSumBST(level, low, high) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  let sum = 0;
  (function dfs(n) {
    if (!n) return;
    if (n.val >= low && n.val <= high) sum += n.val;
    dfs(n.left);
    dfs(n.right);
  })(build(level));
  return sum;
}`,
    },
    tests: [
      { name: "mid range", args: [[10, 5, 15, 3, 7, null, 18], 7, 15], expected: 32 },
      { name: "deeper tree", args: [[10, 5, 15, 3, 7, 13, 18, 1, null, 6], 6, 10], expected: 23 },
      { name: "small tree", args: [[5, 3, 7], 3, 5], expected: 8 },
      { name: "single node", args: [[1], 1, 1], expected: 1 },
    ],
    hints: ["Add node.val only when in range.", "DFS visits every node once."],
    relatedIds: [783, 530],
  },
  {
    id: 530,
    slug: "minimum-absolute-difference-in-bst",
    title: "Minimum Absolute Difference in BST",
    difficulty: "Easy",
    category: "trees",
    patterns: ["BST", "In-order Traversal"],
    companies: ["google", "amazon", "bloomberg"],
    frequency: 36,
    leetcodeUrl: "https://leetcode.com/problems/minimum-absolute-difference-in-bst/",
    description:
      "Given the root of a binary search tree with non-negative values, return the minimum absolute difference between the values of any two different nodes. The tree is passed as a level-order array.",
    examples: [
      { input: "root = [4,2,6,1,3]", output: "1", explanation: "Adjacent sorted values differ by 1." },
      { input: "root = [5,3,8]", output: "2", explanation: "|5 - 3| = 2 is smallest." },
    ],
    intuition:
      "Since a BST's in-order traversal yields a sorted list, the closest pair of values must be neighbors in that list. Track the smallest gap between consecutive in-order values.",
    approach: [
      "Build the tree and traverse it in-order to get sorted values.",
      "Compare each adjacent pair, keeping the minimum difference.",
      "Return that minimum.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Holds the in-order sequence." },
    solutions: [
      {
        language: "python",
        label: "In-order",
        code: `def get_minimum_difference(root: "TreeNode") -> int:
    vals = []
    def ino(node):
        if not node:
            return
        ino(node.left)
        vals.append(node.val)
        ino(node.right)
    ino(root)
    return min(b - a for a, b in zip(vals, vals[1:]))`,
      },
      {
        language: "typescript",
        label: "In-order",
        code: `function getMinimumDifference(root: TreeNode | null): number {
  const vals: number[] = [];
  const ino = (n: TreeNode | null): void => {
    if (!n) return;
    ino(n.left);
    vals.push(n.val);
    ino(n.right);
  };
  ino(root);
  let best = Infinity;
  for (let i = 1; i < vals.length; i++) best = Math.min(best, vals[i] - vals[i - 1]);
  return best;
}`,
      },
    ],
    runner: {
      entry: "getMinimumDifference",
      comparison: "deep",
      jsStarter: `function getMinimumDifference(level) {
  // 'level' is a BST as a level-order array. Return the minimum absolute difference.
  // TODO: implement
}`,
      jsReference: `function getMinimumDifference(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const vals = [];
  (function ino(n) { if (!n) return; ino(n.left); vals.push(n.val); ino(n.right); })(build(level));
  let best = Infinity;
  for (let i = 1; i < vals.length; i++) best = Math.min(best, vals[i] - vals[i - 1]);
  return best;
}`,
    },
    tests: [
      { name: "gap one", args: [[4, 2, 6, 1, 3]], expected: 1 },
      { name: "three nodes", args: [[5, 3, 8]], expected: 2 },
      { name: "spread out", args: [[1, 0, 48, null, null, 12, 49]], expected: 1 },
      { name: "right lean", args: [[236, 104, 701, null, 227, null, 911]], expected: 9 },
    ],
    hints: ["Same as id 783.", "Minimum gap is between in-order neighbors."],
    relatedIds: [783, 938],
  },
  {
    id: 814,
    slug: "binary-tree-pruning",
    title: "Binary Tree Pruning",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Post-order", "Recursion"],
    companies: ["amazon", "meta", "google"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-pruning/",
    description:
      "You are given a binary tree whose node values are all 0 or 1. Remove every subtree that does not contain at least one node holding a 1, then return the pruned tree. Both input and output are level-order arrays (trailing nulls trimmed).",
    examples: [
      { input: "root = [1,null,0,0,1]", output: "[1,null,0,null,1]", explanation: "The all-zero leaf is dropped." },
      { input: "root = [1,0,1,0,0,0,1]", output: "[1,null,1,null,1]", explanation: "Both zero-only branches vanish." },
    ],
    intuition:
      "Decide each node bottom-up. After pruning its children, a node should disappear only if both its children are now gone and its own value is 0 — meaning its whole subtree was 1-free.",
    approach: [
      "Build the tree from the level-order array.",
      "Post-order: prune left and right children first.",
      "Return null for a node that is a 0-valued leaf after pruning; otherwise keep it.",
      "Serialize the result back to a trimmed level-order array.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height." },
    solutions: [
      {
        language: "python",
        label: "Post-order",
        code: `def prune_tree(root: "TreeNode") -> "TreeNode":
    if not root:
        return None
    root.left = prune_tree(root.left)
    root.right = prune_tree(root.right)
    if not root.left and not root.right and root.val == 0:
        return None
    return root`,
      },
      {
        language: "typescript",
        label: "Post-order",
        code: `function pruneTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  root.left = pruneTree(root.left);
  root.right = pruneTree(root.right);
  if (!root.left && !root.right && root.val === 0) return null;
  return root;
}`,
      },
    ],
    runner: {
      entry: "pruneTree",
      comparison: "deep",
      jsStarter: `function pruneTree(level) {
  // 'level' is the tree as a level-order array. Return the pruned tree as a
  // level-order array (null = missing child, trailing nulls trimmed).
  // TODO: implement
}`,
      jsReference: `function pruneTree(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  function prune(n) {
    if (!n) return null;
    n.left = prune(n.left);
    n.right = prune(n.right);
    if (!n.left && !n.right && n.val === 0) return null;
    return n;
  }
  function ser(root) {
    if (!root) return [];
    const out = [];
    const q = [root];
    while (q.length) {
      const n = q.shift();
      if (n) { out.push(n.val); q.push(n.left); q.push(n.right); }
      else out.push(null);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  return ser(prune(build(level)));
}`,
    },
    tests: [
      { name: "drop zero leaf", args: [[1, null, 0, 0, 1]], expected: [1, null, 0, null, 1] },
      { name: "two branches", args: [[1, 0, 1, 0, 0, 0, 1]], expected: [1, null, 1, null, 1] },
      { name: "single zero", args: [[0]], expected: [] },
      { name: "single one", args: [[1]], expected: [1] },
    ],
    hints: ["Prune children before deciding the parent.", "A 0-leaf with no children disappears."],
    relatedIds: [104, 938],
  },
  {
    id: 563,
    slug: "binary-tree-tilt",
    title: "Binary Tree Tilt",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Post-order"],
    companies: ["amazon", "microsoft"],
    frequency: 28,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-tilt/",
    description:
      "A node's tilt is the absolute difference between the total of all values in its left subtree and the total in its right subtree. Return the sum of every node's tilt across the tree, supplied as a level-order array.",
    examples: [
      { input: "root = [1,2,3]", output: "1", explanation: "Only the root has tilt |2 - 3| = 1." },
      { input: "root = [4,2,9,3,5,null,7]", output: "15", explanation: "Tilts 2 + 7 + 6 sum to 15." },
    ],
    intuition:
      "Compute subtree sums bottom-up. A single recursion can return the sum of a subtree while also accumulating each node's tilt into a shared total — one post-order pass does both jobs.",
    approach: [
      "Build the tree from the level-order array.",
      "Recurse to get each subtree's sum (left + right + node value).",
      "Add |leftSum − rightSum| to a running tilt total at every node.",
      "Return the accumulated total.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height." },
    solutions: [
      {
        language: "python",
        label: "Post-order",
        code: `def find_tilt(root: "TreeNode") -> int:
    total = 0
    def subtree_sum(node):
        nonlocal total
        if not node:
            return 0
        left = subtree_sum(node.left)
        right = subtree_sum(node.right)
        total += abs(left - right)
        return node.val + left + right
    subtree_sum(root)
    return total`,
      },
      {
        language: "typescript",
        label: "Post-order",
        code: `function findTilt(root: TreeNode | null): number {
  let total = 0;
  const sum = (n: TreeNode | null): number => {
    if (!n) return 0;
    const l = sum(n.left), r = sum(n.right);
    total += Math.abs(l - r);
    return n.val + l + r;
  };
  sum(root);
  return total;
}`,
      },
    ],
    runner: {
      entry: "findTilt",
      comparison: "deep",
      jsStarter: `function findTilt(level) {
  // 'level' is the tree as a level-order array. Return the sum of all node tilts.
  // TODO: implement
}`,
      jsReference: `function findTilt(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  let total = 0;
  function sum(n) {
    if (!n) return 0;
    const l = sum(n.left), r = sum(n.right);
    total += Math.abs(l - r);
    return n.val + l + r;
  }
  sum(build(level));
  return total;
}`,
    },
    tests: [
      { name: "tiny", args: [[1, 2, 3]], expected: 1 },
      { name: "classic", args: [[4, 2, 9, 3, 5, null, 7]], expected: 15 },
      { name: "single", args: [[1]], expected: 0 },
      { name: "right chain", args: [[1, null, 2, null, 3]], expected: 8 },
    ],
    hints: ["Return subtree sum, accumulate tilt.", "One post-order pass suffices."],
    relatedIds: [104, 938],
  },
  {
    id: 965,
    slug: "univalued-binary-tree",
    title: "Univalued Binary Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["google", "amazon"],
    frequency: 26,
    leetcodeUrl: "https://leetcode.com/problems/univalued-binary-tree/",
    description:
      "A binary tree is univalued when every node holds the same value. Return `true` if the tree, given as a level-order array, is univalued.",
    examples: [
      { input: "root = [1,1,1,1,1,null,1]", output: "true", explanation: "All nodes are 1." },
      { input: "root = [2,2,2,5,2]", output: "false", explanation: "One node is 5." },
    ],
    intuition:
      "Capture the root's value, then walk every node and check it matches. The moment any node differs, the answer is false.",
    approach: [
      "Build the tree and remember the root value.",
      "DFS all nodes, comparing each against the root value.",
      "Return false on the first mismatch, otherwise true.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def is_unival_tree(root: "TreeNode") -> bool:
    target = root.val
    def dfs(node):
        if not node:
            return True
        if node.val != target:
            return False
        return dfs(node.left) and dfs(node.right)
    return dfs(root)`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function isUnivalTree(root: TreeNode | null): boolean {
  if (!root) return true;
  const target = root.val;
  const dfs = (n: TreeNode | null): boolean => {
    if (!n) return true;
    if (n.val !== target) return false;
    return dfs(n.left) && dfs(n.right);
  };
  return dfs(root);
}`,
      },
    ],
    runner: {
      entry: "isUnivalTree",
      comparison: "deep",
      jsStarter: `function isUnivalTree(level) {
  // 'level' is the tree as a level-order array. Return true if all values are equal.
  // TODO: implement
}`,
      jsReference: `function isUnivalTree(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const root = build(level);
  if (!root) return true;
  const target = root.val;
  let ok = true;
  (function dfs(n) {
    if (!n) return;
    if (n.val !== target) ok = false;
    dfs(n.left);
    dfs(n.right);
  })(root);
  return ok;
}`,
    },
    tests: [
      { name: "all ones", args: [[1, 1, 1, 1, 1, null, 1]], expected: true },
      { name: "one differs", args: [[2, 2, 2, 5, 2]], expected: false },
      { name: "single", args: [[7]], expected: true },
      { name: "two values", args: [[3, 3, 4]], expected: false },
    ],
    hints: ["Compare every node to the root value.", "Short-circuit on the first mismatch."],
    relatedIds: [104, 872],
  },
  {
    id: 993,
    slug: "cousins-in-binary-tree",
    title: "Cousins in Binary Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "BFS"],
    companies: ["amazon", "meta"],
    frequency: 34,
    leetcodeUrl: "https://leetcode.com/problems/cousins-in-binary-tree/",
    description:
      "Two nodes are cousins when they sit at the same depth but have different parents. Given a tree (as a level-order array) and two distinct values x and y, return `true` if those nodes are cousins.",
    examples: [
      { input: "root = [1,2,3,null,4,null,5], x = 5, y = 4", output: "true", explanation: "Both at depth 2 with different parents." },
      { input: "root = [1,2,3,4], x = 4, y = 3", output: "false", explanation: "Different depths." },
    ],
    intuition:
      "Record each target's depth and parent during a single traversal. They are cousins exactly when their depths match and their parents do not.",
    approach: [
      "Build the tree from the level-order array.",
      "DFS carrying the current depth and parent value.",
      "Store (depth, parent) when a node's value equals x or y.",
      "Return true if depths are equal and parents differ.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def is_cousins(root: "TreeNode", x: int, y: int) -> bool:
    info = {}
    def dfs(node, parent, depth):
        if not node:
            return
        if node.val in (x, y):
            info[node.val] = (parent, depth)
        dfs(node.left, node.val, depth + 1)
        dfs(node.right, node.val, depth + 1)
    dfs(root, None, 0)
    (px, dx), (py, dy) = info[x], info[y]
    return dx == dy and px != py`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function isCousins(root: TreeNode | null, x: number, y: number): boolean {
  const info: Record<number, { par: number | null; d: number }> = {};
  const dfs = (n: TreeNode | null, par: number | null, d: number): void => {
    if (!n) return;
    if (n.val === x || n.val === y) info[n.val] = { par, d };
    dfs(n.left, n.val, d + 1);
    dfs(n.right, n.val, d + 1);
  };
  dfs(root, null, 0);
  return info[x].d === info[y].d && info[x].par !== info[y].par;
}`,
      },
    ],
    runner: {
      entry: "isCousins",
      comparison: "deep",
      jsStarter: `function isCousins(level, x, y) {
  // 'level' is the tree as a level-order array. Return true if x and y are cousins.
  // TODO: implement
}`,
      jsReference: `function isCousins(level, x, y) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const info = {};
  (function dfs(n, par, d) {
    if (!n) return;
    if (n.val === x || n.val === y) info[n.val] = { par: par, d: d };
    dfs(n.left, n.val, d + 1);
    dfs(n.right, n.val, d + 1);
  })(build(level), null, 0);
  return info[x].d === info[y].d && info[x].par !== info[y].par;
}`,
    },
    tests: [
      { name: "different depth", args: [[1, 2, 3, 4], 4, 3], expected: false },
      { name: "cousins", args: [[1, 2, 3, null, 4, null, 5], 5, 4], expected: true },
      { name: "siblings", args: [[1, 2, 3, null, 4], 2, 3], expected: false },
      { name: "split parents", args: [[1, 2, 3, 4, null, null, 5], 4, 5], expected: true },
    ],
    hints: ["Track depth and parent together.", "Cousins: same depth, different parent."],
    relatedIds: [104, 102],
  },
  {
    id: 1022,
    slug: "sum-of-root-to-leaf-binary-numbers",
    title: "Sum of Root To Leaf Binary Numbers",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 32,
    leetcodeUrl: "https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/",
    description:
      "Each node holds a bit (0 or 1). Reading the bits along a root-to-leaf path gives a binary number. Return the sum of all root-to-leaf binary numbers; the tree is a level-order array.",
    examples: [
      { input: "root = [1,0,1,0,1,0,1]", output: "22", explanation: "100 + 101 + 110 + 111 = 4 + 5 + 6 + 7." },
      { input: "root = [1,1]", output: "3", explanation: "Path 1→1 is binary 11 = 3." },
    ],
    intuition:
      "Carry the partial number down each path: at every step shift left (multiply by 2) and add the current bit. When you reach a leaf, the accumulated value is one path's number — add it to the total.",
    approach: [
      "Build the tree from the level-order array.",
      "DFS with a running value cur = cur * 2 + node.val.",
      "At a leaf, add cur to the global sum.",
      "Return the sum.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def sum_root_to_leaf(root: "TreeNode") -> int:
    total = 0
    def dfs(node, cur):
        nonlocal total
        if not node:
            return
        cur = cur * 2 + node.val
        if not node.left and not node.right:
            total += cur
            return
        dfs(node.left, cur)
        dfs(node.right, cur)
    dfs(root, 0)
    return total`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function sumRootToLeaf(root: TreeNode | null): number {
  let total = 0;
  const dfs = (n: TreeNode | null, cur: number): void => {
    if (!n) return;
    cur = cur * 2 + n.val;
    if (!n.left && !n.right) { total += cur; return; }
    dfs(n.left, cur);
    dfs(n.right, cur);
  };
  dfs(root, 0);
  return total;
}`,
      },
    ],
    runner: {
      entry: "sumRootToLeaf",
      comparison: "deep",
      jsStarter: `function sumRootToLeaf(level) {
  // 'level' is a 0/1 tree as a level-order array. Sum all root-to-leaf binary numbers.
  // TODO: implement
}`,
      jsReference: `function sumRootToLeaf(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  let total = 0;
  (function dfs(n, cur) {
    if (!n) return;
    cur = cur * 2 + n.val;
    if (!n.left && !n.right) { total += cur; return; }
    dfs(n.left, cur);
    dfs(n.right, cur);
  })(build(level), 0);
  return total;
}`,
    },
    tests: [
      { name: "full tree", args: [[1, 0, 1, 0, 1, 0, 1]], expected: 22 },
      { name: "single zero", args: [[0]], expected: 0 },
      { name: "single one", args: [[1]], expected: 1 },
      { name: "two nodes", args: [[1, 1]], expected: 3 },
    ],
    hints: ["cur = cur * 2 + bit.", "Add to the total at each leaf."],
    relatedIds: [129, 1022],
  },
  {
    id: 366,
    slug: "find-leaves-of-binary-tree",
    title: "Find Leaves of Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Post-order"],
    companies: ["amazon", "linkedin", "google"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/find-leaves-of-binary-tree/",
    description:
      "Repeatedly strip away all current leaves of a binary tree, collecting each removed layer, until the tree is empty. Return the collected layers in order. The tree is a level-order array; the output is a list of lists grouped by removal round.",
    examples: [
      { input: "root = [1,2,3,4,5]", output: "[[4,5,3],[2],[1]]", explanation: "Leaves 4,5,3 first, then 2, then root 1." },
      { input: "root = [1]", output: "[[1]]", explanation: "A single leaf is removed at once." },
    ],
    intuition:
      "A node's removal round equals its height above the leaves: leaves have height 0, their parents height 1, and so on. Compute each node's height post-order and bucket its value by that height.",
    approach: [
      "Build the tree from the level-order array.",
      "Recurse post-order; a node's height is 1 + max(child heights), with null = −1.",
      "Append the node's value into the bucket indexed by its height.",
      "Return the buckets in increasing height order.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Buckets store every value once." },
    solutions: [
      {
        language: "python",
        label: "Post-order",
        code: `def find_leaves(root: "TreeNode") -> list[list[int]]:
    res: list[list[int]] = []
    def height(node):
        if not node:
            return -1
        h = 1 + max(height(node.left), height(node.right))
        if h == len(res):
            res.append([])
        res[h].append(node.val)
        return h
    height(root)
    return res`,
      },
      {
        language: "typescript",
        label: "Post-order",
        code: `function findLeaves(root: TreeNode | null): number[][] {
  const res: number[][] = [];
  const height = (n: TreeNode | null): number => {
    if (!n) return -1;
    const h = 1 + Math.max(height(n.left), height(n.right));
    if (!res[h]) res[h] = [];
    res[h].push(n.val);
    return h;
  };
  height(root);
  return res;
}`,
      },
    ],
    runner: {
      entry: "findLeaves",
      comparison: "deep",
      jsStarter: `function findLeaves(level) {
  // 'level' is the tree as a level-order array. Return values grouped by removal round.
  // TODO: implement
}`,
      jsReference: `function findLeaves(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const res = [];
  function height(n) {
    if (!n) return -1;
    const h = 1 + Math.max(height(n.left), height(n.right));
    if (!res[h]) res[h] = [];
    res[h].push(n.val);
    return h;
  }
  height(build(level));
  return res;
}`,
    },
    tests: [
      { name: "five nodes", args: [[1, 2, 3, 4, 5]], expected: [[4, 5, 3], [2], [1]] },
      { name: "single", args: [[1]], expected: [[1]] },
      { name: "tiny", args: [[1, 2, 3]], expected: [[2, 3], [1]] },
      { name: "left chain", args: [[1, 2, null, 3, null, 4]], expected: [[4], [3], [2], [1]] },
    ],
    hints: ["Round = height above the leaves.", "Bucket values by post-order height."],
    relatedIds: [104, 814],
  },
  {
    id: 1469,
    slug: "find-all-the-lonely-nodes",
    title: "Find All The Lonely Nodes",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon"],
    frequency: 24,
    leetcodeUrl: "https://leetcode.com/problems/find-all-the-lonely-nodes/",
    description:
      "A lonely node is the only child of its parent (the parent has no other child). Return the values of every lonely node in the tree, which is provided as a level-order array. Order does not matter.",
    examples: [
      { input: "root = [1,2,3,null,4]", output: "[4]", explanation: "4 is the only child of node 2." },
      { input: "root = [1,2,null,3]", output: "[2,3]", explanation: "Both 2 and 3 are only children." },
    ],
    intuition:
      "Inspect each node's children: if exactly one of left/right exists, that child is lonely. A simple DFS that checks this condition at every node collects them all.",
    approach: [
      "Build the tree from the level-order array.",
      "DFS each node; when it has exactly one child, record that child's value.",
      "Return the collected values (any order).",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def get_lonely_nodes(root: "TreeNode") -> list[int]:
    out: list[int] = []
    def dfs(node):
        if not node:
            return
        if node.left and not node.right:
            out.append(node.left.val)
        if node.right and not node.left:
            out.append(node.right.val)
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return out`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function getLonelyNodes(root: TreeNode | null): number[] {
  const out: number[] = [];
  const dfs = (n: TreeNode | null): void => {
    if (!n) return;
    if (n.left && !n.right) out.push(n.left.val);
    if (n.right && !n.left) out.push(n.right.val);
    dfs(n.left);
    dfs(n.right);
  };
  dfs(root);
  return out;
}`,
      },
    ],
    runner: {
      entry: "getLonelyNodes",
      comparison: "canonical",
      jsStarter: `function getLonelyNodes(level) {
  // 'level' is the tree as a level-order array. Return the values of all lonely nodes.
  // TODO: implement
}`,
      jsReference: `function getLonelyNodes(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { n.left = { val: lv, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { n.right = { val: rv, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const out = [];
  (function dfs(n) {
    if (!n) return;
    if (n.left && !n.right) out.push(n.left.val);
    if (n.right && !n.left) out.push(n.right.val);
    dfs(n.left);
    dfs(n.right);
  })(build(level));
  return out;
}`,
    },
    tests: [
      { name: "one lonely", args: [[1, 2, 3, null, 4]], expected: [4] },
      { name: "two lonely", args: [[1, 2, null, 3]], expected: [2, 3] },
      { name: "none single", args: [[1]], expected: [] },
      { name: "full triple", args: [[1, 2, 3]], expected: [] },
    ],
    hints: ["Lonely = parent has exactly one child.", "Check left/right presence per node."],
    relatedIds: [104, 993],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Binary Search
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 287,
    slug: "find-the-duplicate-number",
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search", "Counting"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/find-the-duplicate-number/",
    description:
      "An array of n + 1 integers contains values in the range 1..n, with exactly one value repeated (possibly several times). Find and return that repeated value without modifying the array.",
    examples: [
      { input: "nums = [1,3,4,2,2]", output: "2", explanation: "2 appears twice." },
      { input: "nums = [3,1,3,4,2]", output: "3", explanation: "3 appears twice." },
    ],
    intuition:
      "Binary search on the answer's *value* range, not on indices. For a candidate m, count how many array values are ≤ m. If that count exceeds m, the duplicate lies in 1..m; otherwise it lies above m.",
    approach: [
      "Set lo = 1, hi = n (= nums.length − 1).",
      "Take mid; count elements ≤ mid.",
      "If the count is greater than mid, the duplicate is in [lo, mid]; else in [mid+1, hi].",
      "Converge until lo == hi and return it.",
    ],
    complexity: { time: "O(n log n)", space: "O(1)", note: "Counting pass per binary-search step." },
    solutions: [
      {
        language: "python",
        label: "Binary Search on Value",
        code: `def find_duplicate(nums: list[int]) -> int:
    lo, hi = 1, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        count = sum(1 for x in nums if x <= mid)
        if count > mid:
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      },
      {
        language: "typescript",
        label: "Binary Search on Value",
        code: `function findDuplicate(nums: number[]): number {
  let lo = 1, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    let count = 0;
    for (const x of nums) if (x <= mid) count++;
    if (count > mid) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "findDuplicate",
      comparison: "deep",
      jsStarter: `function findDuplicate(nums) {
  // Return the single repeated value in nums (values are 1..n).
  // TODO: implement
}`,
      jsReference: `function findDuplicate(nums) {
  let lo = 1, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    let count = 0;
    for (const x of nums) if (x <= mid) count++;
    if (count > mid) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
    },
    tests: [
      { name: "dup at end", args: [[1, 3, 4, 2, 2]], expected: 2 },
      { name: "dup threes", args: [[3, 1, 3, 4, 2]], expected: 3 },
      { name: "two ones", args: [[1, 1]], expected: 1 },
      { name: "all same", args: [[2, 2, 2, 2, 2]], expected: 2 },
    ],
    hints: ["Binary search the value range.", "Count elements ≤ mid."],
    relatedIds: [240, 275],
  },
  {
    id: 240,
    slug: "search-a-2d-matrix-ii",
    title: "Search a 2D Matrix II",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search", "Matrix", "Staircase Search"],
    companies: ["amazon", "google", "microsoft", "apple", "adobe"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    description:
      "Search a matrix whose every row is sorted left to right and every column is sorted top to bottom. Return `true` if the target value appears anywhere in the matrix.",
    examples: [
      { input: "matrix = [[1,4,7,11,15],...], target = 5", output: "true", explanation: "5 is in row 2." },
      { input: "matrix = [[1,4,7,11,15],...], target = 20", output: "false", explanation: "20 is absent." },
    ],
    intuition:
      "Start at the top-right corner. That cell is the largest in its row and the smallest in its column, so each comparison can eliminate an entire row or column: move left when the value is too big, move down when it is too small.",
    approach: [
      "Begin at row 0, column = lastColumn.",
      "If the cell equals target, return true.",
      "If the cell exceeds target, move one column left.",
      "Otherwise move one row down; stop when you fall off the grid.",
    ],
    complexity: { time: "O(m + n)", space: "O(1)", note: "Each step drops a row or column." },
    solutions: [
      {
        language: "python",
        label: "Staircase",
        code: `def search_matrix(matrix: list[list[int]], target: int) -> bool:
    if not matrix or not matrix[0]:
        return False
    r, c = 0, len(matrix[0]) - 1
    while r < len(matrix) and c >= 0:
        v = matrix[r][c]
        if v == target:
            return True
        if v > target:
            c -= 1
        else:
            r += 1
    return False`,
      },
      {
        language: "typescript",
        label: "Staircase",
        code: `function searchMatrix(matrix: number[][], target: number): boolean {
  if (!matrix.length || !matrix[0].length) return false;
  let r = 0, c = matrix[0].length - 1;
  while (r < matrix.length && c >= 0) {
    const v = matrix[r][c];
    if (v === target) return true;
    if (v > target) c--;
    else r++;
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "searchMatrix",
      comparison: "deep",
      jsStarter: `function searchMatrix(matrix, target) {
  // Each row and column is sorted ascending. Return true if target is present.
  // TODO: implement
}`,
      jsReference: `function searchMatrix(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;
  let r = 0, c = matrix[0].length - 1;
  while (r < matrix.length && c >= 0) {
    const v = matrix[r][c];
    if (v === target) return true;
    if (v > target) c--;
    else r++;
  }
  return false;
}`,
    },
    tests: [
      {
        name: "present",
        args: [[[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 5],
        expected: true,
      },
      {
        name: "absent",
        args: [[[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 20],
        expected: false,
      },
      { name: "single row", args: [[[1, 3, 5]], 3], expected: true },
      { name: "single cell", args: [[[5]], 5], expected: true },
    ],
    hints: ["Start at the top-right corner.", "Each comparison drops a row or column."],
    relatedIds: [287, 74],
  },
  {
    id: 278,
    slug: "first-bad-version",
    title: "First Bad Version",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Binary Search"],
    companies: ["meta", "google", "amazon"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/first-bad-version/",
    description:
      "Versions 1..n are released in order; once one version is bad, every later version is bad too. Given n and the first bad version `bad`, find that first bad version using as few checks as possible. (The playground passes `bad` so the check can be simulated.)",
    examples: [
      { input: "n = 5, bad = 4", output: "4", explanation: "Versions 4 and 5 are bad; 4 is first." },
      { input: "n = 1, bad = 1", output: "1", explanation: "The only version is bad." },
    ],
    intuition:
      "The sequence is good...good, bad...bad — a sorted boolean boundary. Binary search for the leftmost version that tests bad: when mid is bad, the answer is mid or earlier; otherwise it is to the right.",
    approach: [
      "Set lo = 1, hi = n.",
      "Take mid; treat it as bad when mid ≥ bad.",
      "If mid is bad, set hi = mid; else lo = mid + 1.",
      "Return lo once the range collapses.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Halves the range each step." },
    solutions: [
      {
        language: "python",
        label: "Binary Search",
        code: `def first_bad_version(n: int, bad: int) -> int:
    def is_bad(v: int) -> bool:
        return v >= bad
    lo, hi = 1, n
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if is_bad(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      },
      {
        language: "typescript",
        label: "Binary Search",
        code: `function firstBadVersion(n: number, bad: number): number {
  const isBad = (v: number): boolean => v >= bad;
  let lo = 1, hi = n;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (isBad(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "firstBadVersion",
      comparison: "deep",
      jsStarter: `function firstBadVersion(n, bad) {
  // Versions >= 'bad' are bad. Return the first bad version using binary search.
  // TODO: implement
}`,
      jsReference: `function firstBadVersion(n, bad) {
  const isBad = (v) => v >= bad;
  let lo = 1, hi = n;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (isBad(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
    },
    tests: [
      { name: "bad at 4", args: [5, 4], expected: 4 },
      { name: "only version", args: [1, 1], expected: 1 },
      { name: "mid range", args: [10, 7], expected: 7 },
      { name: "all bad", args: [100, 1], expected: 1 },
    ],
    hints: ["Find the leftmost 'bad' boundary.", "Move hi to mid when mid is bad."],
    relatedIds: [374, 35],
  },
  {
    id: 374,
    slug: "guess-number-higher-or-lower",
    title: "Guess Number Higher or Lower",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Binary Search"],
    companies: ["google", "amazon"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/guess-number-higher-or-lower/",
    description:
      "A secret number is chosen from 1..n. Each guess tells you whether your pick is too high, too low, or exactly right. Find the secret number. (The playground passes the secret `pick` so the feedback can be simulated.)",
    examples: [
      { input: "n = 10, pick = 6", output: "6", explanation: "Binary search converges on 6." },
      { input: "n = 1, pick = 1", output: "1", explanation: "Only one option." },
    ],
    intuition:
      "The feedback is exactly the comparison you need for binary search. Guess the middle; if it is too high search the lower half, if too low search the upper half, and stop when it matches.",
    approach: [
      "Set lo = 1, hi = n.",
      "Guess mid; compare it to pick.",
      "If mid == pick, return it; if mid is too high, hi = mid − 1; else lo = mid + 1.",
      "Return lo as the fallback.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Classic halving search." },
    solutions: [
      {
        language: "python",
        label: "Binary Search",
        code: `def guess_number(n: int, pick: int) -> int:
    def guess(num: int) -> int:
        if num == pick:
            return 0
        return -1 if num > pick else 1
    lo, hi = 1, n
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        g = guess(mid)
        if g == 0:
            return mid
        if g < 0:
            hi = mid - 1
        else:
            lo = mid + 1
    return lo`,
      },
      {
        language: "typescript",
        label: "Binary Search",
        code: `function guessNumber(n: number, pick: number): number {
  const guess = (num: number): number => (num === pick ? 0 : num > pick ? -1 : 1);
  let lo = 1, hi = n;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    const g = guess(mid);
    if (g === 0) return mid;
    if (g < 0) hi = mid - 1;
    else lo = mid + 1;
  }
  return lo;
}`,
      },
    ],
    runner: {
      entry: "guessNumber",
      comparison: "deep",
      jsStarter: `function guessNumber(n, pick) {
  // 'pick' is the secret in 1..n. Binary search and return it.
  // TODO: implement
}`,
      jsReference: `function guessNumber(n, pick) {
  const guess = (num) => (num === pick ? 0 : num > pick ? -1 : 1);
  let lo = 1, hi = n;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    const g = guess(mid);
    if (g === 0) return mid;
    if (g < 0) hi = mid - 1;
    else lo = mid + 1;
  }
  return lo;
}`,
    },
    tests: [
      { name: "pick six", args: [10, 6], expected: 6 },
      { name: "only one", args: [1, 1], expected: 1 },
      { name: "low of two", args: [2, 1], expected: 1 },
      { name: "high of two", args: [2, 2], expected: 2 },
    ],
    hints: ["Feedback drives the halving.", "Return immediately on a match."],
    relatedIds: [278, 704],
  },
  {
    id: 744,
    slug: "find-smallest-letter-greater-than-target",
    title: "Find Smallest Letter Greater Than Target",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Binary Search"],
    companies: ["amazon", "microsoft"],
    frequency: 35,
    leetcodeUrl: "https://leetcode.com/problems/find-smallest-letter-greater-than-target/",
    description:
      "Given a sorted array of lowercase letters and a target letter, return the smallest letter that is strictly greater than the target. The letters wrap around, so if none is greater, return the first letter.",
    examples: [
      { input: 'letters = ["c","f","j"], target = "c"', output: '"f"', explanation: "f is the next letter after c." },
      { input: 'letters = ["c","f","j"], target = "j"', output: '"c"', explanation: "Nothing is greater, so wrap to c." },
    ],
    intuition:
      "Binary search for the first position whose letter is strictly greater than the target. If that position runs off the end, the wrap-around rule means the answer is the first letter.",
    approach: [
      "Set lo = 0, hi = letters.length.",
      "Find the leftmost index where letters[mid] > target.",
      "If the index is within bounds, return that letter.",
      "Otherwise return letters[0] (wrap around).",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Upper-bound search." },
    solutions: [
      {
        language: "python",
        label: "Upper Bound",
        code: `def next_greatest_letter(letters: list[str], target: str) -> str:
    lo, hi = 0, len(letters)
    while lo < hi:
        mid = (lo + hi) // 2
        if letters[mid] > target:
            hi = mid
        else:
            lo = mid + 1
    return letters[lo] if lo < len(letters) else letters[0]`,
      },
      {
        language: "typescript",
        label: "Upper Bound",
        code: `function nextGreatestLetter(letters: string[], target: string): string {
  let lo = 0, hi = letters.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (letters[mid] > target) hi = mid;
    else lo = mid + 1;
  }
  return lo < letters.length ? letters[lo] : letters[0];
}`,
      },
    ],
    runner: {
      entry: "nextGreatestLetter",
      comparison: "deep",
      jsStarter: `function nextGreatestLetter(letters, target) {
  // Return the smallest letter strictly greater than target, wrapping around.
  // TODO: implement
}`,
      jsReference: `function nextGreatestLetter(letters, target) {
  let lo = 0, hi = letters.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (letters[mid] > target) hi = mid;
    else lo = mid + 1;
  }
  return lo < letters.length ? letters[lo] : letters[0];
}`,
    },
    tests: [
      { name: "before first", args: [["c", "f", "j"], "a"], expected: "c" },
      { name: "next after c", args: [["c", "f", "j"], "c"], expected: "f" },
      { name: "gap to f", args: [["c", "f", "j"], "d"], expected: "f" },
      { name: "wrap around", args: [["c", "f", "j"], "j"], expected: "c" },
    ],
    hints: ["Strictly greater means upper bound.", "Wrap to letters[0] when none qualifies."],
    relatedIds: [278, 704],
  },
  {
    id: 1351,
    slug: "count-negative-numbers-in-a-sorted-matrix",
    title: "Count Negative Numbers in a Sorted Matrix",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Binary Search", "Matrix"],
    companies: ["amazon"],
    frequency: 33,
    leetcodeUrl: "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/",
    description:
      "Given a matrix whose rows and columns are each sorted in non-increasing order, count how many entries are negative.",
    examples: [
      { input: "grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]", output: "8", explanation: "Eight entries are below zero." },
      { input: "grid = [[3,2],[1,0]]", output: "0", explanation: "No negative entries." },
    ],
    intuition:
      "Because each row is sorted descending, the negatives in a row form a contiguous suffix. You can binary search each row for the first negative; even a direct count of negative cells is correct.",
    approach: [
      "Iterate over every row.",
      "Count the entries that are less than zero (or binary search the first negative per row).",
      "Accumulate and return the total.",
    ],
    complexity: { time: "O(m * n)", space: "O(1)", note: "Linear scan; per-row binary search gives O(m log n)." },
    solutions: [
      {
        language: "python",
        label: "Count",
        code: `def count_negatives(grid: list[list[int]]) -> int:
    return sum(1 for row in grid for v in row if v < 0)`,
      },
      {
        language: "typescript",
        label: "Count",
        code: `function countNegatives(grid: number[][]): number {
  let count = 0;
  for (const row of grid) for (const v of row) if (v < 0) count++;
  return count;
}`,
      },
    ],
    runner: {
      entry: "countNegatives",
      comparison: "deep",
      jsStarter: `function countNegatives(grid) {
  // Rows and columns are sorted descending. Count the negative entries.
  // TODO: implement
}`,
      jsReference: `function countNegatives(grid) {
  let count = 0;
  for (const row of grid) for (const v of row) if (v < 0) count++;
  return count;
}`,
    },
    tests: [
      { name: "eight negatives", args: [[[4, 3, 2, -1], [3, 2, 1, -1], [1, 1, -1, -2], [-1, -1, -2, -3]]], expected: 8 },
      { name: "none", args: [[[3, 2], [1, 0]]], expected: 0 },
      { name: "single negative", args: [[[-1]]], expected: 1 },
      { name: "mixed", args: [[[5, 1, 0], [-5, -5, -5]]], expected: 3 },
    ],
    hints: ["Negatives form a suffix per row.", "Binary search the first negative for O(m log n)."],
    relatedIds: [240, 74],
  },
  {
    id: 275,
    slug: "h-index-ii",
    title: "H-Index II",
    difficulty: "Medium",
    category: "binary-search",
    patterns: ["Binary Search"],
    companies: ["google", "amazon", "meta"],
    frequency: 37,
    leetcodeUrl: "https://leetcode.com/problems/h-index-ii/",
    description:
      "Given a citation count for each paper sorted in ascending order, return the researcher's h-index: the largest value h such that at least h papers have h or more citations. Aim for logarithmic time.",
    examples: [
      { input: "citations = [0,1,3,5,6]", output: "3", explanation: "Three papers have ≥ 3 citations." },
      { input: "citations = [1,2,100]", output: "2", explanation: "Two papers have ≥ 2 citations." },
    ],
    intuition:
      "With n sorted citations, the paper at index i has n − i papers at or after it. Binary search for the leftmost index where citations[i] ≥ n − i; the h-index is then n − i.",
    approach: [
      "Let n = citations.length; set lo = 0, hi = n.",
      "For mid, check whether citations[mid] ≥ n − mid.",
      "If so, move hi = mid; otherwise lo = mid + 1.",
      "Return n − lo.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Search on the sorted citations." },
    solutions: [
      {
        language: "python",
        label: "Binary Search",
        code: `def h_index(citations: list[int]) -> int:
    n = len(citations)
    lo, hi = 0, n
    while lo < hi:
        mid = (lo + hi) // 2
        if citations[mid] >= n - mid:
            hi = mid
        else:
            lo = mid + 1
    return n - lo`,
      },
      {
        language: "typescript",
        label: "Binary Search",
        code: `function hIndex(citations: number[]): number {
  const n = citations.length;
  let lo = 0, hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (citations[mid] >= n - mid) hi = mid;
    else lo = mid + 1;
  }
  return n - lo;
}`,
      },
    ],
    runner: {
      entry: "hIndex",
      comparison: "deep",
      jsStarter: `function hIndex(citations) {
  // citations is sorted ascending. Return the h-index in O(log n).
  // TODO: implement
}`,
      jsReference: `function hIndex(citations) {
  const n = citations.length;
  let lo = 0, hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (citations[mid] >= n - mid) hi = mid;
    else lo = mid + 1;
  }
  return n - lo;
}`,
    },
    tests: [
      { name: "h is three", args: [[0, 1, 3, 5, 6]], expected: 3 },
      { name: "h is two", args: [[1, 2, 100]], expected: 2 },
      { name: "zero", args: [[0]], expected: 0 },
      { name: "single high", args: [[100]], expected: 1 },
    ],
    hints: ["n − i papers follow index i.", "Find leftmost citations[i] ≥ n − i."],
    relatedIds: [287, 240],
  },
  {
    id: 2389,
    slug: "longest-subsequence-with-limited-sum",
    title: "Longest Subsequence With Limited Sum",
    difficulty: "Easy",
    category: "binary-search",
    patterns: ["Binary Search", "Prefix Sum", "Sorting", "Greedy"],
    companies: ["amazon", "google"],
    frequency: 31,
    leetcodeUrl: "https://leetcode.com/problems/longest-subsequence-with-limited-sum/",
    description:
      "For each query value, return the maximum number of elements you can pick from `nums` (any subsequence) whose total does not exceed that query. Return one answer per query, in the original query order.",
    examples: [
      { input: "nums = [4,5,2,1], queries = [3,10,21]", output: "[2,3,4]", explanation: "Pick smallest items first." },
      { input: "nums = [2,3,4,5], queries = [1]", output: "[0]", explanation: "Even the smallest item (2) exceeds 1." },
    ],
    intuition:
      "To fit the most items under a budget, always take the smallest values first. Sort `nums` and build prefix sums; each query becomes a binary search for the longest prefix whose sum stays within the budget.",
    approach: [
      "Sort nums ascending and compute prefix sums.",
      "For each query, binary search the count of prefix sums that are ≤ the query.",
      "That count is the answer for the query.",
      "Return answers in the original query order.",
    ],
    complexity: { time: "O(n log n + q log n)", space: "O(n)", note: "Sort plus per-query binary search." },
    solutions: [
      {
        language: "python",
        label: "Prefix + Binary Search",
        code: `import bisect

def answer_queries(nums: list[int], queries: list[int]) -> list[int]:
    prefix = []
    running = 0
    for x in sorted(nums):
        running += x
        prefix.append(running)
    return [bisect.bisect_right(prefix, q) for q in queries]`,
      },
      {
        language: "typescript",
        label: "Prefix + Binary Search",
        code: `function answerQueries(nums: number[], queries: number[]): number[] {
  const sorted = [...nums].sort((a, b) => a - b);
  const prefix: number[] = [];
  let run = 0;
  for (const x of sorted) { run += x; prefix.push(run); }
  return queries.map((q) => {
    let lo = 0, hi = prefix.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (prefix[mid] <= q) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  });
}`,
      },
    ],
    runner: {
      entry: "answerQueries",
      comparison: "deep",
      jsStarter: `function answerQueries(nums, queries) {
  // For each query, return the most elements summing to <= query.
  // TODO: implement
}`,
      jsReference: `function answerQueries(nums, queries) {
  const sorted = [...nums].sort((a, b) => a - b);
  const prefix = [];
  let run = 0;
  for (const x of sorted) { run += x; prefix.push(run); }
  return queries.map((q) => {
    let lo = 0, hi = prefix.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (prefix[mid] <= q) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  });
}`,
    },
    tests: [
      { name: "three queries", args: [[4, 5, 2, 1], [3, 10, 21]], expected: [2, 3, 4] },
      { name: "too small", args: [[2, 3, 4, 5], [1]], expected: [0] },
      { name: "single item", args: [[1], [1, 2, 0]], expected: [1, 1, 0] },
      { name: "all fit", args: [[1, 1, 1], [3]], expected: [3] },
    ],
    hints: ["Take smallest values first.", "Binary search prefix sums per query."],
    relatedIds: [704, 35],
  },
];

export default batchS;
