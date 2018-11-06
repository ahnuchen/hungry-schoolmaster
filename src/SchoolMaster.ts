class SchoolMaster extends egret.DisplayObjectContainer {

    private schoolMaster: egret.Bitmap;//人物的bitmap图
    private personXMax: number;//人物在X轴上面能移动的最大距离
    public paused: boolean = false;
    public bottomPointX: number = 18;//上颚的相对坐标
    public topPointX: number = 38;//下颚的相对坐标

    //任务移动的方向

    constructor() {
        super();
        // this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
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

    public pause() {
        this.paused = true;
        egret.Tween.pauseTweens(this.schoolMaster)
    }

    public resume() {
        this.paused = false;
        egret.Tween.resumeTweens(this.schoolMaster)
    }


    private init() {
        this.schoolMaster = this.createBitmapByName('xiaozhang_png');
        this.schoolMaster.x = 0;
        this.schoolMaster.y = 0;
        this.personXMax = this.stage.width - this.schoolMaster.width;
        let tw = egret.Tween.get(this.schoolMaster, {loop: true});
        tw.to({x: this.personXMax}, 2000).wait(100)
            .to({x: 0}, 2000).wait(100);
        this.addChild(this.schoolMaster);
        // this.pause()
    }
}