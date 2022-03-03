import React from "react";


const CharButtonComponent = (props) => {


    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    function handleCharBtnClick(e) {
        console.log(props.rowFull)
        if(!props.rowFull){
            console.log(e.target.id + " clicked.");
            //props.setCharToTry(e.target.id);
            props.handleChangingChar(e.target.id)
        }
    }

    function renderButtons() {
        return (
            <>
                <div className="charBtnContainer">
                {
                    chars.map((item) => (
                            <button onClick={handleCharBtnClick}
                                    className={`charBtn ${props.notIncludedChars.includes(item) ? 'disabled' : ''}`} key={item}
                                    id={item}
                                    disabled={`${props.notIncludedChars.includes(item) ? 'disabled' : ''}`}>{item}</button>
                        )
                    )
                }
                </div>
            </>

        )
    }


    return (
        <>
            {renderButtons()}
        </>

    )
}

export default CharButtonComponent;