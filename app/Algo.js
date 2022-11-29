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
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
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
                const temp = arr[i];
                arr[i] = arr[indexOfMin];
                arr[indexOfMin] = temp;
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
}

exports.Algo = Algo;
