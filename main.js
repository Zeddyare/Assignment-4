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

    let gameStartValues = null;

    const createGame = (gameData) => {
        
        let table = document.querySelector("#puzzle");
        fetch(gameData)
            .then(response => response.json())
            .then(data => {
                gameStartValues = data;
                let size = data.rows.length;
                table.innerHTML = ""; //To clear table before creating new one
                for (let i = 0; i < size; i++){
                    //Create rows
                    let row = document.createElement("tr");
                    table.appendChild(row);
                    for (let j = 0; j < size; j++){
                        //Create Squares
                        let column = document.createElement("td");
                        row.appendChild(column);
                        let square = document.createElement("input");
                        square.type = "button";
                        square.classList.add("square");
                        square.id = `square${i}${j}`;
                        square.classList.add(`state-${Number(data.rows[i][j].currentState)}`);
                        if (data.rows[i][j].canToggle === true){
                            square.addEventListener('click', () =>{
                                if (square.classList.contains("state-0")){
                                    square.classList.remove("state-0");
                                    square.classList.add("state-1");
                                } else if (square.classList.contains("state-1")){
                                    square.classList.remove("state-1");
                                    square.classList.add("state-2");
                                } else {
                                    square.classList.remove("state-2");
                                    square.classList.add("state-0");
                                } 
                                
                            });
                        }
                        column.appendChild(square);
                    }
                }
            });  
    };


    //Cannot figure this out
    //Hour and a half of trying to get this to work, giving up for now
    const checkGame = (gameStartValues) => {
        let allComplete = true;
        let allCorrect = true;
        
        for (let i = 0; i < gameStartValues.rows.length; i++){
            for (let j = 0; j < gameStartValues.rows.length; j++){
                let square = document.querySelector(`#square${i}${j}`)
                console.log(square.classList);
                if (square.classList.contains("state-0")){
                    allComplete = false;
                };
                if (square.classList.contains("state-1") && gameStartValues.rows[i][j].correctState !== 1){
                    allCorrect = false;
                } else if (square.classList.contains("state-2") && gameStartValues.rows[i][j].correctState !== 2){
                    allCorrect = false;
                } else if (square.classList.contains("state-0")){
                    continue;
                }
            }
        }
        if (document.querySelector("#toggleIncorrect").checked){
            toggleIncorrect(gameStartValues);
        }
        if (!allComplete && allCorrect){
            return "So far so good"
        } else if (allCorrect){
            return "You did it!!"
        } else {
            return "Something is wrong"
        }

    }

    const resetGame = (gameStartValues) => {
        let size = gameStartValues.rows.length;
        for (let i = 0; i < size; i++){
            for (let j = 0; j < size; j++){
                let square = document.querySelector(`#square${i}${j}`);
                if (gameStartValues.rows[i][j].canToggle === true){
                    square.classList.remove("state-1");
                    square.classList.remove("state-2");
                    square.classList.add("state-0");
                }
            }
        }
    };

    const newGame = (gameData) => {
        createGame(gameData);
    };

    const toggleIncorrect = (gameData) => {
        let size = gameData.rows.length;
        for (let i = 0; i < size; i++){
            for (let j = 0; j < size; j++){
                let square = document.querySelector(`#square${i}${j}`);
                if (square.classList.contains("state-1") && gameData.rows[i][j].correctState !== 1){
                    square.classList.remove("state-1");
                    square.classList.add("incorrect");
                    square.addEventListener('click', () =>{
                        square.classList.remove("incorrect");
                        square.classList.add("state-2");
                    });
                } else if (square.classList.contains("state-2") && gameData.rows[i][j].correctState !== 2){
                    square.classList.remove("state-2");
                    square.classList.add("incorrect");
                    square.addEventListener('click', () =>{
                        square.classList.remove("incorrect");
                        square.classList.add("state-1");
                    });
                }
            }
        }
    }

    document.onload = createGame(sixBySixSample);

    document.querySelector("#check").addEventListener('click', () => {
        alert (checkGame(gameStartValues));
    });
    document.querySelector("#reset").addEventListener('click', () => {
        resetGame(gameStartValues);
    });
    document.querySelector("#start").addEventListener('click', () => {
        newGame(sixBySixSample);
    });









})();