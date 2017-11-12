var com = com ||{};
com.abel=com.abel || {};
com.abel.designpttern = com.abel.designpttern  || {};

com.abel.designpttern.twentypatt={

    leadself :'Me: ',
    leadcomputer : 'PC: ',
    aSaid : ['This is a cyber chat'],
    msgYes : 'Yes, That`s a great idea.',
    msgNo :'No, That`s must bea mistake.',
    aSassystuff : ['Like mold on books, grow myths on history.',
                  'She move like a poem and smiled like a shpinx.',
                  'As long as we don`t die, this gonnoa be one hell of story',
                  'She laughed and the dessert sang.',
                  'You`ve got about as much charm as a dead slug.'
                 ],
    talk:function (msg){
  'use strict';
  this.echo(this.leadself+msg);
},
replayYesNo:function (){
  'use strict';
  const msg = Math.random>0.5?this.msgYes:this.msgNo;
  this.echo(this.leadcomputer+msg);
} ,
saySassyStuff:function (){
  'use strict';
  const msg =this.aSassystuff[Math.floor(Math.random()*this.aSassystuff.length)];
  this.echo(this.leadcomputer+msg);
} ,
echo:function (msg){
  'use strict';
  this.aSaid.push('<div>'+msg+'</div>');
  let aSaidlength=this.aSaid.length,
  start= Math.max(aSaidlength-6,0),
  out='';
  for(let i = start;i<aSaidlength;i++){
      out += this.aSaid[i];
  }
  $('.advert').html(out);
  $('#talk span').text(msg);

}                 
};