var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { askAsyncPermissions } from '../utils';
import * as ImagePicker from 'expo-image-picker';
import { Permissions } from 'react-native-unimodules';
function chooseMedia(opts, mediaTypes) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!opts || typeof opts !== 'object') {
            opts = {};
        }
        const { sizeType = [], sourceType = [], success, fail, complete } = opts;
        const options = {
            mediaTypes,
            quality: sizeType[0] === 'compressed' ? 0.7 : 1
        };
        const isCamera = sourceType[0] === 'camera';
        const status = isCamera ? yield askAsyncPermissions(Permissions.CAMERA) : yield askAsyncPermissions(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            const res = { errMsg: `Permissions denied!` };
            return Promise.reject(res);
        }
        let p;
        return new Promise((resolve, reject) => {
            p = isCamera ? ImagePicker.launchCameraAsync(options) : ImagePicker.launchImageLibraryAsync(options);
            p.then((resp) => {
                const { uri } = resp;
                resp.path = uri;
                const res = {
                    tempFilePaths: [uri],
                    tempFiles: [resp]
                };
                success && success(res);
                complete && complete(res);
                resolve(res);
            }).catch((err) => {
                const res = {
                    errMsg: `chooseImage fail`,
                    err
                };
                fail && fail(res);
                complete && complete(res);
                reject(res);
            });
        });
    });
}
export { chooseMedia };
