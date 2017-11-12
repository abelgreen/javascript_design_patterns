(function (win, $) {
    'use strict';
    const AbstractFactory = function () {
        function RedCircle() {

        }
        RedCircle.prototype.create = function () {
            this.item = $('<div class="circle">circ</div>');
            return this;
        };
        function BlueCircle() {

        }
        BlueCircle.prototype.create = function () {
            this.item = $('<div class="circle" style="background: blue">circ</div>');
            return this;
        };

        let CircleFactory = function () {
            this.types = {};
            this.create = function (type) {
                return new this.types[type]().create();
            };
            this.register = function (type, cls) {
                if (cls.prototype.create) {
                    this.types[type] = cls;
                }
            };
        };
        return {
            RedCircle: RedCircle,
            BlueCircle: BlueCircle,
            CircleFactory: CircleFactory
        };
    }();
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = AbstractFactory;
    }
    else {
        window.AbstractFactory = AbstractFactory;      
       
    }
})(window, jQuery);