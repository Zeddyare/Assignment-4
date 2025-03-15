//3-in-a-row game 
// Create a 3 in a row game that can have size altered and works in the DOM
// Website must create the board, have button to check progress (mistake, solved, so far so good), reset button, and start new game button
// Use API to get board parameters (size, default values, solution);
// Use DOM and event listeners to operate the game

// Requirements: 
// 1. Unobtrusive JavaScript to set each square to 3 states (empty (state 0), state 1, state 2) with each state having a different color (0 as "neutral" or untouched)
// 2. Any squares that are in state 1 or 2 at the start of the game cannot be changed 
// 3. Check button: 
//  - If altered squares are correct but game is unfinished: "So far so good"
//  - If one or more squares incorrect: "Something is wrong"
//  - If all squares altered correctly and game is finished: "You did it!!"
// 4. Check box to toggle display of any incorrect altered squares
// 5. Add one innovative feature

// Expanded requirements:
// 1. Must use fetch from provided API links for game data (JSON object should be updated as square states are changed)
// 2. Must use DOM, CSS, and JS to create table, no document.write, no html tags, table created on page load
// 3. Changing colours/states on mouse clicks, squares in state 1 or 2 at start of game cannot be changed
// 4. Check button must check for errors and update the DOM to show the result
// 5. Checkbox to mark squares that have been altered incorrectly (toggleable display)
// 6. Add a unique feature that innovates upon the basic requirements - board size selector

//IIFE
(() => {

    //Test arrays and API data to work with
    // Test board
    sixBySixSample = "https://prog2700.onrender.com/threeinarow/sample";
    // Random board size
    sixToFourteen ="https://prog2700.onrender.com/threeinarow/random";
    // Determined board sizes
    six ="https://prog2700.onrender.com/threeinarow/6x6";
    eight ="https://prog2700.onrender.com/threeinarow/8x8";
    ten ="https://prog2700.onrender.com/threeinarow/10x10";
    twelve ="https://prog2700.onrender.com/threeinarow/12x12";
    fourteen ="https://prog2700.onrender.com/threeinarow/14x14";

    const createGame = (gameData) => {
        let table = document.querySelector("#puzzle");
        fetch(gameData)
            .then(response => response.json())
            .then(data => {
                let size = data.rows.length;
                table.innerHTML = ""; //To clear table before creating new one
                for (let i = 0; i < size; i++){
                    //Create rows
                    let row = document.createElement("tr");
                    table.appendChild(row);
                    for (let j = 0; j < size; j++){
                        //Create Squares
                        let square = document.createElement("td");
                        square.classList.add("square");
                        if (i === 0){ 
                            square.id = `square${j}`;
                        } else {
                            square.id = `square${i*6 + j}`;
                        }
                        square.classList.add(`state-${Number(data.rows[i][j].currentState)}`);

                        row.appendChild(square);
                       
                    }
                }
            });  
    };

    document.onload = createGame(sixBySixSample);
    document.querySelector("#start").addEventListener('click', createGame(sixBySixSample));
    document.querySelector("#check").addEventListener('click', checkGame());
    document.querySelector("#reset").addEventListener('click', resetGame());






})();