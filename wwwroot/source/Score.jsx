import React, {Component} from 'react'
import PlayerRow from "./PlayerRow.jsx"

class Score extends Component {
    constructor(props){
        super(props)
    }

    render() {

        const roundWinnersItems = this.props.state.game.roundWin.
                map((item,index) => <PlayerRow key={(index+1)} item={item} round={(index+1)}/>)

        return (
            <div className="gameDiv scorediv">
                <h1 className="gameLabels">SCORE BOARD</h1>
                <div className="table scoreTable scroll">
                    <div className="tbody">
                        <div className="trow">
                            <div className="tcell theader">Winner Player</div>
                            <div className="tcell theader">Round #</div>
                        </div>
                        {roundWinnersItems}
                    </div>
                </div>

            </div>
        );
    }
}
export default Score
