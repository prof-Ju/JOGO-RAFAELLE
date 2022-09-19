var chao,player,inimigo, inimigos;
var gameState = 0
var botaoplay, titulo, balas, lifeImage;
var life = 100

function preload(){
  lifeImage = loadImage("life.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  // 1 = pro lado pro outro , 2 = altura, 3 = largura, 4 = espaçamento
  chao = createSprite(400, 695, 220000, 50);
  player = createSprite(30,650,50,80);
  player.shapeColor = "red"

  //inimigos


  //criação do menu
  botaoplay = createButton("play")
  botaoplay.position(width/2,height/2)
  botaoplay.mouseClicked(()=>{gameState=1})

  titulo = createElement("h1","INSIRA UM TITULO AQUI!")
  titulo.class("titulo")
  titulo.position(width/2 - 100,height/2 - 100)

  inimigos = new Group();
  balas = new Group();


}

function draw() {
  background(0);  
  play();
  inimigo();
  
}

function movPlayer(){
  if(keyDown("d")){
    player.x +=5
  } 
  if(keyDown("a")){
    player.x -=5
  }
  if(keyDown("w")){
    player.y -=15
  }
  player.velocityY += 0.8
}

function play(){
  if(gameState == 1 ){
    //gameplay
  movPlayer();
  drawSprites();
  player.collide(chao)
  camera.position.x = player.x
  camera.position.y = player.y
  titulo.hide()
  botaoplay.hide()
  tiro()
  shoot()
  showLife()
  perderVida()

  
}
}

function inimigo(){
  if(frameCount % 60 === 0){
    var inimigo = createSprite(1100,650,50,100);
    inimigo.shapeColor = "blue"
    inimigo.x = Math.round(random(800,1100));
    inimigo.scale = 0.5;
    // colocar a velocidade aleatoria
    inimigo.velocityX = Math.round(random(-3,3));
    inimigos.add(inimigo);
    // inimigo.lifetime = 100;

  }   
  
}




function tiro(){
  if(keyDown("space")){
    var bala = createSprite(player.x, player.y, 10,10)
    bala.shapeColor = "yellow"
    bala.velocityX = 10;
    balas.add(bala)
  }
}

function shoot(){
  balas.overlap(inimigos, function(collector,collided){
    collector.remove()
    collided.remove()
  })
}

function perderVida(){
  player.overlap(inimigos, function(collector,collided){
    life = life - 1
  })
}



// sistema de vida!
function showLife() {
  push();
  fill("white");
  rect(player.x, player.y - 100, 100, 20);
  fill("#f50057");
  rect(player.x, player.y - 100, life, 20);
  noStroke();
  pop();
}


// BASEAR NA AULA 42


// TERMINAR O GAME STATE (FAZER O PERSONAGEM PERDER/FAZER O PERSONAGEM GANHAR);
// CRIAR UM SISTEMA DE SCORE E EXIBIR NA TELA
// COLOCAR IMAGENS
// COLOCAR EFEITOS SONOROS
// 