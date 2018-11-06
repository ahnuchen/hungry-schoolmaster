class HotDog extends egret.DisplayObjectContainer {

    private hotDog: egret.Bitmap;//人物的bitmap图
    public hotDogXMax: number;//热狗的最大X轴坐标
    public hotDogYMax: number;//热狗的最大Y轴坐标
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


    private init() {
        this.hotDog = this.createBitmapByName('regou_png');
        this.hotDogXMax = this.stage.stageWidth - this.hotDog.width;
        this.hotDogYMax = this.stage.stageHeight - this.hotDog.height;
        this.addChild(this.hotDog);
    }
}