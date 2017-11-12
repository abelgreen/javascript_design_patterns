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