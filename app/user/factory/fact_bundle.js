(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
const CircleFactory = require('./factory').CircleFactory;

 const CircleGeneratorSinglton = (function () {
     'use strict';
    let instance;
    function init() {
        let _aCircle = [],
            _stage = $('.advert'),
            _cf = new CircleFactory();
        function _position(circle, left, top) {
            circle.css('left', left);
            circle.css('top', top);
        }
        function create(left, top, color) {
            const circle = _cf.create(color).item;
            _position(circle, left, top);
            return circle;
        }
        function add(circle) {
            _stage.append(circle);
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
},{"./factory":1}],3:[function(require,module,exports){
const CircleGeneratorSinglton = require('./singlton');
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
},{"./singlton":2}]},{},[3]);
