import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tile from './Tile.js'

import './App.css';

function App() {

  const [board, setBoard] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(' ');

  async function restart() {
    let board = await axios.post('/restart')
    setBoard(board.data)
  }

  useEffect(() => {
    let board = await axios.get('/board')
    setBoard(board.data)

    // let data = {
    //   key: 'val',
    //   key2: 'val2'
    // }
    // let response2 = await axios.post('/post', data)
    // console.log(response2.data['hi'])
  });

  async makeMove(x, y) {
    let new_player = 'X'
    if (current_player =='X') {
      new_player = 'O'
    }

    const move = {
      x,
      y,
      value: current_player
    }

    const moveResult = await axios.put('/board', move)
    setBoard(moveResult.data.board)
    setCurrentPlayer(new_player)
    setGameOver(moveResult.data.game_over)
    setWinner(moveResult.data.winner)
  }

  renderBoard() {
    return (
      <div className='board'> 
        <div className='row row-1'>
          <Tile x={0} y={0} 
            board={board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={0} y={1} 
            board={board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={0} y={2} 
            board={board} 
            onClick={this.makeMove}> 
          </Tile>          
        </div>
        <div className='row row-2'> 
          <Tile x={1} y={0} 
            board={board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={1} y={1} 
            board={board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={1} y={2} 
            board={board} 
            onClick={this.makeMove}> 
          </Tile>
        </div>
        <div className='row row-3'> 
          <Tile x={2} y={0} 
            board={board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={2} y={1} 
            board={board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={2} y={2} 
            board={board} 
            onClick={this.makeMove}> 
          </Tile>
        </div>
      </div>
    )
  }

  if (board == null) {
    return (<div> Loading ... </div>)
  }

  if (game_over) { 
    return ( 
      <div>
        game over screen! 
        the winner is: { winner }
      </div>
    )
  }

  return (
    <div className="App">
      Current player: {current_player}
      { this.renderBoard() }
      <button onClick={this.restart} className='restart'> 
        Restart 
      </button>
    </div>
  )

}

export default App;
