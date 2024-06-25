document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector("#grid"); // Get the grid container
    const scoreDisplay = document.querySelector("#score"); // Get the score display element
    let squares = []; // Array to hold all the squares (tiles) of the grid
    let score = 0; // Initialize the score

    // Create the playing board
    function createBoard() {
        for (let i = 0; i < 16; i++) { // Loop to create 16 squares (4x4 grid)
            let square = document.createElement("div"); // Create a new div element
            square.classList.add("grid-cell"); // Add the class 'grid-cell' for styling
            square.innerHTML = 0; // Initialize each square with 0
            gridDisplay.appendChild(square); // Append the square to the grid container
            squares.push(square); // Add the square to the array of squares
        }
        generate(); // Generate the first number on the board
        generate(); // Generate the second number on the board
    }

    // Generate a new number in a random empty square
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length); // Get a random index
        if (squares[randomNumber].innerHTML == 0) { // Check if the square is empty
            squares[randomNumber].innerHTML = 2; // Set the square's value to 2
            squares[randomNumber].setAttribute('data-value', 2); // Set data attribute for styling
            checkForGameOver(); // Check if the game is over
        } else {
            generate(); // If the square is not empty, generate another number
        }
    }

    // Swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) { // Loop through all squares
            if (i % 4 === 0) { // Only start at the beginning of each row
                let totalOne = squares[i].innerHTML; // Get the value of the first square in the row
                let totalTwo = squares[i + 1].innerHTML; // Get the value of the second square in the row
                let totalThree = squares[i + 2].innerHTML; // Get the value of the third square in the row
                let totalFour = squares[i + 3].innerHTML; // Get the value of the fourth square in the row
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour)
                ]; // Create an array of the row values

                let filteredRow = row.filter(num => num); // Filter out the zeros
                let missing = 4 - filteredRow.length; // Calculate the number of missing elements
                let zeros = Array(missing).fill(0); // Create an array of zeros
                let newRow = zeros.concat(filteredRow); // Concatenate zeros to the beginning of the filtered row

                squares[i].innerHTML = newRow[0]; // Update the square values
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
                updateTileData(i, i + 1, i + 2, i + 3); // Update data attributes for styling
            }
        }
    }

    // Swipe left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour)
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
                updateTileData(i, i + 1, i + 2, i + 3);
            }
        }
    }

    // Swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 4].innerHTML;
            let totalThree = squares[i + 8].innerHTML;
            let totalFour = squares[i + 12].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour)
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + 4].innerHTML = newColumn[1];
            squares[i + 8].innerHTML = newColumn[2];
            squares[i + 12].innerHTML = newColumn[3];
            updateTileData(i, i + 4, i + 8, i + 12);
        }
    }

    // Swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 4].innerHTML;
            let totalThree = squares[i + 8].innerHTML;
            let totalFour = squares[i + 12].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour)
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + 4].innerHTML = newColumn[1];
            squares[i + 8].innerHTML = newColumn[2];
            squares[i + 12].innerHTML = newColumn[3];
            updateTileData(i, i + 4, i + 8, i + 12);
        }
    }

    // Combine rows
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = `Score: ${score}`;
                updateTileData(i, i + 1);
            }
        }
        checkForWin();
    }

    // Combine columns
    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + 4].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 4].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = `Score: ${score}`;
                updateTileData(i, i + 4);
            }
        }
        checkForWin();
    }

    // Assign functions to keycodes
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener("keyup", control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                scoreDisplay.innerHTML = `You win! Final Score: ${score}`; // Display win message with final score
                document.removeEventListener("keyup", control);
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            scoreDisplay.innerHTML = `Game Over! Final Score: ${score}`; // Display game over message with final score
            document.removeEventListener("keyup", control);
        }
    }

    function updateTileData(...indices) {
        indices.forEach(index => {
            squares[index].setAttribute('data-value', squares[index].innerHTML);
        });
    }

    createBoard(); // Initialize the game board
});

