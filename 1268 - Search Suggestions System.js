// https://leetcode.com/problems/search-suggestions-system/

var suggestedProducts = function(products, searchWord) {
    const trie = new Trie(products)
    let words = []
    let word = ''
    for (let i=0;i<searchWord.length;i++) {
        word += searchWord[i]
        words[i] = trie.searchAllWords(word)
    }
    return words
};
class TNode { constructor(key) {
    this.key=key
    this.children=new Map()
    this.isWord =false }}
class Trie {
    constructor(words) {
        this.root = new TNode()
        words.forEach(w=>this.insert(w))
    }
    insert(word) {
        const dfs = (node,i) => {
            if (i=== word.length) return
            let nextNode = node.children.get(word[i], word.length-1===i)
            if (!nextNode) {
                nextNode = new TNode(word[i])
                node.children.set(word[i], nextNode)
            }
            if (!nextNode.isWord) {
                nextNode.isWord = i === word.length - 1;
            }
            dfs(nextNode,i+1)
        }
        return dfs(this.root,0)
    }
    getPrefixNode(prefix) {
        let prefixRoot = null;
        const dfs = (node, i ) => {
            if (i===prefix.length) {
                prefixRoot = node
                return
            }
            let next = node.children.get(prefix[i])
            if (!next) return
            dfs(next,i+1)
        }
        dfs(this.root,0)
        return prefixRoot
    }
    get _getAlpha() {
        return 'abcdefghijklmnopqrstuvwxyz'.split('')
    }
    searchAllWords(prefix, limit = 3) {
        const startNode =this.getPrefixNode(prefix)
        if (!startNode || !limit) return []
        const words= []
        const dfs = (node, word=prefix) => {
            if (words.length === limit) return
            if (node.isWord) words.push(word)
            for (const c of this._getAlpha) {
                let next = node.children.get(c)
                if (!next) continue
                dfs(next, word+c)
            }
        }
        dfs(startNode)
        return words
    }
}