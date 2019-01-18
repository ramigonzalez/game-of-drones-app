import React from 'react'
import SetupGame from './SetupGame.jsx'
import Game from './Game.jsx'
import Score from './Score.jsx'
import Stats from './Stats.jsx'

class App extends React.Component {

    constructor(){
        super()
        this.state = {
            gameStarted : false,
            existWinner : false,
            winnerPlayer : "",
            names: {playerName1 : "",
                    playerName2 : ""},
            game: {
                roundNumber : 1,
                player1Moves : false,
                roundWinCount : [0,0],
                roundMoves : [],
                roundWin : []
            },
            showStats : false
            ,players : []
        }
        this._isMounted = false

        this.savePlayersNames = this.savePlayersNames.bind(this)
        this.getWinner = this.getWinner.bind(this)
        this.updateRoundWin = this.updateRoundWin.bind(this)
        this.resetRoundWin = this.resetRoundWin.bind(this)
        this.checkIfEndGame = this.checkIfEndGame.bind(this)
        this.onClickStats = this.onClickStats.bind(this)
    }
    
    componentWillUnmount(){
        console.log("APP  componentWillUnmount() ... ")
        this._isMounted = false
    }

    componentDidMount(){
        console.log("APP  componentDidMount() ... START")
        this._isMounted = true
        fetch("/api/statics")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ players : data })
                }   
            )

        console.log("APP  componentDidMount() ... FINISH")
    }

    savePlayersNames(data){
        this.setState({
            names : data,
            gameStarted : true
            }
        )
    };

    onSubmitMove(move){
        console.log("APP onSubmitMove() .... START ")
        console.log("Move ... ",move)
        this.setState(prevState => {
            const newRoundMoves = prevState.game.roundMoves
            newRoundMoves.push(move) //add a movement to the roundMoves array
            return{
                game: {
                            roundMoves : newRoundMoves,
                            player1Moves : true,
                            roundNumber : prevState.game.roundNumber,
                            roundWinCount : prevState.game.roundWinCount,
                            roundWin : prevState.game.roundWin
                    }
            }
        })
        console.log("APP onSubmitMove() .... FINISH ")
    }

    resetRoundWin(){
        console.log("APP resetRoundWin() ... START")
        this.setState(prevState => {
            const winnerPlayer = this.getWinner(prevState.game.roundMoves)
            let newRoundWinCount;
            let winnerPlayerName;
            if(winnerPlayer == 1 || winnerPlayer == 2){

                const aux = prevState.game.roundWinCount
                console.log("APP resetRoundWin() ... prevState.game.roundWinCount ",aux)
                console.log("APP resetRoundWin() ... winnerPlayer ",winnerPlayer)

                newRoundWinCount = this.updateRoundWin(winnerPlayer, aux)
                winnerPlayerName = (winnerPlayer == 1) ? prevState.names.player1Name :                                     prevState.names.player2Name
                console.log("APP resetRoundWin() ... winnerPlayerName",winnerPlayerName)
            }else{
                winnerPlayerName = "Draw"
                newRoundWinCount = prevState.game.roundWinCount
            }
            const newRoundWin = prevState.game.roundWin
            newRoundWin.push(winnerPlayerName)
            return{
                game: {
                        roundMoves : [],
                        player1Moves : false,
                        roundNumber : prevState.game.roundNumber + 1,
                        roundWinCount : newRoundWinCount,
                        roundWin : newRoundWin
                }
            }
        })
        console.log("APP resetRoundWin() ... FINISH")
    }

    getWinner(newRoundResult_){
        const newRoundResult = newRoundResult_
        console.log("APP getWinner() ....START")
        console.log("CHECKING FOR A ROUND WINNER")
        const m1 = newRoundResult[0]
        const m2 = newRoundResult[1]
        let winResult = -1
        console.log("MOVE PLAYER 1: ",m1)
        console.log("MOVE PLAYER 2: ",m2)
        if(m1 === "paper" && m2 === "rock"){ winResult = 1 }
        else if(m1 === "paper" && m2 === "scissor"){ winResult = 2 }

        else if(m1 === "rock" && m2 === "scissor"){ winResult = 1 }
        else if(m1 === "rock" && m2 === "paper"){ winResult = 2 }

        else if(m1 === "scissor" && m2 === "paper"){ winResult = 1 }
        else if(m1 === "scissor" && m2 === "rock"){ winResult = 2 }

        else if(m1 === m2){ winResult = 0 }

        console.log("APP getWinner() actual winner.... ", winResult)

        if(winResult == -1) alert ("APP getWinner() ERROR .....")

        console.log("APP getWinner() .... FINISH")
        return winResult
    }

    updateRoundWin(roundWinner_, newRoundWinCount_){
        console.log("APP updateRoundWin() ... START")

        const roundWinner = roundWinner_ - 1
        const newRoundWinCount = newRoundWinCount_

        console.log("ACTUAL STATUS OF roundWinCount[]", newRoundWinCount )

        newRoundWinCount[roundWinner] = newRoundWinCount[roundWinner] + 1

        console.log("APP newRoundWinCount modified ",newRoundWinCount)
        console.log("APP updateRoundWin() ... FINISH")

        return newRoundWinCount
    }

    checkIfEndGame(){
        console.log("APP checkIfEndGame() ... START")
        const roundWinCount = this.state.game.roundWinCount
        console.log("APP checkIfEndGame() ... roundWinCount ", roundWinCount)

        const p1_wins = roundWinCount[0]
        const p2_wins = roundWinCount[1]

        let existWinner = false;
        if(p1_wins == 3 || p2_wins == 3)
            existWinner = true

        if(existWinner)
        {
            let winnerPlayerName;
            if(p1_wins == 3)
                winnerPlayerName = this.state.names.player1Name
            else
                winnerPlayerName = this.state.names.player2Name
            const data = {
                Name : winnerPlayerName
            }
            console.log(JSON.stringify(data))
            const postBody = JSON.stringify(data)
            console.log(JSON.stringify(data))

            fetch("/api/updateDb", {  
                method: 'POST',  
                body: postBody,
                headers: {'Content-Type': 'application/json'}
  
            }).then((response) => response.json())  
                .then((responseJson) => {  
                    console.log("Inserted " +responseJson + " rows")  
                }) 

            this.setState(prevState => {
                const roundWinCount_ = prevState.game.roundWinCount
                console.log(roundWinCount_)
                const p1_wins = roundWinCount_[0]
                let winnerPlayerName;
                if(p1_wins == 3)
                    winnerPlayerName = prevState.names.player1Name
                else
                    winnerPlayerName = prevState.names.player2Name

                return {
                    gameStarted : false,
                    existWinner : true,
                    winnerPlayer : winnerPlayerName,
                    names: {
                        playerName1 : "",
                        playerName2 : ""
                    },
                    game: {
                        roundNumber : 1,
                        player1Moves : false,
                        roundWinCount : [0,0],
                        roundMoves : [],
                        roundWin : []
                    },
                    showStats : false
                    ,players : []
                }
            })
        }

        console.log("APP checkIfEndGame() ... FINISH")
    }

    onClickStats(e){
        if(this._isMounted)
            this.setState({showStats : true})
    }

    render() {
        console.log("APP render() .... ",this.state)
        return (
            <div>
                <div>
                    <h1>GAME OF DRONES</h1>
                    <hr/>
                </div>
                
                {this.state.showStats ? <Stats state={this.state} /> : 
                
                <div>
                    {!this.state.existWinner ?
                        <div >
                            {!this.state.gameStarted ? 
                                <SetupGame 
                                    savePlayersNames={this.savePlayersNames}
                                    onClickStats={e => this.onClickStats(e)}
                                /> 
                            :
                            <div>
                                <h1 className="gameLabels">GAME STARTED</h1>
                                <div className="container gameBoard">
                                    <Game
                                        state={this.state}
                                        onSubmitMove={this.onSubmitMove.bind(this)}
                                        resetRoundWin={this.resetRoundWin}
                                        checkIfEndGame={this.checkIfEndGame}
                                    />
                                    <Score  state={this.state}/>
                                </div>
                            </div>
                            }
                        </div>
                    :
                        <div className="container gameBoard marginTop30">
                            <h1> THE PLAYER {this.state.winnerPlayer} IS THE NEW EMPEROR </h1>
                            <label className="lblbutton withOverride">
                                <a className="button" href="http://localhost:5000/home">Play Again</a>
                            </label>
                        </div>
                    }
                  </div>  
                }
                
            </div>
        );
    }
}

export default App
