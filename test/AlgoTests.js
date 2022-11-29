'use strict';

const chai = require('chai');
chai.should();

const { Algo } = require('../app/Algo');

describe('Algo', function() {
    describe('factorial', function() {
        it('should return the expected value', () => {
            const input = 4;
            const expected = 24;
            const sut = makeSut();

            const actual = sut.factorial(input);

            actual.should.equal(expected);
        });

        it('should return the expected value for 8', () => {
            const input = 8;
            const expected = 40320;
            const sut = makeSut();

            const actual = sut.factorial(input);

            actual.should.equal(expected);
        });

        it('should return the expected value for 20', () => {
            const input = 20;
            const expected = 2432902008176640000;
            const sut = makeSut();

            const actual = sut.factorial(input);

            actual.should.equal(expected);
        });
    });

    describe('bubbleSort', function() {
        it('should return a sorted array', () => {
            const input = [4, 2, 6, 5, 1, 3];
            const expected = [1, 2, 3, 4, 5, 6];
            const sut = makeSut();

            const actual = sut.bubbleSort(input);

            actual.should.deep.equal(expected);
        });
    });

    describe('selectionSort', function() {
        it('should return a sorted array', () => {
            const input = [4, 2, 6, 5, 1, 3];
            const expected = [1, 2, 3, 4, 5, 6];
            const sut = makeSut();

            const actual = sut.selectionSort(input);

            actual.should.deep.equal(expected);
        });
    });

    describe('insertionSort', function() {
        it('should return a sorted array from an array that has only 2 elements out of order', () => {
            const input = [1, 2, 4, 3, 5, 6];
            const expected = [1, 2, 3, 4, 5, 6];
            const sut = makeSut();

            const actual = sut.insertionSort(input);

            actual.should.deep.equal(expected);
        });

        it('should return a sorted array', () => {
            const input = [4, 2, 6, 5, 1, 3];
            const expected = [1, 2, 3, 4, 5, 6];
            const sut = makeSut();

            const actual = sut.insertionSort(input);

            actual.should.deep.equal(expected);
        });
    });

    describe('merge', function() {
        it('should merge 2 sorted arrays into one sorted array', () => {
            const array1 = [1, 3, 7, 8];
            const array2 = [2, 4, 5, 6];
            const expected = [1, 2, 3, 4, 5, 6, 7, 8];
            const sut = makeSut();

            const actual = sut.merge(array1, array2);

            actual.should.deep.equal(expected);
        });
    });

    function makeSut() {
        return new Algo();
    }
});
