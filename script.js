const grid = document.getElementById("grid");
const xInput = document.getElementById("xValue");
const asciiOutput = document.getElementById("asciiOutput");
let isMouseDown = false; // Track mouse button state
let oldX = 32; // Default value

// Handle mouse events for sliding effect
grid.addEventListener("mousedown", () => (isMouseDown = true));
grid.addEventListener("mouseup", () => (isMouseDown = false));
grid.addEventListener("mouseleave", () => (isMouseDown = false));
grid.addEventListener("dragstart", (event) => {
  event.preventDefault();
});
// Generate Grid Function
function generateGrid() {
  let x = parseInt(xInput.value, 10);
  if (isNaN(x) || x < 8) {
    x = 8;
  }
  oldGridState = Array.from(document.querySelectorAll("#grid div")).map(
    (cell) => cell.classList.contains("active")
  );
  grid.innerHTML = ""; // Clear the grid
  grid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(8, 1fr)`;
  console.log(oldGridState);
  console.log(oldX);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < x; j++) {
      const cell = document.createElement("div");
      if (j < oldX && oldGridState[i * oldX + j]) {
        cell.classList.add("active");
      }
      cell.addEventListener("mousedown", () => {
        cell.classList.toggle("active");
      });
      // Toggle on mouseover if mouse is held down
      cell.addEventListener("mouseover", () => {
        if (isMouseDown) {
          cell.classList.toggle("active");
        }
      });

      grid.appendChild(cell);
    }
  }
  oldX = x;
}

// Clear Grid Function
function clearGrid() {
  document.querySelectorAll("#grid div").forEach((cell) => {
    cell.classList.remove("active");
  });
  asciiOutput.textContent = "";
}

// Generate ASCII Art Function
function generateASCII() {
  const x = oldX;
  let asciiArt =
    "byte pattern[HEIGHT][WIDTH] = {    // remember to replace the #define WIDTH with the actual value\n";
  const cells = document.querySelectorAll("#grid div");

  for (let i = 0; i < 8; i++) {
    let row = "";
    for (let j = 0; j < x - 1; j++) {
      const cell = cells[i * x + j];
      row += cell.classList.contains("active") ? "1, " : "0, ";
    }
    row += cells[i * x + x - 1].classList.contains("active") ? "1" : "0";
    asciiArt += "  {" + row + (i == 7 ? "}" : "},") + "\n";
  }

  asciiOutput.textContent = asciiArt + "};";
}

function conway() {
  const x = oldX;
  gridState = Array.from(document.querySelectorAll("#grid div")).map((cell) =>
    cell.classList.contains("active")
  );
  grid.innerHTML = "";
  const dirx = [0, 1, 1, 1, 0, -1, -1, -1];
  const diry = [1, 1, 0, -1, -1, -1, 0, 1];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < x; j++) {
      const cell = document.createElement("div");
      let alive = 0;
      for (let k = 0; k < 8; k++) {
        let ni = i + diry[k];
        let nj = j + dirx[k];
        if (ni >= 0 && ni < 8 && nj >= 0 && nj < x) {
          alive += gridState[ni * x + nj];
        }
      }
      if (gridState[i * x + j]) {
        if (alive == 2 || alive == 3) {
          cell.classList.add("active");
        }
      } else {
        if (alive == 3) {
          cell.classList.add("active");
        }
      }
      cell.addEventListener("mousedown", () => {
        cell.classList.toggle("active");
      });
      // Toggle on mouseover if mouse is held down
      cell.addEventListener("mouseover", () => {
        if (isMouseDown) {
          cell.classList.toggle("active");
        }
      });
      grid.appendChild(cell);
    }
  }
}

// Initial Grid Load
generateGrid();
