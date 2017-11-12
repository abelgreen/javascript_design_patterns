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