//ball variables
let xBall = 300;
let yBall= 200;
let dBall = 15;
let raioBall = dBall/2;

//ball speed
let speedXB = 5;
let speedYB = 5;

//user rect
let rectX = 5;
let rectY = 150;
let rectHeight= 90;
let rectWidth= 10;
let colidiu = false;

//computer rect
let rectCX = 585;
let rectCY = 150;
let rectCHeight = 90;
let rectCWidth = 10;
let speedYComputer;
let chanceDeErrar = 0;

//placar
let userPoints= 0;
let computerPoints = 0;

//sounds
let point;
let crash;

function preload(){
 point = loadSound("/assets/ponto.mp3");
 crash = loadSound("/assets/raquetada.mp3");
 trilha = loadSound('/assets/I’m So Sorry_50k.mp3')
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}


function draw() {
    background(0);
    showBall();
    motionBall();
    crashBall();
  
    showRect(rectX, rectY);
    showRect(rectCX, rectCY);
  
    motionRect();
    motionRectComputer();
    colisaoRaquete(rectX, rectY);
    colisaoRaquete(rectCX, rectCY);
  
    showPlacarInScreen();
    setPoints();
    }

//ball
function showBall(){
  circle(xBall, yBall, dBall);
}

function motionBall(){
   xBall += speedXB;
   yBall += speedYB;
}
function crashBall(){
  if (raioBall + xBall > width ||  xBall - raioBall < 0){
      speedXB *= -1;
    }
    if (raioBall+ yBall > height ||  yBall - raioBall < 0){
      speedYB *= -1;
    }
}

//user rect
function showRect(x, y){
  rect(x, y, rectWidth, rectHeight);
}
function motionRect(){

    if(keyIsDown(UP_ARROW) && rectY >=0){ 
      rectY -= 10;
    }

    if(keyIsDown(DOWN_ARROW) && rectY<=300){
      rectY += 10;
    }
}

//ball and rect

function colisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, rectWidth, rectHeight, xBall, yBall, raioBall);
    if (colidiu) {
        speedXB *= -1;
      crash.play();
    }
}

//computer rect
  function motionRectComputer(){
    speedYComputer = yBall - rectCY - rectWidth / 2 - 30;
    rectCY += speedYComputer + chanceDeErrar;
  calculaChanceDeErrar()
}

//placar

function showPlacarInScreen(){
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text(userPoints, 150, 26);
  text(computerPoints, 450, 26);
  rect (300, 0, 5, 400);
}

function setPoints(){
  if(xBall>590){
    userPoints += 1;
     point.play();
  }
  if(xBall<10){
    computerPoints +=1;
    point.play();
  }
}

function calculaChanceDeErrar() {
  if (computerPoints >= userPoints) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}