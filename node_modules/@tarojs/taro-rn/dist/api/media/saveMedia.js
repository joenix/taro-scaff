var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CameraRoll } from 'react-native';
import { Permissions } from 'react-native-unimodules';
import { askAsyncPermissions } from '../utils';
/**
 * 需要手动 Link RTCCameraRoll
 * @param opts
 * @param type
 * @param API
 * @returns {Promise<*>}
 */
function saveMedia(opts, type, API) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status } = yield askAsyncPermissions(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            const res = { errMsg: `Permissions denied!` };
            return Promise.reject(res);
        }
        const { filePath, success, fail, complete } = opts;
        const res = { errMsg: `${API}:ok` };
        return CameraRoll.saveToCameraRoll(filePath, type)
            .then((url) => {
            res.path = url;
            success && success(res);
            complete && complete(res);
            return Promise.resolve(res);
        }).catch((err) => {
            res.errMsg = err.message;
            fail && fail(res);
            complete && complete(res);
            return Promise.reject(res);
        });
    });
}
export { saveMedia };
export default { saveMedia };
