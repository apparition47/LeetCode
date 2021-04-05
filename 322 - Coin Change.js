// https://leetcode.com/problems/coin-change/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    // top down
    const memo = {}
    const helper = (remaining) => {
        if (!remaining) return 0
        if (memo[remaining]) return memo[remaining]
        let sum = Number.MAX_VALUE
        for (const coin of coins)
            if (remaining-coin>=0)
                sum = Math.min(sum, helper(remaining-coin))
        memo[remaining] = sum+1
        return memo[remaining]
    }
    
    const res = helper(amount)
    return res === Number.MAX_VALUE ? -1 : res
};