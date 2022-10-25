const chai = require('chai');
const should = chai.should();

const { DoublyLinkedList } = require('../app/DoublyLinkedList');

describe('DoublyLinkedList', function() {
    let headVal;
    describe('constructor', function() {
        it('should create a doubly linked list with one node with the supplied value', () => {
            const value = 42;
            const expectedLength = 1;

            const sut = new DoublyLinkedList(value);

            sut.length.should.equal(expectedLength);
            sut.head.should.equal(sut.tail);
            sut.head.value.should.equal(value);
            should.not.exist(sut.tail.next);
            should.not.exist(sut.tail.prev);
        });
    });

    describe('push', function() {
        it('should add a new node with the value as the new tail of an existing doubly linked list', () => {
            headVal = 42;
            const newVal = 43;
            const expectedLength = 2;
            const sut = makeSut();

            sut.push(newVal);

            sut.length.should.equal(expectedLength);
            sut.tail.value.should.equal(newVal);
            sut.head.value.should.equal(headVal);
            sut.head.next.should.equal(sut.tail);
            sut.tail.prev.should.equal(sut.head);
            should.not.exist(sut.tail.next);
            should.not.exist(sut.head.prev);
        });

        it('should add a new node with the value as the new head and tail of an empty doubly linked list', () => {
            const newVal = 42;
            const expectedLength = 1;
            const sut = makeEmptyDoublyLinkedList();

            sut.push(newVal);

            sut.length.should.equal(expectedLength);
            sut.head.should.equal(sut.tail);
            sut.head.value.should.equal(newVal);
            should.not.exist(sut.head.next);
            should.not.exist(sut.tail.prev);
        });
    });

    describe('pop', function() {
        it('should return the tail from a doubly linked list with multiple items, remove that item from the list, and update the tail accordingly', () => {
            const initialLength = 5;
            const expectedLength = 4;
            const initialTailVal = 8;
            const expectedTailVal = 5;
            const expectedPrevVal = 3;
            const sut = makePopulatedDoublyLinkedList();
            const initialHead = sut.head;
            sut.length.should.equal(initialLength);
            sut.tail.value.should.equal(initialTailVal);

            const actual = sut.pop();

            actual.value.should.equal(initialTailVal);
            should.not.exist(actual.prev);
            should.not.exist(actual.next);
            sut.length.should.equal(expectedLength);
            sut.head.should.equal(initialHead);
            sut.tail.value.should.equal(expectedTailVal);
            sut.tail.prev.value.should.equal(expectedPrevVal);
            should.not.exist(sut.tail.next);
        });

        it('should return the only node from a doubly linked list with one item, and empty the list', () => {
            headVal = 42;
            const expectedLength = 0;
            const sut = makeSut();
            const expected = sut.head;

            const actual = sut.pop();

            actual.should.equal(expected);
            should.not.exist(actual.prev);
            should.not.exist(actual.next);
            sut.length.should.equal(expectedLength);
            should.not.exist(sut.head);
            should.not.exist(sut.tail);
        });

        it('should return null from an already empty list', () => {
            const sut = makeEmptyDoublyLinkedList();
            const expectedLength = 0;

            const actual = sut.pop();

            should.not.exist(actual);
            sut.length.should.equal(expectedLength);
            should.not.exist(sut.head);
            should.not.exist(sut.tail);
        });
    });

    describe('unshift', function() {
        it('should add a new node as the new head of an existing doubly linked list', () => {
            headVal = 42;
            const newVal = 41;
            const expectedLength = 2;
            const sut = makeSut();

            sut.unshift(newVal);

            sut.length.should.equal(expectedLength);
            sut.head.value.should.equal(newVal);
            sut.head.next.value.should.equal(headVal);
            sut.head.next.should.equal(sut.tail);
            sut.tail.prev.should.equal(sut.head);
            should.not.exist(sut.tail.next);
            should.not.exist(sut.head.prev);
        });

        it('should add a new node with the value as the new head and tail of an empty linked list', () => {
            const newVal = 42;
            const expectedLength = 1;
            const sut = makeEmptyDoublyLinkedList();

            sut.unshift(newVal);

            sut.length.should.equal(expectedLength);
            sut.head.should.equal(sut.tail);
            sut.head.value.should.equal(newVal);
            should.not.exist(sut.tail.next);
            should.not.exist(sut.tail.prev);
        });
    });

    describe('shift', function() {
        it('should return the only node from a doubly linked list with one item, and empty the list', () => {
            headVal = 42;
            const expectedLength = 0;
            const sut = makeSut();
            const expected = sut.head;

            const actual = sut.shift();

            actual.should.equal(expected);
            sut.length.should.equal(expectedLength);
            should.not.exist(sut.head);
            should.not.exist(sut.tail);
        });

        it('should return the head from a doubly linked list with multiple items, remove that item from the list, and repoint the head accordingly', () => {
            const initialLength = 5;
            const expectedLength = 4;
            const initialHeadVal = 1;
            const expectedHeadVal = 2;
            const sut = makePopulatedDoublyLinkedList();
            const expected = sut.head;
            const initialTail = sut.tail;
            sut.length.should.equal(initialLength);
            sut.head.value.should.equal(initialHeadVal);

            const actual = sut.shift();

            actual.should.equal(expected);
            should.not.exist(actual.next);
            should.not.exist(actual.prev);
            sut.length.should.equal(expectedLength);
            sut.tail.should.equal(initialTail);
            sut.head.value.should.equal(expectedHeadVal);
            should.not.exist(sut.tail.next);
            sut.tail.prev.should.be.ok;
        });

        it('should return null from an already empty list', () => {
            const sut = makeEmptyDoublyLinkedList();
            const expectedLength = 0;

            const actual = sut.shift();

            should.not.exist(actual);
            sut.length.should.equal(expectedLength);
            should.not.exist(sut.head);
            should.not.exist(sut.tail);
        });
    });

    describe('get', function() {
        it('should return the head for a list with 1 item with a zero index', () => {
            const index = 0;
            headVal = 42;
            const sut = makeSut();
            const expected = sut.head;

            const actual = sut.get(index);

            actual.should.equal(expected);
        });

        it('should return null for an out of bounds index', () => {
            const sut = makePopulatedDoublyLinkedList();
            const index = sut.length;

            const actual = sut.get(index);

            should.not.exist(actual);
        });

        it('should return null for an empty list', () => {
            const sut = makeEmptyDoublyLinkedList();
            const index = 0;

            const actual = sut.get(index);

            should.not.exist(actual);
        });

        it('should return the tail for an index one less than the size of the linked list', () => {
            const index = 4;
            const sut = makePopulatedDoublyLinkedList();
            const expected = sut.tail;

            const actual = sut.get(index);

            actual.should.equal(expected);
        });

        it('should return the expected node for an index in the middle of the list', () => {
            const index = 2;
            const sut = makePopulatedDoublyLinkedList();
            const expectedValue = 3;

            const actual = sut.get(index);

            actual.value.should.equal(expectedValue);
        });

        it('should return the expected node for an index near the end of the list', () => {
            const index = 3;
            const sut = makePopulatedDoublyLinkedList();
            const expectedValue = 5;

            const actual = sut.get(index);

            actual.value.should.equal(expectedValue);
        });
    });

    describe('set', function() {
        it('should set the expected node to the expected value', () => {
            const index = 2;
            const sut = makePopulatedDoublyLinkedList();
            const newValue = 9;

            const actual = sut.set(index, newValue);
            const node = sut.get(index);

            actual.should.be.true;
            node.value.should.equal(newValue);
        });

        it('should set the expected node near the end of the list to the expected value', () => {
            const index = 3;
            const sut = makePopulatedDoublyLinkedList();
            const newValue = 42;

            const actual = sut.set(index, newValue);
            const node = sut.get(index);

            actual.should.be.true;
            node.value.should.equal(newValue);
        });

        it('should not set any nodes for an out of bounds index', () => {
            headVal = 42;
            const index = 1;
            const sut = makeSut();
            const newValue = 9;

            const actual = sut.set(index, newValue);

            actual.should.be.false;
            sut.head.value.should.equal(headVal);
            should.not.exist(sut.head.next);
        });
    });

    describe('insert', function() {
        it('should insert a node at the expected index', () => {
            const sut = makePopulatedDoublyLinkedList();
            const index = 1;
            const oldValue = 2;
            const newValue = 42;
            const expectedLength = 6;

            const actual = sut.insert(index, newValue);
            const newItem = sut.get(index);
            const oldItem = newItem.next;

            actual.should.be.true;
            sut.length.should.equal(expectedLength);
            newItem.value.should.equal(newValue);
            oldItem.value.should.equal(oldValue);
            oldItem.prev.should.equal(newItem);
            sut.head.next.should.equal(newItem);
            newItem.prev.should.equal(sut.head);
        });

        it('should add a new node as the new head for an index of zero', () => {
            headVal = 42;
            const newVal = 41;
            const expectedLength = 2;
            const index = 0;
            const sut = makeSut();

            const actual = sut.insert(index, newVal);
            const newHead = actual.head;

            actual.should.equal(sut);
            actual.length.should.equal(expectedLength);
            newHead.value.should.equal(newVal);
            newHead.next.value.should.equal(headVal);
            actual.tail.prev.should.equal(newHead);
            should.not.exist(actual.tail.next);
        });

        it('should add a new node as the new tail for an index of the linked list size', () => {
            const newVal = 41;
            const expectedLength = 6;
            const index = 5;
            const sut = makePopulatedDoublyLinkedList();

            const oldTail = sut.tail;
            const actual = sut.insert(index, newVal);

            actual.should.equal(sut);
            actual.length.should.equal(expectedLength);
            actual.tail.value.should.equal(newVal);
            actual.tail.prev.should.equal(oldTail);
            should.not.exist(actual.tail.next);
        });

        it('should return false for a negative index', () => {
            const newVal = 41;
            const expectedLength = 5;
            const index = -1;
            const sut = makePopulatedDoublyLinkedList();

            const actual = sut.insert(index, newVal);

            actual.should.be.false;
            sut.length.should.equal(expectedLength);
            sut.head.value.should.not.equal(newVal);
        });

        it('should return false for an index greater than the size of the linked list', () => {
            const newVal = 41;
            const expectedLength = 5;
            const index = 6;
            const sut = makePopulatedDoublyLinkedList();

            const actual = sut.insert(index, newVal);

            actual.should.be.false;
            sut.length.should.equal(expectedLength);
        });
    });

    describe('remove', function() {
        it('should remove the first node for an index of zero', () => {
            const index = 0;
            const expectedLength = 4;
            const expectedHeadVal = 2;
            const sut = makePopulatedDoublyLinkedList();
            const expected = sut.head;

            const actual = sut.remove(index);

            actual.should.equal(expected);
            sut.length.should.equal(expectedLength);
            sut.head.value.should.equal(expectedHeadVal);
            should.not.exist(sut.head.prev);
        });

        it('should remove the last node for an index of 1 less than the size of the linked list', () => {
            const index = 4;
            const expectedLength = 4;
            const expectedTailVal = 5;
            const expectedTailPreviousVal = 3;
            const sut = makePopulatedDoublyLinkedList();
            const expected = sut.tail;

            const actual = sut.remove(index);

            actual.should.equal(expected);
            sut.length.should.equal(expectedLength);
            sut.tail.value.should.equal(expectedTailVal);
            sut.tail.prev.value.should.equal(expectedTailPreviousVal);
            should.not.exist(sut.tail.next);
        });

        it('should remove the expected node for in the middle of the linked list', () => {
            const index = 2;
            const expectedLength = 4;
            const sut = makePopulatedDoublyLinkedList();
            const expectedVal = 3;

            const actual = sut.remove(index);

            actual.value.should.equal(expectedVal);
            sut.length.should.equal(expectedLength);
            const nodeAtIndex = sut.get(index);
            nodeAtIndex.next.should.be.ok;
            nodeAtIndex.prev.should.be.ok;
        });

        it('should not remove anything for a negative index', () => {
            const index = -1;
            const expectedLength = 5;
            const sut = makePopulatedDoublyLinkedList();

            const actual = sut.remove(index);

            sut.length.should.equal(expectedLength);
            should.not.exist(actual);
        });

        it('should not remove anything for an out of bounds index', () => {
            const index = 5;
            const expectedLength = 5;
            const sut = makePopulatedDoublyLinkedList();

            const actual = sut.remove(index);

            sut.length.should.equal(expectedLength);
            should.not.exist(actual);
        });
    });

    function makeSut() {
        return new DoublyLinkedList(headVal);
    }

    function makePopulatedDoublyLinkedList() {
        headVal = 1;
        const sut = makeSut();
        return sut.push(2).push(3).push(5).push(8);
    }

    function makeEmptyDoublyLinkedList() {
        headVal = 0;
        const sut = makeSut();
        sut.pop();
        return sut;
    }
});
