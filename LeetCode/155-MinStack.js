/* 
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.


Example 1:

Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2


Constraints:

Methods pop, top and getMin operations will always be called on non-empty stacks.

 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
*/

/**
 * initialize your data structure here.
 */
var MinStack = function () {
    this.max = null;
    this.min = null;
    this.stack = [];
};

MinStack.prototype.push = function (number) {   
    this.stack.push({
        value: number,
        min: this.min,
        max: this.max,
    });

    if (this.max < number || !this.max) {
        this.max = number;
    }

    if (this.min > number || !this.min) {
        this.min = number;
    }
};

MinStack.prototype.pop = function () {
    const poppedValue =  this.stack.pop().value;

    // reset the min and max;
    if (poppedValue === this.max) {
        this.max = popped.max;
    }

    if (poppedValue === this.min) {
        this.min = popped.min;
    }
};

MinStack.prototype.top = function () {
    return this.max;
};

MinStack.prototype.getMin = function () {
    return this.min;
};
