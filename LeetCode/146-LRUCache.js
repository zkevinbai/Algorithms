/*
146. LRU Cache
Medium

8156

334

Add to List

Share
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
Follow up:
Could you do get and put in O(1) time complexity?



Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4


Constraints:

1 <= capacity <= 3000
0 <= key <= 3000
0 <= value <= 104
At most 3 * 104 calls will be made to get and put.

* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/

/*
ways to approach this

functions / prototypes
classes

object / doubly linked list
js map

node ->next node2 ->next node3
     <-prev       <-prev
*/
const LRUCache = function (capacity) {
    this.hashMap = {};
    this.capacity = capacity;
    this.count = 0;
    this.head = null;
    this.tail = null;
};

LRUCache.prototype.get = function (key) {
    // console.log(this.hashMap)
    const currentNode = this.hashMap[key];
    if (!currentNode) return -1;

    const { value, prev, next } = currentNode;

    if (prev) prev.next = next;
    if (next) next.prev = prev;

    if (this.tail === currentNode && prev) {
        this.tail = prev;
    }
    if (this.head !== currentNode) {
        currentNode.next = this.head;
        this.head.prev = currentNode;
    }

    this.head = currentNode;

    return value;
};

LRUCache.prototype.put = function (key, value) {
    // console.log(this.hashMap)

    const currentNode = this.hashMap[key];
    if (currentNode) {
        this.hashMap[key].value = value;
        this.get(key);
    } else {
        this.hashMap[key] = {
            key,
            value,
            next: null,
            prev: null,
        };

        const currentNode = this.hashMap[key];

        if (this.head) {
            currentNode.next = this.head;
            this.head.prev = currentNode;
        }

        this.head = currentNode;

        if (!this.tail) this.tail = currentNode;

        this.count += 1;
    }

    if (this.count > this.capacity) {
        const { key, prev } = this.tail

        if (prev) {
            prev.next = null;
            this.tail = prev;
        }

        delete this.hashMap[key];

        this.count -= 1;
    }
};
