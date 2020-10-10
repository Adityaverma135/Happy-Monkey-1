var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var play=1
var end=0
var gamestate=play

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
   
   createCanvas(600,600);
  
  monkey=createSprite(100,400,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.10;
  
  ground=createSprite(600,500,1200,10);
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup();
  score=0;
  
}

function draw() {
  
  background("white");
  
  textSize(20)
  text("Score: "+score,450,100);
  
  if (gamestate===play){
  
  monkey.collide(ground);
  
  ground.velocityX=-3;
  
  if (ground.x>100){
   ground.x=600;
   ground.y=500; 
  }
  //console.log(monkey.y)
  
  if (keyDown("space") && monkey.y>464){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY=monkey.velocityY+0.4;

  spawnobstacle();
  spawnbanana();
  
  if (FoodGroup.isTouching(monkey)){
    score=score+5;
    FoodGroup.destroyEach();
  }
    
    if (obstacleGroup.isTouching(monkey)){
      gamestate=end
    }
  
  drawSprites();
  }  
  
  if (gamestate===end){
    textSize(40)
    text("GameOver",200,300);
  }
  
}

function spawnobstacle(){
  if (frameCount%160===0){
    obstacle=createSprite(610,467,20,20);
    obstacle.scale=0.20
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-3;
    obstacleGroup.add(obstacle)
  }
}

function spawnbanana(){
  if (frameCount%180===0){
    banana=createSprite(610,295);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.y=Math.round(random(295,460));
    banana.velocityX=-3;
    FoodGroup.add(banana)
  }
}