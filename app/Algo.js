'use strict';

class Algo {
    factorial(n) {
        if (n === 1) {
            return n;
        }
        return n * this.factorial(n - 1);
    }

    bubbleSort(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            for (let j = 0; j < i; j++) {
                if (arr[j] > arr[j + 1]) {
                    this.#swap(arr, j, j + 1);
                }
            }
        }
        return arr;
    }

    selectionSort(arr) {
        let indexOfMin;
        for (let i = 0; i < arr.length - 1; i++) {
            indexOfMin = i;

            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[indexOfMin]) {
                    indexOfMin = j;
                }
            }

            if (indexOfMin !== i) {
                this.#swap(arr, i, indexOfMin);
            }
        }
        return arr;
    }

    insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            const temp = arr[i];
            let j;
            for (j = i - 1; arr[j] > temp && j >= 0; j--) {
                arr[j + 1] = arr[j];
            }
            arr[j + 1] = temp;
        }
        return arr;
    }

    mergeSort(arr) {
        const len = arr.length;
        if (len === 1) {
            return arr;
        }
        const mid = Math.floor(len / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        return this.merge(this.mergeSort(left), this.mergeSort(right));
    }

    merge(arr1, arr2) {
        const result = [];

        let i = 0;
        let j = 0;

        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] < arr2[j]) {
                result.push(arr1[i]);
                i++;
            } else {
                result.push(arr2[j]);
                j++;
            }
        }

        while (i < arr1.length) {
            result.push(arr1[i]);
            i++;
        }

        while (j < arr2.length) {
            result.push(arr2[j]);
            j++;
        }

        return result;
    }

    quickSort(arr, left = 0, right = arr.length - 1) {
        if (left < right) {
            const pivotIndex = this.pivot(arr, left, right);
            this.quickSort(arr, left, pivotIndex - 1);
            this.quickSort(arr, pivotIndex + 1, right);
        }
        return arr;
    }

    pivot(arr, pivotIndex = 0, endIndex = arr.length - 1) {
        let swapIndex = pivotIndex;
        for (let i = pivotIndex + 1; i <= endIndex; i++) {
            if (arr[i] < arr[pivotIndex]) {
                swapIndex++;
                this.#swap(arr, swapIndex, i);
            }
        }
        this.#swap(arr, pivotIndex, swapIndex);
        return swapIndex;
    }

    #swap(arr, firstIndex, secondIndex) {
        const temp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = temp;
    }
}

exports.Algo = Algo;
