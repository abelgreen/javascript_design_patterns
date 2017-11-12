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