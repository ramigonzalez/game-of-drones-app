import React from "react"

function PlayerRow(props) {
    return (
        <div key={props.round} className="trow statsRow">
            <div className="tcell">{props.item}</div>
            <div className="tcell">{props.round}</div>
        </div>
    )
}

export default PlayerRow