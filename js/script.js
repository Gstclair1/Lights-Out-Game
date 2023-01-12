const NUM_ROWS = 5;
const NUM_COLS = 5;
const LIGHTS_OFF_COLOR = 'gray';
const LIGHTS_ON_COLOR = 'orange';
const grid = []

const gameTableEl = document.getElementById('game-table');

/**
 * Setup and start game. Each cell in the table has an id attribute from
 * 0 to (cells - 1). Use the id attribute of each cell (td element) to
 * determine which adjacent cells to turn on!
 * 
 * A solution to this game is here: https://dencee.github.io/lights-out/
 * Completed source code: https://github.com/dencee/lights-out
 */
function initializeGameTable() {

    for (let row = 0; row < NUM_ROWS; row++) {
        const tableRowEl = document.createElement('tr');

        for (let col = 0; col < NUM_COLS; col++) {

            const lightNumber = (row * NUM_ROWS) + col;

            const tableDataEl = document.createElement('td');
            tableDataEl.style.backgroundColor = LIGHTS_OFF_COLOR;
            tableDataEl.setAttribute('id', lightNumber.toFixed());
            tableRowEl.appendChild(tableDataEl);

            grid.push(tableDataEl);
        }

        gameTableEl.appendChild(tableRowEl);
    }
}

/**
 * Toggle all lights and check if you won!
 * @param {object} event 
 */
function toggleLights(event) {
    const clickedLightCellEl = event.target;
    const lightNumber = parseInt(clickedLightCellEl.getAttribute('id'));

    toggleSingleLight(grid[lightNumber]);

    // NOT first row
    if (lightNumber >= NUM_COLS) {
        toggleSingleLight(grid[lightNumber - NUM_COLS])
    }

    // NOT right edge
    if ((lightNumber + 1) % NUM_COLS !== 0) {
        toggleSingleLight(grid[lightNumber + 1])
    }



    // NOT on left edge
    if (lightNumber % NUM_COLS !== 0) {
        toggleSingleLight(grid[lightNumber - 1])
    }

    // NOT last row
    const totalCells = NUM_COLS * NUM_ROWS
    if (lightNumber < (totalCells - NUM_COLS)) {
        toggleSingleLight(grid[lightNumber + NUM_COLS])
    }

    checkWin();
}

/**
 * Toggle a single light on/off
 * @param {element object} lightCellEl 
 */
function toggleSingleLight(lightCellEl) {
    const bgcolor = lightCellEl.style.backgroundColor;

    if (bgcolor == LIGHTS_ON_COLOR) {
        lightCellEl.style.backgroundColor = LIGHTS_OFF_COLOR;
    } else {
        lightCellEl.style.backgroundColor = LIGHTS_ON_COLOR;
    }

}

/**
 * Check if all lights are ON!
 */
function checkWin() {
    let lightsOn = 0;
    for (let i = 0; i < grid.length; i++) {
        const bgcolor = grid[i].style.backgroundColor;
        if (bgcolor === LIGHTS_ON_COLOR) {
            lightsOn += 1;
        }
    };

    if (lightsOn === grid.length) {
        alert('YOU WIN');
    }
}

/**
 * Randomize lights on/off
 */
function randomizeLights() {
    for (let i = 0; i < grid.length; i++) {
        const trueFalseRandom = Math.random() < 0.5
        if (trueFalseRandom) {
            toggleSingleLight(grid[i]);
        }
    }

}


/*
 * Listeners for mouse click events
 */
document.addEventListener('DOMContentLoaded', () => {
    const lightElements = document.querySelectorAll('td');

    for (let i = 0; i < lightElements.length; i++) {
        lightElements[i].addEventListener('click', toggleLights);
    }

    const button = document.querySelector('button');
    button.addEventListener('click', randomizeLights);
});

initializeGameTable();