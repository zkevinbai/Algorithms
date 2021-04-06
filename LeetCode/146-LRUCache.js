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
factories (my way baby!)
functions / prototypes
classes

object / doubly linked list
js map

node ->next node2 ->next node3
     <-prev       <-prev
*/
const LinkedListNode = (key, value) => {
    return ({
        key,
        value,
        next: null,
        prev: null,
    })
};

const DoublyLinkedList = () => {
    let DummyHead = LinkedListNode();
    let DummyTail = LinkedListNode();

    DummyHead.next = DummyTail;
    DummyTail.prev = DummyHead;

    const insertHead = (node) => {
        node.prev = DummyHead;
        node.next = DummyHead.next;
        DummyHead.next.prev = node;
        DummyHead.next = node;
    }

    const removeNode = (node) => {
        const { next, prev } = node;

        next.prev = prev;
        prev.next = next;
    }

    const moveToHead = (node) => {
        removeNode(node);
        insertHead(node);
    }

    const removeTail = () => {
        const tail = DummyTail.prev;

        removeNode(tail);

        return tail.key;
    }

    return {
        insertHead,
        removeNode,
        moveToHead,
        removeTail,
    }
};

const LRUCache = (capacity) => {
    let object = {};
    const linkedList = DoublyLinkedList();
    let count = 0;

    const get = (key) => {
        console.log(linkedList);
        const currentNode = object[key];
        if (!currentNode) return -1;

        linkedList.moveToHead(currentNode);

        return currentNode.value;
    };

    const put = function (key, value) {
        const currentNode = object[key];

        if (currentNode) {
            currentNode.value = value;
            linkedList.moveToHead(currentNode);
        } else {
            const newNode = LinkedListNode(key, value);
            object[key] = newNode;

            linkedList.insertHead(newNode);
            count += 1;
        }

        if (count > capacity) {
            const tailKey = linkedList.removeTail();
            delete object[tailKey];
            count -= 1;
        }
    };

    return {
        get,
        put,
    }
};

const test = LRUCache(2);

// console.log(
//     test.put(2,1),
//     test.put(3,2),
//     test.get(3),
//     test.get(2),
//     test.put(4,3),
//     test.get(2),
//     test.get(3),
//     test.get(4),
// )

// console.log(JSON.stringify(test.get(2), null, 1))
// expected [null,null,null,2,1,null,1,-1,3]

const testObject = {
    a: {
        b: {
            c: 'c'
		}
	}
};
const pretty = JSON.stringify(testObject, null, 2)
// console.log(testObject) // { a: { b: { c: 'c' } } }
// console.log(pretty) // same as seen in code
// {
//     "a": {
//         "b": {
//             "c": "c"
//         }
//     }
// }
