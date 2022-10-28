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
        it ('should insert the new node as the root when the tree is empty', () => {
            const sut = makeEmptyTree();
            should.not.exist(sut.root);
            const value = 42;
    
            const actual = sut.insert(value);

            actual.should.equal(sut);
            actual.root.should.exist;
            actual.root.value.should.equal(value);
        });

        it ('should return null for a duplicate value', () => {
            const nums = [47, 21, 76, 18, 52, 82];
            const value = 76;

            const sut = makePopulatedTree(nums);

            const actual = sut.insert(value);

            should.not.exist(actual);
        });

        it ('should insert the nodes in the expected spots when making a populated tree', () => {
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
        })

        it('should insert a node in the expected spot', () => {
            const nums = [47, 21, 76, 18, 52, 82];
            const value = 27;
            const sut = makePopulatedTree(nums);

            const actual = sut.insert(value);

            const expectedNode = actual.root.left.right;

            expectedNode.value.should.equal(value);
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