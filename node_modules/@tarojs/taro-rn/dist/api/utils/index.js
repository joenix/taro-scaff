var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Permissions } from 'react-native-unimodules';
export function askAsyncPermissions(PermissionsType) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status } = yield Permissions.askAsync(PermissionsType);
        return status;
    });
}
function upperCaseFirstLetter(string) {
    if (typeof string !== 'string')
        return string;
    string = string.replace(/^./, match => match.toUpperCase());
    return string;
}
export function getParameterError({ name = '', para, correct, wrong }) {
    const parameter = para ? `parameter.${para}` : 'parameter';
    const errorType = upperCaseFirstLetter(wrong === null ? 'Null' : typeof wrong);
    return `${name}:fail parameter error: ${parameter} should be ${correct} instead of ${errorType}`;
}
export function shouleBeObject(target) {
    if (target && typeof target === 'object')
        return { res: true };
    return {
        res: false,
        msg: getParameterError({
            correct: 'Object',
            wrong: target
        })
    };
}
export function isFunction(obj) {
    return typeof obj === 'function';
}
export function successHandler(success, complete) {
    return function (res) {
        isFunction(success) && success(res);
        isFunction(complete) && complete(res);
        return Promise.resolve(res);
    };
}
export function errorHandler(fail, complete) {
    return function (res) {
        isFunction(fail) && fail(res);
        isFunction(complete) && complete(res);
        return Promise.reject(res);
    };
}
/**
 * RegExps.
 * A URL must match #1 and then at least one of #2/#3.
 * Use two levels of REs to avoid REDOS.
 */
const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;
/**
 * Loosely validate a URL `string`.
 *
 * @param {String} string
 * @return {Boolean}
 */
export function isUrl(string) {
    if (typeof string !== 'string') {
        return false;
    }
    let match = string.match(protocolAndDomainRE);
    if (!match) {
        return false;
    }
    let everythingAfterProtocol = match[1];
    if (!everythingAfterProtocol) {
        return false;
    }
    if (localhostDomainRE.test(everythingAfterProtocol) ||
        nonLocalhostDomainRE.test(everythingAfterProtocol)) {
        return true;
    }
    return false;
}
