const cellsX = 50;
const cellsY = 50;
const cellSize = 25;
const canvasLength = cellsX * cellSize;
const canvasHeight = cellsY * cellSize;
let running = false;
let actionButton;
let clearButton;
let randomizeButton;
const offFr = 30;
const onFr = 2;

let grid = createGrid();

// Start-shape
grid[25][16] = true;
grid[23][16] = true;
grid[24][16] = true;
grid[25][17] = true;
grid[23][17] = true;
grid[25][18] = true;
grid[23][18] = true;
grid[24][18] = true;
grid[25][19] = true;
grid[23][19] = true;
grid[24][19] = true;
grid[25][20] = true;
grid[23][20] = true;
grid[24][20] = true;
grid[25][21] = true;
grid[23][21] = true;
grid[24][21] = true;
grid[25][22] = true;
grid[23][22] = true;
grid[25][23] = true;
grid[23][23] = true;
grid[24][23] = true;

function setup() {
  createCanvas(canvasLength, canvasHeight);
  frameRate(offFr);
  cursor(HAND);

  actionButton = createButton("Start...");
  clearButton = createButton("Clear");
  randomizeButton = createButton("Randomize");

  actionButton.mousePressed(onAction);
  clearButton.mousePressed(onClear);
  randomizeButton.mousePressed(onRandomize);
}

function draw() {
  if (running) {
    updateGrid();
  }

  for (let i = 0; i < cellsX; i++) {
    for (let j = 0; j < cellsY; j++) {
      const cellColour = grid[i][j] ? "aqua" : "teal";
      fill(cellColour);
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

function mousePressed() {
  const i = Math.floor(mouseX / cellSize);
  const j = Math.floor(mouseY / cellSize);

  //console.log(i, j);

  if (isOnGrid(i, j)) {
    grid[i][j] = !grid[i][j];
  }
}

function onRandomize() {
  grid = createGrid(() => Math.random() > 0.5);
}

function onClear() {
  if (running) {
    console.log("Game in progress");
  } else {
    console.log("Game is stopped");
    grid = createGrid(() => false);
  }
}

function onAction() {
  if (running) {
    actionButton.html("Start...");
    frameRate(offFr);
    running = false;
  } else {
    actionButton.html("Stop...");
    frameRate(onFr);
    running = true;
  }
}

function createGrid(initCell) {
  return Array.from(Array(cellsX), () => Array.from(Array(cellsY), initCell));
}

function isOnGrid(i, j) {
  return i > 0 && j > 0 && i < cellsX && j < cellsY;
}

function updateGrid() {
  const newGrid = [];
  for (let i = 0; i < cellsX; i++) {
    const column = [];
    newGrid.push(column);
    for (let j = 0; j < cellsY; j++) {
      let neighbourCoords = [
        {
          x: i + 1,
          y: j,
        },
        {
          x: i - 1,
          y: j,
        },
        {
          x: i,
          y: j - 1,
        },
        {
          x: i,
          y: j + 1,
        },
        {
          x: i - 1,
          y: j - 1,
        },
        {
          x: i + 1,
          y: j - 1,
        },
        {
          x: i - 1,
          y: j + 1,
        },
        {
          x: i + 1,
          y: j + 1,
        },
      ];
      neighbourCoords = neighbourCoords.filter((coord) =>
        isOnGrid(coord.x, coord.y)
      );

      let neighbours = neighbourCoords.map(
        (coords) => grid[coords.x][coords.y]
      );

      let trueCount = 0;
      let falseCount = 0;
      for (let n = 0; n < neighbours.length; n++) {
        if (neighbours[n]) {
          trueCount++;
        } else {
          falseCount++;
        }
      }

      const isAlive = grid[i][j]
        ? trueCount === 2 || trueCount === 3
        : trueCount === 3;
      column.push(isAlive);
    }
  }
  grid = newGrid;
}
