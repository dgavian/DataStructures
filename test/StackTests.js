const chai = require('chai');
const should = chai.should();

const { Stack } = require('../app/Stack');

describe('Stack', function() {
    let topVal;
    describe('constructor', function() {
        it('should create a stack with one node with the supplied value', () => {
            const value = 42;
            const expectedLength = 1;

            const sut = new Stack(value);

            sut.length.should.equal(expectedLength);
            sut.top.value.should.equal(value);
            should.not.exist(sut.top.next);
        });
    });

    describe('push', function() {
        it('should add a new node as the new top of an existing stack', () => {
            topVal = 42;
            const newVal = 41;
            const expectedLength = 2;
            const sut = makeSut();

            sut.push(newVal);

            sut.length.should.equal(expectedLength);
            sut.top.value.should.equal(newVal);
            sut.top.next.value.should.equal(topVal);
        });

        it('should add a new node with the value as the new top of an empty stack', () => {
            const newVal = 42;
            const expectedLength = 1;
            const sut = makeEmptyStack();

            sut.push(newVal);

            sut.length.should.equal(expectedLength);
            sut.top.value.should.equal(newVal);
        });
    });

    describe('pop', function() {
        it('should return the only node from a stack with one item, and empty the stack', () => {
            topVal = 42;
            const expectedLength = 0;
            const sut = makeSut();
            const expected = sut.top;

            const actual = sut.pop();

            actual.should.equal(expected);
            sut.length.should.equal(expectedLength);
            should.not.exist(sut.top);
        });

        it('should return the top from a stack with multiple items, remove that item from the stack, and repoint the top accordingly', () => {
            const initialLength = 5;
            const expectedLength = 4;
            const initialTopVal = 8;
            const expectedTopVal = 5;
            const sut = makePopulatedStack();
            const expected = sut.top;
            sut.length.should.equal(initialLength);
            sut.top.value.should.equal(initialTopVal);

            const actual = sut.pop();

            actual.should.equal(expected);
            should.not.exist(actual.next);
            sut.length.should.equal(expectedLength);
            sut.top.value.should.equal(expectedTopVal);
        });

        it('should return null from an already empty stack', () => {
            const sut = makeEmptyStack();
            const expectedLength = 0;

            const actual = sut.pop();

            should.not.exist(actual);
            sut.length.should.equal(expectedLength);
            should.not.exist(sut.top);
        });
    });

    function makeSut() {
        return new Stack(topVal);
    }

    function makeEmptyStack() {
        topVal = 0;
        const sut = makeSut();
        sut.pop();
        return sut;
    }

    function makePopulatedStack() {
        topVal = 1;
        const sut = makeSut();
        sut.push(2).push(3).push(5).push(8);
        return sut;
    }
});
