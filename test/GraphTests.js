'use strict';

const chai = require('chai');
const should = chai.should();

const { Graph } = require('../app/Graph');

describe('Graph', function() {
    describe('constructor', function() {
        it('should intialize the adjacency list', () => {
            const sut = new Graph();

            sut.adjacencyList.should.exist;
        });
    });

    describe('addVertex', function() {
        it('should add the vertex and initialize it with an empty array', () => {
            const vertex = 'A';
            const emptyList = [];
            const sut = makeSut();

            const actual = sut.addVertex(vertex);

            actual.should.be.true;
            sut.adjacencyList.A.should.exist;
            sut.adjacencyList.A.should.deep.equal(emptyList);
        });

        it('should not add an existing vertex', () => {
            const vertex = 'A';
            const sut = makeSut();
            sut.addVertex(vertex);

            const actual = sut.addVertex(vertex);

            actual.should.be.false;
        });
    });

    describe('addEdge', function() {
        it('should add an edge between existing vertices', () => {
            const vertex1 = '1';
            const vertex2 = '2';
            const expectedLength = 1;
            const sut = makeSut();
            sut.addVertex(vertex1);
            sut.addVertex(vertex2);

            const actual = sut.addEdge(vertex1, vertex2);

            actual.should.be.true;
            sut.adjacencyList[vertex1].length.should.equal(expectedLength);
            sut.adjacencyList[vertex1][0].should.equal(vertex2);
            sut.adjacencyList[vertex2].length.should.equal(expectedLength);
            sut.adjacencyList[vertex2][0].should.equal(vertex1);
        });

        it('should not add an edge if one of the vertices does not exist', () => {
            const vertex1 = '1';
            const vertex2 = '2';
            const vertex3 = '3';
            const sut = makeSut();
            sut.addVertex(vertex1);
            sut.addVertex(vertex2);

            const actual = sut.addEdge(vertex1, vertex3);

            actual.should.be.false;
            sut.adjacencyList[vertex1].should.be.empty;
            sut.adjacencyList[vertex2].should.be.empty;
        });
    });

    describe('removeEdge', function() {
        it('should only remove the specified edge', () => {
            const sut = makeSut();
            sut.addVertex('A');
            sut.addVertex('B');
            sut.addVertex('C');
            sut.addEdge('A', 'B');
            sut.addEdge('B', 'C');
            sut.addEdge('C', 'A');

            const actual = sut.removeEdge('A', 'B');

            actual.should.be.true;
            sut.adjacencyList.A.length.should.equal(1);
            sut.adjacencyList.A[0].should.equal('C');
            sut.adjacencyList.B.length.should.equal(1);
            sut.adjacencyList.B[0].should.equal('C');
            sut.adjacencyList.C.length.should.equal(2);
        });

        it('should not remove a non-existent edge', () => {
            const sut = makeSut();
            sut.addVertex('A');
            sut.addVertex('B');
            sut.addVertex('C');
            sut.addEdge('A', 'B');
            sut.addEdge('B', 'C');
            sut.addEdge('C', 'A');

            const actual = sut.removeEdge('A', 'D');

            actual.should.be.false;
        });
    });

    describe('removeVertex', function() {
        it('should remove the specified vertex and all of its edges', () => {
            const vertexToRemove = 'D';
            const sut = makeSut();
            sut.addVertex('A');
            sut.addVertex('B');
            sut.addVertex('C');
            sut.addVertex(vertexToRemove);
            sut.addEdge('A', 'B');
            sut.addEdge('A', 'C');
            sut.addEdge('A', vertexToRemove);
            sut.addEdge('B', vertexToRemove);
            sut.addEdge('C', vertexToRemove);

            const actual = sut.removeVertex(vertexToRemove);

            actual.should.deep.equal(sut);
            should.not.exist(actual.adjacencyList[vertexToRemove]);
            actual.adjacencyList.A.should.not.include(vertexToRemove);
            actual.adjacencyList.B.should.not.include(vertexToRemove);
            actual.adjacencyList.C.should.not.include(vertexToRemove);
        });

        it('should not remove a non-existent vertex', () => {
            const sut = makeSut();
            sut.addVertex('A');
            sut.addVertex('B');
            sut.addVertex('C');
            sut.addVertex('D');
            sut.addEdge('A', 'B');
            sut.addEdge('A', 'C');
            sut.addEdge('A', 'D');
            sut.addEdge('B', 'D');
            sut.addEdge('C', 'D');

            const actual = sut.removeVertex('E');

            should.not.exist(actual);
        });
    });

    function makeSut() {
        return new Graph();
    }
});
