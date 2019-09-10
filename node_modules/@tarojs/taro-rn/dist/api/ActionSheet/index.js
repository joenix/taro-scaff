var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, TouchableHighlight, StyleSheet, Platform, ViewPropTypes } from 'react-native';
import { Mask } from '../Mask';
import { Popup } from '../Popup';
import V from '../variable';
const styles = StyleSheet.create({
    iosActionsheet: {
        backgroundColor: V.weuiBgColorDefault
    },
    androidActionsheetWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    androidActionsheet: {
        width: 274,
        backgroundColor: V.weuiBgColorDefault,
        borderRadius: V.weuiActionSheetAndroidBorderRadius
    },
    actionsheetMenu: {
        backgroundColor: '#fff'
    },
    actionsheetAction: {
        marginTop: 6,
        backgroundColor: '#fff'
    },
    actionsheetCell: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: V.weuiCellBorderColor,
        borderStyle: 'solid'
    },
    iosActionsheetCell: {
        paddingTop: 10,
        paddingBottom: 10
    },
    androidActionsheetCell: {
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 24,
        paddingRight: 24
    },
    firstActionsheetCell: {
        borderTopWidth: 0
    },
    iosActionsheetCellText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: ((18 * V.baseLineHeight) - 18) / 2,
        marginBottom: ((18 * V.baseLineHeight) - 18) / 2
    },
    androidActionsheetCellText: {
        textAlign: 'left',
        fontSize: 16,
        marginTop: ((16 * 1.4) - 16) / 2,
        marginBottom: ((16 * 1.4) - 16) / 2
    },
    defaultActionsheetCellText: {
        color: '#000'
    },
    primaryActionsheetCellText: {
        color: '#0BB20C'
    },
    warnActionsheetCellText: {
        color: V.weuiColorWarn
    }
});
const underlayColor = V.weuiBgColorActive;
const Index = ({ visible, style, maskStyle, onShow, onClose, menus = [], actions = [], autoDectect = true, type = 'ios' }) => {
    let _type = type;
    if (autoDectect)
        _type = Platform.OS;
    const _renderMenuItems = () => menus.map((_a, idx) => {
        var { type: btnType, label, style: btnStyle, textStyle } = _a, others = __rest(_a, ["type", "label", "style", "textStyle"]);
        return React.createElement(TouchableHighlight, Object.assign({ key: idx, underlayColor: underlayColor, style: [
                styles.actionsheetCell,
                styles[`${_type}ActionsheetCell`],
                idx === 0 ? styles.firstActionsheetCell : {},
                btnStyle
            ] }, others),
            React.createElement(Text, { style: [
                    styles.actionsheetCellText,
                    styles[`${_type}ActionsheetCellText`],
                    styles[`${btnType}ActionsheetCellText`],
                    textStyle
                ] }, label));
    });
    const _renderActions = () => actions.map((_a, idx) => {
        var { type: btnType, label, style: btnStyle, textStyle } = _a, others = __rest(_a, ["type", "label", "style", "textStyle"]);
        return React.createElement(TouchableHighlight, Object.assign({ key: idx, underlayColor: underlayColor, style: [
                styles.actionsheetCell,
                styles[`${_type}ActionsheetCell`],
                idx === 0 ? styles.firstActionsheetCell : {},
                btnStyle
            ] }, others),
            React.createElement(Text, { style: [
                    styles.actionsheetCellText,
                    styles[`${_type}ActionsheetCellText`],
                    styles[`${btnType}ActionsheetCellText`],
                    textStyle
                ] }, label));
    });
    return _type === 'ios' ? (React.createElement(Popup, { visible: visible, style: [styles.iosActionsheet, style], maskStyle: maskStyle, onShow: onShow, onClose: onClose },
        menus.length ? (React.createElement(View, { style: [styles.actionsheetMenu] }, _renderMenuItems())) : false,
        actions.length ? (React.createElement(View, { style: [styles.actionsheetAction] }, _renderActions())) : false)) : (React.createElement(Modal, { visible: visible, transparent: true, animationType: 'fade', onShow: onShow, onRequestClose: onClose },
        React.createElement(Mask, { style: [styles.androidActionsheetWrapper, maskStyle], onPress: onClose },
            React.createElement(View, { style: [styles.androidActionsheet, style] },
                menus.length ? (React.createElement(View, { style: [styles.actionsheetMenu] }, _renderMenuItems())) : false,
                actions.length ? (React.createElement(View, { style: [styles.actionsheetAction] }, _renderActions())) : false))));
};
Index.propTypes = {
    autoDectect: PropTypes.bool,
    type: PropTypes.oneOf(['ios', 'android']),
    menus: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.arrayOf(PropTypes.object),
    visible: PropTypes.bool,
    onShow: PropTypes.func,
    onClose: PropTypes.func,
    style: ViewPropTypes.style,
    maskStyle: ViewPropTypes.style
};
export default Index;
