(function(win,$){   
    'use strict';
    const CircleGeneratorSinglton =(function(){
        let instance;
        function init(){
            let _aCircle= [],
            _stage =$('.advert');
            function _position(circle,left,top){                
                circle.css('left',left);
                circle.css('top',top);
            }
            function create(left,top){
                const circle = $('<div class="circle">circ</div>');
                _position(circle,left,top);
                return circle;
            }
            function add(circle){
                _stage.append(circle);
                _aCircle.push(circle);
            }
            function index(){
                return _aCircle.length;
            }
            return{
                position :_position,
                index:index,
                create:create,
                add:add
            };
        }
        return {
            getInstance:function(){
                if(!instance){
                    instance = init();
                }
                return instance;
            }
        };
    })();
    $(win.document).ready(function(){        
       $('.history').click(function(e){
           // create the reference to the object
          const cg= CircleGeneratorSinglton.getInstance();
          //const cc=CircleGeneratorSinglton.getInstance().position('<div class="circle">circ</div>',50+'px',50+'px');
          
          //creation of real object
          const circle = cg.create(e.pageX-25,e.pageY-25);
          // Add the created object to the dom
          cg.add(circle);
       });
       $(document).keypress(function(e){
           if(e.key==='a'){
            const cg= CircleGeneratorSinglton.getInstance();
            //creation of real object
            const circle = cg.create(Math.floor(Math.random()*600),
            Math.floor(Math.random()*600));
            // Add the created object to the dom
            cg.add(circle);
           }
       }); 
    });
})(window,jQuery);