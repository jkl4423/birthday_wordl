import React, {useEffect, useState} from "react";
import Keyboard from "./Keyboard";

const wordToFind = "steak";

const Game = () => {

    const [gameData, setGameData] = useState(JSON.parse(localStorage.getItem("gameData")));
    const [message,setMessage] =useState(null);
    const [error, setError] = useState(false);
    const [charArray, setCharArray] = useState([]);


    const startNewGame = () => {
        let data = {...gameData,
            "solution": wordToFind,
            "rowIndex": 0,
            "boardWords":[],
            "boardRowStatus":[],
            "presentCharArray":[],
            "absentCharArray":[],
            "correctCharArray":[],
            "status":"IN_PROGRESS"
        };
        setGameData(data);
        localStorage.setItem("gameData",JSON.stringify(data));
    }

    useEffect(() => {
        if (!gameData || !gameData.solution) {
            let data = {
                ...gameData,
                "solution": wordToFind,
                "rowIndex": 0,
                "boardWords": [],
                "boardRowStatus": [],
                "presentCharArray": [],
                "absentCharArray": [],
                "correctCharArray": [],
                "status": "IN_PROGRESS"
            };
            setGameData(data);
            localStorage.setItem("gameData", JSON.stringify(data));
        }
    }, [])

    const handleError = () =>{
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 2000);
    }

    const handleMessage = (message) =>{
        setMessage(message);
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    }

    const setRowWord =(word) =>{
        let boardWords=gameData.boardWords;
        let boardRowStatus=gameData.boardRowStatus;
        let solution=gameData.solution;
        let presentCharArray=gameData.presentCharArray;
        let absentCharArray=gameData.absentCharArray;
        let correctCharArray=gameData.correctCharArray;
        let rowIndex=gameData.rowIndex;
        let rowStatus =[];
        let matchCount=0;
        let status=gameData.status;

        for(let index=0;index<word.length;index++){
            if(solution.charAt(index) === word.charAt(index)){
                matchCount++;
                rowStatus.push("correct");
                if(!correctCharArray.includes(word.charAt(index))) correctCharArray.push(word.charAt(index));
                if(presentCharArray.indexOf(word.charAt(index))!== -1) presentCharArray.splice(presentCharArray.indexOf(word.charAt(index)),1);
            }else if(solution.includes(word.charAt(index))){
                rowStatus.push("present");
                if(!correctCharArray.includes(word.charAt(index))
                    && !presentCharArray.includes(word.charAt(index))) presentCharArray.push(word.charAt(index));
            }else{
                rowStatus.push("absent");
                if(!absentCharArray.includes(word.charAt(index))) absentCharArray.push(word.charAt(index));
            }
        }
        if(matchCount === 5){
            status="WIN";
            handleMessage("YOU WON")
        }
        else if(rowIndex+1 === 6){
            status="LOST";
            handleMessage(gameData.solution)
        }
        boardRowStatus.push(rowStatus);
        boardWords[rowIndex]=word;
        let newGameData={...gameData,
            "boardWords":boardWords,
            "boardRowStatus":boardRowStatus,
            "rowIndex":rowIndex+1,
            "status":status,
            "presentCharArray":presentCharArray,
            "absentCharArray":absentCharArray,
            "correctCharArray":correctCharArray};
        setGameData(newGameData);
        localStorage.setItem("gameData",JSON.stringify(newGameData));
    }

    const enterCurrentText =(word)=>{
        let boardWords=gameData.boardWords;
        let rowIndex=gameData.rowIndex;
        boardWords[rowIndex]=word;
        let newGameData={...gameData,
            "boardWords":boardWords};
        setGameData(newGameData);
    }

    const handleKey = (key) => {
        //if row is full or already won
        if(gameData.rowIndex > 5 || gameData.status === "WIN") return;

        if(key==="ENTER"){
            //row is full
            if(charArray.length===5){
                let word = charArray.join("").toLowerCase();
                //case of random word
                // if(!wordList[word.charAt(0)].includes(word)) {
                    // handleError();
                    // handleMessage("Not in word list");
                //     return;
                // }
                setRowWord(word);
                setCharArray([]);

                //row is not full
            }else{
                handleMessage("Not enough letters");
            }
            return;
        }
        if(key==="⌫"){
            charArray.splice(charArray.length-1,1);
            setCharArray([...charArray]);
        } else if (charArray.length<5){
            charArray.push(key);
            setCharArray([...charArray]);
        }
        enterCurrentText(charArray.join("").toLowerCase());
    }

    return (
        <div className='container'>
            <div className='top'>
                <div className='title'>Kathis Wordle</div>
                <button className="reset-board" onClick={startNewGame}>{"\u27f3"}</button>
            </div>
            {message && <div className='message'>
                {message}
            </div>}
            <div className='cube'>
                {[0,1,2,3,4,5].map((row,rowIndex)=>(
                    <div className={`cube-row ${gameData && row===gameData.rowIndex && error && "error"}`} key={rowIndex}>
                        {
                            [0,1,2,3,4].map((column,colIndex)=>(
                                <div key={colIndex} className={`letter ${gameData && gameData.boardRowStatus[row]?gameData.boardRowStatus[row][column]:""}`}>
                                    {gameData && gameData.boardWords[row] && gameData.boardWords[row][column]}
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
            <div className='bottom'>
                <Keyboard gameData={gameData}
                          handleKey = {handleKey}/>
            </div>
        </div>
    );
}
export default Game;