let ball;
let leftPaddle;
let rightPaddle;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(1920, 1080);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
}

function draw() {
  background(0);
  
  // Draw center line
  drawCenterLine();
  
  // Display scores
  displayScores();
  
  // Update and display ball
  ball.update();
  ball.display();
  
  // Update and display paddles
  leftPaddle.update();
  leftPaddle.display();
  rightPaddle.update();
  rightPaddle.display();
  
  // Check for collisions
  ball.checkCollision(leftPaddle);
  ball.checkCollision(rightPaddle);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    rightPaddle.move(-10); // Move a pá direita para cima
  } else if (keyCode === DOWN_ARROW) {
    rightPaddle.move(10); // Move a pá direita para baixo
  } else if (key === 'w') {
    leftPaddle.move(-10); // Move a pá esquerda para cima
  } else if (key === 's') {
    leftPaddle.move(10); // Move a pá esquerda para baixo
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    rightPaddle.move(0); // Para o movimento da pá direita
  } else if (key === 'w' || key === 's') {
    leftPaddle.move(0); // Para o movimento da pá esquerda
  }
}

function drawCenterLine() {
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < height; i += 20) {
    line(width / 2, i, width / 2, i + 10);
  }
}

function displayScores() {
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, width * 3 / 4, 50);
}

class Ball {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(random(-5, 5), random(-5, 5));
    this.side = 10; // Adjust the size of the square
  }
  
  update() {
    this.pos.add(this.vel);
    
    // Check for wall collisions
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
    
    // Check for scoring
    if (this.pos.x < 0) {
      rightScore++;
      this.reset();
    } else if (this.pos.x > width) {
      leftScore++;
      this.reset();
    }
  }
  
  display() {
    fill(255);
    rectMode(CENTER); // Set rectangle mode to center
    rect(this.pos.x, this.pos.y, this.side, this.side); // Draw square
  }
  
  reset() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(random(-5, 5), random(-5, 5));
  }
  
  checkCollision(paddle) {
    // Verifica se a bola está dentro das dimensões verticais do Paddle
    if (this.pos.y > paddle.pos.y - paddle.height / 2 && this.pos.y < paddle.pos.y + paddle.height / 2) {
      // Verifica se a bola está na posição horizontal correta para colisão
      if ((paddle.isLeft && this.pos.x - this.side / 2 <= paddle.pos.x + paddle.width / 2) ||
          (!paddle.isLeft && this.pos.x + this.side / 2 >= paddle.pos.x - paddle.width / 2)) {
        this.vel.x *= -1; // Inverte a direção horizontal da bola
      }
    }
  }
}

class Paddle {
  constructor(isLeft) {
    this.width = 10;
    this.height = 70;
    this.pos = createVector(isLeft ? this.width : width - this.width, height / 2);
    this.vel = createVector(0, 0);
    this.isLeft = isLeft; // Indica se este é o Paddle da esquerda
  }
  
  update() {
    this.pos.add(this.vel);
    this.pos.y = constrain(this.pos.y, this.height / 2, height - this.height / 2);
  }
  
  display() {
    fill(255);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }
  
  move(dir) {
    this.vel.y = dir;
  }
}
