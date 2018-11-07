//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.timeOnEnterFrame = 0;
        _this.maxHotDogCount = 10; //热狗的最大数量
        _this.hotDogCount = _this.maxHotDogCount; //当前剩余热狗的总数
        _this.hitHotDogCount = 0; //接住了的热狗数量
        _this.gameStatus = 0; //游戏的状态 0 未开始 1 进行中 2 已结束
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        this.voiceBonus = RES.getRes("point_mp3");
                        this.voiceOver = RES.getRes("die_mp3");
                        this.voiceLaunch = RES.getRes("launch_mp3");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        this.bgShp = new egret.Shape();
        this.bgShp.graphics.beginFill(0xeceaec, 1);
        this.bgShp.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.bgShp.graphics.endFill();
        this.bgShp.touchEnabled = true;
        this.bgShp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchState, this);
        this.addChild(this.bgShp);
        this.schoolMaster = new SchoolMaster();
        this.addChild(this.schoolMaster);
        this.hotDog = this.createBitmapByName('regou_png');
        this.addChild(this.hotDog);
        this.hotDogXMin = this.schoolMaster.bottomPointX;
        this.hotDogXMax = this.stage.stageWidth - this.schoolMaster.topPointX - this.hotDog.width;
        this.hotDogYMax = this.stage.stageHeight - this.hotDog.height;
        this.hotDog.x = this.getHotDogX();
        this.hotDog.y = this.hotDogYMax;
        this.textField = new egret.TextField();
        this.textField.x = 0;
        this.textField.y = this.stage.stageHeight - 40;
        this.textField.width = 120;
        this.textField.height = 40;
        this.textField.textAlign = "center";
        this.textField.textColor = 0xcc0000;
        this.setTextField();
        this.addChild(this.textField);
        this.scoreTextField = new egret.TextField();
        this.scoreTextField.y = 200;
        this.scoreTextField.x = 315;
        this.scoreTextField.textColor = 0xcc0000;
        this.scoreTextField.text = this.hitHotDogCount + "";
        this.addChild(this.scoreTextField);
        this.tipImg = this.createBitmapByName('tip_png');
        this.addChild(this.tipImg);
        this.tipImg.x = (this.stage.stageWidth - this.tipImg.width) / 2;
        this.tipImg.y = (this.stage.stageHeight - this.tipImg.height) / 2;
        this.scoreboardImg = new ScoreBoard();
        this.swapChildren(this.hotDog, this.schoolMaster);
    };
    Main.prototype.setTextField = function () {
        this.textField.text = "\u5269\u4F59:" + this.hotDogCount;
    };
    // 点击事件
    Main.prototype.onTouchState = function () {
        if (this.gameStatus === 0) {
            this.removeChild(this.tipImg);
            this.schoolMaster.resume();
            this.gameStatus = 1;
        }
        else if (this.gameStatus === 1) {
            this.voiceLaunch.play(0, 1);
            this.hotDogCount--;
            this.setTextField();
            this.launchHotDog();
        }
        else if (this.gameStatus === 2) {
            this.removeChild(this.scoreboardImg);
            this.addChild(this.tipImg);
            this.gameStatus = 0;
            this.hotDogCount = this.maxHotDogCount;
            this.hitHotDogCount = 0;
            this.scoreTextField.text = this.hitHotDogCount + "";
            this.setTextField();
        }
    };
    Main.prototype.launchHotDog = function () {
        var _this = this;
        this.bgShp.touchEnabled = false;
        var hotDogTw = egret.Tween.get(this.hotDog, { loop: false });
        var checkPointY = this.schoolMaster.height - 1;
        var hitted = false;
        hotDogTw.to({ y: checkPointY }, 1500).call(function () {
            hitted = _this.schoolMaster.hitTestPoint(_this.hotDog.x + _this.hotDog.width / 2, checkPointY);
            if (hitted) {
                _this.hitHotDogCount++;
                _this.scoreTextField.text = _this.hitHotDogCount + "";
                _this.schoolMaster.pause();
                _this.voiceBonus.play(0, 1);
            }
            else {
                _this.voiceOver.play(0, 1);
            }
        }).to({ y: 5 }, 200).call(function () {
            egret.Tween.removeTweens(_this.hotDog);
            _this.hotDog.x = _this.getHotDogX();
            _this.hotDog.y = _this.hotDogYMax;
            if (_this.hotDogCount <= 0) {
                _this.addChild(_this.scoreboardImg);
                _this.scoreboardImg.x = (_this.stage.stageWidth - _this.scoreboardImg.scoreBoard.width) / 2;
                _this.scoreboardImg.y = (_this.stage.stageHeight - _this.scoreboardImg.scoreBoard.height) / 2;
                _this.scoreboardImg.setCurrentPoint(_this.hitHotDogCount);
                _this.gameStatus = 2;
            }
            else {
                _this.schoolMaster.resume();
            }
            _this.bgShp.touchEnabled = true;
        });
    };
    /**
     * 获取随机的热狗X坐标
     * @returns {number}
     */
    Main.prototype.getHotDogX = function () {
        return (this.hotDogXMax - this.hotDogXMin) * Math.random() + this.hotDogXMin;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map