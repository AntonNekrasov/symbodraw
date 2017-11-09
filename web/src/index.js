import "./index.scss";

let isDrawing = false;
let points = {
  x: [],
  y: [],
  moves: []
};

const pane = document.getElementById("pane");

pane.addEventListener("mousedown", function (event) {
  isDrawing = true;
  drawSomething.call(this, event);
});

pane.addEventListener("mousemove", function (event) {
  if(isDrawing) drawSomething.call(this, event);
});

pane.addEventListener("mouseup", function () {
  isDrawing = false;
});

pane.addEventListener("mouseleave", function () {
  isDrawing = false;
});

const addPoint = (x, y, isMoving) => {
  points.x.push(x);
  points.y.push(y);
  points.moves.push(isMoving);
};

function drawSomething(event) {
  const position = getPosition.call(this, event);
  const { x, y } = position;
  addPoint(x, y, true);
  reflow();
}

function getPosition(event) {
  const x = event.pageX - this.offsetLeft;
  const y = event.pageY - this.offsetTop;

  return { x, y };
}

const reflow = () => {
  const context = pane.getContext("2d");
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  const { x, y, moves } = points;

  for(let i = 0, length = x.length; i < length; i++) {
    context.beginPath();
    if(moves[i] && i){
      context.moveTo(x[i - 1], y[i - 1]);
    }else{
      context.moveTo(x[i] - 1, y[i]);
    }
    context.lineTo(x[i], y[i]);
    context.closePath();
    context.stroke();
  }
};