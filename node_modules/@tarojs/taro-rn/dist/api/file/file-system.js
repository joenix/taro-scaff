var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as FileSystem from 'expo-file-system';
import { shouleBeObject } from '../utils';
console.log(FileSystem.cacheDirectory, FileSystem.documentDirectory);
/**
 * 保存文件到本地。注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用
 * @param opts
 * @param {string} opts.tempFilePath 需要保存的文件的临时路径
 */
export function saveFile(opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = { errMsg: 'removeSavedFile:ok' };
        const isObject = shouleBeObject(opts);
        if (!isObject.res) {
            res.errMsg = `removeSavedFile${isObject.msg}`;
            console.error(res);
            return Promise.reject(res);
        }
        let { tempFilePath, success, fail, complete } = opts;
        let fileName = tempFilePath.substring(tempFilePath.lastIndexOf('/') + 1);
        let destPath = FileSystem.documentDirectory + fileName;
        try {
            yield FileSystem.moveAsync({ from: tempFilePath, to: destPath });
            res.savedFilePath = destPath;
            success && success(res);
            complete && complete(res);
            return res;
        }
        catch (e) {
            res.errMsg = `removeSavedFile:fail. ${e.message}`;
            fail && fail(res);
            complete && complete(res);
            throw res;
        }
    });
}
/**
 * 删除本地缓存文件
 * @param opts
 * @param {string} opts.filePath 需要删除的文件路径
 */
export function removeSavedFile(opts = {}) {
    const res = { errMsg: 'removeSavedFile:ok' };
    const isObject = shouleBeObject(opts);
    if (!isObject.res) {
        res.errMsg = `removeSavedFile${isObject.msg}`;
        console.error(res);
        return Promise.reject(res);
    }
    let { filePath, success, fail, complete } = opts;
    return FileSystem.deleteAsync(filePath)
        .then((obj) => {
        success && success(res);
        complete && complete(res);
        return obj;
    }).catch(e => {
        res.errMsg = `removeSavedFile:fail. ${e.message}`;
        fail && fail(res);
        complete && complete(res);
        throw res;
    });
}
/**
 * @todo
 * 新开页面打开文档
 * @param opts
 * @param opts.filePath 文件路径，可通过 downloadFile 获得
 * @param opts.fileType 文件类型，指定文件类型打开文件
 */
export function openDocument(opts = {}) {
    console.log('not finished');
}
/**
 * 获取该小程序下已保存的本地缓存文件列表
 * @param opts
 * @param {string} opts.filePath 文件路径
 */
export function getSavedFileList(opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = { errMsg: 'getSavedFileList:ok' };
        const isObject = shouleBeObject(opts);
        if (!isObject.res) {
            res.errMsg = `getFileInfo${isObject.msg}`;
            console.error(res);
            return Promise.reject(res);
        }
        let { success, fail, complete } = opts;
        let fileList = [];
        try {
            const fileNameList = yield FileSystem.readDirectoryAsync(FileSystem.cacheDirectory);
            fileNameList.forEach((fileName, index) => __awaiter(this, void 0, void 0, function* () {
                const fileInfo = yield FileSystem.getInfoAsync(FileSystem.cacheDirectory + fileName);
                if (fileInfo.isDirectory) {
                    fileList.push({
                        filePath: fileInfo.uri,
                        size: fileInfo.size,
                        createTime: fileInfo.modificationTime
                    });
                }
            }));
            res.fileList = fileList;
            success && success(res);
            complete && complete(res);
            return res;
        }
        catch (e) {
            res.errMsg = `getSavedFileList:fail. ${e.message}`;
            fail && fail(res);
            complete && complete(res);
            throw res;
        }
    });
}
/**
 * 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 wx.getFileInfo() 接口。
 * @param opts
 */
export function getSavedFileInfo(opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = { errMsg: 'getSavedFileInfo:ok' };
        const isObject = shouleBeObject(opts);
        if (!isObject.res) {
            res.errMsg = `getSavedFileInfo${isObject.msg}`;
            console.error(res);
            return Promise.reject(res);
        }
        let { filePath, digestAlgorithm = 'md5', success, fail, complete } = opts;
        try {
            const obj = yield FileSystem.getInfoAsync(filePath, { md5: true });
            console.log(obj);
            if (!obj.exists) {
                throw new Error('filePath not exists');
            }
            res.size = obj.size;
            res.createTime = obj.modificationTime;
            success && success(res);
            complete && complete(res);
            return res;
        }
        catch (e) {
            res.errMsg = `getSavedFileInfo:fail. ${e.message}`;
            fail && fail(res);
            complete && complete(res);
            throw res;
        }
    });
}
/**
 * 获取文件信息
 * @param opts
 * @param {string} opts.filePath -  本地文件路径
 * @param {string} [opts.digestAlgorithm] - 计算文件摘要的算法
 */
export function getFileInfo(opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = { errMsg: 'getFileInfo:ok' };
        const isObject = shouleBeObject(opts);
        if (!isObject.res) {
            res.errMsg = `getFileInfo${isObject.msg}`;
            console.error(res);
            return Promise.reject(res);
        }
        let { filePath, digestAlgorithm = 'md5', success, fail, complete } = opts;
        try {
            const obj = yield FileSystem.getInfoAsync(filePath, { md5: true });
            if (!obj.exists) {
                throw new Error('filePath not exists');
            }
            res.size = obj.size;
            res.md5 = obj.md5;
            success && success(res);
            complete && complete(res);
            return res;
        }
        catch (e) {
            res.errMsg = `getFileInfo:fail. ${e.message}`;
            fail && fail(res);
            complete && complete(res);
            throw res;
        }
    });
}
/**
 * @todo
 * 获取全局唯一的文件管理器
 */
export function getFileSystemManager() {
    console.log('not finished');
}
