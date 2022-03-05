import React, {useEffect} from "react";
import './keyboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle, faDeleteLeft} from "@fortawesome/free-solid-svg-icons";

const chars = [
    ['a','b','c','d','e','f'],
    ['g','h','i','j','k','l'],
    ['m','n','o','p','q','r'],
    ['s','t','u','v','w','x'],
    ['ENTER','y','z','DELETE'],
    // ['q','w','e','r','t','y','u','i','o','p'],
    // ['a','s','d','f','g','h','j','k','l'],
    // ['ENTER','z','x','c','v','b','n','m','DELETE']
];

const Keyboard = (props) => {

    function handleKeyPress(key){
        if(key.key === "Enter"){
            props.handleKey("ENTER");
        }
        if(key.key === "Backspace"){
            props.handleKey("DELETE");
        }
        if(key.key.length === 1 && key.key.toLowerCase() !== key.key.toUpperCase()){
            props.handleKey(key.key.toUpperCase())
        }
    }

    // listen also to keyboard
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)
        return () => { window.removeEventListener("keydown", handleKeyPress) }
    }, [props.handleKey])

    return(
        <div className="keyRows">
            {
             chars.map((rowKeys, index) => (
                 <div className="row" key={index}>
                     {
                         rowKeys.map((key) => (
                            <button key={key}
                                    className={`${props.gameData && props.gameData.correctCharArray.includes(key)?"key-correct":
                                        (props.gameData && props.gameData.presentCharArray.includes(key) ?"key-present":
                                            props.gameData && props.gameData.absentCharArray.includes(key)?"key-absent":"")}`}
                                    onClick={()=>{props.handleKey(key)}}>
                                {
                                    key === "ENTER" ? <FontAwesomeIcon icon={faCheckCircle}/>
                                    : key === "DELETE" ? <FontAwesomeIcon icon={faDeleteLeft}/>
                                        : key
                                }
                            </button>
                         ))
                     }
                 </div>
             ))
            }
        </div>
    );
}

export default Keyboard;