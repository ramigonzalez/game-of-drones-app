import React, {Component} from 'react'


class SetupGame extends Component{
    constructor(props){
        super()
        this.state = {
            player1Name : "",
            player2Name : ""
        }
        
    }
    
    change(e){
        const {value, name} = e.target
        this.setState({
            [name] : value
        })
    }
    
    onSubmit(e){
        e.preventDefault()
        if(this.state.player1Name=== "" || this.state.player2Name === "")
            alert("Please enter a player name...")
        else if(this.state.player1Name == this.state.player2Name)
            alert("Names must be different")
        else this.props.savePlayersNames(this.state)
    }
    
    render(){
        return (
            <div className="container">
                <h1 className="main">Enter Player's Names</h1>
                <div className="form">
                <form>
                    <div>
                        <span>Player 1</span>
                        <input 
                            name="player1Name"
                            type="text" 
                            placeholder="Enter name here.."
                            value={this.state.player1Name}
                            onChange={e => this.change(e)}
                            />
                        
                    </div>
                    <br/>
                    <div>
                        <span>Player 2</span>
                        <input 
                            name="player2Name" 
                            type="text" 
                            placeholder="Enter name here.."
                            value={this.state.player2Name}
                            onChange={e => this.change(e)}
                        />
                    </div>
                    <br/>
                    <button id="submitbtn" onClick={e => this.onSubmit(e)}>Start Game!</button>
                </form>
                
                <button id="submitbtn" onClick={e => this.props.onClickStats(e)}>Watch Stats</button>
                </div>
            </div>
        );
    }
}
export default SetupGame