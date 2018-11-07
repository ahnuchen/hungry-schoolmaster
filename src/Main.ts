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

class Main extends egret.DisplayObjectContainer {

    private deltaTime: number;
    private timeOnEnterFrame: number = 0;
    private voiceBonus: egret.Sound;
    private voiceOver: egret.Sound;
    private voiceLaunch: egret.Sound;
    private schoolMaster: SchoolMaster;
    private hotDog: egret.Bitmap;
    private tipImg: egret.Bitmap;
    private scoreboardImg: ScoreBoard;
    private hotDogXMin: number;
    private hotDogXMax: number;
    public hotDogYMax: number;//热狗的最大Y轴坐标
    private maxHotDogCount: number = 10;//热狗的最大数量
    private hotDogCount: number = this.maxHotDogCount;//当前剩余热狗的总数
    private hitHotDogCount: number = 0;//接住了的热狗数量
    private gameStatus: number = 0;//游戏的状态 0 未开始 1 进行中 2 已结束
    private textField: egret.TextField;
    private scoreTextField: egret.TextField;
    private bgShp: egret.Shape;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {


        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        };
        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource();
        this.createGameScene();
    }


    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
            this.voiceBonus = RES.getRes("point_mp3");
            this.voiceOver = RES.getRes("die_mp3");
            this.voiceLaunch = RES.getRes("launch_mp3");
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
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

        this.swapChildren(this.hotDog, this.schoolMaster)
    }

    private setTextField() {
        this.textField.text = `剩余:${this.hotDogCount}`;
    }

    // 点击事件
    private onTouchState() {
        if (this.gameStatus === 0) {
            this.removeChild(this.tipImg);
            this.schoolMaster.resume();
            this.gameStatus = 1;
        } else if (this.gameStatus === 1) {
            this.voiceLaunch.play(0, 1);
            this.hotDogCount--;
            this.setTextField();
            this.launchHotDog();
        } else if (this.gameStatus === 2) {
            this.removeChild(this.scoreboardImg);
            this.addChild(this.tipImg);
            this.gameStatus = 0;
            this.hotDogCount = this.maxHotDogCount;
            this.hitHotDogCount = 0;
            this.scoreTextField.text = this.hitHotDogCount + "";
            this.setTextField();
        }
    }

    private launchHotDog() {
        this.bgShp.touchEnabled = false;
        let hotDogTw = egret.Tween.get(this.hotDog, {loop: false});
        let checkPointY = this.schoolMaster.height - 1;
        hotDogTw.to({y: checkPointY}, 1500).call(() => {
            let hitted = this.schoolMaster.hitTestPoint(this.hotDog.x, checkPointY);
            if (hitted) {//接住
                this.hitHotDogCount++;
                this.scoreTextField.text = this.hitHotDogCount + "";
                this.voiceBonus.play(0, 1);
            } else {
                this.voiceOver.play(0, 1)
            }
        }).to({y: 5}, 200).call(() => {
            egret.Tween.removeTweens(this.hotDog);
            this.hotDog.x = this.getHotDogX();
            this.hotDog.y = this.hotDogYMax;
            if (this.hotDogCount <= 0) {
                this.addChild(this.scoreboardImg);
                this.scoreboardImg.x = (this.stage.stageWidth - this.scoreboardImg.scoreBoard.width) / 2;
                this.scoreboardImg.y = (this.stage.stageHeight - this.scoreboardImg.scoreBoard.height) / 2;
                this.scoreboardImg.setCurrentPoint(this.hitHotDogCount);
                this.gameStatus = 2;
                this.schoolMaster.pause();
            }
            this.bgShp.touchEnabled = true;
        });
    }


    /**
     * 获取随机的热狗X坐标
     * @returns {number}
     */
    private getHotDogX(): number {
        return (this.hotDogXMax - this.hotDogXMin) * Math.random() + this.hotDogXMin;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    }

}