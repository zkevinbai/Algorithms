function maxDepth(root) {
    if(!root) return 0;
    if(!root.left && !root.right) return 1;

    let leftTraversal = 0;
    let rightTraversal = 0;

    if(root.left) {
        leftTraversal += maxDepth(root.left);
    }

    if(root.right) {
        leftTraversal += maxDepth(root.right);
    }

    if(leftTraversal > rightTraversal) {
        return leftTraversal + 1;
    } else {
        return rightTraversal + 1;
    }
};