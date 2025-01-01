const grid = document.getElementById('grid');
const xInput = document.getElementById('xValue');
const asciiOutput = document.getElementById('asciiOutput');
let isMouseDown = false; // Track mouse button state
let oldX = 32; // Default value

// Handle mouse events for sliding effect
grid.addEventListener('mousedown', () => (isMouseDown = true));
grid.addEventListener('mouseup', () => (isMouseDown = false));
grid.addEventListener('mouseleave', () => (isMouseDown = false));

// Generate Grid Function
function generateGrid() {
    const x = parseInt(xInput.value, 10) || 1;
    oldGridState = Array.from(document.querySelectorAll('#grid div')).map(cell => cell.classList.contains('active'));
    grid.innerHTML = ''; // Clear the grid
    grid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(8, 1fr)`;
    console.log(oldGridState);
    console.log(oldX);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < x; j++) {
            const cell = document.createElement('div');
            if (j < oldX && oldGridState[i * oldX + j]) {
                cell.classList.add('active');
            }
            // Toggle on click
            cell.addEventListener('click', () => {
                cell.classList.toggle('active');
            });

            // Toggle on mouseover if mouse is held down
            cell.addEventListener('mouseover', () => {
                if (isMouseDown) {
                    cell.classList.toggle('active');
                }
            });

            grid.appendChild(cell);
        }
    }
    oldX = x;
}

// Clear Grid Function
function clearGrid() {
    document.querySelectorAll('#grid div').forEach(cell => {
        cell.classList.remove('active');
    });
    asciiOutput.textContent = '';
}

// Generate ASCII Art Function
function generateASCII() {
    const x = parseInt(xInput.value, 10) || 1;
    let asciiArt = 'byte pattern[HEIGHT][WIDTH] = {    // remember to replace the #define WIDTH with the actual value\n';
    const cells = document.querySelectorAll('#grid div');

    for (let i = 0; i < 8; i++) {
        let row = '  ';
        for (let j = 0; j < x - 1; j++) {
            const cell = cells[i * x + j];
            row += cell.classList.contains('active') ? '1, ' : '0, ';
        }
        row += cells[i * x + x - 1].classList.contains('active') ? '1' : '0';
        asciiArt += '{' + row + '}' + '\n';
    }

    asciiOutput.textContent = asciiArt + '};';
}

// Initial Grid Load
generateGrid();