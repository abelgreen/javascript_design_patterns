const CircleGeneratorSinglton = require('./singleton');
const Prototype = require('./prototype');

(function (win, $) {
   'use strict';
   $(win.document).ready(function () {
    // create the reference to the object
    const cg = CircleGeneratorSinglton.getInstance(); 
    cg.register('red', Prototype.RedCircleBuilder);
    cg.register('blue', Prototype.BlueCircleBuilder);
    cg.setStage($('.history'));
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