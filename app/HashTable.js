'use strict';

class HashTable {
    constructor(size = 7) {
        this.dataMap = new Array(size);
    }

    set(key, value) {
        const index = this.#hash(key);
        if (!this.dataMap[index]) {
            this.dataMap[index] = [];
        }
        this.dataMap[index].push([key, value]);
        return this;
    }

    get(key) {
        const index = this.#hash(key);
        const item = this.dataMap[index];
        if (item) {
            for (let i = 0; i < item.length; i++) {
                const [k, v] = item[i];
                if (k === key) {
                    return v;
                }
            }
        }
        return null;
    }

    keys() {
        const result = [];
        for (let i = 0; i < this.dataMap.length; i++) {
            const item = this.dataMap[i];
            if (item) {
                for (let j = 0; j < item.length; j++) {
                    const key = item[j][0];
                    result.push(key);
                }
            }
        }
        return result;
    }

    #hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
        }
        return hash;
    }
}

exports.HashTable = HashTable;