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