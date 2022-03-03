import React, {useEffect, useState} from "react";
import Field from "./Field";
import CharButtonComponent from "./CharButtonComponent";

const WordleGame = () => {

    const wordToFind = "steak";

    const [gameState, setGameState] = useState([]);
    const [playerAtTurn, setPlayerAtTurn] = useState("Player 1");
    const [winner, setWinner] = useState("");
    const [wordFound, setWordFound] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [rowFull, setRowFull] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    // const [charToTry, setCharToTry] = useState('');
    const [notIncludedChars, setNotIncludedChars] = useState([]);

    useEffect(() => {
        createNewGame()
    }, [])



    // useEffect(() => {
    //     if (charToTry !== "") {
    //
    //     }
    // }, [charToTry])

    const createNewGame = () =>{
        let array = [
            {id: 1, symbol: "", occupied: false},
            {id: 2, symbol: "", occupied: false},
            {id: 3, symbol: "", occupied: false},
            {id: 4, symbol: "", occupied: false},
            {id: 5, symbol: "", occupied: false},
            {id: 6, symbol: "", occupied: false},
            {id: 7, symbol: "", occupied: false},
            {id: 8, symbol: "", occupied: false},
            {id: 9, symbol: "", occupied: false},
            {id: 10, symbol: "", occupied: false},
            {id: 11, symbol: "", occupied: false},
            {id: 12, symbol: "", occupied: false},
            {id: 13, symbol: "", occupied: false},
            {id: 14, symbol: "", occupied: false},
            {id: 15, symbol: "", occupied: false},
            {id: 16, symbol: "", occupied: false},
            {id: 17, symbol: "", occupied: false},
            {id: 18, symbol: "", occupied: false},
            {id: 19, symbol: "", occupied: false},
            {id: 20, symbol: "", occupied: false},
            {id: 21, symbol: "", occupied: false},
            {id: 22, symbol: "", occupied: false},
            {id: 23, symbol: "", occupied: false},
            {id: 24, symbol: "", occupied: false},
            {id: 25, symbol: "", occupied: false},
            {id: 26, symbol: "", occupied: false},
            {id: 27, symbol: "", occupied: false},
            {id: 28, symbol: "", occupied: false},
            {id: 29, symbol: "", occupied: false},
            {id: 30, symbol: "", occupied: false},
        ];
        setGameState(array);
        setWordFound(false);
        setCurrentIndex(0);
        setRowFull(false);
        setRowCount(0)
        //delete
        setWinner("");
    }

    function handleChangingChar(char){
        console.log("here" + char)
        gameState[currentIndex].symbol = char;
        if(rowCount < 4){
            setCurrentIndex(currentIndex + 1);
            setRowCount(rowCount + 1);
        } else {
            setRowFull(true);
        }
    }

    function handleBackBtn(){
        console.log("back");
        let temp = JSON.parse(JSON.stringify(gameState));
        temp[currentIndex].symbol = "";
        //one step behind
        setGameState(temp);
        if(currentIndex > 0 && rowCount > 0){
            setCurrentIndex(currentIndex - 1);
            setRowCount(rowCount - 1);
            setRowFull(false);
        }
    }

    function handleEnterBtn(){
        console.log("enter")
    }

    function changeSymbol(place, sym){
        gameState[place-1].symbol = sym;
        gameState[place-1].occupied = true;
        checkForWin();
    }

    function changePlayer() {
        if (playerAtTurn === "Player 1") {
            setPlayerAtTurn("Player 2");
        } else {
            setPlayerAtTurn("Player 1");
        }
    }

    function checkForWin(){
        //check rows
        if(checkThreeFields(0,1,2)){
            setWinner(playerAtTurn);
        } else if (checkThreeFields(3,4,5)){
            setWinner(playerAtTurn);
        }else if (checkThreeFields(6,7,8)){
            setWinner(playerAtTurn);
        }
        //check columns
        else if (checkThreeFields(0,3,6)){
            setWinner(playerAtTurn);
        }else if (checkThreeFields(1,4,7)){
            setWinner(playerAtTurn);
        }else if (checkThreeFields(2,5,8)){
            setWinner(playerAtTurn);
        }
        //check diagonal
        else if (checkThreeFields(0,4,8)){
            setWinner(playerAtTurn);
        }else if (checkThreeFields(2,4,6)){
            setWinner(playerAtTurn);
        } else if(checkForDraw()){
            setWinner("draw")
        }
    }

    function checkForDraw(){
        //if an element is still unoccupied, return false;
        for (let element of gameState) {
            if(element.symbol === ""){
                return false;
            }
        }
        //return draw true;
        return true;
    }

    function checkThreeFields(field1, field2, field3){
        return gameState[field1].symbol !== "" &&
            gameState[field1].symbol === gameState[field2].symbol &&
            gameState[field1].symbol === gameState[field3].symbol;
    }

    return (
        <div>
            <div className="gameContainer">
                {
                    gameState.map((item) => (
                            <Field
                                key={item.id}
                                id={item.id}
                                symbol={item.symbol}
                                occupied={item.occupied}
                                changeSymbol={changeSymbol}
                                playerAtTurn={playerAtTurn}
                                changePlayer={changePlayer}
                                winner={winner}
                                wordFound={wordFound}
                            />
                        )
                    )
                }
            </div>
            <div className="buttonDiv">
                <button onClick={createNewGame}><i className="fas fa-redo"/></button>
                <button id="back" className="fas fa-caret-square-left" onClick={handleBackBtn}/>
                <button id="enter" className="fas fa-check-circle" onClick={handleEnterBtn}/>
            </div>
            <CharButtonComponent
                wordFound={wordFound}
                // setCharToTry={setCharToTry}
                notIncludedChars={notIncludedChars}
                rowFull={rowFull}
                handleChangingChar={handleChangingChar}
            />
            <div className="winnerDiv">
                <h2>
                    {
                        winner === "draw" ? "It's a draw."
                            : winner !== "" ? "Winner: " + winner
                                : ""
                    }
                </h2>
            </div>
        </div>

    );
}

export default WordleGame;