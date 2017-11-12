
const leadself = 'Me: ',
      leadcomputer = 'PC: ',
      aSaid = ['This is a cyber chat'],
      msgYes = 'Yes, That`s a great idea.',
      msgNo ='No, That`s must bea mistake.',
      aSassystuff = ['Like mold on books, grow myths on history.',
                    'She move like a poem and smiled like a shpinx.',
                    'As long as we don`t die, this gonnoa be one hell of story',
                    'She laughed and the dessert sang.',
                    'You`ve got about as much charm as a dead slug.'
                   ];
function talk(msg){
    'use strict';
    echo(leadself+msg);
}
function replayYesNo(){
    'use strict';
    const msg = Math.random>0.5?msgYes:msgNo;
    echo(leadcomputer+msg);
} 
function saySassyStuff(){
    'use strict';
    const msg =aSassystuff[Math.floor(Math.random()*aSassystuff.length)];
    echo(leadcomputer+msg);
} 
function echo(msg){
    'use strict';
    aSaid.push('<div>'+msg+'</div>');
    let aSaidlength=aSaid.length,
    start= Math.max(aSaidlength-6,0),
    out='';
    for(let i = start;i<aSaidlength;i++){
        out += aSaid[i];
    }
    $('.advert').html(out);
    $('#talk span').text(msg);

}                 