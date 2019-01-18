import React from "react"
import PlayerRow from "./PlayerRow.jsx"

function Stats(props) {

    const players = props.state.players.
                map((item,index) => <PlayerRow key={index} item={item.name} round={(item.wins)}/>)
    return (
        <div>
            <h1>STATS BOARD</h1>
            <div className="container gameBoard">
                
                <div className="table scoreTable scroll">
                    <div className="tbody">
                        <div className="trow statsRow">
                            <div className="tcell theader">Player Name</div>
                            <div className="tcell theader">Wins</div>
                        </div>
                        {players}
                    </div>
                </div>
                <label className="lblbutton withOverride">
                <a 
                    id="playAgainBtn" 
                    className="playAgainBtn" 
                    href="http://localhost:5000/home" 
                >Back</a>
                </label>
            </div>
        </div>

    )
}

export default Stats


