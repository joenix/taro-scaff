var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Linking } from 'react-native';
export function openUrl(opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url, success, fail, complete } = opts;
        const res = { errMsg: 'openUrl:ok' };
        const isSupport = yield Linking.canOpenURL(url);
        if (isSupport) {
            yield Linking.openURL(url);
            success && success(res);
            complete && complete(res);
            return Promise.resolve(res);
        }
        else {
            res.errMsg = 'openUrl:fail. Do not support the openUrl Api';
            fail && fail(res);
            complete && complete(res);
            return Promise.reject(res);
        }
    });
}
export default {
    openUrl
};
