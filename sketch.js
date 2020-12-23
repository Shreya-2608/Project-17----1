var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, Ground;
var FoodGroup, obstacleGroup;
var Survival_Time;
var END = 0;  
var PLAY = 1;
var GameState = 1;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 }

function setup() {
  createCanvas(600,600);
  
  Ground = createSprite(300,580,1200,20);
  Ground.velocityX = -4;
  
  monkey = createSprite(100,440,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
 Survival_Time = 0; 
  
}


function draw() {
  background("lightblue");
  
  text("Score: "+ Survival_Time, 500,50);
  
if(Ground.x<0){
  Ground.x = Ground.width/2;
}
    Survival_Time = Survival_Time + Math.round(getFrameRate()/60);
    Obstacles();
    Banana();
    monkey.collide(Ground);
  
  if(keyDown("space") && monkey.y>=200){
    monkey.velocityY=-12;
   }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.velocityY = 0;
    Ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  }
  drawSprites();
}

function Banana(){
  if (frameCount % 80 === 0) {
    banana = createSprite(600,10,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -2;
    banana.lifetime=300;
    
    FoodGroup.add(banana);
    }
}


function Obstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,530,10,40);
    obstacle.addImage("Obstacle",obstacleImage  )
    obstacle.velocityX = -6;
    obstacle.scale = 0.25;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}


     