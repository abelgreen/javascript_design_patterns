(function (win, $) {
    'use strict';
    const Builder = (function(){
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
        };
        BlueCircleBuilder.prototype.get = function () {
            return this.item;
            
        };
    
        let CircleFactory = function () {
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
        CircleFactory:CircleFactory,
        RedCircleBuilder:RedCircleBuilder,
        BlueCircleBuilder:BlueCircleBuilder
    };
})();
module.exports =  Builder; 
})(window, jQuery);