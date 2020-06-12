import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tile from './Tile.js'

import './App.css';

function App() {

  const [board, setBoard] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(' ');

  function restart() {
    axios.post('/restart')
    .then(board => setBoard(board.data))
  }

  useEffect(() => {
    axios.get('/board')
    .then(board => setBoard(board.data))

    // let data = {
    //   key: 'val',
    //   key2: 'val2'
    // }
    // let response2 = await axios.post('/post', data)
    // console.log(response2.data['hi'])
  });

  function makeMove(x, y) {
    let newPlayer = 'X'
    if (currentPlayer ==='X') {
      newPlayer = 'O'
    }

    const move = {
      x,
      y,
      value: currentPlayer
    }

    axios.put('/board', move)
    .then(moveResult => {
      setBoard(moveResult.data.board)
      setCurrentPlayer(newPlayer)
      setGameOver(moveResult.data.game_over)
      setWinner(moveResult.data.winner)
    })
  }

  function renderBoard() {
    return (
      <div className='board'> 
        <div className='row row-1'>
          <Tile x={0} y={0} 
            board={board} 
            onClick={makeMove}> 
          </Tile>
          <Tile x={0} y={1} 
            board={board} 
            onClick={makeMove}> 
          </Tile>
          <Tile x={0} y={2} 
            board={board} 
            onClick={makeMove}> 
          </Tile>          
        </div>
        <div className='row row-2'> 
          <Tile x={1} y={0} 
            board={board} 
            onClick={makeMove}> 
          </Tile>
          <Tile x={1} y={1} 
            board={board} 
            onClick={makeMove}> 
          </Tile>
          <Tile x={1} y={2} 
            board={board} 
            onClick={makeMove}> 
          </Tile>
        </div>
        <div className='row row-3'> 
          <Tile x={2} y={0} 
            board={board} 
            onClick={makeMove}> 
          </Tile>
          <Tile x={2} y={1} 
            board={board} 
            onClick={makeMove}> 
          </Tile>
          <Tile x={2} y={2} 
            board={board} 
            onClick={makeMove}> 
          </Tile>
        </div>
      </div>
    )
  }

  if (board === null) {
    return (<div> Loading ... </div>)
  }

  if (gameOver) { 
    return ( 
      <div>
        game over screen! 
        the winner is: { winner }
      </div>
    )
  }

  return (
    <div className="App">
      Current player: {currentPlayer}
      { renderBoard() }
      <button onClick={restart} className='restart'> 
        Restart 
      </button>
    </div>
  )

}

export default App;
