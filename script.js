let n;
let nodes = [];
let asciiCode = 64;
let isDrawing = false;
let currentLine;

function setup(){
  createCanvas(1550, 600);
  n = new Node("A");
}

function draw(){
  background(51);
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].drawNode();
    for (let j = 0; j < nodes[i].lines.length; j++){
      nodes[i].lines[j].drawLine();
    }
  }
  clearNodes();
}



class Node{
  constructor(){
    this.lines = [];
    this.x = mouseX;
    this.y = mouseY; 
    this.character = String.fromCharCode(asciiCode);
  }

  drawNode(){
    fill(255);
    circle(this.x, this.y, 50);
    this.setValue();
  }

  setValue(){
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(0);
    text(this.character, this.x, this.y);
  }

  isClicked(){
    let distance = dist(mouseX, mouseY, this.x, this.y);
    return distance < 25;
  }

  mousePressed() {
    if (this.isClicked()) {
      if (isDrawing){
        isDrawing = false;
        currentLine.finishLine = false;
        currentLine.setEnd(this.x, this.y);
      }else {
        currentLine = new Line(this.x, this.y);
        this.lines.push(currentLine);
      }
    }
  }

}

class Line{
  constructor(centerX, centerY){
    this.x1 = centerX
    this.y1 = centerY;
    this.originalLength = dist(this.x1, this.y1, this.x2, this.y2);
    this.x2;
    this.y2;
    this.finishLine = true;
    this.newStartX = this.x1;
    this.newStartY = this.y1;
    this.newEndX = this.x2;
    this.newEndY = this.y2;
  }
  
  drawLine(){
    if (this.finishLine){
      this.newEndX = this.x2 = mouseX;
      this.newEndY = this.y2 = mouseY;
      isDrawing = true;
    }
    else {
      this.shiftEndPos();
    }
    this.shiftStartPos()
    line(this.newStartX,this.newStartY, this.newEndX, this.newEndY);
  }

  setEnd(x, y){
    this.x2 = x;
    this.y2 = y;
  }

  shiftStartPos(){
    let angle = atan2(this.y2 - this.y1, this.x2 - this.x1);
    this.newStartX = this.x1 + cos(angle) * 25;
    this.newStartY = this.y1 + sin(angle) * 25;
  }

  shiftEndPos(){
    let angle = atan2(this.y2 - this.y1, this.x2 - this.x1);
    this.newEndX = this.x2 - cos(angle) * 25;
    this.newEndY = this.y2 - sin(angle) * 25;
  }
}

function clearNodes(){
  if (keyIsPressed) {
    if (key === 'C' || key === 'c'){
      nodes = [];
      asciiCode = 64;
    }
  }
}






let lastClickTime = 0;
function mouseIsDoubleClicked() {
  return millis() - lastClickTime < 50;
}

function doubleClicked() {
  lastClickTime = millis();
  if (mouseIsDoubleClicked()){
    asciiCode++;
    nodes.push(new Node());
  }
}

function mousePressed() {
  for (let node of nodes) {
    node.mousePressed();
  }
}
