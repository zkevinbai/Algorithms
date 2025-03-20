//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

// strategy 2 - someone else's code

//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function deleteFromBST(t, queries) {
    for (var i = 0; i < queries.length; i++) {
        t = deleteNode(t, queries[i]);
    }
    return t;
}

function getRightmost(t) {
    if (!t) {
        return null;
    }

    while (t.right) {
        t = t.right;
    }

    return t;
}

function removeRightmost(t) {
    if (!t) {
        return null;
    }

    if (!t.right)
        return t.left;
    t.right = removeRightmost(t.right);
    return t;
}

function deleteNode(t, query) {
    if (t == null)
        return t;

    if (t.value == query) {
        if (!t.left) {
            return t.right;
        } else {
            t.value = getRightmost(t.left).value;
            t.left = removeRightmost(t.left);
        }
    } else if (t.value > query) {
        t.left = deleteNode(t.left, query);
    } else {
        t.right = deleteNode(t.right, query);
    }

    return t;
}

// strategy 2 

function deleteFromBST(t, queries){

    for (let index = 0; index < queries.length; index++) {
        const query = queries[index];
        
        t = deleteNode(t, query);
    }

    return t;
}

function deleteNode(root, key) {
    // Find node to delete.
    if (root !== null) {
        let current = root;
        let stack = [];

        while (current) {
            stack.push(current);

            if (current.value === key) {
                // Found the node to delete.
                stack.pop();
                let parent = stack.pop();

                if (!current.left && !current.right) {
                    // No children, just remove the node.
                    if (parent && parent.left && parent.left.value === current.value) {
                        parent.left = null;
                    }
                    else if (parent) {
                        parent.right = null;
                    }
                    else {
                        // No parent, this must be the root node.
                        root = [];
                    }
                }
                else if (current.left && !current.right) {
                    // One left child node.
                    if (parent && parent.left && parent.left.value === current.value) {
                        parent.left = current.left;
                    }
                    else if (parent) {
                        parent.right = current.left;
                    }
                    else {
                        // No parent, this must be the root node.
                        root = current.left;
                    }
                }
                else if (current.right && !current.left) {
                    // One right child node.
                    if (parent && parent.left && parent.left.value === current.value) {
                        parent.left = current.right;
                    }
                    else if (parent) {
                        parent.right = current.right;
                    }
                    else {
                        // No parent, this must be the root node.
                        root = current.right;
                    }
                }
                else {
                    // Node has 2 children.
                    // First, find the minimum element in the right subtree of the node to be removed.
                    let minNode = current.right;
                    while (minNode) {
                        if (minNode.left) {
                            minNode = minNode.left;
                        }
                        else {
                            // We're at the bottom of the subtree.
                            break;
                        }
                    }

                    // Delete minNode.
                    current = deleteNode(current, minNode.value);

                    // Replace value.
                    current.value = minNode.value;
                }
                break;
            }
            else if (key < current.value) {
                current = current.left;
            }
            else if (key > current.value) {
                current = current.right;
            }
        }
    }

    return root;
};

// strategy 1

// search BST

// find the element

// run deletion algorithm

function deleteFromBST(t, queries) {
    let queries2 = [];
    for (let i = 0; i < queries.length; i++) {
        let query = queries[i];

        let foundNode = false;
        let queue = [t];

        // find the target node using BFS
        while(queue.length || foundNode){
            let shift = queue.shift();
            if(shift.value === query){
                foundNode = shift;
            } else {
                if(shift.left){
                    queue.push(shift.left)
                }
                if(shift.right){
                    queue.push(shift.right)
                }
            }
        }
        
        // delete the node from the BST
        if(foundNode){
            // find the right most node of its left side

            let nodeLeft = foundNode.left;
            let rightMost = nodeLeft;

            while(rightMost.right){
                rightMost = rightMost.right;
            }

            // rebase the found node at the rightMost/ replace found Node
        }
    }

}
