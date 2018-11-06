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
    private schoolMaster: SchoolMaster;
    private hotDog: egret.Bitmap;
    private hotDogXMin: number;
    private hotDogXMax: number;
    public hotDogYMax: number;//热狗的最大Y轴坐标

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onTick, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        console.log('runGame')
        await this.loadResource()
        this.createGameScene();
    }

    private onTouchState() {
        // if (this.schoolMaster.paused) {
        //     this.schoolMaster.resume()
        // } else {
        //     this.schoolMaster.pause()
        // }
        // this.voiceOver.play(0, 1)
        let hotDogTw = egret.Tween.get(this.hotDog, {loop: false});
        hotDogTw.to({y: 0}, 1500).call(() => {
            console.log('到头了');
            egret.Tween.removeTweens(this.hotDog)
            this.hotDog.x = this.getHotDogX();
            this.hotDog.y = this.hotDogYMax;
            this.voiceBonus.play(0, 1);
        });
        this.voiceOver.play(0, 1)
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
        let shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xeceaec, 1);
        shp.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        shp.graphics.endFill();
        shp.touchEnabled = true;
        shp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchState, this);
        this.addChild(shp);
        this.schoolMaster = new SchoolMaster();
        this.addChild(this.schoolMaster);

        this.hotDog = this.createBitmapByName('regou_png');

        this.hotDogXMin = this.schoolMaster.bottomPointX;
        this.hotDogXMax = this.stage.stageWidth - this.schoolMaster.topPointX - this.hotDog.width;
        this.hotDogYMax = this.stage.stageHeight - this.hotDog.height;
        this.hotDog.x = this.getHotDogX();
        this.hotDog.y = this.hotDogYMax;
        console.log(this.hotDog);
        console.log(this.hotDog.x);
        console.log(this.hotDog.y);
        this.addChild(this.hotDog);

        this.swapChildren(this.hotDog, this.schoolMaster)
    }


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

    private onTick(e: egret.Event) {
        let now = egret.getTimer();
        let time = this.timeOnEnterFrame;
        this.deltaTime = now - time;
        this.timeOnEnterFrame = egret.getTimer();
    }
}