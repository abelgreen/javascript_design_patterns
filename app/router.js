const express = require('express');
const path = require('path');
(function(){
    'use strict';
    const Routes=(function(app){        
        app.use('/',express.static(__dirname+'/'));
        app.get('/', (req, res) => {           
            res.sendFile(path.join(__dirname+'/index.html'));
         });
         const routeArray =
         ['factory','abstractfactory','adaptor','builder','prototype','composite','decorator',
         'flyweight','fassade','chainofresponsibility','observer','proxy','state','module'];
         routeArray.forEach(doroute);
         function doroute(routeName){
            app.use(`/${routeName}`,express.static(__dirname+`/user/${routeName}`));
            app.get(`/${routeName}`, (req, res) => {         
                res.sendFile(path.join(__dirname+`/user/${routeName}/${routeName}.html`));
               });
         }
      
    });
    module.exports = Routes;
})();