(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
const Builder = require('./builder');
(function(){
    'use strict';
    const CircleGeneratorSinglton = (function () {
        let instance;
        function init() {
            let _aCircle = [],
                _stage = $('.advert'),
                _cf = new Builder.CircleFactory();
            _cf.register('red', Builder.RedCircleBuilder);
            _cf.register('blue', Builder.BlueCircleBuilder);

            function _position(circle, left, top) {
                circle.move( left, top);
            }
            function create(left, top, type) {
                const circle = _cf.create(type);
                circle.move( left, top);
                return circle;
            }
            function add(circle) {
                _stage.append(circle.get());
                _aCircle.push(circle);
            }
            function index() {
                return _aCircle.length;
            }
            return {
                index: index,
                create: create,
                add: add
            };
        }
        return {
            getInstance: function () {
                if (!instance) {
                    instance = init();
                }
                return instance;
            }
        };
    })();
    module.exports = CircleGeneratorSinglton;
})();
},{"./builder":1}],3:[function(require,module,exports){
const CircleGeneratorSinglton = require('./singleton');


(function (win, $) {
    'use strict';  
    
    $(win.document).ready(function () {
        $('.history').click(function (e) {
            // create the reference to the object
            const cg = CircleGeneratorSinglton.getInstance();

            //creation of real object
            const circle = cg.create(e.pageX - 25, e.pageY - 25, 'red');
            // Add the created object to the dom
            cg.add(circle);
        });
        $(document).keypress(function (e) {
            if (e.key === 'a') {
                const cg = CircleGeneratorSinglton.getInstance();
                //creation of real object
                const circle = cg.create(Math.floor(Math.random() * 900),
                    Math.floor(Math.random() * 900), 'blue');
                // Add the created object to the dom
                cg.add(circle);
            }
        });
    });
})(window, jQuery);
},{"./singleton":2}]},{},[3]);
