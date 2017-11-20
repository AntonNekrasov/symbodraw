let points = {
  x: [],
  y: [],
  moves: []
};

const addPoint = (x, y, isMoving) => {
  points.x.push(x);
  points.y.push(y);
  points.moves.push(isMoving);
};

function getPosition(event) {
  const x = event.pageX - this.offsetLeft;
  const y = event.pageY - this.offsetTop;

  return {x, y};
}

const reflow = (pane) => {
  const context = pane.getContext("2d");
  const {width, height} = context.canvas;
  context.clearRect(0, 0, width, height);

  context.strokeStyle = "#7d7d7d";
  context.lineJoin = "round";
  context.lineWidth = 2;

  const {x, y, moves} = points;

  for (let i = 0, length = x.length; i < length; i++) {
    context.beginPath();
    if (moves[i] && i) {
      context.moveTo(x[i - 1], y[i - 1]);
    } else {
      context.moveTo(x[i] - 1, y[i]);
    }
    context.lineTo(x[i], y[i]);
    context.closePath();
    context.stroke();
  }
};

export function updatePoints(event, pane, isMoving = false) {
  const position = getPosition.call(this, event);
  const {x, y} = position;
  addPoint(x, y, isMoving);
  reflow(pane);
}

export function clear(pane) {
  points = {
    x: [],
    y: [],
    moves: []
  };
  reflow(pane);
}