const circles = document.querySelectorAll(".circle");
const squares = document.querySelectorAll(".square");

let draggedCircle = null;
addEventListeners();

function addEventListeners() {
  circles.forEach((circle) => {
    circle.addEventListener("dragstart", dragStart);
    circle.addEventListener("dragend", dragEnd);
  });

  squares.forEach((square) => {
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", drop);
  });
}

function dragStart() {
  draggedCircle = this;
  setTimeout(() => (this.style.display = "none"), 0);
}

function dragEnd() {
  setTimeout(() => (this.style.display = "block"), 0);
  draggedCircle = null;
}

function dragOver(e) {
  e.preventDefault();
}

function drop() {
  var draggedCircleStyles = getComputedStyle(draggedCircle);
  var squareStyles = getComputedStyle(this);
  var circleColor = draggedCircleStyles.getPropertyValue("background-color");
  var squareColor = squareStyles.getPropertyValue("background-color");

  if (circleColor === squareColor) {
    this.appendChild(draggedCircle);
    draggedCircle.removeAttribute("draggable");
    draggedCircle.removeEventListener("dragstart", dragStart);
    draggedCircle.removeEventListener("dragend", dragEnd);
  }
}
