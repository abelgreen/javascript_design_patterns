(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (win, $) {
    'use strict';
 let Chain = (function(){   
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
    Circle.prototype.next = function (shp) {
        if(shp){
            this.nextShape = shp;
        }
        return this.nextShape;
    };
    Circle.prototype.chainDo = function (action,args,count) {
       this[action].apply(this,args);
       if(count && this.nextShape){
           setTimeout(binder(this,function(){
            this.nextShape.chainDo(action,args,--count);
           }),20);
           
       }
    };
    Circle.prototype.getID = function () {
        return this.id;
    };
    Circle.prototype.setID = function (id) {
         this.id = id;
    };
    function Rect(){
        this.item = $('<div class="rect">Rect</div>');
    }
    clone(Circle,Rect);
    
    function binder(scope,fun){
        return function(){
            return fun.apply(scope,arguments);
        };

    }

    function shapeFacade(shp){
        return{
            color:binder(shp,shp.color),
            move:binder(shp,shp.move),            
            getID:binder(shp,shp.getID)//$.proxy(shp.getID,shp)
        };
    }
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
    return {
        RedCircleBuilder:RedCircleBuilder,
        BlueCircleBuilder:BlueCircleBuilder,
        ShapFactory:ShapFactory,
        CompositeController:CompositeController,
        StageAdaptor:StageAdaptor,
        shapeFacade:shapeFacade       
    };
})();
        module.exports = Chain;
})(window, jQuery);
},{}],2:[function(require,module,exports){
const Chain = require('./chainofresponsibility');

const CircleGeneratorSinglton = (function () {
    'use strict';
    let instance;
    function init() {
        let _aCircle = [],
            _stage ,
            _sf = new Chain.ShapFactory(),
            _cc = new Chain.CompositeController(_aCircle);
        

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
            let index = _aCircle.length -1;
            circle.move( left, top);
            circle.setID(_aCircle.length);
            _aCircle.push(circle);
            if(index!==-1){
                _aCircle[index].next(circle);
            }
            return Chain.shapeFacade(circle);
        }
        function chainTint(count){
            const index = Math.max(0,_aCircle.length-count),
            clr = '#'+Math.floor(Math.random()*255).toString(16)+
            Math.floor(Math.random()*255).toString(16)+
            Math.floor(Math.random()*255).toString(16);
            _aCircle[index].chainDo('color',[clr],count);
        }
        function tint(clr){
            _cc.action('color',clr);
        }
        function move(left,top){
            _cc.action('move',left,top);
        }
        function add(circle) {
            _stage.add(_aCircle[circle.getID()].get());
            
        }
        function index() {
            return _aCircle.length;
        }
        return {
            index: index,
            create: create,
            add: add,
            register:registerShap,
            setStage:SetStage,
            tint:tint,
            chainTint:chainTint,
            move:move
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
},{"./chainofresponsibility":1}],3:[function(require,module,exports){
const CircleGeneratorSinglton = require('./singlton');

const Chain = require('./chainofresponsibility');

(function (win, $) {
   'use strict';
   $(win.document).ready(function () {
    // create the reference to the object
    const cg = CircleGeneratorSinglton.getInstance(); 
    cg.register('red', Chain.RedCircleBuilder);
    cg.register('blue', Chain.BlueCircleBuilder);
    cg.setStage(new Chain.StageAdaptor('.history'));
    $('.history').click(function (e) {            
        //creation of real object
        const circle = cg.create(e.pageX - 25, e.pageY - 25, 'red');
        // Add the created object to the dom
        cg.add(circle);
        cg.chainTint(5);       
    });
    $(document).keypress(function (e) {
        if (e.key === 'a') {               
            //creation of real object
            const circle = cg.create(Math.floor(Math.random() * 900),
                Math.floor(Math.random() * 900), 'blue');
            // Add the created object to the dom
            cg.add(circle);
        }else if(e.key==='t'){
            cg.tint('pink');
        }else if(e.key==='r'){
            cg.move('+=5px','+=0px');
        }else if(e.key==='l'){
            cg.move('-=5px','+=0px');
        }
    });
});
})(window, jQuery);
},{"./chainofresponsibility":1,"./singlton":2}]},{},[3]);
