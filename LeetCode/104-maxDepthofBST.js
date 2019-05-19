function maxDepth(root) {
    if(!root) return 0;
    if(!root.left && !root.right) return 1;

    let leftTraversal = 0;
    let rightTraversal = 0;

    if(root.left) leftTraversal += maxDepth(root.left);
    if(root.right) rightTraversal += maxDepth(root.right);

    if(leftTraversal > rightTraversal) return leftTraversal;
    return rightTraversal;
};