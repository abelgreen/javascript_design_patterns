(function (win, $) {
    'use strict';
 let Flyweight = (function(){
    function clone(src,out){
        for(let attr in src.prototype){
            out.prototype[attr] = src.prototype[attr];
        }
    }
    function Circle() {
        this.item = $('<div class="circle">circ</div>');
       /* var self = this;
        this.opacity = 1;
        this.fade = function(){
            this.opacity *=0.5;
            this.item.fadeTo(0.5,this.opacity);
        };
        this.item.click(function(){
            self.fade();
        });*/
    }
    Circle.prototype.move = function (left, top) {
        this.item.css('left', left);
        this.item.css('top', top);
    };
    Circle.prototype.color = function (clr) {
        this.item.css('background', clr);
    };
    Circle.prototype.get = function () {
        return this.item;
    };
    function Rect(){
        this.item = $('<div class="rect">Rect</div>');
    }
    clone(Circle,Rect);
    function selfDestructDecorator(obj){
        obj.item.click(function(){
            obj.kill();
        });
        obj.kill = function(){
            obj.item.remove();
        };
    }
    function RedCircleBuilder() {
        this.item = new Circle();
        this.init();
    }
    RedCircleBuilder.prototype.init = function () {
        //
    };
    RedCircleBuilder.prototype.get = function () {
        return this.item;
       
    };
    function BlueCircleBuilder() {
        this.item = new Circle();
        
        this.init();
    }
    BlueCircleBuilder.prototype.init = function () {
        this.item.color("blue");
        let rect = new Rect();
        rect.color("green");
        rect.move(40,40);
        selfDestructDecorator(rect);
        this.item.get().append(rect.get());       
    };
    BlueCircleBuilder.prototype.get = function () {
        return this.item;
        
    };

    let ShapFactory = function () {
        this.types = {};
        this.create = function (type) {
            return new this.types[type]().get();
        };
        this.register = function (type, cls) {
            if (cls.prototype.init && cls.prototype.get) {
                this.types[type] = cls;
            }
        }
    };
    function StageAdaptor(id){
        this.index = 0;
        this.context = $(id); 
    }
    StageAdaptor.prototype.SIG = 'stageItem_';
    StageAdaptor.prototype.add = function(item){
        ++this.index;
        item.addClass(this.SIG+this.index);
        this.context.append(item);
    };
    StageAdaptor.prototype.remove = function(index){
        this.context.remove('.'+this.SIG+index);
    };
    function CompositeController(a){
        this.a = a;
    }
    CompositeController.prototype.action = function(act){
        let args = Array.prototype.slice.call(arguments);
        args.shift();
        for (let item in this.a) {
            if (this.a.hasOwnProperty(item)) {
                this.a[item][act].apply(this.a[item],args);                
            }
        }
        };
    function flyWeightFader(item){
        if(item.hasClass('circle')){
            item.fadeTo(0.5,item.css('opacity')*0.25);
        }
    }
    return {
        RedCircleBuilder:RedCircleBuilder,
        BlueCircleBuilder:BlueCircleBuilder,
        ShapFactory:ShapFactory,
        CompositeController:CompositeController,
        StageAdaptor:StageAdaptor,
        flyWeightFader:flyWeightFader
    };
})();
        module.exports = Flyweight;
})(window, jQuery);