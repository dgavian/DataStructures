const { Node } = require('./LinkedList');

class Stack {
    // Note: a javascript array is also a good data structure for a stack as long as you use the end (not the beginning)
    // of the array for pushing and popping (to avoid reindexing the entire array).

    constructor(value) {
        const newNode = new Node(value);
        this.top = newNode;
        this.length = 1;
    }

    push(value) {
        const newNode = new Node(value);

        newNode.next = this.top;
        this.top = newNode;

        this.length++;
        return this;
    }

    pop() {
        const result = this.top || null;

        if (result) {
            this.top = result.next;
            result.next = null;
            this.length--;
        }

        return result;
    }
}

exports.Stack = Stack;
