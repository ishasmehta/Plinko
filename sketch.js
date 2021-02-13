const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particle = null;
var turn = 0;
var plinkos = [];
var divisions = [];
var divisionDetail = [];
var divisionHeight=300;
var score = 0;
var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    var rand = Math.round(random(1,10))*50;
    divisionDetail.push([k,height-divisionHeight/2,rand]);
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,375));
  }
    
}

function draw() {
  background("black");
  textSize(20);
  fill(255);
  text("Score : "+score,20,30);
  /*text("500",20,540);
  text("500",100,540);
  text("500",180,540);
  text("500",260,540);
  text("100",340,540);
  text("100",420,540);
  text("100",500,540);
  text("200",580,540);
  text("200",660,540);
  text("200",740,540);*/
  for(var i=0;i<divisionDetail.length;i++){
    text(divisionDetail[i][2],i*80+20,540);
  }

  Engine.update(engine);
 
  
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  /*
  if(frameCount%60===0){
    particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
    score++;
  }
 
  for (var j = 0; j < particles.length; j++) {
    particles[j].display();
  }*/

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(gameState === "end"){
    textSize(80);
    text("Game Over",180,250);
  }
  if(particle){
    particle.display();

    
    if(particle.body.position.y > 760){
      
      for(var i = 0; i < divisionDetail.length-1; i++){
        if(particle.body.position.x > divisionDetail[i][0] && particle.body.position.x < divisionDetail[i+1][0]){
          score = score + divisionDetail[i][2];
          console.log(divisionDetail[i][2]);
        }
      }
      
      
      particle = null;
      if(turn >= 5){
        gameState = "end";
      }
    }
  }
}

function mousePressed(){
  if(gameState === "play" && turn < 5 && particle === null){
    turn++;
    particle = new Particle(mouseX,10,10,10);
  }
}
