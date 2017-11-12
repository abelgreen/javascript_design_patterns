(function (win, $) {
    'use strict';
    let Factory = (function(){
        let RedCircle = function () {
            this.item = $('<div class="circle">circ</div>');
            },
            BlueCircle = function () {
                this.item = $('<div class="circle" style="background: blue">circ</div>');
            },
            CircleFactory = function () {
                this.create = function (color) {
                    if (color === 'blue') {
                        return new BlueCircle();
                    } else {
                        return new RedCircle();
                    }
                };
            };
            return{
                CircleFactory:CircleFactory
            };
    })();
    
        module.exports = Factory;
})(window, jQuery);