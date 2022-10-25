const { Node } = require('./LinkedList');

class Queue {
    constructor(value) {
        const newNode = new Node(value);

        this.first = newNode;
        this.last = newNode;
        this.length = 1;
    }

    enqueue(value) {
        const newNode = new Node(value);
        if (!this.length) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.length++;
        return this;
    }

    dequeue() {
        if (!this.length) {
            return null;
        }

        const result = this.first;

        this.first = this.first.next || null;
        if (!this.first) {
            this.last = null;
        } else {
            result.next = null;
        }

        this.length--;

        return result;
    }
}

exports.Queue = Queue;
