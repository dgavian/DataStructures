class LinkedList {
    constructor(value) {
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = newNode;
        this.length = 1;
    }

    push(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    pop() {
        const result = this.tail || null;

        if (result) {

            if (this.head === this.tail) {
                this.head = null;
                this.tail = null;
            } else {
                let currentNode = this.head;
                while (currentNode.next !== this.tail) {
                    currentNode = currentNode.next;
                }
                currentNode.next = null;
                this.tail = currentNode;
            }

            this.length--;
        }

        return result;
    }

    unshift(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
        return this;
    }

    shift() {
        const result = this.head || null;

        if (result) {

            if (this.head === this.tail) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                result.next = null;
            }

            this.length--;
        }

        return result;
    }

    get(index) {
        if (this.#isIndexOutOfRange(index)) {
            return null;
        }

        let currentNode = this.head;

        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }

        return currentNode;
    }

    set(index, value) {
        const node = this.get(index);

        if (node) {
            node.value = value;
        }

        return !!node;
    }

    insert(index, value) {
        if (index === 0) {
            return this.unshift(value);
        }

        if (index === this.length) {
            return this.push(value);
        }

        if (this.#isIndexOutOfRange(index)) {
            return false;
        }

        const newNode = new Node(value);
        const previousNode = this.get(index - 1);
        
        newNode.next = previousNode.next;
        previousNode.next = newNode;

        this.length++;
        return true;
    }

    #isIndexOutOfRange(index) {
        return (index >= this.length || index < 0);
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

exports.Node = Node;

exports.LinkedList = LinkedList;
