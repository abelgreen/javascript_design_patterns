(function (win, $) {
    'use strict';
    const Prototype = (function(){
        function clone(src,out){
            for(let attr in src.prototype){
                out.prototype[attr] = src.prototype[attr];
            }
        }
        function Circle() {
            this.item = $('<div class="circle">circ</div>');
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
    return {
        ShapFactory:ShapFactory,        
        RedCircleBuilder:RedCircleBuilder,
        BlueCircleBuilder:BlueCircleBuilder
    };
})();
module.exports =  Prototype; 
})(window, jQuery);