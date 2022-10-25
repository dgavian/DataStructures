const chai = require('chai');
const should = chai.should();

const { Queue } = require('../app/Queue');

describe('Queue', function() {
    let nodeVal;

    describe('constructor', function() {
        it('should create a queue with one node with the supplied value', () => {
            const value = 42;
            const expectedLength = 1;

            const sut = new Queue(value);

            sut.length.should.equal(expectedLength);
            sut.first.should.equal(sut.last);
            sut.first.value.should.equal(value);
            should.not.exist(sut.first.next);
        });
    });

    describe('enqueue', function() {
        it('should add a new node with the value as the new first and last of an empty queue', () => {
            const newVal = 42;
            const expectedLength = 1;
            const sut = makeEmptyQueue();

            sut.enqueue(newVal);

            sut.length.should.equal(expectedLength);
            sut.first.should.equal(sut.last);
            sut.first.value.should.equal(newVal);
            should.not.exist(sut.last.next);
        });

        it('should add a new node with the value as the new last node of an existing queue', () => {
            const newVal = 43;
            const expectedLength = 2;
            const sut = makeSut();
            const expectedFirstVal = sut.first.value;

            sut.enqueue(newVal);

            sut.length.should.equal(expectedLength);
            sut.last.value.should.equal(newVal);
            sut.first.value.should.equal(expectedFirstVal);
            sut.first.next.should.equal(sut.last);
            should.not.exist(sut.last.next);
        });
    });

    describe('dequeue', function() {
        it('should return the only node from a queue with one item, and empty the queue', () => {
            const expectedLength = 0;
            const sut = makeSut();
            const expected = sut.first;

            const actual = sut.dequeue();

            actual.should.equal(expected);
            sut.length.should.equal(expectedLength);
            should.not.exist(sut.first);
            should.not.exist(sut.last);
        });

        it('should return the first node from a queue with multiple items, remove that item from the queue, and repoint the first node accordingly', () => {
            const initialLength = 5;
            const expectedLength = 4;
            const initialFirstVal = 1;
            const expectedFirstVal = 2;
            const sut = makePopulatedQueue();
            const expected = sut.first;
            const initialLast = sut.last;
            sut.length.should.equal(initialLength);
            sut.first.value.should.equal(initialFirstVal);

            const actual = sut.dequeue();

            actual.should.equal(expected);
            should.not.exist(actual.next);
            sut.length.should.equal(expectedLength);
            sut.last.should.equal(initialLast);
            sut.first.value.should.equal(expectedFirstVal);
            should.not.exist(sut.last.next);
        });

        it('should return null from an already empty queue', () => {
            const sut = makeEmptyQueue();
            const expectedLength = 0;

            const actual = sut.dequeue();

            should.not.exist(actual);
            sut.length.should.equal(expectedLength);
            should.not.exist(sut.first);
            should.not.exist(sut.last);
        });
    });

    function makeSut() {
        nodeVal = 1;
        return new Queue(nodeVal);
    }

    function makeEmptyQueue() {
        const sut = makeSut();
        sut.dequeue();
        return sut;
    }

    function makePopulatedQueue() {
        const sut = makeSut();
        return sut.enqueue(2).enqueue(3).enqueue(5).enqueue(8);
    }
});
