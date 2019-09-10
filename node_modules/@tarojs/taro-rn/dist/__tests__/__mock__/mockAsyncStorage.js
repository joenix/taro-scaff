export default class MockStorage {
    constructor(cache = {}) {
        this.setItem = jest.fn((key, value) => {
            return new Promise((resolve, reject) => {
                return (typeof key !== 'string' || typeof value !== 'string')
                    ? reject(new Error('key and value must be string'))
                    : resolve(this.storageCache[key] = value);
            });
        });
        this.getItem = jest.fn((key) => {
            return new Promise((resolve) => {
                return this.storageCache.hasOwnProperty(key)
                    ? resolve(this.storageCache[key])
                    : resolve(null);
            });
        });
        this.removeItem = jest.fn((key) => {
            return new Promise((resolve, reject) => {
                return this.storageCache.hasOwnProperty(key)
                    ? resolve(delete this.storageCache[key])
                    : reject(new Error('No such key!'));
            });
        });
        this.clear = jest.fn((key) => {
            return new Promise((resolve, reject) => resolve(this.storageCache = {}));
        });
        this.getAllKeys = jest.fn((key) => {
            return new Promise((resolve, reject) => resolve(Object.keys(this.storageCache)));
        });
        this.multiRemove = jest.fn((keys) => {
            return new Promise((resolve, reject) => {
                keys.forEach(key => {
                    this.removeItem(key);
                });
                resolve();
            });
        });
        this.storageCache = cache;
    }
}
