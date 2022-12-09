'use strict';

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let temp = this.root;

        while (true) {
            if (newNode.value === temp.value) {
                return null;
            }

            if (newNode.value < temp.value) {
                if (!temp.left) {
                    temp.left = newNode;
                    return this;
                }
                temp = temp.left;
            } else {
                if (!temp.right) {
                    temp.right = newNode;
                    return this;
                }
                temp = temp.right;
            }
        }
    }

    contains(value) {
        if (!this.root) {
            return false;
        }

        let temp = this.root;

        while (temp) {
            if (value < temp.value) {
                temp = temp.left;
            } else if (value > temp.value) {
                temp = temp.right;
            } else {
                return true;
            }
        }

        return false;
    }

    minValueNode(currentNode) {
        while (currentNode.left) {
            currentNode = currentNode.left;
        }

        return currentNode;
    }

    breadthFirstSearch() {
        const result = [];
        const queue = [];
        let currentNode = this.root;
        queue.push(currentNode);

        while (queue.length) {
            currentNode = queue.shift();
            result.push(currentNode.value);

            if (currentNode.left) {
                queue.push(currentNode.left);
            }

            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        return result;
    }

    depthFirstSearchPreOrder() {
        const result = [];
        const traverse = function(node) {
            result.push(node.value);
            if (node.left) {
                traverse(node.left);
            }
            if (node.right) {
                traverse(node.right);
            }
        };
        traverse(this.root);
        return result;
    }
}

exports.BinarySearchTree = BinarySearchTree;
