let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const getAnchortag=function(text,url){
  tag=document.createElement("a");
  tag.text=text;
  tag.href=url;
  return tag;
}

const addElement=function(){
  let hidden_tail= document.getElementById( "hidden_tail");
  hidden_tail.appendChild(getAnchortag("play again","index.html"));
}

const endGame= function(){
  clearInterval(animator);
  addElement();
}

// const isTouchingEdges=function(maxX,maxY,head){
//   return head.x==0||head.y==0||head.x==maxX||head.y==maxY;
// }
//
// const isTouchingBody=function(body,head){
//   for(i=0;i<body.length;i++){
//     if (body[i].x==head.x && body[i].y==head.y){
//       return true;
//     }
//   }
//   return false;
// }
//
// const isSnakeDied=function(head,body){
//   return isTouchingEdges(numberOfCols-1,numberOfRows-1,head)||isTouchingBody(body,head)
// }

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  //let body=snake.getBody();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
  if(head.isTouchingEdges(numberOfCols-1,numberOfRows-1)||snake.isEatingItself()){
    endGame();
  }
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
