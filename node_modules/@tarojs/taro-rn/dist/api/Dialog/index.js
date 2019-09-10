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
import { Modal, View, Text, TouchableHighlight, Dimensions, StyleSheet, Platform, ViewPropTypes } from 'react-native';
import { Mask } from '../Mask';
import { create } from '../StyleSheet';
import V from '../variable';
const { width } = Dimensions.get('window');
const styles = create({
    dialogWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialog: {
        width: width - 60,
        backgroundColor: V.weuiDialogBackgroundColor,
        borderRadius: 3,
        overflow: 'hidden'
    },
    dialogHeader: {
        paddingTop: 1.3 * V.baseFontSize,
        paddingBottom: 0.5 * V.baseFontSize,
        paddingLeft: V.weuiDialogGapWidth,
        paddingRight: V.weuiDialogGapWidth
    },
    dialogTitle: {
        fontWeight: '400'
    },
    iosDialogTitle: {
        fontSize: 18,
        textAlign: 'center'
    },
    androidDialogTitle: {
        fontSize: 21,
        textAlign: 'left'
    },
    dialogBody: {
        paddingLeft: V.weuiDialogGapWidth,
        paddingRight: V.weuiDialogGapWidth
    },
    iosDialogBody: {
        paddingBottom: (0.8 * 15) + 20
    },
    androidDialogBody: {
        paddingTop: 0.25 * 17,
        paddingBottom: (17 * 2) + 20
    },
    dialogBodyText: {
        color: V.weuiTextColorGray,
        lineHeight: 15 * 1.3,
        android: {
            lineHeight: Math.round(15 * 1.3)
        }
    },
    iosDialogBodyText: {
        fontSize: 15,
        textAlign: 'center'
    },
    androidDialogBodyText: {
        fontSize: 17,
        textAlign: 'left'
    },
    dialogFooter: {
        flexDirection: 'row'
    },
    iosDialogFooter: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: V.weuiDialogLineColor,
        borderStyle: 'solid'
    },
    androidDialogFooter: {
        height: 42,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingLeft: V.weuiDialogGapWidth,
        paddingRight: V.weuiDialogGapWidth,
        paddingBottom: 16 * 0.7
    },
    dialogFooterOpr: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    iosDialogFooterOpr: {
        height: 48,
        flex: 1
    },
    androidDialogFooterOpr: {
        height: 42,
        paddingLeft: 16 * 0.8,
        paddingRight: 16 * 0.8
    },
    dialogFooterOprWithNegativeMarginRight: {
        marginRight: 0 - (16 * 0.8)
    },
    dialogFooterOprWithBorder: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: V.weuiDialogLineColor,
        borderStyle: 'solid'
    },
    iosDialogFooterOprText: {
        fontSize: 18
    },
    androidDialogFooterOprText: {
        fontSize: 16
    },
    defaultDialogFooterOprText: {
        color: '#353535'
    },
    primaryDialogFooterOprText: {
        color: '#0BB20C'
    },
    warnDialogFooterOprText: {
        color: V.weuiColorWarn
    }
});
const underlayColor = V.weuiDialogLinkActiveBc;
const Index = ({ visible = false, buttons = [], title, style, maskStyle, headerStyle, titleStyle, bodyStyle, bodyTextStyle, footerStyle, children, onShow, onClose, autoDectect = true, type = 'ios' }) => {
    let _type = type;
    if (autoDectect)
        _type = Platform.OS;
    const _renderButtons = () => buttons.map((_a, idx) => {
        var { type: btnType, label } = _a, others = __rest(_a, ["type", "label"]);
        return React.createElement(TouchableHighlight, Object.assign({ key: idx, style: [
                styles.dialogFooterOpr,
                styles[`${_type}DialogFooterOpr`],
                _type === 'ios' && idx > 0 ? styles.dialogFooterOprWithBorder : {},
                _type === 'android' && idx === buttons.length - 1 ? styles.dialogFooterOprWithNegativeMarginRight : {}
            ], underlayColor: underlayColor }, others),
            React.createElement(Text, { style: [styles[`${_type}DialogFooterOprText`], { color: btnType }] }, label));
    });
    const childrenWithProps = React.Children.map(children, (child) => {
        if (child.type.displayName === 'Text') {
            return React.cloneElement(child, {
                style: [styles.dialogBodyText, styles[`${type}DialogBodyText`], bodyTextStyle, child.props.style]
            });
        }
        return child;
    });
    return (React.createElement(Modal, { visible: visible, transparent: !false, onShow: onShow, onRequestClose: onClose },
        React.createElement(Mask, { style: [styles.dialogWrapper, maskStyle], onPress: onClose },
            React.createElement(View, { style: [styles.dialog, style] },
                React.createElement(View, { style: [styles.dialogHeader, headerStyle] },
                    React.createElement(Text, { style: [styles.dialogTitle, styles[`${type}DialogTitle`], titleStyle] }, title)),
                React.createElement(View, { style: [styles.dialogBody, styles[`${type}DialogBody`], bodyStyle] }, childrenWithProps),
                React.createElement(View, { style: [styles.dialogFooter, styles[`${type}DialogFooter`], footerStyle] }, _renderButtons())))));
};
Index.propTypes = {
    autoDectect: PropTypes.bool,
    type: PropTypes.oneOf(['ios', 'android']),
    title: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.object),
    visible: PropTypes.bool,
    onShow: PropTypes.func,
    onClose: PropTypes.func,
    style: ViewPropTypes.style,
    maskStyle: ViewPropTypes.style,
    headerStyle: ViewPropTypes.style,
    titleStyle: Text.propTypes.style,
    bodyStyle: ViewPropTypes.style,
    bodyTextStyle: Text.propTypes.style,
    footerStyle: ViewPropTypes.style,
    children: PropTypes.node
};
export default Index;
