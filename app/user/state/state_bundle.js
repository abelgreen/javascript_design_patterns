(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (win, $) {
    'use strict';
 let Factory = (function(){   
    
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
        ShapFactory:ShapFactory,
        CompositeController:CompositeController,
        StageAdaptor:StageAdaptor,
        shapeFacade:shapeFacade       
    };
})();
        module.exports = Factory;
})(window, jQuery);
},{}],2:[function(require,module,exports){
const Factory = require('./factory');

const CircleGeneratorSinglton = (function () {
    'use strict';
    let instance;
    function init() {
        let _aCircle = [],
            _stage ,
            _sf = new Factory.ShapFactory(),
            _cc = new Factory.CompositeController(_aCircle);
        

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
            return Factory.shapeFacade(circle);
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
},{"./factory":1}],3:[function(require,module,exports){
(function (win, $) {
    'use strict';
 let State = (function(){   
    function RedState(obj){
        let on = 'red',
            off = 'rgba(255,0,0,0.25)',
            _nextState;
        this.nextState = function(ns){
            _nextState = ns;
        };
        this.start = function(){
            obj.color(on);
           // setTimeout(binder(_nextState,_nextState.start),1000);
            setTimeout(function(){
                obj.color(off);
                _nextState.start();
            },3000);
        };
    }
    function YellowState(obj){
        let on = 'yellow',
            off = 'rgba(255,255,0,0.25)',
            _nextState;
        this.nextState = function(ns){
            _nextState = ns;
        };
        this.start = function(){
            obj.color(on);           
            setTimeout(function(){
                obj.color(off);
                _nextState.start();
            },2000);
        };
    }
    function GreenState(obj){
        let on = 'green',
            off = 'rgba(0,255,0,0.25)',
            _nextState;
        this.nextState = function(ns){
            _nextState = ns;
        };
        this.start = function(){
            obj.color(on);          
            setTimeout(function(){
                obj.color(off);
                _nextState.start();
            },4000);
        };
    }
    return {
        RedState:RedState,
        YellowState:YellowState,
        GreenState:GreenState               
    };
})();
        module.exports = State;
})(window, jQuery);
},{}],4:[function(require,module,exports){
const CircleGeneratorSinglton = require('./singlton');
const Factory = require('./factory');
const State = require('./state');

(function (win, $) {
   'use strict';
   $(win.document).ready(function () {
    // create the reference to the object
    const cg = CircleGeneratorSinglton.getInstance(); 
    cg.register('circle', Factory.RedCircleBuilder);        
    cg.setStage(new Factory.StageAdaptor('.history'));
   
    //create objects
    let red = cg.create(700,450,'circle');
        cg.add(red);
    let yellow = cg.create(700,550,'circle');
        yellow.color('rgba(255,255,0,0.25)');
        cg.add(yellow);
    let green = cg.create(700,650,'circle');
        green.color('rgba(0,255,0,0.25)');
        cg.add(green);
    // create the refrence to the states
    let rs = new State.RedState(red),
        ys = new State.YellowState(yellow),
        gs = new State.GreenState(green);
    // defining the nextstate
    rs.nextState(ys);
    ys.nextState(gs);
    gs.nextState(rs);
    //start the first state
    rs.start();
});
})(window, jQuery);
},{"./factory":1,"./singlton":2,"./state":3}]},{},[4]);
