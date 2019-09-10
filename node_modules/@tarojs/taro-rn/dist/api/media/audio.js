var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Audio } from 'expo-av';
import { Permissions } from 'react-native-unimodules';
import { askAsyncPermissions, isUrl } from '../utils';
/**
 * InnerAudioContext 实例，可通过 wx.createInnerAudioContext 接口获取实例。
 */
class InnerAudioContext {
    constructor() {
        this._autoplay = false;
        this._loop = false;
        this._obeyMuteSwitch = true; // TODO
        this._volume = 1;
        this._onPlaybackStatusUpdate = playbackStatus => {
            this.duration = playbackStatus.durationMillis / 1000;
            this.currentTime = playbackStatus.positionMillis / 1000;
            this.buffered = playbackStatus.playableDurationMillis / 1000;
            this.paused = !playbackStatus.isPlaying;
            // 监听音频播放进度更新事件
            this.onTimeUpdateCallback && this.onTimeUpdateCallback(playbackStatus);
            if (!playbackStatus.isLoaded) {
                // Update your UI for the unloaded state
                console.log('isLoaded');
                if (playbackStatus.error) {
                    console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                }
            }
            else {
                // Update your UI for the loaded state
                if (playbackStatus.isPlaying) {
                    // Update your UI for the playing state
                    console.log('isPlaying');
                }
                else {
                    // paused state
                    console.log('paused');
                }
                if (playbackStatus.isBuffering) {
                    this.onWaitingCallback && this.onWaitingCallback();
                }
                if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                    this.onEndedCallback && this.onEndedCallback();
                }
            }
        };
        this.soundObject = new Audio.Sound();
        this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
    }
    set src(value) {
        this._src = value;
        if (this._autoplay) {
            this._firstPlay();
        }
    }
    set autoplay(value) {
        this._autoplay = value;
    }
    set startTime(value) {
        this._startTime = value;
    }
    set volume(value) {
        this._volume = value;
    }
    set loop(value) {
        this._loop = value;
    }
    set obeyMuteSwitch(value) {
        this._obeyMuteSwitch = value;
    }
    _firstPlay() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._src)
                return { errMsg: `src is undefined` };
            const source = isUrl(this._src) ? { uri: this._src } : this._src;
            yield this.soundObject.loadAsync(source, {}, true);
            this.onCanplayCallback && this.onCanplayCallback();
            yield this.soundObject.playAsync();
            if (this._startTime) {
                yield this.soundObject.playFromPositionAsync(this._startTime * 1000);
            }
            this.onPlayCallback && this.onPlayCallback();
        });
    }
    /**
     *  播放
     */
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield askAsyncPermissions(Permissions.AUDIO_RECORDING);
            if (status !== 'granted') {
                const res = { errMsg: `Permissions denied!` };
                return Promise.reject(res);
            }
            const soundStatus = yield this.soundObject.getStatusAsync();
            try {
                if (soundStatus.isLoaded === false && soundStatus.isPlaying === undefined) {
                    // First load
                    yield this._firstPlay();
                }
                else {
                    yield this.soundObject.playAsync();
                }
                // TODO
                // await this.soundObject.setIsMutedAsync(this._obeyMuteSwitch)
                yield this.soundObject.setVolumeAsync(this._volume);
                yield this.soundObject.setIsLoopingAsync(this._loop);
                this.onPlayCallback && this.onPlayCallback();
            }
            catch (error) {
                this.onError && this.onError(error);
            }
        });
    }
    /**
     *  暂停。暂停后的音频再播放会从暂停处开始播放
     */
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.soundObject.pauseAsync();
                this.onPauseCallback && this.onPauseCallback();
            }
            catch (error) {
                this.onError && this.onError(error);
            }
        });
    }
    /**
     * 停止。停止后的音频再播放会从头开始播放
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.soundObject.stopAsync();
                this.onStopCallback && this.onStopCallback();
            }
            catch (error) {
                this.onError && this.onError(error);
            }
        });
    }
    /**
     * 跳转到指定位置
     * @param position - 跳转的时间，单位 s。精确到小数点后 3 位，即支持 ms 级别精确度
     */
    seek(position) {
        return __awaiter(this, void 0, void 0, function* () {
            const millis = position * 1000;
            try {
                this.onSeekingCallback && this.onSeekingCallback();
                yield this.soundObject.setPositionAsync(millis);
                this.onSeekedCallback && this.onSeekedCallback();
            }
            catch (error) {
                this.onError && this.onError(error);
            }
        });
    }
    /**
     * @todo
     * 销毁当前实例
     */
    destroy() {
        console.log('destroy');
        this.stop();
        // this.soundObject = undefined
    }
    /**
     * 监听音频进入可以播放状态的事件。但不保证后面可以流畅播放
     * @param callback
     */
    onCanplay(callback) {
        this.onCanplayCallback = callback;
    }
    /**
     * 取消监听音频进入可以播放状态的事件
     * @param callback
     */
    offCanplay(callback) {
        this.offCanplayCallback = callback;
    }
    /**
     * 监听音频播放事件
     * @param callback
     */
    onPlay(callback) {
        this.onPlayCallback = callback;
    }
    /**
     * 取消监听音频播放事件
     * @param callback
     */
    offPlay(callback) {
        this.offPlayCallback = callback;
    }
    /**
     *  监听音频暂停事件
     * @param callback
     */
    onPause(callback) {
        this.onPauseCallback = callback;
    }
    /**
     * 取消监听音频暂停事件
     * @param callback
     */
    offPause(callback) {
        this.offPauseCallback = callback;
    }
    /**
     * 监听音频停止事件
     * @param callback
     */
    onStop(callback) {
        this.onStopCallback = callback;
    }
    /**
     *  取消监听音频停止事件
     * @param callback
     */
    offStop(callback) {
        this.offStopCallback = callback;
    }
    /**
     * 监听音频自然播放至结束的事件
     * @param callback
     */
    onEnded(callback) {
        this.onEndedCallback = callback;
    }
    /**
     * 取消监听音频自然播放至结束的事件
     * @param callback
     */
    offEnded(callback) {
        this.offEndedCallback = callback;
    }
    /**
     * 监听音频播放进度更新事件
     * @param callback
     */
    onTimeUpdate(callback) {
        this.onTimeUpdateCallback = callback;
    }
    /**
     * 取消监听音频播放进度更新事件
     * @param callback
     */
    offTimeUpdate(callback) {
        this.offTimeUpdateCallback = callback;
    }
    /**
     * 监听音频播放错误事件
     * @param callback
     */
    onError(callback) {
        this.onErrorCallback = callback;
    }
    /**
     * 取消监听音频播放错误事件
     * @param callback
     */
    offError(callback) {
        this.offErrorCallback = callback;
    }
    /**
     * 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发
     * @param callback
     */
    onWaiting(callback) {
        this.onWaitingCallback = callback;
    }
    /**
     * 取消监听音频加载中事件
     * @param callback
     */
    offWaiting(callback) {
        this.offWaitingCallback = callback;
    }
    /**
     * 监听音频进行跳转操作的事件
     * @param callback
     */
    onSeeking(callback) {
        this.onSeekingCallback = callback;
    }
    /**
     * 取消监听音频进行跳转操作的事件
     * @param callback
     */
    offSeeking(callback) {
        this.offSeekingCallback = callback;
    }
    /**
     *  监听音频完成跳转操作的事件
     * @param callback
     */
    onSeeked(callback) {
        this.onSeekedCallback = callback;
    }
    /**
     * 取消监听音频完成跳转操作的事件
     * @param callback
     */
    offSeeked(callback) {
        this.offSeekedCallback = callback;
    }
}
/**
 * 创建 audio 上下文 AudioContext 对象。
 * @param {string} id - audio 组件的 id
 * @param {object} t - 在自定义组件下，当前组件实例的this，以操作组件内 audio 组件
 */
export function createInnerAudioContext(id, t) {
    return new InnerAudioContext();
}
