// https://leetcode.com/problems/binary-tree-maximum-path-sum/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
    const dfs = node => {
        if (!node) return 0
        
        let left=0,right=0
        if (node.left) left=Math.max(dfs(node.left),0)
        if (node.right) right=Math.max(dfs(node.right),0)
        
        opt = Math.max(opt, left+right+node.val)
        return node.val + Math.max(left,right)
    }
    
    let opt = Number.MIN_SAFE_INTEGER
    dfs(root)
    return opt
};