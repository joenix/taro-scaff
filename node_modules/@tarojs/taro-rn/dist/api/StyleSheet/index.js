var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { StyleSheet, Platform } from 'react-native';
export function create(styles) {
    const platformStyles = {};
    Object.keys(styles).forEach((name) => {
        const copyStyles = Object.assign({}, styles[name]);
        const ios = copyStyles.ios;
        const android = copyStyles.android;
        /* eslint-disable no-param-reassign */
        delete styles[name].ios;
        delete styles[name].android;
        /* eslint-enable no-param-reassign */
        let style = __rest(Object.assign({}, styles[name]), []);
        if (ios && Platform.OS === 'ios') {
            style = Object.assign({}, style, ios);
        }
        if (android && Platform.OS === 'android') {
            style = Object.assign({}, style, android);
        }
        platformStyles[name] = style;
    });
    return StyleSheet.create(platformStyles);
}
export default { create };
