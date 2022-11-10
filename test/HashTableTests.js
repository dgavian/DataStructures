'use strict';

const chai = require('chai');
const should = chai.should();

const { HashTable } = require('../app/HashTable');

describe('HashTable', function() {
    describe('constructor', function() {
        it('should use the default size if size is not supplied', () => {
            const expectedSize = 7;

            const sut = new HashTable();

            sut.dataMap.length.should.equal(expectedSize);
        });

        it('should use the supplied size', () => {
            const size = 23;

            const sut = new HashTable(size);

            sut.dataMap.length.should.equal(size);
        });
    });

    describe('set', function() {
        // 1 for key; 1 for value.
        const expectedItemSize = 2;
        it('should map a kvp to the expected address space', () => {
            const key = 'lumber';
            const value = 70;
            const expectedIndex = 6;
            const expectedEntrySize = 1;
            const sut = makeSut();

            const actual = sut.set(key, value);

            actual.dataMap[expectedIndex].length.should.equal(expectedEntrySize);
            actual.dataMap[expectedIndex][0].length.should.equal(expectedItemSize);
        });

        it('should map two kvps to the same address space when they have the same key', () => {
            const key1 = 'washers';
            const value1 = 50;
            const key2 = 'bolts';
            const value2 = 1400;
            const expectedIndex = 4;
            const expectedEntrySize = 2;
            const sut = makeSut();

            const actual = sut.set(key1, value1);
            actual.set(key2, value2);

            actual.dataMap[expectedIndex].length.should.equal(expectedEntrySize);
        });
    });

    describe('get', function() {
        it('should return the expected value for a given key', () => {
            const key1 = 'bolts';
            const value1 = 1400;
            const key2 = 'washers';
            const value2 = 50;
            const sut = makeSut();
            sut.set(key1, value1);
            sut.set(key2, value2);

            const actual = sut.get(key1);

            actual.should.equal(value1);
        });

        it('should return the expected value for a key with a collision', () => {
            const key1 = 'bolts';
            const value1 = 1400;
            const key2 = 'washers';
            const value2 = 50;
            const sut = makeSut();
            sut.set(key1, value1);
            sut.set(key2, value2);

            const actual = sut.get(key2);

            actual.should.equal(value2);
        });

        it('should return null for a key that does not exist', () => {
            const key1 = 'bolts';
            const value1 = 1400;
            const key2 = 'washers';
            const value2 = 50;
            const key = 'lumber';
            const sut = makeSut();
            sut.set(key1, value1);
            sut.set(key2, value2);

            const actual = sut.get(key);

            should.not.exist(actual);
        });
    });

    describe('keys', function() {
        it('should return keys at the same address space', () => {
            const key1 = 'bolts';
            const value1 = 1400;
            const key2 = 'washers';
            const value2 = 50;
            const expectedSize = 2;
            const sut = makeSut();
            sut.set(key1, value1);
            sut.set(key2, value2);

            const actual = sut.keys();

            actual.length.should.equal(expectedSize);
            actual.should.contain(key1);
            actual.should.contain(key2);
        });

        it('should return keys at different address spaces', () => {
            const key1 = 'bolts';
            const value1 = 1400;
            const key2 = 'washers';
            const value2 = 50;
            const key3 = 'lumber';
            const value3 = 70;
            const expectedSize = 3;
            const sut = makeSut();
            sut.set(key1, value1);
            sut.set(key2, value2);
            sut.set(key3, value3);

            const actual = sut.keys();

            actual.length.should.equal(expectedSize);
            actual.should.contain(key1);
            actual.should.contain(key2);
            actual.should.contain(key3);
        });

        it('should return an empty array for an unpopulated hash table', () => {
            const expectedSize = 0;
            const sut = makeSut();

            const actual = sut.keys();

            actual.length.should.equal(expectedSize);
        });
    });

    function makeSut(size = 7) {
        return new HashTable(size);
    }
});
