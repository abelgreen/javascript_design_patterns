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