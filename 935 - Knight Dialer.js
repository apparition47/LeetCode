// https://leetcode.com/problems/knight-dialer/

/**
 * @param {number} n
 * @return {number}
 */

// top down
var knightDialer = function(n) {    
    if (n===0) return 0
    const adj = {
        0:[4,6],
        1:[6,8],
        2:[7,9],
        3:[4,8],
        4:[3,9,0],
        5:[],
        6:[1,7,0],
        7:[2,6],
        8:[1,3],
        9:[2,4],
    }    
    const dp = {}
    const visit = (digit, n) => {
        if (!n) return 1
        if (dp[digit+'/'+n] ) return dp[digit+'/'+n]
        let sum=0
        for (var i=0;i<adj[digit].length;i++){
            sum += visit(adj[digit][i], n-1)
            sum = sum %(1e9+7)
        }
        dp[digit +'/'+ n] = sum
        return sum
    }
    
    let sum = 0
    for (var i=0;i<10;i++) {
        sum += visit(i, n-1)
        sum = sum %(1e9+7)
    }
    return sum
};

// bottom up
var knightDialer = function(n) {
    const adj = {
        0:[4,6],
        1:[6,8],
        2:[7,9],
        3:[4,8],
        4:[3,9,0],
        5:[],
        6:[1,7,0],
        7:[2,6],
        8:[1,3],
        9:[2,4],
    }
    const dp = [...Array(n)].map(() => Array(10).fill(0))
    for (var i=0;i<=9;i++)
        dp[0][i]=1
    
    for (var i=1;i<=n-1;i++)
        for (var digit=0;digit<10;digit++)
            for (move of adj[digit])
                dp[i][digit] += dp[i-1][move] % (1e9+7)
    
    
    let moves = 0
    for (i in dp[n-1])
        moves += dp[n-1][i] % (1e9+7)
    
    return moves % (1e9+7)
};