var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AsyncStorage } from 'react-native';
function generateUnSupportApi(errText, fnNames) {
    const res = {};
    fnNames.forEach((fnName) => {
        res[fnName] = function () {
            throw new Error(`${errText} ##  ${JSON.stringify(arguments)}`);
        };
    });
    return res;
}
export function setStorage(opts = {}) {
    const { key, data, success, fail, complete } = opts;
    const res = { errMsg: 'setStorage:ok' };
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(key, JSON.stringify(data))
            .then((e) => {
            success && success(res);
            complete && complete(res);
            resolve(res);
        }).catch((err) => {
            res.errMsg = err.message;
            fail && fail(res);
            complete && complete(res);
            reject(err);
        });
    });
}
export function getStorage(opts = {}) {
    const { key, success, fail, complete } = opts;
    const res = { errMsg: 'getStorage:ok' };
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key)
            .then((data) => {
            res.data = JSON.parse(data);
            success && success(res);
            complete && complete(res);
            resolve(res);
        }).catch((err) => {
            res.errMsg = err.message;
            fail && fail(res);
            complete && complete(res);
            reject(err);
        });
    });
}
export function getStorageInfo(opts = {}) {
    const { success, fail, complete } = opts;
    const res = { errMsg: 'getStorageInfo:ok' };
    return new Promise((resolve, reject) => {
        AsyncStorage.getAllKeys()
            .then((data) => {
            res.keys = data;
            res.currentSize = null;
            res.limitSize = null;
            success && success(res);
            complete && complete(res);
            resolve(res);
        }).catch((err) => {
            res.errMsg = err.message;
            fail && fail(res);
            complete && complete(res);
            reject(err);
        });
    });
}
export function removeStorage(opts = {}) {
    const { key, success, fail, complete } = opts;
    const res = { errMsg: 'removeStorage:ok' };
    return new Promise((resolve, reject) => {
        AsyncStorage.removeItem(key)
            .then(() => {
            success && success(res);
            complete && complete(res);
            resolve(res);
        }).catch((err) => {
            res.errMsg = err.message;
            fail && fail(res);
            complete && complete(res);
            reject(err);
        });
    });
}
export function clearStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return AsyncStorage.clear();
    });
}
let unSupportApis = ['setStorageSync', 'getStorageSync', 'getStorageInfoSync', 'removeStorageSync', 'clearStorageSync'];
unSupportApis = generateUnSupportApi('React Native暂不支持storage的同步存取', unSupportApis);
export default Object.assign({ setStorage,
    getStorage,
    getStorageInfo,
    removeStorage,
    clearStorage }, unSupportApis);
