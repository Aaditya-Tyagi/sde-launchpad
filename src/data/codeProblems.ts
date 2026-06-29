// Curated in-app coding problems for the Code Lab.
// IDs match LeetCode numbers used in dsaPatterns.ts, so solving one here marks it
// solved in DSA Quest and lifts the DSA readiness dimension.
// `compare: 'set'` = order-independent array compare (for index-pair answers).
export interface CodeTest { args: any[]; expected: any; compare?: 'eq' | 'set'; }
export interface CodeProblem {
  id: number; slug: string; name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string; desc: string; fn: string; stub: string; tests: CodeTest[];
}

export const CODE_PROBLEMS: CodeProblem[] = [
  {
    id: 1, slug: 'two-sum', name: 'Two Sum', difficulty: 'Easy', pattern: 'Hashing',
    desc: 'Given an array `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Exactly one solution exists; you may return the pair in any order.',
    fn: 'twoSum',
    stub: 'function twoSum(nums, target) {\n  // return [i, j]\n\n}',
    tests: [
      { args: [[2, 7, 11, 15], 9], expected: [0, 1], compare: 'set' },
      { args: [[3, 2, 4], 6], expected: [1, 2], compare: 'set' },
      { args: [[3, 3], 6], expected: [0, 1], compare: 'set' },
    ],
  },
  {
    id: 217, slug: 'contains-duplicate', name: 'Contains Duplicate', difficulty: 'Easy', pattern: 'Hashing',
    desc: 'Return `true` if any value appears at least twice in `nums`, and `false` if every element is distinct.',
    fn: 'containsDuplicate',
    stub: 'function containsDuplicate(nums) {\n\n}',
    tests: [
      { args: [[1, 2, 3, 1]], expected: true },
      { args: [[1, 2, 3, 4]], expected: false },
      { args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
    ],
  },
  {
    id: 242, slug: 'valid-anagram', name: 'Valid Anagram', difficulty: 'Easy', pattern: 'Hashing',
    desc: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s` (same characters, same counts).',
    fn: 'isAnagram',
    stub: 'function isAnagram(s, t) {\n\n}',
    tests: [
      { args: ['anagram', 'nagaram'], expected: true },
      { args: ['rat', 'car'], expected: false },
      { args: ['a', 'ab'], expected: false },
    ],
  },
  {
    id: 704, slug: 'binary-search', name: 'Binary Search', difficulty: 'Easy', pattern: 'Binary Search',
    desc: 'Given a sorted ascending array `nums` and a `target`, return its index, or `-1` if absent. Must run in O(log n).',
    fn: 'search',
    stub: 'function search(nums, target) {\n\n}',
    tests: [
      { args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { args: [[5], 5], expected: 0 },
      { args: [[2, 5], 0], expected: -1 },
    ],
  },
  {
    id: 35, slug: 'search-insert-position', name: 'Search Insert Position', difficulty: 'Easy', pattern: 'Binary Search',
    desc: 'Given a sorted array of distinct integers and a `target`, return the index if found. If not, return the index where it would be inserted in order. O(log n).',
    fn: 'searchInsert',
    stub: 'function searchInsert(nums, target) {\n\n}',
    tests: [
      { args: [[1, 3, 5, 6], 5], expected: 2 },
      { args: [[1, 3, 5, 6], 2], expected: 1 },
      { args: [[1, 3, 5, 6], 7], expected: 4 },
      { args: [[1, 3, 5, 6], 0], expected: 0 },
    ],
  },
  {
    id: 167, slug: 'two-sum-ii-input-array-is-sorted', name: 'Two Sum II — Sorted', difficulty: 'Medium', pattern: 'Two Pointers',
    desc: 'A **1-indexed** sorted array `numbers` and a `target`. Return `[i, j]` (1-indexed) of the two numbers that add to `target`, with `i < j`. Use O(1) extra space.',
    fn: 'twoSum',
    stub: 'function twoSum(numbers, target) {\n  // return [i, j] (1-indexed)\n\n}',
    tests: [
      { args: [[2, 7, 11, 15], 9], expected: [1, 2] },
      { args: [[2, 3, 4], 6], expected: [1, 3] },
      { args: [[-1, 0], -1], expected: [1, 2] },
    ],
  },
  {
    id: 209, slug: 'minimum-size-subarray-sum', name: 'Minimum Size Subarray Sum', difficulty: 'Medium', pattern: 'Sliding Window',
    desc: 'Given a positive-integer array `nums` and a `target`, return the minimal length of a contiguous subarray whose sum is ≥ `target`. If none exists, return `0`. Signature: `minSubArrayLen(target, nums)`.',
    fn: 'minSubArrayLen',
    stub: 'function minSubArrayLen(target, nums) {\n\n}',
    tests: [
      { args: [7, [2, 3, 1, 2, 4, 3]], expected: 2 },
      { args: [4, [1, 4, 4]], expected: 1 },
      { args: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expected: 0 },
    ],
  },
  {
    id: 560, slug: 'subarray-sum-equals-k', name: 'Subarray Sum Equals K', difficulty: 'Medium', pattern: 'Prefix Sum',
    desc: 'Given an integer array `nums` and an integer `k`, return the total number of contiguous subarrays whose sum equals `k`.',
    fn: 'subarraySum',
    stub: 'function subarraySum(nums, k) {\n\n}',
    tests: [
      { args: [[1, 1, 1], 2], expected: 2 },
      { args: [[1, 2, 3], 3], expected: 2 },
      { args: [[1, -1, 0], 0], expected: 3 },
    ],
  },
];
