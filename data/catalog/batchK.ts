import type { Problem } from "../types.ts";

/**
 * Batch K — twenty tree, trie, and heap problems. Tree problems take a LeetCode
 * level-order array (with `null` for missing children) and build the tree inside
 * `runner.jsReference`; results that are themselves trees are returned as a
 * trimmed level-order array. Every runner is hand-verified against its tests.
 */
export const batchK: Problem[] = [
  {
    id: 94,
    slug: "binary-tree-inorder-traversal",
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion", "Stack"],
    companies: ["amazon", "microsoft", "google", "apple"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    description:
      "Return the values of a binary tree visited in inorder (left subtree, node, right subtree). The playground supplies the tree as a level-order array with `null` for absent children.",
    examples: [
      { input: "root = [1,null,2,3]", output: "[1,3,2]" },
      { input: "root = []", output: "[]" },
    ],
    intuition:
      "Inorder visits the left subtree completely, then the current node, then the right subtree. Expressed recursively that ordering falls straight out of the call sequence: recurse left, record the value, recurse right.",
    approach: [
      "Build the tree from the level-order array.",
      "Recurse into the left child first.",
      "Append the current node's value.",
      "Recurse into the right child.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Visits every node once; recursion stack is the tree height h." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root: TreeNode | None) -> list[int]:
    out: list[int] = []
    def go(node: TreeNode | None) -> None:
        if not node:
            return
        go(node.left)
        out.append(node.val)
        go(node.right)
    go(root)
    return out`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function inorderTraversal(root: TreeNode | null): number[] {
  const out: number[] = [];
  const go = (n: TreeNode | null): void => {
    if (!n) return;
    go(n.left);
    out.push(n.val);
    go(n.right);
  };
  go(root);
  return out;
}`,
      },
    ],
    runner: {
      entry: "inorderTraversal",
      comparison: "deep",
      jsStarter: `function inorderTraversal(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return the inorder list.
}`,
      jsReference: `function inorderTraversal(level) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  const root = build(level);
  const out = [];
  (function go(n){ if(!n) return; go(n.left); out.push(n.val); go(n.right); })(root);
  return out;
}`,
    },
    tests: [
      { name: "right lean", args: [[1, null, 2, 3]], expected: [1, 3, 2] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "full-ish", args: [[1, 2, 3, 4, 5]], expected: [4, 2, 5, 1, 3] },
    ],
    hints: ["Left, node, right.", "Recursion mirrors the definition exactly."],
    relatedIds: [144, 145, 102],
  },
  {
    id: 144,
    slug: "binary-tree-preorder-traversal",
    title: "Binary Tree Preorder Traversal",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion", "Stack"],
    companies: ["amazon", "microsoft", "google"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
    description:
      "Return the values of a binary tree visited in preorder (node first, then left subtree, then right subtree). The tree arrives as a level-order array using `null` for missing children.",
    examples: [
      { input: "root = [1,null,2,3]", output: "[1,2,3]" },
      { input: "root = [1,2,3,4,5]", output: "[1,2,4,5,3]" },
    ],
    intuition:
      "Preorder records a node before exploring either of its subtrees. The current value is emitted on entry, then the same rule applies recursively to the left subtree and afterwards to the right subtree.",
    approach: [
      "Build the tree from the level-order array.",
      "Append the current node's value.",
      "Recurse left, then recurse right.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "One visit per node; stack depth is tree height h." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def preorder_traversal(root) -> list[int]:
    out: list[int] = []
    def go(node) -> None:
        if not node:
            return
        out.append(node.val)
        go(node.left)
        go(node.right)
    go(root)
    return out`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function preorderTraversal(root: TreeNode | null): number[] {
  const out: number[] = [];
  const go = (n: TreeNode | null): void => {
    if (!n) return;
    out.push(n.val);
    go(n.left);
    go(n.right);
  };
  go(root);
  return out;
}`,
      },
    ],
    runner: {
      entry: "preorderTraversal",
      comparison: "deep",
      jsStarter: `function preorderTraversal(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return the preorder list.
}`,
      jsReference: `function preorderTraversal(level) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  const root = build(level);
  const out = [];
  (function go(n){ if(!n) return; out.push(n.val); go(n.left); go(n.right); })(root);
  return out;
}`,
    },
    tests: [
      { name: "right lean", args: [[1, null, 2, 3]], expected: [1, 2, 3] },
      { name: "full-ish", args: [[1, 2, 3, 4, 5]], expected: [1, 2, 4, 5, 3] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[1]], expected: [1] },
    ],
    hints: ["Emit the node before descending.", "Left subtree before right."],
    relatedIds: [94, 145, 589],
  },
  {
    id: 145,
    slug: "binary-tree-postorder-traversal",
    title: "Binary Tree Postorder Traversal",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion", "Stack"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-postorder-traversal/",
    description:
      "Return the values of a binary tree visited in postorder (both subtrees before the node). The tree is provided as a level-order array with `null` for absent children.",
    examples: [
      { input: "root = [1,null,2,3]", output: "[3,2,1]" },
      { input: "root = [1,2,3,4,5]", output: "[4,5,2,3,1]" },
    ],
    intuition:
      "Postorder defers a node until after both of its subtrees have been fully processed. Recurse left, recurse right, and only then record the current value — the node is always the last of its subtree to be emitted.",
    approach: [
      "Build the tree from the level-order array.",
      "Recurse left, then recurse right.",
      "Append the current node's value after both children.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Each node visited once; recursion depth is height h." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def postorder_traversal(root) -> list[int]:
    out: list[int] = []
    def go(node) -> None:
        if not node:
            return
        go(node.left)
        go(node.right)
        out.append(node.val)
    go(root)
    return out`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function postorderTraversal(root: TreeNode | null): number[] {
  const out: number[] = [];
  const go = (n: TreeNode | null): void => {
    if (!n) return;
    go(n.left);
    go(n.right);
    out.push(n.val);
  };
  go(root);
  return out;
}`,
      },
    ],
    runner: {
      entry: "postorderTraversal",
      comparison: "deep",
      jsStarter: `function postorderTraversal(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return the postorder list.
}`,
      jsReference: `function postorderTraversal(level) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  const root = build(level);
  const out = [];
  (function go(n){ if(!n) return; go(n.left); go(n.right); out.push(n.val); })(root);
  return out;
}`,
    },
    tests: [
      { name: "right lean", args: [[1, null, 2, 3]], expected: [3, 2, 1] },
      { name: "full-ish", args: [[1, 2, 3, 4, 5]], expected: [4, 5, 2, 3, 1] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[1]], expected: [1] },
    ],
    hints: ["Children before the parent.", "The root is always last."],
    relatedIds: [94, 144, 590],
  },
  {
    id: 103,
    slug: "binary-tree-zigzag-level-order-traversal",
    title: "Binary Tree Zigzag Level Order Traversal",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS", "Queue"],
    companies: ["amazon", "microsoft", "meta", "bloomberg", "linkedin"],
    frequency: 71,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    description:
      "Return the level-order values of a binary tree, but alternate direction per level: the first level left-to-right, the next right-to-left, and so on. The tree is a level-order array with `null` for missing children.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[20,9],[15,7]]" },
      { input: "root = [1]", output: "[[1]]" },
    ],
    intuition:
      "Process the tree level by level with a breadth-first sweep. Collect each level left-to-right as usual, then simply reverse the rows that fall on odd levels to produce the boustrophedon (zigzag) ordering.",
    approach: [
      "Build the tree and run a BFS keeping nodes grouped per level.",
      "Track a direction flag that flips after every level.",
      "Append the level's values forwards or reversed based on the flag.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Every node is enqueued once; the output holds all n values." },
    solutions: [
      {
        language: "python",
        label: "BFS",
        code: `from collections import deque

def zigzag_level_order(root) -> list[list[int]]:
    if not root:
        return []
    res, q, ltr = [], deque([root]), True
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level if ltr else level[::-1])
        ltr = not ltr
    return res`,
      },
      {
        language: "typescript",
        label: "BFS",
        code: `function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  let q: TreeNode[] = [root];
  let ltr = true;
  while (q.length) {
    const vals: number[] = [];
    const next: TreeNode[] = [];
    for (const n of q) {
      vals.push(n.val);
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    res.push(ltr ? vals : vals.reverse());
    ltr = !ltr;
    q = next;
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "zigzagLevelOrder",
      comparison: "deep",
      jsStarter: `function zigzagLevelOrder(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return the zigzag level order.
}`,
      jsReference: `function zigzagLevelOrder(level) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  const root = build(level);
  if (!root) return [];
  const res = [];
  let q = [root];
  let ltr = true;
  while (q.length) {
    const vals = [];
    const next = [];
    for (const n of q) { vals.push(n.val); if (n.left) next.push(n.left); if (n.right) next.push(n.right); }
    res.push(ltr ? vals : vals.reverse());
    ltr = !ltr;
    q = next;
  }
  return res;
}`,
    },
    tests: [
      { name: "classic", args: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [20, 9], [15, 7]] },
      { name: "single", args: [[1]], expected: [[1]] },
      { name: "empty", args: [[]], expected: [] },
      { name: "three levels", args: [[1, 2, 3, 4, 5, null, 6]], expected: [[1], [3, 2], [4, 5, 6]] },
    ],
    hints: ["BFS gives natural level grouping.", "Reverse the odd-indexed rows."],
    relatedIds: [102, 107, 199],
  },
  {
    id: 107,
    slug: "binary-tree-level-order-traversal-ii",
    title: "Binary Tree Level Order Traversal II",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS", "Queue"],
    companies: ["amazon", "microsoft", "google"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal-ii/",
    description:
      "Return the level-order values of a binary tree from the bottom level up to the root, with each level read left-to-right. The tree is a level-order array using `null` for absent children.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[15,7],[9,20],[3]]" },
      { input: "root = [1]", output: "[[1]]" },
    ],
    intuition:
      "This is ordinary level-order traversal with one extra step. Gather the rows top-down with BFS exactly as usual, then reverse the list of rows so the deepest level comes first and the root's level comes last.",
    approach: [
      "Build the tree and BFS level by level, recording each row left-to-right.",
      "Collect all rows in top-down order.",
      "Reverse the collected rows before returning.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Standard BFS; the final reverse is linear." },
    solutions: [
      {
        language: "python",
        label: "BFS",
        code: `from collections import deque

def level_order_bottom(root) -> list[list[int]]:
    if not root:
        return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level)
    return res[::-1]`,
      },
      {
        language: "typescript",
        label: "BFS",
        code: `function levelOrderBottom(root: TreeNode | null): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  let q: TreeNode[] = [root];
  while (q.length) {
    const vals: number[] = [];
    const next: TreeNode[] = [];
    for (const n of q) {
      vals.push(n.val);
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    res.push(vals);
    q = next;
  }
  return res.reverse();
}`,
      },
    ],
    runner: {
      entry: "levelOrderBottom",
      comparison: "deep",
      jsStarter: `function levelOrderBottom(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return the bottom-up level order.
}`,
      jsReference: `function levelOrderBottom(level) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  const root = build(level);
  if (!root) return [];
  const res = [];
  let q = [root];
  while (q.length) {
    const vals = [];
    const next = [];
    for (const n of q) { vals.push(n.val); if (n.left) next.push(n.left); if (n.right) next.push(n.right); }
    res.push(vals);
    q = next;
  }
  return res.reverse();
}`,
    },
    tests: [
      { name: "classic", args: [[3, 9, 20, null, null, 15, 7]], expected: [[15, 7], [9, 20], [3]] },
      { name: "single", args: [[1]], expected: [[1]] },
      { name: "empty", args: [[]], expected: [] },
      { name: "three levels", args: [[1, 2, 3, 4, 5, null, 6]], expected: [[4, 5, 6], [2, 3], [1]] },
    ],
    hints: ["Build top-down first.", "Reverse the rows at the end."],
    relatedIds: [102, 103, 199],
  },
  {
    id: 108,
    slug: "convert-sorted-array-to-binary-search-tree",
    title: "Convert Sorted Array to Binary Search Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["Divide and Conquer", "Recursion", "BST"],
    companies: ["amazon", "google", "microsoft", "apple", "bloomberg"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
    description:
      "Given an integer array sorted in ascending order, build a height-balanced binary search tree and return it as a level-order array. To make the result deterministic, always choose the middle element (lower-middle for even spans) as the subtree root.",
    examples: [
      { input: "nums = [-10,-3,0,5,9]", output: "[0,-10,5,null,-3,null,9]" },
      { input: "nums = [1,3]", output: "[1,null,3]" },
    ],
    intuition:
      "A balanced BST puts the median at the root so both halves carry equal weight. Picking the middle index (deterministically the lower-middle) as the root and recursing on the left and right slices keeps every subtree balanced and preserves BST order automatically.",
    approach: [
      "Define a helper over an index range [lo, hi].",
      "Pick mid = floor((lo + hi) / 2) as the subtree root.",
      "Recurse on [lo, mid - 1] for the left child and [mid + 1, hi] for the right.",
      "Serialize the finished tree to a trimmed level-order array.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each element becomes one node; output array holds the tree." },
    solutions: [
      {
        language: "python",
        label: "Divide & Conquer",
        code: `def sorted_array_to_bst(nums: list[int]):
    def build(lo: int, hi: int):
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        node = TreeNode(nums[mid])
        node.left = build(lo, mid - 1)
        node.right = build(mid + 1, hi)
        return node
    return build(0, len(nums) - 1)`,
      },
      {
        language: "typescript",
        label: "Divide & Conquer",
        code: `function sortedArrayToBST(nums: number[]): TreeNode | null {
  const build = (lo: number, hi: number): TreeNode | null => {
    if (lo > hi) return null;
    const mid = Math.floor((lo + hi) / 2);
    const node = new TreeNode(nums[mid]);
    node.left = build(lo, mid - 1);
    node.right = build(mid + 1, hi);
    return node;
  };
  return build(0, nums.length - 1);
}`,
      },
    ],
    runner: {
      entry: "sortedArrayToBST",
      comparison: "deep",
      jsStarter: `function sortedArrayToBST(nums) {
  // Build a balanced BST (pick the lower-middle as each root) and
  // return it as a trimmed level-order array.
}`,
      jsReference: `function sortedArrayToBST(nums) {
  function build(lo, hi){ if(lo>hi) return null; const mid=Math.floor((lo+hi)/2); const node={val:nums[mid],left:null,right:null}; node.left=build(lo,mid-1); node.right=build(mid+1,hi); return node; }
  function ser(root){ if(!root) return []; const out=[]; const q=[root]; while(q.length){ const n=q.shift(); if(n){ out.push(n.val); q.push(n.left); q.push(n.right);} else out.push(null);} while(out.length&&out[out.length-1]===null) out.pop(); return out; }
  return ser(build(0, nums.length - 1));
}`,
    },
    tests: [
      { name: "odd span", args: [[-10, -3, 0, 5, 9]], expected: [0, -10, 5, null, -3, null, 9] },
      { name: "two elements", args: [[1, 3]], expected: [1, null, 3] },
      { name: "perfect", args: [[1, 2, 3, 4, 5, 6, 7]], expected: [4, 2, 6, 1, 3, 5, 7] },
      { name: "single", args: [[0]], expected: [0] },
    ],
    hints: ["The median balances the halves.", "Recurse on the left and right slices."],
    relatedIds: [109, 1382],
  },
  {
    id: 114,
    slug: "flatten-binary-tree-to-linked-list",
    title: "Flatten Binary Tree to Linked List",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "microsoft", "meta", "google"],
    frequency: 69,
    leetcodeUrl: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
    description:
      "Flatten a binary tree into a right-leaning 'linked list' that follows preorder, where each node's left pointer is null and its right pointer is the next preorder node. The playground returns the resulting chain as the array of preorder values.",
    examples: [
      { input: "root = [1,2,5,3,4,null,6]", output: "[1,2,3,4,5,6]" },
      { input: "root = []", output: "[]" },
    ],
    intuition:
      "Flattening in place simply re-links the tree into the order a preorder walk would visit it. Since the resulting list is exactly the preorder sequence threaded through right pointers, its node values are precisely the preorder traversal.",
    approach: [
      "Build the tree from the level-order array.",
      "Run a preorder walk collecting node values.",
      "Return that ordered list (the flattened chain's values).",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Single preorder pass; stack depth equals tree height h." },
    solutions: [
      {
        language: "python",
        label: "Preorder",
        code: `def flatten(root) -> list[int]:
    out: list[int] = []
    def go(node) -> None:
        if not node:
            return
        out.append(node.val)
        go(node.left)
        go(node.right)
    go(root)
    return out`,
      },
      {
        language: "typescript",
        label: "Preorder",
        code: `function flatten(root: TreeNode | null): number[] {
  const out: number[] = [];
  const go = (n: TreeNode | null): void => {
    if (!n) return;
    out.push(n.val);
    go(n.left);
    go(n.right);
  };
  go(root);
  return out;
}`,
      },
    ],
    runner: {
      entry: "flatten",
      comparison: "deep",
      jsStarter: `function flatten(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return the flattened preorder values.
}`,
      jsReference: `function flatten(level) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  const root = build(level);
  const out = [];
  (function go(n){ if(!n) return; out.push(n.val); go(n.left); go(n.right); })(root);
  return out;
}`,
    },
    tests: [
      { name: "classic", args: [[1, 2, 5, 3, 4, null, 6]], expected: [1, 2, 3, 4, 5, 6] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[0]], expected: [0] },
      { name: "balanced", args: [[4, 2, 6, 1, 3, 5, 7]], expected: [4, 2, 1, 3, 6, 5, 7] },
    ],
    hints: ["The chain order is preorder.", "Right pointers thread the list."],
    relatedIds: [94, 144, 430],
  },
  {
    id: 124,
    slug: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "meta", "google", "microsoft", "apple", "bloomberg"],
    frequency: 80,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    description:
      "A path is any sequence of connected nodes that never repeats a node and need not pass through the root. Return the largest possible sum of node values over any such path. The tree is supplied as a level-order array with `null` for missing children.",
    examples: [
      { input: "root = [1,2,3]", output: "6", explanation: "The path 2 → 1 → 3 sums to 6." },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "The path 15 → 20 → 7 sums to 42." },
    ],
    intuition:
      "At each node the best path bending through it is the node plus the positive gains of its left and right subtrees. We track that 'through' value as a global maximum, but only return the larger single branch upward, because a parent can extend just one side of its child.",
    approach: [
      "Define gain(node) = node.val + max(0, gain(left), gain(right)).",
      "At each node, update the answer with node.val + max(0,left) + max(0,right).",
      "Clamp negative subtree gains to 0 so they are simply dropped.",
      "Return the global maximum after the DFS completes.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Visits each node once; recursion depth is height h." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def max_path_sum(root) -> int:
    best = float("-inf")
    def gain(node) -> int:
        nonlocal best
        if not node:
            return 0
        left = max(0, gain(node.left))
        right = max(0, gain(node.right))
        best = max(best, node.val + left + right)
        return node.val + max(left, right)
    gain(root)
    return best`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function maxPathSum(root: TreeNode | null): number {
  let best = -Infinity;
  const gain = (n: TreeNode | null): number => {
    if (!n) return 0;
    const left = Math.max(0, gain(n.left));
    const right = Math.max(0, gain(n.right));
    best = Math.max(best, n.val + left + right);
    return n.val + Math.max(left, right);
  };
  gain(root);
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxPathSum",
      comparison: "deep",
      jsStarter: `function maxPathSum(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return the maximum path sum.
}`,
      jsReference: `function maxPathSum(level) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  const root = build(level);
  let best = -Infinity;
  (function gain(n){ if(!n) return 0; const l=Math.max(0,gain(n.left)); const r=Math.max(0,gain(n.right)); best=Math.max(best, n.val+l+r); return n.val+Math.max(l,r); })(root);
  return best;
}`,
    },
    tests: [
      { name: "small", args: [[1, 2, 3]], expected: 6 },
      { name: "negative root", args: [[-10, 9, 20, null, null, 15, 7]], expected: 42 },
      { name: "single negative", args: [[-3]], expected: -3 },
      { name: "drop negative child", args: [[2, -1]], expected: 2 },
      { name: "all negative", args: [[-2, -1]], expected: -1 },
    ],
    hints: ["A subtree may contribute only one branch upward.", "Negative gains are clamped to zero."],
    relatedIds: [543, 687, 129],
  },
  {
    id: 129,
    slug: "sum-root-to-leaf-numbers",
    title: "Sum Root to Leaf Numbers",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "meta", "microsoft", "google"],
    frequency: 63,
    leetcodeUrl: "https://leetcode.com/problems/sum-root-to-leaf-numbers/",
    description:
      "Each root-to-leaf path spells a decimal number by concatenating the node digits along it. Return the sum of all those numbers. The tree arrives as a level-order array using `null` for absent children.",
    examples: [
      { input: "root = [1,2,3]", output: "25", explanation: "12 + 13 = 25." },
      { input: "root = [4,9,0,5,1]", output: "1026", explanation: "495 + 491 + 40 = 1026." },
    ],
    intuition:
      "Carry the running number down each path: entering a node multiplies the accumulated value by ten and adds the node's digit. When a leaf is reached the path number is complete, so add it to the total; internal nodes just pass the running value to their children.",
    approach: [
      "Build the tree from the level-order array.",
      "DFS with an accumulator cur = cur * 10 + node.val.",
      "At a leaf, add cur to the running total.",
      "Sum across every root-to-leaf path.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "One visit per node; recursion depth equals height h." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def sum_numbers(root) -> int:
    total = 0
    def dfs(node, cur) -> None:
        nonlocal total
        if not node:
            return
        cur = cur * 10 + node.val
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
        code: `function sumNumbers(root: TreeNode | null): number {
  let total = 0;
  const dfs = (n: TreeNode | null, cur: number): void => {
    if (!n) return;
    cur = cur * 10 + n.val;
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
      entry: "sumNumbers",
      comparison: "deep",
      jsStarter: `function sumNumbers(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return the sum of root-to-leaf numbers.
}`,
      jsReference: `function sumNumbers(level) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  const root = build(level);
  let total = 0;
  (function dfs(n, cur){ if(!n) return; cur = cur*10 + n.val; if(!n.left && !n.right){ total += cur; return; } dfs(n.left, cur); dfs(n.right, cur); })(root, 0);
  return total;
}`,
    },
    tests: [
      { name: "two paths", args: [[1, 2, 3]], expected: 25 },
      { name: "three paths", args: [[4, 9, 0, 5, 1]], expected: 1026 },
      { name: "single", args: [[0]], expected: 0 },
      { name: "one path", args: [[1, 2]], expected: 12 },
    ],
    hints: ["Carry the running number down.", "Only leaves contribute to the sum."],
    relatedIds: [112, 113, 124],
  },
  {
    id: 236,
    slug: "lowest-common-ancestor-of-a-binary-tree",
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "meta", "microsoft", "google", "apple", "linkedin"],
    frequency: 84,
    leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    description:
      "Given a binary tree (values are unique) and two target values p and q, return the value of their lowest common ancestor — the deepest node that has both targets in its subtree. The tree is a level-order array with `null` for missing children, and the entry is called as entry(root, p, q).",
    examples: [
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3" },
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4", output: "5", explanation: "Node 5 is an ancestor of 4." },
    ],
    intuition:
      "Recurse down the tree returning a non-null signal whenever a target is found. A node becomes the lowest common ancestor exactly when one target is found in its left subtree and the other in its right; otherwise the answer bubbles up from whichever side reported a match.",
    approach: [
      "DFS: return the node if it matches p or q, else recurse both children.",
      "If both child calls return non-null, the current node is the LCA.",
      "Otherwise propagate the single non-null result upward.",
      "Return the answer node's value.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Each node is examined once; stack depth is height h." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def lowest_common_ancestor(root, p: int, q: int) -> int | None:
    def f(node):
        if not node:
            return None
        if node.val == p or node.val == q:
            return node
        left = f(node.left)
        right = f(node.right)
        if left and right:
            return node
        return left or right
    node = f(root)
    return node.val if node else None`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function lowestCommonAncestor(root: TreeNode | null, p: number, q: number): number | null {
  const f = (n: TreeNode | null): TreeNode | null => {
    if (!n) return null;
    if (n.val === p || n.val === q) return n;
    const left = f(n.left);
    const right = f(n.right);
    if (left && right) return n;
    return left ?? right;
  };
  const node = f(root);
  return node ? node.val : null;
}`,
      },
    ],
    runner: {
      entry: "lowestCommonAncestor",
      comparison: "deep",
      jsStarter: `function lowestCommonAncestor(level, p, q) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return the value of the LCA of p and q.
}`,
      jsReference: `function lowestCommonAncestor(level, p, q) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q2=[r];let i=1;while(q2.length&&i<a.length){const n=q2.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q2.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q2.push(n.right);}}}return r;}
  const root = build(level);
  function f(n){ if(!n) return null; if(n.val===p||n.val===q) return n; const L=f(n.left); const R=f(n.right); if(L&&R) return n; return L||R; }
  const node = f(root);
  return node ? node.val : null;
}`,
    },
    tests: [
      { name: "split sides", args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1], expected: 3 },
      { name: "ancestor is target", args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4], expected: 5 },
      { name: "deep pair", args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 7, 4], expected: 2 },
      { name: "tiny tree", args: [[1, 2], 1, 2], expected: 1 },
    ],
    hints: ["Both sides non-null means you found it.", "Otherwise the answer bubbles up one side."],
    relatedIds: [235, 1644, 1650],
  },
  {
    id: 617,
    slug: "merge-two-binary-trees",
    title: "Merge Two Binary Trees",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "microsoft", "adobe"],
    frequency: 57,
    leetcodeUrl: "https://leetcode.com/problems/merge-two-binary-trees/",
    description:
      "Overlay two binary trees: where both have a node, sum the values; where only one has a node, keep it. Both inputs are level-order arrays (entry(root1, root2)) and the merged tree is returned as a trimmed level-order array.",
    examples: [
      { input: "root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]", output: "[3,4,5,5,4,null,7]" },
      { input: "root1 = [1], root2 = [1,2]", output: "[2,2]" },
    ],
    intuition:
      "Walk both trees in lockstep. When a position exists in both, the merged node's value is the sum and we recurse into both pairs of children; when only one side exists, that entire subtree is carried over unchanged.",
    approach: [
      "Build both trees from their level-order arrays.",
      "Recurse: if both nodes are null return null.",
      "Otherwise create a node whose value is the sum of whichever sides exist.",
      "Recurse on left/left and right/right, then serialize the merged tree.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "n = overlapping nodes; recursion depth is the smaller height." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def merge_trees(a, b):
    if not a and not b:
        return None
    val = (a.val if a else 0) + (b.val if b else 0)
    node = TreeNode(val)
    node.left = merge_trees(a.left if a else None, b.left if b else None)
    node.right = merge_trees(a.right if a else None, b.right if b else None)
    return node`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function mergeTrees(a: TreeNode | null, b: TreeNode | null): TreeNode | null {
  if (!a && !b) return null;
  const node = new TreeNode((a ? a.val : 0) + (b ? b.val : 0));
  node.left = mergeTrees(a ? a.left : null, b ? b.left : null);
  node.right = mergeTrees(a ? a.right : null, b ? b.right : null);
  return node;
}`,
      },
    ],
    runner: {
      entry: "mergeTrees",
      comparison: "deep",
      jsStarter: `function mergeTrees(level1, level2) {
  // Two LeetCode level-order arrays; build both, overlay them, and
  // return the merged tree as a trimmed level-order array.
}`,
      jsReference: `function mergeTrees(level1, level2) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  function ser(root){ if(!root) return []; const out=[]; const q=[root]; while(q.length){ const n=q.shift(); if(n){ out.push(n.val); q.push(n.left); q.push(n.right);} else out.push(null);} while(out.length&&out[out.length-1]===null) out.pop(); return out; }
  function merge(a, b){ if(!a && !b) return null; const node={val:(a?a.val:0)+(b?b.val:0),left:null,right:null}; node.left=merge(a?a.left:null, b?b.left:null); node.right=merge(a?a.right:null, b?b.right:null); return node; }
  return ser(merge(build(level1), build(level2)));
}`,
    },
    tests: [
      { name: "classic", args: [[1, 3, 2, 5], [2, 1, 3, null, 4, null, 7]], expected: [3, 4, 5, 5, 4, null, 7] },
      { name: "extend missing", args: [[1], [1, 2]], expected: [2, 2] },
      { name: "one empty", args: [[], [1]], expected: [1] },
      { name: "small full", args: [[1, 2, 3], [4, 5, 6]], expected: [5, 7, 9] },
    ],
    hints: ["Sum where both exist.", "Carry over the lone subtree otherwise."],
    relatedIds: [100, 226, 654],
  },
  {
    id: 700,
    slug: "search-in-a-binary-search-tree",
    title: "Search in a Binary Search Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["BST", "Binary Search"],
    companies: ["amazon", "microsoft", "google"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    description:
      "Given the root of a BST and a target value, return the subtree rooted at the matching node as a level-order array, or an empty array if the value is absent. The tree is supplied as a level-order array with `null` for missing children.",
    examples: [
      { input: "root = [4,2,7,1,3], val = 2", output: "[2,1,3]" },
      { input: "root = [4,2,7,1,3], val = 5", output: "[]" },
    ],
    intuition:
      "The BST ordering lets you discard half the tree at each step: if the target is smaller than the current node go left, if larger go right. You either land on the matching node — and return its whole subtree — or fall off the tree, meaning the value is not present.",
    approach: [
      "Build the tree from the level-order array.",
      "Walk down comparing val to the current node.",
      "Stop when the node matches or the pointer becomes null.",
      "Serialize the matched subtree (empty array when not found).",
    ],
    complexity: { time: "O(h)", space: "O(1)", note: "Follows a single root-to-node path of length h." },
    solutions: [
      {
        language: "python",
        label: "BST walk",
        code: `def search_bst(root, val: int):
    node = root
    while node:
        if node.val == val:
            return node
        node = node.left if val < node.val else node.right
    return None`,
      },
      {
        language: "typescript",
        label: "BST walk",
        code: `function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  let node = root;
  while (node) {
    if (node.val === val) return node;
    node = val < node.val ? node.left : node.right;
  }
  return null;
}`,
      },
    ],
    runner: {
      entry: "searchBST",
      comparison: "deep",
      jsStarter: `function searchBST(level, val) {
  // Build the BST from the level-order array, find 'val', and return its
  // subtree as a trimmed level-order array (or [] if not found).
}`,
      jsReference: `function searchBST(level, val) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  function ser(root){ if(!root) return []; const out=[]; const q=[root]; while(q.length){ const n=q.shift(); if(n){ out.push(n.val); q.push(n.left); q.push(n.right);} else out.push(null);} while(out.length&&out[out.length-1]===null) out.pop(); return out; }
  let node = build(level);
  while (node) { if (node.val === val) break; node = val < node.val ? node.left : node.right; }
  return ser(node);
}`,
    },
    tests: [
      { name: "found interior", args: [[4, 2, 7, 1, 3], 2], expected: [2, 1, 3] },
      { name: "not found", args: [[4, 2, 7, 1, 3], 5], expected: [] },
      { name: "found leaf", args: [[4, 2, 7, 1, 3], 7], expected: [7] },
      { name: "found root", args: [[4, 2, 7, 1, 3], 4], expected: [4, 2, 7, 1, 3] },
    ],
    hints: ["Compare and branch — never scan both sides.", "Return the matched node's whole subtree."],
    relatedIds: [701, 235, 98],
  },
  {
    id: 701,
    slug: "insert-into-a-binary-search-tree",
    title: "Insert into a Binary Search Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BST", "Recursion"],
    companies: ["amazon", "microsoft", "google", "apple"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
    description:
      "Insert a new value into a BST (the value is guaranteed not to already exist) and return the resulting tree as a level-order array. The value always becomes a new leaf, following the BST search path. The tree arrives as a level-order array with `null` for absent children.",
    examples: [
      { input: "root = [4,2,7,1,3], val = 5", output: "[4,2,7,1,3,5]" },
      { input: "root = [], val = 5", output: "[5]" },
    ],
    intuition:
      "Follow the same comparison path you would use to search for the value. Because it is not already present, the search inevitably falls off the tree at a null child — and that null slot is exactly where the new leaf belongs.",
    approach: [
      "If the tree is empty, the new value is the root.",
      "Walk down going left or right by comparison.",
      "When the chosen child is null, attach the new node there.",
      "Serialize the updated tree to a level-order array.",
    ],
    complexity: { time: "O(h)", space: "O(1)", note: "One search path of length h; the leaf is attached there." },
    solutions: [
      {
        language: "python",
        label: "Iterative insert",
        code: `def insert_into_bst(root, val: int):
    new_node = TreeNode(val)
    if not root:
        return new_node
    node = root
    while True:
        if val < node.val:
            if node.left:
                node = node.left
            else:
                node.left = new_node
                break
        else:
            if node.right:
                node = node.right
            else:
                node.right = new_node
                break
    return root`,
      },
      {
        language: "typescript",
        label: "Iterative insert",
        code: `function insertIntoBST(root: TreeNode | null, val: number): TreeNode {
  const newNode = new TreeNode(val);
  if (!root) return newNode;
  let node: TreeNode = root;
  while (true) {
    if (val < node.val) {
      if (node.left) node = node.left;
      else { node.left = newNode; break; }
    } else {
      if (node.right) node = node.right;
      else { node.right = newNode; break; }
    }
  }
  return root;
}`,
      },
    ],
    runner: {
      entry: "insertIntoBST",
      comparison: "deep",
      jsStarter: `function insertIntoBST(level, val) {
  // Build the BST, insert 'val' as a new leaf on its search path, and
  // return the resulting tree as a trimmed level-order array.
}`,
      jsReference: `function insertIntoBST(level, val) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  function ser(root){ if(!root) return []; const out=[]; const q=[root]; while(q.length){ const n=q.shift(); if(n){ out.push(n.val); q.push(n.left); q.push(n.right);} else out.push(null);} while(out.length&&out[out.length-1]===null) out.pop(); return out; }
  const root = build(level);
  const newNode = { val, left: null, right: null };
  if (!root) return ser(newNode);
  let node = root;
  while (true) {
    if (val < node.val) { if (node.left) node = node.left; else { node.left = newNode; break; } }
    else { if (node.right) node = node.right; else { node.right = newNode; break; } }
  }
  return ser(root);
}`,
    },
    tests: [
      { name: "leaf right of seven", args: [[4, 2, 7, 1, 3], 5], expected: [4, 2, 7, 1, 3, 5] },
      { name: "deep insert", args: [[40, 20, 60, 10, 30, 50, 70], 25], expected: [40, 20, 60, 10, 30, 50, 70, null, null, 25] },
      { name: "empty tree", args: [[], 5], expected: [5] },
      { name: "rightmost leaf", args: [[4, 2, 7, 1, 3], 8], expected: [4, 2, 7, 1, 3, null, 8] },
    ],
    hints: ["Insertion always lands at a null child.", "It is the search path that decides where."],
    relatedIds: [700, 450, 235],
  },
  {
    id: 538,
    slug: "convert-bst-to-greater-tree",
    title: "Convert BST to Greater Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BST", "DFS", "Reverse Inorder"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 54,
    leetcodeUrl: "https://leetcode.com/problems/convert-bst-to-greater-tree/",
    description:
      "Transform a BST so every node's value becomes its original value plus the sum of all values strictly greater than it. Return the converted tree as a level-order array. Input is a level-order array with `null` for absent children.",
    examples: [
      { input: "root = [2,1,3]", output: "[5,6,3]", explanation: "1→6 (1+5), 2→5 (2+3), 3 stays 3." },
      { input: "root = [0,null,1]", output: "[1,null,1]" },
    ],
    intuition:
      "Visiting a BST in reverse inorder (right, node, left) yields values in descending order. Keep a running sum of everything seen so far; when you reach a node, add that accumulated total to it — that total is exactly the sum of all larger values.",
    approach: [
      "Build the tree from the level-order array.",
      "DFS in the order right → node → left.",
      "Maintain a running sum; add the node's value to it, then overwrite the node.",
      "Serialize the modified tree.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Reverse inorder visits every node once; stack depth is height h." },
    solutions: [
      {
        language: "python",
        label: "Reverse inorder",
        code: `def convert_bst(root):
    running = 0
    def go(node) -> None:
        nonlocal running
        if not node:
            return
        go(node.right)
        running += node.val
        node.val = running
        go(node.left)
    go(root)
    return root`,
      },
      {
        language: "typescript",
        label: "Reverse inorder",
        code: `function convertBST(root: TreeNode | null): TreeNode | null {
  let running = 0;
  const go = (n: TreeNode | null): void => {
    if (!n) return;
    go(n.right);
    running += n.val;
    n.val = running;
    go(n.left);
  };
  go(root);
  return root;
}`,
      },
    ],
    runner: {
      entry: "convertBST",
      comparison: "deep",
      jsStarter: `function convertBST(level) {
  // Build the BST, add to each node the sum of all greater values, and
  // return the converted tree as a trimmed level-order array.
}`,
      jsReference: `function convertBST(level) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  function ser(root){ if(!root) return []; const out=[]; const q=[root]; while(q.length){ const n=q.shift(); if(n){ out.push(n.val); q.push(n.left); q.push(n.right);} else out.push(null);} while(out.length&&out[out.length-1]===null) out.pop(); return out; }
  const root = build(level);
  let running = 0;
  (function go(n){ if(!n) return; go(n.right); running += n.val; n.val = running; go(n.left); })(root);
  return ser(root);
}`,
    },
    tests: [
      { name: "three nodes", args: [[2, 1, 3]], expected: [5, 6, 3] },
      { name: "right lean", args: [[0, null, 1]], expected: [1, null, 1] },
      { name: "with leaf", args: [[3, 1, 4, null, 2]], expected: [7, 10, 4, null, 9] },
      { name: "skewed", args: [[5, 2, 13]], expected: [18, 20, 13] },
    ],
    hints: ["Reverse inorder gives descending order.", "Accumulate the sum as you go."],
    relatedIds: [1038, 530, 783],
  },
  {
    id: 653,
    slug: "two-sum-iv-input-is-a-bst",
    title: "Two Sum IV - Input is a BST",
    difficulty: "Easy",
    category: "trees",
    patterns: ["BST", "Hash Set", "DFS"],
    companies: ["amazon", "meta", "microsoft"],
    frequency: 53,
    leetcodeUrl: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
    description:
      "Given a BST and a target k, decide whether two distinct nodes have values summing to k. Return a boolean. The tree is a level-order array with `null` for absent children.",
    examples: [
      { input: "root = [5,3,6,2,4,null,7], k = 9", output: "true", explanation: "2 + 7 = 9." },
      { input: "root = [5,3,6,2,4,null,7], k = 28", output: "false" },
    ],
    intuition:
      "Treat the tree like the array version of Two Sum: as you traverse, remember every value seen. For each node, check whether its complement k − value has already appeared; the first time that succeeds you have your pair of distinct nodes.",
    approach: [
      "Build the tree and maintain a hash set of seen values.",
      "At each node, if k − value is in the set, return true.",
      "Otherwise add the value and keep traversing.",
      "Return false if the traversal finishes with no match.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each node visited once; the set may hold up to n values." },
    solutions: [
      {
        language: "python",
        label: "DFS + set",
        code: `def find_target(root, k: int) -> bool:
    seen: set[int] = set()
    def dfs(node) -> bool:
        if not node:
            return False
        if k - node.val in seen:
            return True
        seen.add(node.val)
        return dfs(node.left) or dfs(node.right)
    return dfs(root)`,
      },
      {
        language: "typescript",
        label: "DFS + set",
        code: `function findTarget(root: TreeNode | null, k: number): boolean {
  const seen = new Set<number>();
  const dfs = (n: TreeNode | null): boolean => {
    if (!n) return false;
    if (seen.has(k - n.val)) return true;
    seen.add(n.val);
    return dfs(n.left) || dfs(n.right);
  };
  return dfs(root);
}`,
      },
    ],
    runner: {
      entry: "findTarget",
      comparison: "deep",
      jsStarter: `function findTarget(level, k) {
  // Build the BST and return true iff two distinct nodes sum to k.
}`,
      jsReference: `function findTarget(level, k) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  const root = build(level);
  const seen = new Set();
  function dfs(n){ if(!n) return false; if(seen.has(k - n.val)) return true; seen.add(n.val); return dfs(n.left) || dfs(n.right); }
  return dfs(root);
}`,
    },
    tests: [
      { name: "pair exists", args: [[5, 3, 6, 2, 4, null, 7], 9], expected: true },
      { name: "too large", args: [[5, 3, 6, 2, 4, null, 7], 28], expected: false },
      { name: "small yes", args: [[2, 1, 3], 4], expected: true },
      { name: "single node", args: [[1], 2], expected: false },
    ],
    hints: ["Reuse the Two Sum hash-set trick.", "Two distinct nodes — a node can't pair with itself."],
    relatedIds: [1, 170, 167],
  },
  {
    id: 1448,
    slug: "count-good-nodes-in-binary-tree",
    title: "Count Good Nodes in Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "microsoft", "meta", "uber"],
    frequency: 67,
    leetcodeUrl: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
    description:
      "A node is 'good' if no node on the path from the root down to it holds a strictly greater value. Count the good nodes. The tree is provided as a level-order array with `null` for absent children.",
    examples: [
      { input: "root = [3,1,4,3,null,1,5]", output: "4", explanation: "Nodes 3, 4, 3, and 5 are good." },
      { input: "root = [3,3,null,4,2]", output: "3" },
    ],
    intuition:
      "Carry the maximum value seen so far down each path. A node qualifies as good precisely when its own value is at least that running maximum — meaning nothing above it was larger. Update the maximum as you descend and tally the qualifying nodes.",
    approach: [
      "Build the tree from the level-order array.",
      "DFS passing down the maximum value on the current path.",
      "Increment the count when node.val ≥ current max.",
      "Update the max before recursing into children.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Each node visited once; recursion depth is height h." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `def good_nodes(root) -> int:
    count = 0
    def dfs(node, mx) -> None:
        nonlocal count
        if not node:
            return
        if node.val >= mx:
            count += 1
            mx = node.val
        dfs(node.left, mx)
        dfs(node.right, mx)
    dfs(root, float("-inf"))
    return count`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `function goodNodes(root: TreeNode | null): number {
  let count = 0;
  const dfs = (n: TreeNode | null, mx: number): void => {
    if (!n) return;
    if (n.val >= mx) { count++; mx = n.val; }
    dfs(n.left, mx);
    dfs(n.right, mx);
  };
  dfs(root, -Infinity);
  return count;
}`,
      },
    ],
    runner: {
      entry: "goodNodes",
      comparison: "deep",
      jsStarter: `function goodNodes(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and count the good nodes.
}`,
      jsReference: `function goodNodes(level) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  const root = build(level);
  let count = 0;
  (function dfs(n, mx){ if(!n) return; if(n.val >= mx){ count++; mx = n.val; } dfs(n.left, mx); dfs(n.right, mx); })(root, -Infinity);
  return count;
}`,
    },
    tests: [
      { name: "classic", args: [[3, 1, 4, 3, null, 1, 5]], expected: 4 },
      { name: "left chain", args: [[3, 3, null, 4, 2]], expected: 3 },
      { name: "single", args: [[1]], expected: 1 },
      { name: "decreasing", args: [[9, null, 3, 6]], expected: 1 },
    ],
    hints: ["Pass the path maximum down.", "Good means at least the running max."],
    relatedIds: [104, 129, 1026],
  },
  {
    id: 173,
    slug: "binary-search-tree-iterator",
    title: "Binary Search Tree Iterator",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BST", "Inorder", "Design", "Stack"],
    companies: ["amazon", "meta", "microsoft", "google", "bloomberg"],
    frequency: 68,
    leetcodeUrl: "https://leetcode.com/problems/binary-search-tree-iterator/",
    description:
      "Design an iterator over a BST that returns values in ascending order. `next()` returns the next-smallest value and `hasNext()` reports whether any values remain. The playground replays an `ops`/`args` script: the constructor receives the tree as a level-order array (with `null`), and returns `null`, while `next`/`hasNext` return their results.",
    examples: [
      {
        input:
          "ops = [\"BSTIterator\",\"next\",\"next\",\"hasNext\",\"next\",\"hasNext\",\"next\",\"hasNext\",\"next\",\"hasNext\"], args = [[[7,3,15,null,null,9,20]],[],[],[],[],[],[],[],[],[]]",
        output: "[null,3,7,true,9,true,15,true,20,false]",
      },
    ],
    intuition:
      "The simplest correct iterator precomputes the inorder sequence — which for a BST is sorted — and serves it with a moving index. `next` hands back the value at the cursor and advances it, while `hasNext` just checks whether the cursor is still inside the list.",
    approach: [
      "On construction, build the tree and flatten it via inorder into a sorted list.",
      "Keep an index starting at 0.",
      "`next` returns list[index] and increments index.",
      "`hasNext` returns index < list.length.",
    ],
    complexity: { time: "O(n) build, O(1) amortized per call", space: "O(n)", note: "The inorder list holds all n values." },
    solutions: [
      {
        language: "python",
        label: "Flatten inorder",
        code: `class BSTIterator:
    def __init__(self, root):
        self.order: list[int] = []
        self.idx = 0
        def go(node):
            if not node:
                return
            go(node.left)
            self.order.append(node.val)
            go(node.right)
        go(root)

    def next(self) -> int:
        val = self.order[self.idx]
        self.idx += 1
        return val

    def hasNext(self) -> bool:
        return self.idx < len(self.order)`,
      },
      {
        language: "typescript",
        label: "Flatten inorder",
        code: `class BSTIterator {
  private order: number[] = [];
  private idx = 0;
  constructor(root: TreeNode | null) {
    const go = (n: TreeNode | null): void => {
      if (!n) return;
      go(n.left);
      this.order.push(n.val);
      go(n.right);
    };
    go(root);
  }
  next(): number { return this.order[this.idx++]; }
  hasNext(): boolean { return this.idx < this.order.length; }
}`,
      },
    ],
    runner: {
      entry: "runIterator",
      comparison: "deep",
      jsStarter: `function runIterator(ops, args) {
  // Replay the operations. "BSTIterator" returns null;
  // "next" returns the next-smallest value; "hasNext" returns a boolean.
  // TODO: implement the iterator and the driver loop.
}`,
      jsReference: `function runIterator(ops, args) {
  function build(a){if(!a.length||a[0]===null)return null;const r={val:a[0],left:null,right:null};const q=[r];let i=1;while(q.length&&i<a.length){const n=q.shift();if(i<a.length){const lv=a[i++];if(lv!==null){n.left={val:lv,left:null,right:null};q.push(n.left);}}if(i<a.length){const rv=a[i++];if(rv!==null){n.right={val:rv,left:null,right:null};q.push(n.right);}}}return r;}
  let order = [];
  let idx = 0;
  const out = [];
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "BSTIterator") {
      const root = build(a[0]);
      order = [];
      idx = 0;
      (function go(n){ if(!n) return; go(n.left); order.push(n.val); go(n.right); })(root);
      out.push(null);
    } else if (op === "next") {
      out.push(order[idx++]);
    } else if (op === "hasNext") {
      out.push(idx < order.length);
    }
  }
  return out;
}`,
    },
    tests: [
      {
        name: "classic sequence",
        args: [
          ["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"],
          [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []],
        ],
        expected: [null, 3, 7, true, 9, true, 15, true, 20, false],
      },
      {
        name: "single node",
        args: [
          ["BSTIterator", "hasNext", "next", "hasNext"],
          [[[1]], [], [], []],
        ],
        expected: [null, true, 1, false],
      },
      {
        name: "drain three",
        args: [
          ["BSTIterator", "next", "next", "next", "hasNext"],
          [[[2, 1, 3]], [], [], [], []],
        ],
        expected: [null, 1, 2, 3, false],
      },
    ],
    hints: ["Inorder of a BST is sorted.", "A cursor over the flattened list is the simplest iterator."],
    relatedIds: [94, 173, 284],
  },
  {
    id: 720,
    slug: "longest-word-in-dictionary",
    title: "Longest Word in Dictionary",
    difficulty: "Medium",
    category: "tries",
    patterns: ["Trie", "Hash Set", "Sorting"],
    companies: ["amazon", "google", "bloomberg"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/longest-word-in-dictionary/",
    description:
      "Given a list of words, return the longest word that can be built one character at a time, where every prefix of it is also a word in the list. If several qualify, return the lexicographically smallest; if none qualify, return the empty string.",
    examples: [
      { input: "words = [\"w\",\"wo\",\"wor\",\"worl\",\"world\"]", output: "\"world\"" },
      { input: "words = [\"a\",\"banana\",\"app\",\"appl\",\"ap\",\"apply\",\"apple\"]", output: "\"apple\"" },
    ],
    intuition:
      "A word is buildable only if every one of its shorter prefixes is itself present. Put all words in a set for O(1) membership, then sort the words; scanning in ascending order means the first word reaching a new maximum length is automatically the lexicographically smallest among ties.",
    approach: [
      "Insert all words into a hash set.",
      "Sort the words ascending so lexicographic ties resolve naturally.",
      "For each word, verify every prefix of length 1..len-1 exists in the set.",
      "Keep the first valid word that strictly beats the current best length.",
    ],
    complexity: { time: "O(Σ word length)", space: "O(Σ word length)", note: "Sorting plus prefix checks over the total characters." },
    solutions: [
      {
        language: "python",
        label: "Set + sort",
        code: `def longest_word(words: list[str]) -> str:
    word_set = set(words)
    best = ""
    for w in sorted(words):
        if all(w[:i] in word_set for i in range(1, len(w))):
            if len(w) > len(best):
                best = w
    return best`,
      },
      {
        language: "typescript",
        label: "Set + sort",
        code: `function longestWord(words: string[]): string {
  const set = new Set(words);
  let best = "";
  for (const w of [...words].sort()) {
    let ok = true;
    for (let i = 1; i < w.length; i++) {
      if (!set.has(w.slice(0, i))) { ok = false; break; }
    }
    if (ok && w.length > best.length) best = w;
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "longestWord",
      comparison: "deep",
      jsStarter: `function longestWord(words) {
  // Return the longest word whose every prefix is also present,
  // breaking ties by smallest lexicographic order ("" if none).
}`,
      jsReference: `function longestWord(words) {
  const set = new Set(words);
  let best = "";
  for (const w of [...words].sort()) {
    let ok = true;
    for (let i = 1; i < w.length; i++) {
      if (!set.has(w.slice(0, i))) { ok = false; break; }
    }
    if (ok && w.length > best.length) best = w;
  }
  return best;
}`,
    },
    tests: [
      { name: "single chain", args: [["w", "wo", "wor", "worl", "world"]], expected: "world" },
      { name: "tie picks apple", args: [["a", "banana", "app", "appl", "ap", "apply", "apple"]], expected: "apple" },
      { name: "all singles", args: [["a", "b", "c"]], expected: "a" },
      { name: "no buildable", args: [["abc"]], expected: "" },
    ],
    hints: ["Every prefix must also be a word.", "Sort so ties resolve to the smallest string."],
    relatedIds: [208, 212, 14],
  },
  {
    id: 378,
    slug: "kth-smallest-element-in-a-sorted-matrix",
    title: "Kth Smallest Element in a Sorted Matrix",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "Binary Search"],
    companies: ["amazon", "google", "meta", "microsoft", "uber"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
    description:
      "Given an n×n matrix whose rows and columns are each sorted in ascending order, return the k-th smallest value in the overall sorted order (counting duplicates by position).",
    examples: [
      { input: "matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8", output: "13" },
      { input: "matrix = [[-5]], k = 1", output: "-5" },
    ],
    intuition:
      "The k-th smallest in the global order is well defined even though the matrix is only partially sorted. A clean and correct approach gathers all entries, sorts them, and indexes position k − 1; a min-heap of size k achieves the same answer with less memory for large inputs.",
    approach: [
      "Flatten every matrix entry into one list.",
      "Sort the list in ascending order.",
      "Return the element at index k − 1.",
      "(A size-k min-heap is the memory-efficient alternative.)",
    ],
    complexity: { time: "O(n² log n)", space: "O(n²)", note: "n² entries sorted; the heap variant is O(n² log k)." },
    solutions: [
      {
        language: "python",
        label: "Flatten + sort",
        code: `def kth_smallest(matrix: list[list[int]], k: int) -> int:
    flat = [v for row in matrix for v in row]
    flat.sort()
    return flat[k - 1]`,
      },
      {
        language: "typescript",
        label: "Flatten + sort",
        code: `function kthSmallest(matrix: number[][], k: number): number {
  const flat: number[] = [];
  for (const row of matrix) for (const v of row) flat.push(v);
  flat.sort((a, b) => a - b);
  return flat[k - 1];
}`,
      },
    ],
    runner: {
      entry: "kthSmallest",
      comparison: "deep",
      jsStarter: `function kthSmallest(matrix, k) {
  // Return the k-th smallest value across the whole matrix.
}`,
      jsReference: `function kthSmallest(matrix, k) {
  const flat = [];
  for (const row of matrix) for (const v of row) flat.push(v);
  flat.sort((a, b) => a - b);
  return flat[k - 1];
}`,
    },
    tests: [
      { name: "classic", args: [[[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8], expected: 13 },
      { name: "single cell", args: [[[-5]], 1], expected: -5 },
      { name: "duplicates", args: [[[1, 2], [1, 3]], 2], expected: 1 },
      { name: "mid range", args: [[[1, 3, 5], [6, 7, 12], [11, 14, 14]], 6], expected: 11 },
    ],
    hints: ["The global order is what matters.", "Sort everything, or use a bounded min-heap."],
    relatedIds: [215, 373, 668],
  },
  {
    id: 1337,
    slug: "the-k-weakest-rows-in-a-matrix",
    title: "The K Weakest Rows in a Matrix",
    difficulty: "Easy",
    category: "heap-priority-queue",
    patterns: ["Heap", "Sorting", "Counting"],
    companies: ["amazon", "microsoft", "google"],
    frequency: 51,
    leetcodeUrl: "https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/",
    description:
      "In a binary matrix every row lists its soldiers (1s) before its civilians (0s). A row is weaker than another if it has fewer soldiers, or the same count but a smaller index. Return the indices of the k weakest rows, weakest first.",
    examples: [
      { input: "mat = [[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0]], k = 3", output: "[2,0,3]" },
      { input: "mat = [[1,0,0,0],[1,1,1,1],[1,0,0,0],[1,0,0,0]], k = 2", output: "[0,2]" },
    ],
    intuition:
      "A row's strength is just its number of soldiers, which equals the sum of its entries. Pair each strength with the row index, sort by strength and then by index to break ties, and read off the first k indices.",
    approach: [
      "Compute each row's soldier count as the sum of its entries.",
      "Pair each count with its row index.",
      "Sort ascending by count, then by index for ties.",
      "Return the indices of the first k pairs.",
    ],
    complexity: { time: "O(m·n + m log m)", space: "O(m)", note: "m rows of width n; sort the per-row strengths." },
    solutions: [
      {
        language: "python",
        label: "Sort by strength",
        code: `def k_weakest_rows(mat: list[list[int]], k: int) -> list[int]:
    rows = sorted(range(len(mat)), key=lambda i: (sum(mat[i]), i))
    return rows[:k]`,
      },
      {
        language: "typescript",
        label: "Sort by strength",
        code: `function kWeakestRows(mat: number[][], k: number): number[] {
  const rows = mat.map((row, i) => [row.reduce((a, b) => a + b, 0), i]);
  rows.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return rows.slice(0, k).map((r) => r[1]);
}`,
      },
    ],
    runner: {
      entry: "kWeakestRows",
      comparison: "deep",
      jsStarter: `function kWeakestRows(mat, k) {
  // Return the indices of the k weakest rows, weakest first.
}`,
      jsReference: `function kWeakestRows(mat, k) {
  const rows = mat.map((row, i) => [row.reduce((a, b) => a + b, 0), i]);
  rows.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return rows.slice(0, k).map((r) => r[1]);
}`,
    },
    tests: [
      { name: "classic", args: [[[1, 1, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 1, 0, 0, 0]], 3], expected: [2, 0, 3] },
      { name: "tie by index", args: [[[1, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0]], 2], expected: [0, 2] },
      { name: "pick one", args: [[[1, 1], [1, 0]], 1], expected: [1] },
      { name: "with empty row", args: [[[1, 0], [0, 0], [1, 1]], 3], expected: [1, 0, 2] },
    ],
    hints: ["Strength equals the row sum.", "Break ties by the smaller index."],
    relatedIds: [1331, 1346, 215],
  },
];

export default batchK;
