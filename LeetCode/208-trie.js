/*
208. Implement Trie (Prefix Tree)
Medium

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.


Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, search, and startsWith.
*/

/*
v2
store prefixes in tree 
*/

class Trie {
    constructor() {
        this.words = {};
        this.prefixes = {};
    }

    insert(word) {
        this.words[word] = true;

        let node = this.prefixes;
        for (let c of word) {
            node[c] = node[c] || {}; // very important to not overrride existing starts
            node = node[c];
        }
    }

    search(word) {
        return !!this.words[word];
    }

    startsWith(word) {
        let hasPrefix = true;

        let node = this.prefixes;
        for (let c of word) {
            let nextLevel = node[c];
            if (!nextLevel) {
                hasPrefix = false;
                break;
            }
            node = nextLevel;
        }
        // const pretty = JSON.stringify(this.prefixes, null, 2)
        // if (word === 'app') { console.log('hello', node, hasPrefix, pretty) }

        return hasPrefix;
    }
}
/*
v1 working
keep prefixes in a separate object
*/

/**
 * Initialize your data structure here.
 */
var Trie = function () {
    this.words = {};
    this.prefixes = {};
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    this.words[word] = true;

    let str = '';
    for (let i = 0; i < word.length; i++) {
        str += word[i];
        this.prefixes[str] = true;
    }
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    return !!this.words[word];
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    return !!this.prefixes[prefix];
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */