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