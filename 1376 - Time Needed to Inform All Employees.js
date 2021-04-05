// https://leetcode.com/problems/time-needed-to-inform-all-employees/
/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function(n, headID, manager, informTime) {
    var adj = {}
    manager.forEach((emp,i) => {
        if (emp === -1) {return}
        if (adj[emp] === undefined) {adj[emp] = [] }
        
        adj[emp].push( i )
    })
    const dfs = (id) => {
        let time = 0
        if (adj[id]) {
            adj[id].forEach((emp,i) => {
                time = Math.max(time,dfs(emp))
            })
        }

        return time+informTime[id]
    }
    
    return dfs(headID)
};

