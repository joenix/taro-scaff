import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import successPng from './success.png';
import { errorHandler, shouleBeObject, successHandler } from '../utils';
const styles = StyleSheet.create({
    toastView: {
        width: 76,
        height: 76,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toastIcon: {
        width: 55,
        height: 55
    },
    toastContent: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    textToastContent: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        lineHeight: 20,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    container: {
        zIndex: 10000,
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemView: {
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.5)'
    },
    grayBlock: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(20,20,20,0.8)',
        borderRadius: 8,
        flexDirection: 'column'
    },
    textGrayBlock: {
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(20,20,20,0.8)',
        borderRadius: 8,
        flexDirection: 'column'
    }
});
class WXLoading extends React.Component {
    constructor() {
        super();
        this.state = {
            animating: true
        };
    }
    render() {
        const { title = 'loading' } = this.props;
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.grayBlock },
                React.createElement(ActivityIndicator, { animating: this.state.animating, style: { flex: 1 }, size: 'small', color: '#eee' }),
                React.createElement(Text, { style: {
                        paddingTop: 10,
                        position: 'absolute',
                        bottom: '15%',
                        color: 'white',
                        fontSize: 15
                    } }, title))));
    }
}
function showToast(options) {
    const isObject = shouleBeObject(options);
    if (!isObject.res) {
        const res = { errMsg: `showLoading${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const res = { errMsg: 'showToast:ok' };
    let { title = '', icon = 'success', image, duration = 1500, mask, success, fail, complete } = options || {}; // eslint-disable-line
    let ToastView;
    if (image) {
        ToastView = React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.grayBlock },
                React.createElement(View, { style: styles.toastView },
                    React.createElement(Image, { source: image, style: styles.toastIcon }),
                    React.createElement(Text, { style: styles.toastContent }, title || ''))));
    }
    else if (icon === 'loading') {
        ToastView = React.createElement(WXLoading, { title: title });
    }
    else if (icon === 'none') {
        ToastView = React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.textGrayBlock },
                React.createElement(Text, { style: styles.textToastContent }, title || '')));
    }
    else {
        ToastView = React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.grayBlock },
                React.createElement(View, { style: styles.toastView },
                    React.createElement(Image, { source: successPng, style: styles.toastIcon }),
                    React.createElement(Text, { style: styles.toastContent }, title || ''))));
    }
    try {
        // setTimeout fires incorrectly when using chrome debug #4470
        // https://github.com/facebook/react-native/issues/4470
        global.wxToastRootSiblings && global.wxToastRootSiblings.destroy();
        global.wxToastRootSiblings = new RootSiblings(ToastView);
        setTimeout(() => {
            global.wxToastRootSiblings && global.wxToastRootSiblings.update(ToastView);
            success && success();
        }, 100);
        if (duration > 0) {
            setTimeout(() => {
                console.log('destroy');
                global.wxToastRootSiblings && global.wxToastRootSiblings.destroy();
            }, duration);
        }
        return successHandler(success, complete)(res);
    }
    catch (e) {
        res.errMsg = `showToast:fail invalid ${e}`;
        return errorHandler(fail, complete)(res);
    }
}
function showLoading(options) {
    const isObject = shouleBeObject(options);
    if (!isObject.res) {
        const res = { errMsg: `showLoading${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    let { title = '', mask, success, fail, complete } = options || {};
    return showToast({
        title,
        icon: 'loading',
        duration: 0,
        mask,
        success,
        fail,
        complete
    });
}
function hideToast() {
    global.wxToastRootSiblings && global.wxToastRootSiblings.destroy();
    global.wxToastRootSiblings = undefined;
}
function hideLoading() {
    hideToast();
}
export { showToast, showLoading, hideToast, hideLoading };
