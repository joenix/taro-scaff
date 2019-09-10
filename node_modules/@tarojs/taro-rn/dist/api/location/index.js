var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Location from 'expo-location';
import { Permissions } from 'react-native-unimodules';
import { askAsyncPermissions } from '../utils';
export function getLocation(opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const status = yield askAsyncPermissions(Permissions.LOCATION);
        if (status !== 'granted') {
            const res = { errMsg: `Permissions denied!` };
            return Promise.reject(res);
        }
        if (!opts || typeof opts !== 'object') {
            opts = {};
        }
        const { altitude = false, success, fail, complete } = opts;
        return new Promise((resolve, reject) => {
            Location.getCurrentPositionAsync({
                enableHighAccuracy: Boolean(altitude)
            }).then((resp) => {
                const { coords, timestamp } = resp;
                const { latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed } = coords;
                const res = {
                    latitude,
                    longitude,
                    speed,
                    altitude,
                    accuracy,
                    verticalAccuracy: altitudeAccuracy,
                    horizontalAccuracy: null,
                    heading,
                    timestamp
                };
                success && success(res);
                complete && complete(res);
                resolve(res);
            }).catch((err) => {
                const res = {
                    errMsg: `getLocation fail`,
                    err
                };
                fail && fail(res);
                complete && complete(res);
                reject(res);
            });
        });
    });
}
export default {
    getLocation
};
