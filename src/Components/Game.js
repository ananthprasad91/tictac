import React, { Component } from 'react';
import Board from "./Board"

class Game extends Component {

    constructor() {
        super()
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    jumpTo = (step) => {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

    handleClick = i => {
        let history = this.state.history.slice(0, this.state.stepNumber + 1)
        let current = history[history.length - 1]
        const squares = current.squares.slice();
        if (calculateWinner(squares)) {
            alert("Game Over! Player : " + (this.state.xIsNext ? 'X' : 'O') + ' has WON')
            return
        }
        if (squares[i]) return
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState((prevState) => this.setState({ xIsNext: !prevState.xIsNext }))
        this.setState({
            history: history.concat([{ squares }]),
            stepNumber: history.length
        });
    }
    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const squares = current.squares
        const winner = calculateWinner(squares)

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });


        let status
        if (winner) {
            status = 'Winner is ' + winner
        }
        else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
            <div className="game">
                <h1>Inside Sprint-27</h1>
                <h4>Sanoc-7280</h4>
                <div className="game-board">
                    <Board
                        squares={squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{ moves }</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;