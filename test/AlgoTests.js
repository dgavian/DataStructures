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

    describe('fibonacci', function() {
        it ('should return the expected value for 0', () => {
            const input = 0;
            const expected = 0;
            const sut = makeSut();

            const actual = sut.fibonacci(input);

            actual.should.equal(expected);
        });

        it ('should return the expected value for 1', () => {
            const input = 1;
            const expected = 1;
            const sut = makeSut();

            const actual = sut.fibonacci(input);

            actual.should.equal(expected);
        });

        it ('should return the expected value for 2', () => {
            const input = 2;
            const expected = 2;
            const sut = makeSut();

            const actual = sut.fibonacci(input);

            actual.should.equal(expected);
        });

        it ('should return the expected value for 3', () => {
            const input = 3;
            const expected = 3;
            const sut = makeSut();

            const actual = sut.fibonacci(input);

            actual.should.equal(expected);
        });

        it ('should return the expected value for 4', () => {
            const input = 4;
            const expected = 5;
            const sut = makeSut();

            const actual = sut.fibonacci(input);

            actual.should.equal(expected);
        });

        it ('should return the expected value for 5', () => {
            const input = 5;
            const expected = 8;
            const sut = makeSut();

            const actual = sut.fibonacci(input);

            actual.should.equal(expected);
        });

        it ('should return the expected value for 6', () => {
            const input = 6;
            const expected = 13;
            const sut = makeSut();

            const actual = sut.fibonacci(input);

            actual.should.equal(expected);
        });

        it ('should return the expected value for 8', () => {
            const input = 8;
            const expected = 34;
            const sut = makeSut();

            const actual = sut.fibonacci(input);

            actual.should.equal(expected);
        });

        it ('should return the expected value for 28', () => {
            const input = 28;
            const expected = 514229;
            const sut = makeSut();

            const actual = sut.fibonacci(input);

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

    describe('mergeSort', function() {
        it('should sort an unsorted array', () => {
            const input = [5, 4, 7, 1, 3, 2, 8, 6];
            const expected = [1, 2, 3, 4, 5, 6, 7, 8];
            const sut = makeSut();

            const actual = sut.mergeSort(input);

            actual.should.deep.equal(expected);
        });

        it('should sort a small array', () => {
            const input = [3, 1, 4, 2];
            const expected = [1, 2, 3, 4];
            const sut = makeSut();

            const actual = sut.mergeSort(input);

            actual.should.deep.equal(expected);
        });
    });

    describe('pivot', function() {
        it('should pivot the array as expected', () => {
            const input = [4, 6, 1, 7, 3, 2, 5];
            const expectedArr = [2, 1, 3, 4, 6, 7, 5];
            const expected = 3;
            const sut = makeSut();

            const actual = sut.pivot(input);

            actual.should.equal(expected);
            input.should.deep.equal(expectedArr);
        });
    });

    describe('quickSort', function() {
        it('should sort the array as expected', () => {
            const input = [4, 6, 1, 7, 3, 2, 5];
            const expected = [1, 2, 3, 4, 5, 6, 7];
            const sut = makeSut();

            const actual = sut.quickSort(input);

            actual.should.deep.equal(expected);
        });
    });

    function makeSut() {
        return new Algo();
    }
});
