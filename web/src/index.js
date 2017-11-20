import { updatePoints, clear } from "./draw";
import "./index.scss";

let isDrawing = false;

const pane = document.getElementById("pane");

pane.addEventListener("mousedown", function (event) {
  isDrawing = true;
  updatePoints.call(this, event, pane);
});

pane.addEventListener("mousemove", function (event) {
  if (isDrawing) updatePoints.call(this, event, pane, true);
});

pane.addEventListener("mouseup", function () {
  isDrawing = false;
});

pane.addEventListener("mouseleave", function () {
  isDrawing = false;
});

document.querySelector("#clear").addEventListener("click", () => clear(pane));