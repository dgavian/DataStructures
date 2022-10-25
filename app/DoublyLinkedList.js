class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor(value) {
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = newNode;
        this.length = 1;
    }

    push(value) {
        const newNode = new Node(value);
        if (!this.tail) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
        }
        this.tail = newNode;

        this.length++;

        return this;
    }

    pop() {
        const popped = this.tail || null;

        if (popped) {
            if (this.head !== popped) {
                this.tail = popped.prev;
                this.tail.next = null;
                popped.prev = null;
            } else {
                this.head = null;
                this.tail = null;
            }

            this.length--;
        }

        return popped;
    }

    unshift(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
        }
        this.head = newNode;

        this.length++;

        return this;
    }

    shift() {
        const shifted = this.head || null;

        if (shifted) {
            if (this.tail !== shifted) {
                this.head = shifted.next;
                this.head.prev = null;
                shifted.next = null;
            } else {
                this.head = null;
                this.tail = null;
            }

            this.length--;
        }

        return shifted;
    }

    get(index) {
        if (this.#isIndexOutOfRange(index)) {
            return null;
        }

        let currentNode;

        if (this.#isInFirstHalfOfCollection(index)) {
            currentNode = this.head;
            console.log('Looping forward from head.');
            for (let i = 0; i < index; i++) {
                currentNode = currentNode.next;
            }
        } else {
            currentNode = this.tail;
            console.log('Looping backwards from tail.');
            for (let i = this.length - 1; i > index; i--) {
                currentNode = currentNode.prev;
            }
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
        const nextNode = previousNode.next;

        previousNode.next = newNode;
        newNode.prev = previousNode;
        newNode.next = nextNode;
        nextNode.prev = newNode;

        this.length++;
        return true;
    }

    remove(index) {
        if (index === 0) {
            return this.shift();
        }

        if (index === this.length - 1) {
            return this.pop();
        }

        if (this.#isIndexOutOfRange(index)) {
            return null;
        }

        const nodeToRemove = this.get(index);
        const nextNode = nodeToRemove.next;
        const previousNode = nodeToRemove.prev;

        previousNode.next = nextNode;
        nextNode.prev = previousNode;
        nodeToRemove.next = null;
        nodeToRemove.prev = null;

        this.length--;
        return nodeToRemove;
    }


    #isIndexOutOfRange(index) {
        return (index >= this.length || index < 0);
    }

    #isInFirstHalfOfCollection(index) {
        return index < (this.length / 2);
    }
}

exports.DoublyLinkedList = DoublyLinkedList