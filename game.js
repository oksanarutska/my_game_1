let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let astero=[];
let fire=[];
let timer=0;
let ship={x:300, y:300};


let fonimg= new Image();
fonimg.src='images/fon.png';

let asteroimg = new Image();
asteroimg.src= 'images/astero.png';

let shipimg = new Image();
shipimg.src = 'images/ship01.png';

let fireimg = new Image();
fireimg.src = 'images/fire.png';

fonimg.onload = function () {
 game();
};
document.addEventListener('keydown', function (event){
    if(event.which ===38){
       ship.y -= 5;
    }
    if(event.which ===40){
        ship.y +=5;
    }
    if(event.which ===39){
        ship.x +=5;
    }
    if(event.which ===37){
        ship.x -= 5;
    }
});
document.addEventListener('keydown', function (shoot) {
   if(shoot.which===32){
       fire.push({x:ship.x+10, y:ship.y, dx:0, dy: -5.2})
   }
});

function game() {
    update();
    render();
    requestAnimationFrame(game);
}
function update() {
timer++;
if (timer%20===0){
    astero.push({
        x:Math.random()*600,
        y:-50,
        dx:Math.random()*2-1,
        dy:Math.random()*2+2}),
        del=0;
}
for(let i in astero){
    astero[i].x=astero[i].x+astero[i].dx;
    astero[i].y=astero[i].y+astero[i].dy;

if(astero[i].x>=550|| astero[i].x<0){astero[i].dx=-astero[i].dx}
if(astero[i].y>=600){astero.splice(i,1)}

for(let j in fire){
if(Math.abs(astero[i].x+25- fire[j].x-15)<50 && Math.abs(astero[i].y-fire[j].y)<25){

    astero[i].del=1;
    fire.splice(j,1);
    break;
}
}
if (astero[i].del===1){
    astero.splice(i,1)
}

}

for (let i in fire){
    fire[i].x=fire[i].x+fire[i].dx;
    fire[i].y=fire[i].y+fire[i].dy;
     if (fire[i].y<-30){
         fire.splice(i,1);
     }
}

}



function render() {
    context.drawImage(fonimg, 0,0,600,600);
    context.drawImage(shipimg, ship.x, ship.y);
    for(let i in fire)context.drawImage(fireimg, fire[i].x, fire[i].y, 30,30);
    for(let i in astero)context.drawImage(asteroimg, astero[i].x,astero[i].y,50,50);
}


