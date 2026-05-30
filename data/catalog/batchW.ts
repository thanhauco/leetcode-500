import type { Problem } from "../types.ts";

/**
 * Batch W — binary trees (BST navigation, tree DP, reconstruction, level work)
 * plus two trie design problems. Trees are passed as LeetCode level-order arrays
 * (null = missing child); each runnable reference builds the tree inside
 * `runner.jsReference` and returns integers, booleans, value lists, or trimmed
 * level-order arrays for tree-shaped outputs.
 */
export const batchW: Problem[] = [
  {
    id: 270,
    slug: "closest-binary-search-tree-value",
    title: "Closest Binary Search Tree Value",
    difficulty: "Easy",
    category: "trees",
    patterns: ["BST", "Binary Search"],
    companies: ["amazon", "google", "microsoft", "linkedin"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/closest-binary-search-tree-value/",
    premium: true,
    description:
      "Given the root of a binary search tree and a floating-point target, return the node value that is numerically nearest to the target. If two values are equally close, return the smaller one.",
    examples: [
      { input: "root = [4,2,5,1,3], target = 3.714286", output: "4" },
      { input: "root = [1], target = 4.428571", output: "1" },
    ],
    intuition:
      "Because it is a BST, you can steer toward the target like a binary search: at each node, go left when the target is smaller, right when larger. Every node you visit is a candidate, so keep the closest seen so far and you cover the optimal path in O(h).",
    approach: [
      "Start with the root value as the current best.",
      "Walk down the tree comparing each node value's distance to the target.",
      "Update the best on a strictly smaller distance, or on a tie when the value is smaller.",
      "Descend left if target < node.val else right; stop at a null link.",
    ],
    complexity: { time: "O(h)", space: "O(1)", note: "h = tree height; iterative descent." },
    solutions: [
      {
        language: "python",
        label: "BST descent",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def closest_value(root: TreeNode, target: float) -> int:
    closest = root.val
    node = root
    while node:
        d = abs(node.val - target)
        bd = abs(closest - target)
        if d < bd or (d == bd and node.val < closest):
            closest = node.val
        node = node.left if target < node.val else node.right
    return closest`,
      },
      {
        language: "typescript",
        label: "BST descent",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function closestValue(root: TreeNode, target: number): number {
  let closest = root.val;
  let node: TreeNode | null = root;
  while (node) {
    const d = Math.abs(node.val - target);
    const bd = Math.abs(closest - target);
    if (d < bd || (d === bd && node.val < closest)) closest = node.val;
    node = target < node.val ? node.left : node.right;
  }
  return closest;
}`,
      },
    ],
    runner: {
      entry: "closestValue",
      comparison: "deep",
      jsStarter: `function closestValue(level, target) {
  // 'level' is the BST as a LeetCode level-order array; return the closest value.
  // TODO: implement
}`,
      jsReference: `function closestValue(level, target) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const root = build(level);
  let closest = root.val, node = root;
  while (node) {
    const d = Math.abs(node.val - target), bd = Math.abs(closest - target);
    if (d < bd || (d === bd && node.val < closest)) closest = node.val;
    node = target < node.val ? node.left : node.right;
  }
  return closest;
}`,
    },
    tests: [
      { name: "example", args: [[4, 2, 5, 1, 3], 3.714286], expected: 4 },
      { name: "single", args: [[1], 4.428571], expected: 1 },
      { name: "go right", args: [[2, 1, 3], 2.6], expected: 3 },
      { name: "tie picks smaller", args: [[3, 1, 5], 4], expected: 3 },
    ],
  },
  {
    id: 285,
    slug: "inorder-successor-in-bst",
    title: "Inorder Successor in BST",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BST"],
    companies: ["microsoft", "amazon", "google", "bloomberg"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/inorder-successor-in-bst/",
    premium: true,
    description:
      "Given a binary search tree and the value of one of its nodes, return the value of that node's inorder successor — the smallest value strictly greater than it — or null if no successor exists. In this playground the node is identified by its (unique) value.",
    examples: [
      { input: "root = [2,1,3], p = 1", output: "2" },
      { input: "root = [5,3,6,2,4,null,null,1], p = 6", output: "null", explanation: "6 is the maximum, so there is no successor." },
    ],
    intuition:
      "The inorder successor is the leftmost value that is still greater than p. Scan down from the root: whenever a node value exceeds p, it is a successor candidate, so record it and move left to look for something even smaller; otherwise move right. The last recorded candidate is the answer.",
    approach: [
      "Track a candidate successor, initially null.",
      "From the root, if p < node.val, record node.val and go left.",
      "Otherwise go right.",
      "When you fall off the tree, return the last recorded candidate.",
    ],
    complexity: { time: "O(h)", space: "O(1)", note: "h = tree height." },
    solutions: [
      {
        language: "python",
        label: "BST successor",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def inorder_successor(root: TreeNode, p: int):
    succ = None
    node = root
    while node:
        if p < node.val:
            succ = node.val
            node = node.left
        else:
            node = node.right
    return succ`,
      },
      {
        language: "typescript",
        label: "BST successor",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function inorderSuccessor(root: TreeNode, p: number): number | null {
  let succ: number | null = null;
  let node: TreeNode | null = root;
  while (node) {
    if (p < node.val) { succ = node.val; node = node.left; }
    else node = node.right;
  }
  return succ;
}`,
      },
    ],
    runner: {
      entry: "inorderSuccessor",
      comparison: "deep",
      jsStarter: `function inorderSuccessor(level, p) {
  // 'level' is the BST as a level-order array; return the successor value of p or null.
  // TODO: implement
}`,
      jsReference: `function inorderSuccessor(level, p) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  let node = build(level), succ = null;
  while (node) {
    if (p < node.val) { succ = node.val; node = node.left; }
    else node = node.right;
  }
  return succ;
}`,
    },
    tests: [
      { name: "has successor", args: [[2, 1, 3], 1], expected: 2 },
      { name: "max has none", args: [[5, 3, 6, 2, 4, null, null, 1], 6], expected: null },
      { name: "internal", args: [[5, 3, 6, 2, 4, null, null, 1], 3], expected: 4 },
      { name: "right lean", args: [[1, null, 2], 1], expected: 2 },
    ],
  },
  {
    id: 333,
    slug: "largest-bst-subtree",
    title: "Largest BST Subtree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Postorder", "BST"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/largest-bst-subtree/",
    premium: true,
    description:
      "Given a binary tree, find the number of nodes in the largest subtree that is itself a valid binary search tree, where every left descendant is smaller and every right descendant is larger than the subtree's root.",
    examples: [
      { input: "root = [10,5,15,1,8,null,7]", output: "3", explanation: "The subtree rooted at 5 (nodes 5,1,8) is the largest valid BST." },
      { input: "root = [2,1,3]", output: "3" },
    ],
    intuition:
      "A node forms a BST only if both children are BSTs and its value is greater than everything on the left and smaller than everything on the right. Post-order DFS lets each node report back whether it is a BST plus its size and value range, so the parent can decide in O(1).",
    approach: [
      "DFS returns (isBST, size, min, max) for each subtree; an empty subtree is a BST of size 0 with extreme min/max.",
      "A node is a BST when both children are BSTs and left.max < node.val < right.min.",
      "When valid, its size is left.size + right.size + 1; track the global maximum.",
      "Otherwise mark the subtree not a BST and stop counting upward.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Single post-order pass." },
    solutions: [
      {
        language: "python",
        label: "Postorder",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def largest_bst_subtree(root: TreeNode) -> int:
    best = 0
    def dfs(n):
        nonlocal best
        if not n:
            return True, 0, float('inf'), float('-inf')
        lb, ls, lmin, lmax = dfs(n.left)
        rb, rs, rmin, rmax = dfs(n.right)
        if lb and rb and lmax < n.val < rmin:
            size = ls + rs + 1
            best = max(best, size)
            return True, size, min(n.val, lmin), max(n.val, rmax)
        return False, 0, 0, 0
    dfs(root)
    return best`,
      },
      {
        language: "typescript",
        label: "Postorder",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function largestBSTSubtree(root: TreeNode | null): number {
  let best = 0;
  function dfs(n: TreeNode | null): [boolean, number, number, number] {
    if (!n) return [true, 0, Infinity, -Infinity];
    const [lb, ls, lmin, lmax] = dfs(n.left);
    const [rb, rs, rmin, rmax] = dfs(n.right);
    if (lb && rb && lmax < n.val && n.val < rmin) {
      const size = ls + rs + 1;
      best = Math.max(best, size);
      return [true, size, Math.min(n.val, lmin), Math.max(n.val, rmax)];
    }
    return [false, 0, 0, 0];
  }
  dfs(root);
  return best;
}`,
      },
    ],
    runner: {
      entry: "largestBSTSubtree",
      comparison: "deep",
      jsStarter: `function largestBSTSubtree(level) {
  // 'level' is the tree as a level-order array; return the size of the largest BST subtree.
  // TODO: implement
}`,
      jsReference: `function largestBSTSubtree(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  let best = 0;
  function dfs(n) {
    if (!n) return [true, 0, Infinity, -Infinity];
    const [lb, ls, lmin, lmax] = dfs(n.left);
    const [rb, rs, rmin, rmax] = dfs(n.right);
    if (lb && rb && lmax < n.val && n.val < rmin) {
      const size = ls + rs + 1;
      best = Math.max(best, size);
      return [true, size, Math.min(n.val, lmin), Math.max(n.val, rmax)];
    }
    return [false, 0, 0, 0];
  }
  dfs(build(level));
  return best;
}`,
    },
    tests: [
      { name: "broken right", args: [[10, 5, 15, 1, 8, null, 7]], expected: 3 },
      { name: "whole tree", args: [[2, 1, 3]], expected: 3 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "single", args: [[1]], expected: 1 },
    ],
  },
  {
    id: 337,
    slug: "house-robber-iii",
    title: "House Robber III",
    difficulty: "Medium",
    category: "trees",
    patterns: ["Tree DP", "DFS"],
    companies: ["amazon", "google", "uber", "bloomberg"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/house-robber-iii/",
    description:
      "Houses are arranged as a binary tree and a thief cannot rob two directly connected houses. Given the root, return the maximum total value the thief can collect.",
    examples: [
      { input: "root = [3,2,3,null,3,null,1]", output: "7", explanation: "Rob 3 (root) + 3 + 1 = 7." },
      { input: "root = [3,4,5,1,3,null,1]", output: "9", explanation: "Rob 4 + 5 = 9." },
    ],
    intuition:
      "Each node has two states: robbed or skipped. If you rob a node you must skip both children; if you skip it you take the better of robbing or skipping each child. A single post-order pass returns both totals per node, so the parent combines them in O(1).",
    approach: [
      "DFS returns a pair [skip, rob] for each node.",
      "rob = node.val + left.skip + right.skip.",
      "skip = max(left.skip, left.rob) + max(right.skip, right.rob).",
      "Answer is max of the root pair.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Post-order, O(1) work per node." },
    solutions: [
      {
        language: "python",
        label: "Tree DP",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def rob(root: TreeNode) -> int:
    def dfs(n):
        if not n:
            return (0, 0)  # (skip, rob)
        ls, lr = dfs(n.left)
        rs, rr = dfs(n.right)
        return (max(ls, lr) + max(rs, rr), n.val + ls + rs)
    return max(dfs(root))`,
      },
      {
        language: "typescript",
        label: "Tree DP",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function rob(root: TreeNode | null): number {
  function dfs(n: TreeNode | null): [number, number] {
    if (!n) return [0, 0];
    const [ls, lr] = dfs(n.left);
    const [rs, rr] = dfs(n.right);
    return [Math.max(ls, lr) + Math.max(rs, rr), n.val + ls + rs];
  }
  const [s, r] = dfs(root);
  return Math.max(s, r);
}`,
      },
    ],
    runner: {
      entry: "rob",
      comparison: "deep",
      jsStarter: `function rob(level) {
  // 'level' is the tree as a level-order array; return the max non-adjacent total.
  // TODO: implement
}`,
      jsReference: `function rob(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  function dfs(n) {
    if (!n) return [0, 0];
    const [ls, lr] = dfs(n.left);
    const [rs, rr] = dfs(n.right);
    return [Math.max(ls, lr) + Math.max(rs, rr), n.val + ls + rs];
  }
  const [s, r] = dfs(build(level));
  return Math.max(s, r);
}`,
    },
    tests: [
      { name: "skip children", args: [[3, 2, 3, null, 3, null, 1]], expected: 7 },
      { name: "rob children", args: [[3, 4, 5, 1, 3, null, 1]], expected: 9 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "single", args: [[5]], expected: 5 },
    ],
  },
  {
    id: 450,
    slug: "delete-node-in-a-bst",
    title: "Delete Node in a BST",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BST", "Recursion"],
    companies: ["amazon", "microsoft", "google", "adobe"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-bst/",
    description:
      "Given the root of a binary search tree and a key, remove the node with that key (if present) while keeping the tree a valid BST, and return the resulting tree as a level-order array. Deleting an internal node replaces it with its in-order successor.",
    examples: [
      { input: "root = [5,3,6,2,4,null,7], key = 3", output: "[5,4,6,2,null,null,7]" },
      { input: "root = [5,3,6,2,4,null,7], key = 0", output: "[5,3,6,2,4,null,7]", explanation: "Key not found; tree is unchanged." },
    ],
    intuition:
      "Use the BST ordering to locate the key. Once found, two children is the only hard case: swap in the smallest value of the right subtree (the in-order successor), then recursively delete that successor, which has at most one child.",
    approach: [
      "Recurse left if key < node.val, right if key > node.val.",
      "On a match with a missing child, return the other child.",
      "With two children, copy the right subtree's minimum value, then delete it from the right subtree.",
      "Serialize the tree back to a trimmed level-order array.",
    ],
    complexity: { time: "O(h)", space: "O(h)", note: "h = tree height; recursion stack." },
    solutions: [
      {
        language: "python",
        label: "BST delete",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def delete_node(root: TreeNode, key: int):
    if not root:
        return None
    if key < root.val:
        root.left = delete_node(root.left, key)
    elif key > root.val:
        root.right = delete_node(root.right, key)
    else:
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        m = root.right
        while m.left:
            m = m.left
        root.val = m.val
        root.right = delete_node(root.right, m.val)
    return root`,
      },
      {
        language: "typescript",
        label: "BST delete",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;
  if (key < root.val) root.left = deleteNode(root.left, key);
  else if (key > root.val) root.right = deleteNode(root.right, key);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let m = root.right;
    while (m.left) m = m.left;
    root.val = m.val;
    root.right = deleteNode(root.right, m.val);
  }
  return root;
}`,
      },
    ],
    runner: {
      entry: "deleteNode",
      comparison: "deep",
      jsStarter: `function deleteNode(level, key) {
  // 'level' is the BST as a level-order array; return the trimmed level-order array after deletion.
  // TODO: implement
}`,
      jsReference: `function deleteNode(level, key) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  function ser(r) {
    if (!r) return [];
    const out = [], q = [r];
    while (q.length) { const n = q.shift(); if (n) { out.push(n.val); q.push(n.left); q.push(n.right); } else out.push(null); }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  function del(r, key) {
    if (!r) return null;
    if (key < r.val) r.left = del(r.left, key);
    else if (key > r.val) r.right = del(r.right, key);
    else {
      if (!r.left) return r.right;
      if (!r.right) return r.left;
      let m = r.right; while (m.left) m = m.left;
      r.val = m.val;
      r.right = del(r.right, m.val);
    }
    return r;
  }
  return ser(del(build(level), key));
}`,
    },
    tests: [
      { name: "delete internal", args: [[5, 3, 6, 2, 4, null, 7], 3], expected: [5, 4, 6, 2, null, null, 7] },
      { name: "key missing", args: [[5, 3, 6, 2, 4, null, 7], 0], expected: [5, 3, 6, 2, 4, null, 7] },
      { name: "empty", args: [[], 1], expected: [] },
      { name: "delete root", args: [[2, 1, 3], 2], expected: [3, 1] },
    ],
  },
  {
    id: 501,
    slug: "find-mode-in-binary-search-tree",
    title: "Find Mode in Binary Search Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["BST", "DFS", "Hash Map"],
    companies: ["google", "amazon"],
    frequency: 41,
    leetcodeUrl: "https://leetcode.com/problems/find-mode-in-binary-search-tree/",
    description:
      "Given a binary search tree that may contain duplicate values, return all of the most frequently occurring values. The modes may be returned in any order.",
    examples: [
      { input: "root = [1,null,2,2]", output: "[2]" },
      { input: "root = [6,2,8,1,4]", output: "[1,2,4,6,8]", explanation: "Every value occurs once, so all are modes." },
    ],
    intuition:
      "Count how often each value appears with a simple traversal, find the highest frequency, then collect every value reaching it. The BST shape is not required for this counting approach, which keeps it short and robust.",
    approach: [
      "Traverse the tree, tallying each value in a map.",
      "Find the maximum frequency across the map.",
      "Collect all values whose count equals that maximum.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Map holds distinct values." },
    solutions: [
      {
        language: "python",
        label: "Counting",
        code: `from collections import Counter

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def find_mode(root: TreeNode) -> list[int]:
    cnt = Counter()
    def dfs(n):
        if not n:
            return
        cnt[n.val] += 1
        dfs(n.left); dfs(n.right)
    dfs(root)
    if not cnt:
        return []
    hi = max(cnt.values())
    return [v for v, c in cnt.items() if c == hi]`,
      },
      {
        language: "typescript",
        label: "Counting",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function findMode(root: TreeNode | null): number[] {
  const cnt = new Map<number, number>();
  const dfs = (n: TreeNode | null): void => {
    if (!n) return;
    cnt.set(n.val, (cnt.get(n.val) ?? 0) + 1);
    dfs(n.left); dfs(n.right);
  };
  dfs(root);
  let hi = 0;
  for (const c of cnt.values()) hi = Math.max(hi, c);
  const res: number[] = [];
  for (const [v, c] of cnt) if (c === hi) res.push(v);
  return res;
}`,
      },
    ],
    runner: {
      entry: "findMode",
      comparison: "canonical",
      jsStarter: `function findMode(level) {
  // 'level' is the BST as a level-order array; return all most-frequent values (any order).
  // TODO: implement
}`,
      jsReference: `function findMode(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const cnt = new Map();
  (function dfs(n) { if (!n) return; cnt.set(n.val, (cnt.get(n.val) || 0) + 1); dfs(n.left); dfs(n.right); })(build(level));
  let hi = 0;
  for (const c of cnt.values()) hi = Math.max(hi, c);
  const res = [];
  for (const [v, c] of cnt) if (c === hi) res.push(v);
  return res;
}`,
    },
    tests: [
      { name: "single mode", args: [[1, null, 2, 2]], expected: [2] },
      { name: "all unique", args: [[6, 2, 8, 1, 4]], expected: [1, 2, 4, 6, 8] },
      { name: "single node", args: [[1]], expected: [1] },
      { name: "all same", args: [[2, 2, 2]], expected: [2] },
    ],
  },
  {
    id: 508,
    slug: "most-frequent-subtree-sum",
    title: "Most Frequent Subtree Sum",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Postorder", "Hash Map"],
    companies: ["amazon", "google"],
    frequency: 38,
    leetcodeUrl: "https://leetcode.com/problems/most-frequent-subtree-sum/",
    description:
      "For each node, its subtree sum is the total of all values in the subtree rooted at that node. Return the subtree-sum value(s) that occur most frequently across the tree, in any order.",
    examples: [
      { input: "root = [5,2,-3]", output: "[2,-3,4]", explanation: "Sums 2, -3, and 4 each occur once." },
      { input: "root = [5,2,-5]", output: "[2]", explanation: "Sum 2 occurs twice (leaf 2 and the root)." },
    ],
    intuition:
      "Post-order DFS computes each subtree sum from its children's sums. Tally every sum in a map, find the maximum frequency, and return all sums reaching it.",
    approach: [
      "DFS returns node.val plus the left and right subtree sums.",
      "Record each computed sum in a frequency map.",
      "Find the top frequency and collect every sum with that count.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "One sum per node." },
    solutions: [
      {
        language: "python",
        label: "Postorder",
        code: `from collections import Counter

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def find_frequent_tree_sum(root: TreeNode) -> list[int]:
    cnt = Counter()
    def dfs(n):
        if not n:
            return 0
        s = n.val + dfs(n.left) + dfs(n.right)
        cnt[s] += 1
        return s
    dfs(root)
    if not cnt:
        return []
    hi = max(cnt.values())
    return [s for s, c in cnt.items() if c == hi]`,
      },
      {
        language: "typescript",
        label: "Postorder",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function findFrequentTreeSum(root: TreeNode | null): number[] {
  const cnt = new Map<number, number>();
  const dfs = (n: TreeNode | null): number => {
    if (!n) return 0;
    const s = n.val + dfs(n.left) + dfs(n.right);
    cnt.set(s, (cnt.get(s) ?? 0) + 1);
    return s;
  };
  dfs(root);
  let hi = 0;
  for (const c of cnt.values()) hi = Math.max(hi, c);
  const res: number[] = [];
  for (const [s, c] of cnt) if (c === hi) res.push(s);
  return res;
}`,
      },
    ],
    runner: {
      entry: "findFrequentTreeSum",
      comparison: "canonical",
      jsStarter: `function findFrequentTreeSum(level) {
  // 'level' is the tree as a level-order array; return the most frequent subtree sum(s).
  // TODO: implement
}`,
      jsReference: `function findFrequentTreeSum(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const cnt = new Map();
  (function dfs(n) { if (!n) return 0; const s = n.val + dfs(n.left) + dfs(n.right); cnt.set(s, (cnt.get(s) || 0) + 1); return s; })(build(level));
  let hi = 0;
  for (const c of cnt.values()) hi = Math.max(hi, c);
  const res = [];
  for (const [s, c] of cnt) if (c === hi) res.push(s);
  return res;
}`,
    },
    tests: [
      { name: "all once", args: [[5, 2, -3]], expected: [-3, 2, 4] },
      { name: "tie at two", args: [[5, 2, -5]], expected: [2] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "empty", args: [[]], expected: [] },
    ],
  },
  {
    id: 623,
    slug: "add-one-row-to-tree",
    title: "Add One Row to Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS", "DFS"],
    companies: ["amazon", "microsoft"],
    frequency: 36,
    leetcodeUrl: "https://leetcode.com/problems/add-one-row-to-tree/",
    description:
      "Given a tree, a value, and a target depth, insert a new row of nodes all holding that value at the target depth, and return the tree as a level-order array. When the depth is 1 a new root is created with the old tree as its left child; otherwise each node at depth-1 gains the new nodes as children, with its old subtrees pushed down one level.",
    examples: [
      { input: "root = [4,2,6,3,1,5], val = 1, depth = 2", output: "[4,1,1,2,null,null,6,3,1,5]" },
      { input: "root = [4,2,null,3,1], val = 1, depth = 3", output: "[4,2,null,1,1,3,null,null,1]" },
    ],
    intuition:
      "If the new row is at the top, simply wrap the tree in a new root. Otherwise walk to the parents one level above the target; for each, splice in a new left child whose left is the old left subtree, and a new right child whose right is the old right subtree.",
    approach: [
      "Handle depth == 1 by returning a new root with the tree as its left child.",
      "DFS to nodes at depth-1.",
      "Insert new value nodes that adopt the existing left/right subtrees underneath.",
      "Serialize the result to a trimmed level-order array.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Visit each node once." },
    solutions: [
      {
        language: "python",
        label: "DFS insert",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def add_one_row(root: TreeNode, val: int, depth: int):
    if depth == 1:
        return TreeNode(val, left=root)
    def dfs(n, d):
        if not n:
            return
        if d == depth - 1:
            n.left = TreeNode(val, left=n.left)
            n.right = TreeNode(val, right=n.right)
        else:
            dfs(n.left, d + 1)
            dfs(n.right, d + 1)
    dfs(root, 1)
    return root`,
      },
      {
        language: "typescript",
        label: "DFS insert",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function addOneRow(root: TreeNode | null, val: number, depth: number): TreeNode | null {
  if (depth === 1) return new TreeNode(val, root);
  const dfs = (n: TreeNode | null, d: number): void => {
    if (!n) return;
    if (d === depth - 1) {
      n.left = new TreeNode(val, n.left);
      n.right = new TreeNode(val, null, n.right);
    } else { dfs(n.left, d + 1); dfs(n.right, d + 1); }
  };
  dfs(root, 1);
  return root;
}`,
      },
    ],
    runner: {
      entry: "addOneRow",
      comparison: "deep",
      jsStarter: `function addOneRow(level, val, depth) {
  // 'level' is the tree as a level-order array; return the trimmed level-order array after inserting the row.
  // TODO: implement
}`,
      jsReference: `function addOneRow(level, val, depth) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  function ser(r) {
    if (!r) return [];
    const out = [], q = [r];
    while (q.length) { const n = q.shift(); if (n) { out.push(n.val); q.push(n.left); q.push(n.right); } else out.push(null); }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  let root = build(level);
  if (depth === 1) { root = { val, left: root, right: null }; return ser(root); }
  (function dfs(n, d) {
    if (!n) return;
    if (d === depth - 1) {
      n.left = { val, left: n.left, right: null };
      n.right = { val, left: null, right: n.right };
    } else { dfs(n.left, d + 1); dfs(n.right, d + 1); }
  })(root, 1);
  return ser(root);
}`,
    },
    tests: [
      { name: "second level", args: [[4, 2, 6, 3, 1, 5], 1, 2], expected: [4, 1, 1, 2, null, null, 6, 3, 1, 5] },
      { name: "third level", args: [[4, 2, null, 3, 1], 1, 3], expected: [4, 2, null, 1, 1, 3, null, null, 1] },
      { name: "new root", args: [[1], 2, 1], expected: [2, 1] },
      { name: "depth two small", args: [[1, 2], 3, 2], expected: [1, 3, 3, 2] },
    ],
  },
  {
    id: 637,
    slug: "average-of-levels-in-binary-tree",
    title: "Average of Levels in Binary Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["BFS"],
    companies: ["meta", "amazon", "microsoft"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/average-of-levels-in-binary-tree/",
    description:
      "Given the root of a binary tree, return a list containing the average value of the nodes on each level, ordered from the root level downward.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[3,14.5,11]" },
      { input: "root = [1,2,3,4,5]", output: "[1,2.5,4.5]" },
    ],
    intuition:
      "A breadth-first sweep processes the tree one level at a time. For each level, sum the node values and divide by the count, then enqueue the next level's children.",
    approach: [
      "Initialize a queue with the root.",
      "For each level, record its size, sum all node values, and push children.",
      "Append sum / size to the answer.",
    ],
    complexity: { time: "O(n)", space: "O(w)", note: "w = maximum level width." },
    solutions: [
      {
        language: "python",
        label: "BFS",
        code: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def average_of_levels(root: TreeNode) -> list[float]:
    res, q = [], deque([root])
    while q:
        n = len(q)
        total = 0
        for _ in range(n):
            node = q.popleft()
            total += node.val
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(total / n)
    return res`,
      },
      {
        language: "typescript",
        label: "BFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function averageOfLevels(root: TreeNode | null): number[] {
  const res: number[] = [];
  let q: TreeNode[] = root ? [root] : [];
  while (q.length) {
    let total = 0;
    const next: TreeNode[] = [];
    for (const node of q) {
      total += node.val;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(total / q.length);
    q = next;
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "averageOfLevels",
      comparison: "deep",
      jsStarter: `function averageOfLevels(level) {
  // 'level' is the tree as a level-order array; return the per-level averages.
  // TODO: implement
}`,
      jsReference: `function averageOfLevels(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const root = build(level);
  const res = [];
  let q = root ? [root] : [];
  while (q.length) {
    let total = 0; const next = [];
    for (const node of q) { total += node.val; if (node.left) next.push(node.left); if (node.right) next.push(node.right); }
    res.push(total / q.length);
    q = next;
  }
  return res;
}`,
    },
    tests: [
      { name: "classic", args: [[3, 9, 20, null, null, 15, 7]], expected: [3, 14.5, 11] },
      { name: "full small", args: [[1, 2, 3, 4, 5]], expected: [1, 2.5, 4.5] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "two levels", args: [[5, 1, 2]], expected: [5, 1.5] },
    ],
  },
  {
    id: 669,
    slug: "trim-a-binary-search-tree",
    title: "Trim a Binary Search Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BST", "Recursion"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/trim-a-binary-search-tree/",
    description:
      "Given a binary search tree and an inclusive range [low, high], remove every node whose value falls outside the range while preserving the relative ordering of the remaining nodes, and return the trimmed tree as a level-order array.",
    examples: [
      { input: "root = [1,0,2], low = 1, high = 2", output: "[1,null,2]" },
      { input: "root = [3,0,4,null,2,null,null,1], low = 1, high = 3", output: "[3,2,null,1]" },
    ],
    intuition:
      "Lean on the BST property: if a node's value is below low, the entire left subtree is too small, so recurse into the right; if it is above high, recurse into the left. Otherwise keep the node and trim both children.",
    approach: [
      "If node.val < low, return the trimmed right subtree.",
      "If node.val > high, return the trimmed left subtree.",
      "Otherwise trim both children and keep the node.",
      "Serialize the result back to a trimmed level-order array.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Each node visited once." },
    solutions: [
      {
        language: "python",
        label: "BST trim",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def trim_bst(root: TreeNode, low: int, high: int):
    if not root:
        return None
    if root.val < low:
        return trim_bst(root.right, low, high)
    if root.val > high:
        return trim_bst(root.left, low, high)
    root.left = trim_bst(root.left, low, high)
    root.right = trim_bst(root.right, low, high)
    return root`,
      },
      {
        language: "typescript",
        label: "BST trim",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
  if (!root) return null;
  if (root.val < low) return trimBST(root.right, low, high);
  if (root.val > high) return trimBST(root.left, low, high);
  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);
  return root;
}`,
      },
    ],
    runner: {
      entry: "trimBST",
      comparison: "deep",
      jsStarter: `function trimBST(level, low, high) {
  // 'level' is the BST as a level-order array; return the trimmed level-order array.
  // TODO: implement
}`,
      jsReference: `function trimBST(level, low, high) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  function ser(r) {
    if (!r) return [];
    const out = [], q = [r];
    while (q.length) { const n = q.shift(); if (n) { out.push(n.val); q.push(n.left); q.push(n.right); } else out.push(null); }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  function trim(n, low, high) {
    if (!n) return null;
    if (n.val < low) return trim(n.right, low, high);
    if (n.val > high) return trim(n.left, low, high);
    n.left = trim(n.left, low, high);
    n.right = trim(n.right, low, high);
    return n;
  }
  return ser(trim(build(level), low, high));
}`,
    },
    tests: [
      { name: "drop small", args: [[1, 0, 2], 1, 2], expected: [1, null, 2] },
      { name: "deep trim", args: [[3, 0, 4, null, 2, null, null, 1], 1, 3], expected: [3, 2, null, 1] },
      { name: "empty", args: [[], 1, 2], expected: [] },
      { name: "drop left", args: [[2, 1, 3], 2, 3], expected: [2, null, 3] },
    ],
  },
  {
    id: 687,
    slug: "longest-univalue-path",
    title: "Longest Univalue Path",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Tree DP"],
    companies: ["google", "amazon", "bloomberg"],
    frequency: 43,
    leetcodeUrl: "https://leetcode.com/problems/longest-univalue-path/",
    description:
      "Given the root of a binary tree, return the number of edges on the longest path where every node has the same value. The path need not pass through the root.",
    examples: [
      { input: "root = [5,4,5,1,1,null,5]", output: "2", explanation: "The 5 → 5 → 5 path has 2 edges." },
      { input: "root = [1,4,5,4,4,null,5]", output: "2", explanation: "The 4 → 4 → 4 path has 2 edges." },
    ],
    intuition:
      "For each node, find the longest same-value chain extending down its left and right. A child only extends the chain when it shares the node's value. The best path through a node sums its two qualifying arms, while it can only pass one arm up to its parent.",
    approach: [
      "DFS returns the longest single-direction same-value arm length for a node.",
      "A child extends the arm by 1 only if it shares the node's value.",
      "Update the global best with left arm + right arm.",
      "Return max(left arm, right arm) to the parent.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Post-order traversal." },
    solutions: [
      {
        language: "python",
        label: "Tree DP",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def longest_univalue_path(root: TreeNode) -> int:
    best = 0
    def dfs(n):
        nonlocal best
        if not n:
            return 0
        l, r = dfs(n.left), dfs(n.right)
        left = l + 1 if n.left and n.left.val == n.val else 0
        right = r + 1 if n.right and n.right.val == n.val else 0
        best = max(best, left + right)
        return max(left, right)
    dfs(root)
    return best`,
      },
      {
        language: "typescript",
        label: "Tree DP",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function longestUnivaluePath(root: TreeNode | null): number {
  let best = 0;
  const dfs = (n: TreeNode | null): number => {
    if (!n) return 0;
    const l = dfs(n.left), r = dfs(n.right);
    const left = n.left && n.left.val === n.val ? l + 1 : 0;
    const right = n.right && n.right.val === n.val ? r + 1 : 0;
    best = Math.max(best, left + right);
    return Math.max(left, right);
  };
  dfs(root);
  return best;
}`,
      },
    ],
    runner: {
      entry: "longestUnivaluePath",
      comparison: "deep",
      jsStarter: `function longestUnivaluePath(level) {
  // 'level' is the tree as a level-order array; return the longest same-value path length in edges.
  // TODO: implement
}`,
      jsReference: `function longestUnivaluePath(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  let best = 0;
  (function dfs(n) {
    if (!n) return 0;
    const l = dfs(n.left), r = dfs(n.right);
    const left = n.left && n.left.val === n.val ? l + 1 : 0;
    const right = n.right && n.right.val === n.val ? r + 1 : 0;
    best = Math.max(best, left + right);
    return Math.max(left, right);
  })(build(level));
  return best;
}`,
    },
    tests: [
      { name: "right chain", args: [[5, 4, 5, 1, 1, null, 5]], expected: 2 },
      { name: "left bend", args: [[1, 4, 5, 4, 4, null, 5]], expected: 2 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "single", args: [[1]], expected: 0 },
    ],
  },
  {
    id: 897,
    slug: "increasing-order-search-tree",
    title: "Increasing Order Search Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["BST", "Inorder"],
    companies: ["amazon", "apple"],
    frequency: 35,
    leetcodeUrl: "https://leetcode.com/problems/increasing-order-search-tree/",
    description:
      "Given a binary search tree, rearrange it into a right-leaning chain that follows the in-order sequence: the smallest value becomes the new root and each node has no left child and a single right child. Return the result as a level-order array.",
    examples: [
      { input: "root = [2,1,3]", output: "[1,null,2,null,3]" },
      { input: "root = [3,1,4,null,2]", output: "[1,null,2,null,3,null,4]" },
    ],
    intuition:
      "An in-order traversal of a BST visits values in sorted order. Collect them and stitch them into a chain where every node hangs off the previous node's right pointer.",
    approach: [
      "In-order traverse to collect values in ascending order.",
      "Build a chain attaching each value as the right child of the previous node.",
      "Serialize the right-leaning chain to a trimmed level-order array.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Stores the in-order values." },
    solutions: [
      {
        language: "python",
        label: "Inorder rebuild",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def increasing_bst(root: TreeNode) -> TreeNode:
    vals = []
    def ino(n):
        if not n:
            return
        ino(n.left); vals.append(n.val); ino(n.right)
    ino(root)
    dummy = TreeNode()
    cur = dummy
    for v in vals:
        cur.right = TreeNode(v)
        cur = cur.right
    return dummy.right`,
      },
      {
        language: "typescript",
        label: "Inorder rebuild",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function increasingBST(root: TreeNode | null): TreeNode | null {
  const vals: number[] = [];
  const ino = (n: TreeNode | null): void => {
    if (!n) return;
    ino(n.left); vals.push(n.val); ino(n.right);
  };
  ino(root);
  const dummy = new TreeNode();
  let cur = dummy;
  for (const v of vals) { cur.right = new TreeNode(v); cur = cur.right; }
  return dummy.right;
}`,
      },
    ],
    runner: {
      entry: "increasingBST",
      comparison: "deep",
      jsStarter: `function increasingBST(level) {
  // 'level' is the BST as a level-order array; return the right-leaning chain as a level-order array.
  // TODO: implement
}`,
      jsReference: `function increasingBST(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  function ser(r) {
    if (!r) return [];
    const out = [], q = [r];
    while (q.length) { const n = q.shift(); if (n) { out.push(n.val); q.push(n.left); q.push(n.right); } else out.push(null); }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  const vals = [];
  (function ino(n) { if (!n) return; ino(n.left); vals.push(n.val); ino(n.right); })(build(level));
  const dummy = { val: 0, left: null, right: null };
  let cur = dummy;
  for (const v of vals) { cur.right = { val: v, left: null, right: null }; cur = cur.right; }
  return ser(dummy.right);
}`,
    },
    tests: [
      { name: "three nodes", args: [[2, 1, 3]], expected: [1, null, 2, null, 3] },
      { name: "with inner", args: [[3, 1, 4, null, 2]], expected: [1, null, 2, null, 3, null, 4] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "balanced", args: [[5, 1, 7]], expected: [1, null, 5, null, 7] },
    ],
  },
  {
    id: 958,
    slug: "check-completeness-of-a-binary-tree",
    title: "Check Completeness of a Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS"],
    companies: ["meta", "amazon", "bytedance"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/check-completeness-of-a-binary-tree/",
    description:
      "A binary tree is complete when every level except possibly the last is fully filled and all nodes on the last level sit as far left as possible. Given the root, return true if the tree is complete and false otherwise.",
    examples: [
      { input: "root = [1,2,3,4,5,6]", output: "true" },
      { input: "root = [1,2,3,4,5,null,7]", output: "false", explanation: "There is a gap before the node 7." },
    ],
    intuition:
      "Run a breadth-first sweep that enqueues children including the empty slots. In a complete tree, once you encounter the first missing child, no real node may appear afterward — so a real node seen after a gap proves incompleteness.",
    approach: [
      "BFS from the root, pushing both children (even null) of each real node.",
      "Track whether a null slot has been seen.",
      "If a non-null node appears after a null slot, return false.",
      "Otherwise the tree is complete.",
    ],
    complexity: { time: "O(n)", space: "O(w)", note: "w = maximum width." },
    solutions: [
      {
        language: "python",
        label: "BFS gap check",
        code: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def is_complete_tree(root: TreeNode) -> bool:
    q = deque([root])
    seen_null = False
    while q:
        node = q.popleft()
        if node is None:
            seen_null = True
        else:
            if seen_null:
                return False
            q.append(node.left)
            q.append(node.right)
    return True`,
      },
      {
        language: "typescript",
        label: "BFS gap check",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function isCompleteTree(root: TreeNode | null): boolean {
  const q: (TreeNode | null)[] = [root];
  let seenNull = false;
  while (q.length) {
    const node = q.shift()!;
    if (node === null) seenNull = true;
    else {
      if (seenNull) return false;
      q.push(node.left);
      q.push(node.right);
    }
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "isCompleteTree",
      comparison: "deep",
      jsStarter: `function isCompleteTree(level) {
  // 'level' is the tree as a level-order array; return whether the tree is complete.
  // TODO: implement
}`,
      jsReference: `function isCompleteTree(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  const q = [build(level)];
  let seenNull = false;
  while (q.length) {
    const node = q.shift();
    if (node === null) seenNull = true;
    else {
      if (seenNull) return false;
      q.push(node.left);
      q.push(node.right);
    }
  }
  return true;
}`,
    },
    tests: [
      { name: "complete", args: [[1, 2, 3, 4, 5, 6]], expected: true },
      { name: "gap", args: [[1, 2, 3, 4, 5, null, 7]], expected: false },
      { name: "empty", args: [[]], expected: true },
      { name: "single", args: [[1]], expected: true },
    ],
  },
  {
    id: 1008,
    slug: "construct-binary-search-tree-from-preorder-traversal",
    title: "Construct Binary Search Tree from Preorder Traversal",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BST", "Recursion", "Monotonic"],
    companies: ["amazon", "microsoft", "adobe"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
    description:
      "Given the preorder traversal of a binary search tree (all values distinct), rebuild the tree and return it as a level-order array. The first value is always the root, followed by its left subtree then its right subtree.",
    examples: [
      { input: "preorder = [8,5,1,7,10,12]", output: "[8,5,10,1,7,null,12]" },
      { input: "preorder = [2,1,3]", output: "[2,1,3]" },
    ],
    intuition:
      "In preorder the root comes first, and BST ordering tells you where each subsequent value belongs. Carry an upper bound while consuming values: anything below the current node and within bounds goes left, then values up to the inherited bound go right.",
    approach: [
      "Use a moving index over the preorder list and a recursive bound.",
      "If the next value exceeds the bound, that subtree is empty.",
      "Otherwise take the value as a node, build its left with the node's value as bound, then its right with the inherited bound.",
      "Serialize the tree to a trimmed level-order array.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Each value consumed once." },
    solutions: [
      {
        language: "python",
        label: "Bounded recursion",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def bst_from_preorder(preorder: list[int]) -> TreeNode:
    i = 0
    def build(bound):
        nonlocal i
        if i == len(preorder) or preorder[i] > bound:
            return None
        node = TreeNode(preorder[i]); i += 1
        node.left = build(node.val)
        node.right = build(bound)
        return node
    return build(float('inf'))`,
      },
      {
        language: "typescript",
        label: "Bounded recursion",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function bstFromPreorder(preorder: number[]): TreeNode | null {
  let i = 0;
  const build = (bound: number): TreeNode | null => {
    if (i === preorder.length || preorder[i] > bound) return null;
    const node = new TreeNode(preorder[i++]);
    node.left = build(node.val);
    node.right = build(bound);
    return node;
  };
  return build(Infinity);
}`,
      },
    ],
    runner: {
      entry: "bstFromPreorder",
      comparison: "deep",
      jsStarter: `function bstFromPreorder(preorder) {
  // 'preorder' is the preorder value list; return the BST as a trimmed level-order array.
  // TODO: implement
}`,
      jsReference: `function bstFromPreorder(preorder) {
  function ser(r) {
    if (!r) return [];
    const out = [], q = [r];
    while (q.length) { const n = q.shift(); if (n) { out.push(n.val); q.push(n.left); q.push(n.right); } else out.push(null); }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  let i = 0;
  function build(bound) {
    if (i === preorder.length || preorder[i] > bound) return null;
    const node = { val: preorder[i++], left: null, right: null };
    node.left = build(node.val);
    node.right = build(bound);
    return node;
  }
  return ser(build(Infinity));
}`,
    },
    tests: [
      { name: "example", args: [[8, 5, 1, 7, 10, 12]], expected: [8, 5, 10, 1, 7, null, 12] },
      { name: "tiny", args: [[2, 1, 3]], expected: [2, 1, 3] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "mixed", args: [[5, 3, 4, 8, 6, 9]], expected: [5, 3, 8, null, 4, 6, 9] },
    ],
  },
  {
    id: 250,
    slug: "count-univalue-subtrees",
    title: "Count Univalue Subtrees",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Postorder"],
    companies: ["amazon", "microsoft"],
    frequency: 34,
    leetcodeUrl: "https://leetcode.com/problems/count-univalue-subtrees/",
    premium: true,
    description:
      "Given a binary tree, count the number of univalue subtrees — subtrees in which every node shares the same value. A single leaf counts as a univalue subtree.",
    examples: [
      { input: "root = [5,1,5,5,5,null,5]", output: "4" },
      { input: "root = [1,1,1]", output: "3" },
    ],
    intuition:
      "A subtree is univalue exactly when both children are univalue and any existing child shares the node's value. Post-order DFS lets each node report whether its subtree is univalue, incrementing a counter whenever the condition holds.",
    approach: [
      "DFS returns whether a subtree is univalue; an empty subtree is trivially univalue.",
      "A node fails if either child fails or a child's value differs.",
      "Increment the counter when the node's subtree qualifies.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Single post-order pass." },
    solutions: [
      {
        language: "python",
        label: "Postorder",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def count_unival_subtrees(root: TreeNode) -> int:
    count = 0
    def dfs(n):
        nonlocal count
        if not n:
            return True
        l, r = dfs(n.left), dfs(n.right)
        if not l or not r:
            return False
        if n.left and n.left.val != n.val:
            return False
        if n.right and n.right.val != n.val:
            return False
        count += 1
        return True
    dfs(root)
    return count`,
      },
      {
        language: "typescript",
        label: "Postorder",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function countUnivalSubtrees(root: TreeNode | null): number {
  let count = 0;
  const dfs = (n: TreeNode | null): boolean => {
    if (!n) return true;
    const l = dfs(n.left), r = dfs(n.right);
    if (!l || !r) return false;
    if (n.left && n.left.val !== n.val) return false;
    if (n.right && n.right.val !== n.val) return false;
    count++;
    return true;
  };
  dfs(root);
  return count;
}`,
      },
    ],
    runner: {
      entry: "countUnivalSubtrees",
      comparison: "deep",
      jsStarter: `function countUnivalSubtrees(level) {
  // 'level' is the tree as a level-order array; return the number of univalue subtrees.
  // TODO: implement
}`,
      jsReference: `function countUnivalSubtrees(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  let count = 0;
  (function dfs(n) {
    if (!n) return true;
    const l = dfs(n.left), r = dfs(n.right);
    if (!l || !r) return false;
    if (n.left && n.left.val !== n.val) return false;
    if (n.right && n.right.val !== n.val) return false;
    count++;
    return true;
  })(build(level));
  return count;
}`,
    },
    tests: [
      { name: "mixed", args: [[5, 1, 5, 5, 5, null, 5]], expected: 4 },
      { name: "all same", args: [[1, 1, 1]], expected: 3 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "partial", args: [[2, 2, 2, 5, 2]], expected: 3 },
    ],
  },
  {
    id: 99,
    slug: "recover-binary-search-tree",
    title: "Recover Binary Search Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BST", "Inorder"],
    companies: ["amazon", "microsoft", "google", "bloomberg"],
    frequency: 53,
    leetcodeUrl: "https://leetcode.com/problems/recover-binary-search-tree/",
    description:
      "Exactly two nodes of a binary search tree had their values swapped by mistake. Without changing the tree's structure, restore it to a valid BST and return the corrected tree as a level-order array.",
    examples: [
      { input: "root = [1,3,null,null,2]", output: "[3,1,null,null,2]" },
      { input: "root = [3,1,4,null,null,2]", output: "[2,1,4,null,null,3]" },
    ],
    intuition:
      "An in-order walk of a correct BST is strictly increasing, so the swap creates one or two descents. The first descent's larger node and the last descent's smaller node are the culprits; swapping their values back repairs the tree.",
    approach: [
      "Run an in-order traversal tracking the previous node.",
      "On a descent (prev.val > node.val), record the first offender once and always update the second.",
      "Swap the two offenders' values.",
      "Serialize the repaired tree to a trimmed level-order array.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "In-order traversal." },
    solutions: [
      {
        language: "python",
        label: "Inorder swap",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def recover_tree(root: TreeNode) -> None:
    first = second = prev = None
    def ino(n):
        nonlocal first, second, prev
        if not n:
            return
        ino(n.left)
        if prev and prev.val > n.val:
            if not first:
                first = prev
            second = n
        prev = n
        ino(n.right)
    ino(root)
    if first and second:
        first.val, second.val = second.val, first.val`,
      },
      {
        language: "typescript",
        label: "Inorder swap",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function recoverTree(root: TreeNode | null): void {
  let first: TreeNode | null = null, second: TreeNode | null = null, prev: TreeNode | null = null;
  const ino = (n: TreeNode | null): void => {
    if (!n) return;
    ino(n.left);
    if (prev && prev.val > n.val) {
      if (!first) first = prev;
      second = n;
    }
    prev = n;
    ino(n.right);
  };
  ino(root);
  if (first && second) {
    const t = first.val; first.val = second.val; second.val = t;
  }
}`,
      },
    ],
    runner: {
      entry: "recoverTree",
      comparison: "deep",
      jsStarter: `function recoverTree(level) {
  // 'level' is the corrupted BST as a level-order array; return the repaired level-order array.
  // TODO: implement
}`,
      jsReference: `function recoverTree(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root]; let i = 1;
    while (q.length && i < arr.length) {
      const n = q.shift();
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.left = { val: v, left: null, right: null }; q.push(n.left); } }
      if (i < arr.length) { const v = arr[i++]; if (v !== null) { n.right = { val: v, left: null, right: null }; q.push(n.right); } }
    }
    return root;
  }
  function ser(r) {
    if (!r) return [];
    const out = [], q = [r];
    while (q.length) { const n = q.shift(); if (n) { out.push(n.val); q.push(n.left); q.push(n.right); } else out.push(null); }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  const root = build(level);
  let first = null, second = null, prev = null;
  (function ino(n) {
    if (!n) return;
    ino(n.left);
    if (prev && prev.val > n.val) { if (!first) first = prev; second = n; }
    prev = n;
    ino(n.right);
  })(root);
  if (first && second) { const t = first.val; first.val = second.val; second.val = t; }
  return ser(root);
}`,
    },
    tests: [
      { name: "adjacent", args: [[1, 3, null, null, 2]], expected: [3, 1, null, null, 2] },
      { name: "separated", args: [[3, 1, 4, null, null, 2]], expected: [2, 1, 4, null, null, 3] },
      { name: "root swap", args: [[2, 3, 1]], expected: [2, 1, 3] },
      { name: "two nodes", args: [[1, 2]], expected: [2, 1] },
    ],
  },
  {
    id: 1804,
    slug: "implement-trie-ii-prefix-tree",
    title: "Implement Trie II (Prefix Tree)",
    difficulty: "Medium",
    category: "tries",
    patterns: ["Trie", "Design"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/implement-trie-ii-prefix-tree/",
    premium: true,
    description:
      "Design a trie that supports counting. Implement insert(word), countWordsEqualTo(word) (how many times the exact word was inserted), countWordsStartingWith(prefix) (how many stored words share the prefix), and erase(word) (remove one inserted copy). The playground replays an operation list and grades the returned results, using null for void operations.",
    examples: [
      {
        input: 'ops = ["Trie","insert","insert","countWordsEqualTo","countWordsStartingWith","erase","countWordsEqualTo","countWordsStartingWith"], args = [[],["apple"],["apple"],["apple"],["app"],["apple"],["apple"],["app"]]',
        output: "[null,null,null,2,2,null,1,1]",
      },
    ],
    intuition:
      "Augment a standard trie with two counters per node: how many words pass through it (for prefix queries) and how many words end exactly there (for equality queries). Insert increments along the path; erase decrements and prunes dead branches.",
    approach: [
      "Each node tracks a prefix count and a word-end count.",
      "insert walks the characters, bumping each visited node's prefix count, then bumps the terminal node's end count.",
      "countWordsEqualTo / countWordsStartingWith walk the path and read end / prefix counts (0 if the path is absent).",
      "erase decrements prefix counts, pruning a child once its count hits zero, and decrements the terminal end count.",
    ],
    complexity: { time: "O(L) per op", space: "O(total chars)", note: "L = word/prefix length." },
    solutions: [
      {
        language: "python",
        label: "Counting trie",
        code: `class Trie:
    def __init__(self):
        self.ch: dict = {}
        self.pre = 0
        self.end = 0

    def insert(self, word: str) -> None:
        node = self
        for c in word:
            node = node.ch.setdefault(c, Trie())
            node.pre += 1
        node.end += 1

    def _find(self, s: str):
        node = self
        for c in s:
            if c not in node.ch:
                return None
            node = node.ch[c]
        return node

    def countWordsEqualTo(self, word: str) -> int:
        n = self._find(word)
        return n.end if n else 0

    def countWordsStartingWith(self, prefix: str) -> int:
        n = self._find(prefix)
        return n.pre if n else 0

    def erase(self, word: str) -> None:
        node = self
        for c in word:
            child = node.ch[c]
            child.pre -= 1
            if child.pre == 0:
                del node.ch[c]
                return
            node = child
        node.end -= 1`,
      },
      {
        language: "typescript",
        label: "Counting trie",
        code: `class TrieNode {
  ch: Record<string, TrieNode> = {};
  pre = 0;
  end = 0;
}

class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const c of word) { node = (node.ch[c] ??= new TrieNode()); node.pre++; }
    node.end++;
  }

  private find(s: string): TrieNode | null {
    let node = this.root;
    for (const c of s) { if (!node.ch[c]) return null; node = node.ch[c]; }
    return node;
  }

  countWordsEqualTo(word: string): number {
    const n = this.find(word);
    return n ? n.end : 0;
  }

  countWordsStartingWith(prefix: string): number {
    const n = this.find(prefix);
    return n ? n.pre : 0;
  }

  erase(word: string): void {
    let node = this.root;
    for (const c of word) {
      const child = node.ch[c];
      child.pre--;
      if (child.pre === 0) { delete node.ch[c]; return; }
      node = child;
    }
    node.end--;
  }
}`,
      },
    ],
    runner: {
      entry: "runTrie",
      comparison: "deep",
      jsStarter: `function runTrie(ops, args) {
  // Replay the operations and return an array of results (null for void ops).
  // TODO: implement the counting Trie and the driver loop.
}`,
      jsReference: `function runTrie(ops, args) {
  function node() { return { ch: {}, pre: 0, end: 0 }; }
  const root = node();
  function insert(w) { let n = root; for (const c of w) { n = (n.ch[c] ||= node()); n.pre++; } n.end++; }
  function find(s) { let n = root; for (const c of s) { if (!n.ch[c]) return null; n = n.ch[c]; } return n; }
  function countEq(w) { const n = find(w); return n ? n.end : 0; }
  function countPre(p) { const n = find(p); return n ? n.pre : 0; }
  function erase(w) { let n = root; for (const c of w) { const child = n.ch[c]; child.pre--; if (child.pre === 0) { delete n.ch[c]; return; } n = child; } n.end--; }
  const out = [];
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i], a = args[i] || [];
    if (op === "Trie") out.push(null);
    else if (op === "insert") { insert(a[0]); out.push(null); }
    else if (op === "countWordsEqualTo") out.push(countEq(a[0]));
    else if (op === "countWordsStartingWith") out.push(countPre(a[0]));
    else if (op === "erase") { erase(a[0]); out.push(null); }
  }
  return out;
}`,
    },
    tests: [
      {
        name: "counting apple/app",
        args: [
          ["Trie", "insert", "insert", "countWordsEqualTo", "countWordsStartingWith", "erase", "countWordsEqualTo", "countWordsStartingWith"],
          [[], ["apple"], ["apple"], ["apple"], ["app"], ["apple"], ["apple"], ["app"]],
        ],
        expected: [null, null, null, 2, 2, null, 1, 1],
      },
      {
        name: "prune branch",
        args: [
          ["Trie", "insert", "countWordsStartingWith", "erase", "countWordsStartingWith"],
          [[], ["abc"], ["a"], ["abc"], ["a"]],
        ],
        expected: [null, null, 1, null, 0],
      },
      {
        name: "shared prefix",
        args: [
          ["Trie", "insert", "insert", "countWordsEqualTo", "erase", "countWordsEqualTo", "countWordsStartingWith"],
          [[], ["cat"], ["car"], ["cat"], ["cat"], ["cat"], ["ca"]],
        ],
        expected: [null, null, null, 1, null, 0, 1],
      },
    ],
  },
  {
    id: 676,
    slug: "implement-magic-dictionary",
    title: "Implement Magic Dictionary",
    difficulty: "Medium",
    category: "tries",
    patterns: ["Trie", "Design", "Hash Map"],
    companies: ["amazon", "google"],
    frequency: 33,
    leetcodeUrl: "https://leetcode.com/problems/implement-magic-dictionary/",
    description:
      "Design a dictionary that, after being built from a list of distinct words, answers search(word): return true only if changing exactly one character of the queried word produces a word that is in the dictionary. The playground replays an operation list and grades the returned results, using null for void operations.",
    examples: [
      {
        input: 'ops = ["MagicDictionary","buildDict","search","search","search","search"], args = [[],[["hello","leetcode"]],["hello"],["hhllo"],["hell"],["leetcoded"]]',
        output: "[null,null,false,true,false,false]",
      },
    ],
    intuition:
      "A match requires exactly one differing character against a stored word of the same length. Comparing the query against each same-length dictionary word and counting mismatches answers the question directly and is easy to get right.",
    approach: [
      "buildDict stores the given word list.",
      "search compares the query to each stored word of equal length.",
      "Count differing positions; return true the moment a word differs in exactly one spot.",
      "If no such word exists, return false.",
    ],
    complexity: { time: "O(n·L) per search", space: "O(n·L)", note: "n words of length L." },
    solutions: [
      {
        language: "python",
        label: "Mismatch scan",
        code: `class MagicDictionary:
    def __init__(self):
        self.words: list[str] = []

    def buildDict(self, dictionary: list[str]) -> None:
        self.words = dictionary

    def search(self, word: str) -> bool:
        for d in self.words:
            if len(d) != len(word):
                continue
            diff = sum(1 for a, b in zip(d, word) if a != b)
            if diff == 1:
                return True
        return False`,
      },
      {
        language: "typescript",
        label: "Mismatch scan",
        code: `class MagicDictionary {
  private words: string[] = [];

  buildDict(dictionary: string[]): void {
    this.words = dictionary;
  }

  search(word: string): boolean {
    for (const d of this.words) {
      if (d.length !== word.length) continue;
      let diff = 0;
      for (let k = 0; k < word.length; k++) if (d[k] !== word[k]) diff++;
      if (diff === 1) return true;
    }
    return false;
  }
}`,
      },
    ],
    runner: {
      entry: "runMagic",
      comparison: "deep",
      jsStarter: `function runMagic(ops, args) {
  // Replay the operations and return an array of results (null for void ops).
  // TODO: implement the magic dictionary and the driver loop.
}`,
      jsReference: `function runMagic(ops, args) {
  let dict = [];
  const out = [];
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i], a = args[i] || [];
    if (op === "MagicDictionary") out.push(null);
    else if (op === "buildDict") { dict = a[0]; out.push(null); }
    else if (op === "search") {
      const w = a[0]; let ok = false;
      for (const d of dict) {
        if (d.length !== w.length) continue;
        let diff = 0;
        for (let k = 0; k < w.length; k++) if (d[k] !== w[k]) diff++;
        if (diff === 1) { ok = true; break; }
      }
      out.push(ok);
    }
  }
  return out;
}`,
    },
    tests: [
      {
        name: "hello example",
        args: [
          ["MagicDictionary", "buildDict", "search", "search", "search", "search"],
          [[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]],
        ],
        expected: [null, null, false, true, false, false],
      },
      {
        name: "one-letter swaps",
        args: [
          ["MagicDictionary", "buildDict", "search", "search", "search"],
          [[], [["cat", "bat", "rat"]], ["fat"], ["dog"], ["cat"]],
        ],
        expected: [null, null, true, false, true],
      },
      {
        name: "no exact reuse",
        args: [
          ["MagicDictionary", "buildDict", "search"],
          [[], [["abc"]], ["abc"]],
        ],
        expected: [null, null, false],
      },
    ],
  },
];

export default batchW;
