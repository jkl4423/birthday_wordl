import React from "react";


const Field = (props) => {

    const changeHandler = () => {
        if(props.winner === ""){
            if(props.occupied === false){
                if(props.playerAtTurn === "Player 1"){
                    props.changeSymbol(props.id, "X");
                } else {
                    props.changeSymbol(props.id, "O");
                }
                props.changePlayer();
            }
        }

    }

    return(
        <div onClick={changeHandler} className="field">
            {props.symbol}
        </div>
    );
}

export default Field;