var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const globalAny = global;
globalAny._taroVideoMap = {};
class VideoContext {
    constructor(videoRef) {
        this.videoRef = videoRef;
    }
    /**
     * 退出全屏
     */
    exitFullScreen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.videoRef.dismissFullscreenPlayer();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    /**
     * 隐藏状态栏，仅在iOS全屏下有效
     * @todo
     */
    hideStatusBar() {
    }
    /**
     * 暂停视频
     */
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.videoRef.pauseAsync();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    /**
     * 播放视频
     */
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.videoRef.playAsync();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    /**
     * 设置倍速播放
     * {number} @param rate - 倍率，支持 0.5/0.8/1.0/1.25/1.5，2.6.3 起支持 2.0 倍速
     */
    playbackRate(rate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.videoRef.setRateAsync(rate);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    /**
     * 进入全屏
     * @package {object} [object]
     * @package {number} [object.direction] - 设置全屏时视频的方向，不指定则根据宽高比自动判断。
     */
    requestFullScreen(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.videoRef.presentFullscreenPlayer();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    /**
     * 跳转到指定位置
     * @param {number} position - 跳转到的位置，单位 s
     */
    seek(position) {
        return __awaiter(this, void 0, void 0, function* () {
            const millis = position * 1000;
            try {
                yield this.videoRef.setPositionAsync(millis);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    /**
     * 发送弹幕 ❌
     * @ todo
     * @deprecated 暂未实现
     * @param {DanmuData} data 弹幕内容
     * @param {string} data.text 弹幕文字
     * @param {string} data.color 弹幕颜色
     */
    sendDanmu(data) {
    }
    /**
     * 显示状态栏，仅在iOS全屏下有效
     * @todo
     */
    showStatusBar() {
    }
    /**
     * 停止视频
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.videoRef.stopAsync();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
/**
 * 创建 video 上下文 VideoContext 对象。
 * {string} @param - id video 组件的 id
 * {object} @param t - 在自定义组件下，当前组件实例的this，以操作组件内 video 组件
 */
export function createVideoContext(id, t) {
    const ref = globalAny._taroVideoMap[id];
    if (ref) {
        return new VideoContext(ref);
    }
    else {
        return undefined;
    }
}
