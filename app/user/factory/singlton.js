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