'use strict';

const chai = require('chai');
const should = chai.should();

const { BinarySearchTree } = require('../app/BinarySearchTree');

describe('BinarySearchTree', function() {
    describe('constructor', function() {
        it('should create a tree with no root', () => {
            const sut = new BinarySearchTree();

            sut.should.exist;
            should.not.exist(sut.root);
        });
    });

    describe('insert', function() {
        it('should insert the new node as the root when the tree is empty', () => {
            const sut = makeEmptyTree();
            should.not.exist(sut.root);
            const value = 42;

            const actual = sut.insert(value);

            actual.should.equal(sut);
            actual.root.should.exist;
            actual.root.value.should.equal(value);
        });

        it('should return null for a duplicate value', () => {
            const nums = [47, 21, 76, 18, 52, 82];
            const value = 76;

            const sut = makePopulatedTree(nums);

            const actual = sut.insert(value);

            should.not.exist(actual);
        });

        it('should insert the nodes in the expected spots when making a populated tree', () => {
            const nums = [47, 21, 76, 18, 52, 82];
            const sut = makePopulatedTree(nums);

            sut.root.value.should.equal(nums[0]);
            sut.root.left.value.should.equal(nums[1]);
            sut.root.right.value.should.equal(nums[2]);
            sut.root.left.left.value.should.equal(nums[3]);
            sut.root.right.left.value.should.equal(nums[4]);
            sut.root.right.right.value.should.equal(nums[5]);
            should.not.exist(sut.root.left.right);
            should.not.exist(sut.root.left.left.left);
            should.not.exist(sut.root.left.left.right);
            should.not.exist(sut.root.right.left.left);
            should.not.exist(sut.root.right.left.right);
            should.not.exist(sut.root.right.right.left);
            should.not.exist(sut.root.right.right.right);
        });

        it('should insert a node in the expected spot', () => {
            const nums = [47, 21, 76, 18, 52, 82];
            const value = 27;
            const sut = makePopulatedTree(nums);

            const actual = sut.insert(value);

            const expectedNode = actual.root.left.right;

            expectedNode.value.should.equal(value);
        });
    });

    describe('contains', function() {
        it('should return false for an empty tree', () => {
            const value = 27;
            const sut = makeEmptyTree();

            const actual = sut.contains(value);

            actual.should.be.false;
        });

        it('should return true for a tree that contains the value', () => {
            const nums = [47, 21, 76, 18, 52, 82];
            const value = 82;
            const sut = makePopulatedTree(nums);

            const actual = sut.contains(value);

            actual.should.be.true;
        });

        it('should return true for a value that was inserted', () => {
            const nums = [47, 21, 76, 18, 52, 82];
            const value = 27;
            const sut = makePopulatedTree(nums);
            sut.insert(value);

            const actual = sut.contains(value);

            actual.should.be.true;
        });

        it('should return false for a tree that does not contain the value', () => {
            const nums = [47, 21, 76, 18, 52, 82];
            const value = 17;
            const sut = makePopulatedTree(nums);

            const actual = sut.contains(value);

            actual.should.be.false;
        });
    });

    describe('minValueNode', function() {
        it('should return the node with the minimum value', () => {
            const nums = [47, 21, 76, 18, 52, 82];
            const expected = 18;
            const sut = makePopulatedTree(nums);
            const startNode = sut.root;

            const actual = sut.minValueNode(startNode);

            actual.value.should.equal(expected);
        });

        it('should return the node with the minimum value in a subtree', () => {
            const nums = [47, 21, 76, 18, 52, 82];
            const expected = 52;
            const sut = makePopulatedTree(nums);
            const startNode = sut.root.right;

            const actual = sut.minValueNode(startNode);

            actual.value.should.equal(expected);
        });
    });

    describe('breadthFirstSearch', function () {
        it ('should return the expected array', () => {
            const expected = [47, 21, 76, 18, 27, 52, 82];
            const sut = makePopulatedTree(expected);

            const actual = sut.breadthFirstSearch();

            actual.should.deep.equal(expected);
        });
    });

    describe('depthFirstSearchPreOrder', function () {
        it ('should return the expected array', () => {
            const input = [47, 21, 76, 18, 27, 52, 82];
            const expected = [47, 21, 18, 27, 76, 52, 82]
            const sut = makePopulatedTree(input);

            const actual = sut.depthFirstSearchPreOrder();

            actual.should.deep.equal(expected);
        });
    });

    function makeEmptyTree() {
        return new BinarySearchTree();
    }

    function makePopulatedTree(nums) {
        const result = new BinarySearchTree();
        for (let i = 0; i < nums.length; i++) {
            result.insert(nums[i]);
        }
        return result;
    }
});
