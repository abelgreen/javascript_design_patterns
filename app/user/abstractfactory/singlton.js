const AbstractFactory = require('./abstractFactory.js');

(function(){
    'use strict';
    //require(['./abstractFactory.js'], function (AbstractFactory) {
        //AbstractFactory is now loaded.
    
const CircleGeneratorSinglton = (function () {
    let instance;
    function init() {
        let _aCircle = [],
            _stage = $('.advert'),
            _cf = new AbstractFactory.CircleFactory();
            _cf.register('red',AbstractFactory.RedCircle);
            _cf.register('blue',AbstractFactory.BlueCircle);
        function _position(circle, left, top) {
            circle.css('left', left);
            circle.css('top', top);
        }
        function create(left, top, type) {
            const circle = _cf.create(type).item;
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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
module.exports = CircleGeneratorSinglton;
}
else{
window.CircleGeneratorSinglton = CircleGeneratorSinglton;

}
//});
})();