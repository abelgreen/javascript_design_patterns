(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (win, $) {
    'use strict';
    const Adaptor = (function(){
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
    return {
        ShapFactory:ShapFactory,
        StageAdaptor:StageAdaptor,
        RedCircleBuilder:RedCircleBuilder,
        BlueCircleBuilder:BlueCircleBuilder
    };
})();
module.exports =  Adaptor; 
})(window, jQuery);
},{}],2:[function(require,module,exports){
const Adaptor = require('./adaptor');
(function(){
    'use strict';
    const CircleGeneratorSinglton = (function () {
        let instance;
        function init() {
            let _aCircle = [],
                _stage ,
                _sf = new Adaptor.ShapFactory();            

            function _position(circle, left, top) {
                circle.move( left, top);
            }
            function registerShap(name,type){
                _sf.register(name, type);                
            }
            function SetStage(stage){
                _stage =stage;
            }
            function create(left, top, type) {
                const circle = _sf.create(type);
                circle.move( left, top);
                return circle;
            }
            function add(circle) {
                _stage.add(circle.get());
                _aCircle.push(circle);
            }
            function index() {
                return _aCircle.length;
            }
            return {
                index: index,
                create: create,
                add: add,
                register:registerShap,
                setStage:SetStage
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
},{"./adaptor":1}],3:[function(require,module,exports){
const CircleGeneratorSinglton = require('./singleton');
const Adaptor = require('./adaptor');

(function (win, $) {
   'use strict';
    $(win.document).ready(function () {
        // create the reference to the object
        const cg = CircleGeneratorSinglton.getInstance(); 
        cg.register('red', Adaptor.RedCircleBuilder);
        cg.register('blue', Adaptor.BlueCircleBuilder);
        cg.setStage(new Adaptor.StageAdaptor('.history'));
        $('.history').click(function (e) {            
            //creation of real object
            const circle = cg.create(e.pageX - 25, e.pageY - 25, 'red');
            // Add the created object to the dom
            cg.add(circle);
        });
        $(document).keypress(function (e) {
            if (e.key === 'a') {               
                //creation of real object
                const circle = cg.create(Math.floor(Math.random() * 900),
                    Math.floor(Math.random() * 900), 'blue');
                // Add the created object to the dom
                cg.add(circle);
            }
        });
    });
})(window, jQuery);
},{"./adaptor":1,"./singleton":2}]},{},[3]);
