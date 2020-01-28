import React from 'react';
import axios from 'axios';
import Tile from './Tile.js'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: null, 
      current_player: 'X', 
      game_over: false,
      winner: '-'
    }
    this.makeMove = this.makeMove.bind(this);
  }

  async componentDidMount() {
    let board = await axios.get('/board')
    this.setState({board: board.data})

    // let data = {
    //   key: 'val',
    //   key2: 'val2'
    // }
    // let response2 = await axios.post('/post', data)
    // console.log(response2.data['hi'])
  }

  async makeMove(x, y) {
    console.log(this.state.current_player)
    console.log(x, y)
    let new_player = 'X'
    if (this.state.current_player =='X') {
      new_player = 'O'
    }

    const move = {
      x,
      y,
      value: this.state.current_player
    }

    const moveResult = await axios.put('/board', move)

    this.setState({board: moveResult.data.board, 
      current_player: new_player,
      game_over: moveResult.data.game_over, 
      winner: moveResult.data.winner
    })

  }

  renderBoard() {
    return (
      <div className='board'> 
        <div className='row'> 
          <Tile x={0} y={0} 
            board={this.state.board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={0} y={1} 
            board={this.state.board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={0} y={2} 
            board={this.state.board} 
            onClick={this.makeMove}> 
          </Tile>          
        </div>
        <div className='row'> 
          <Tile x={1} y={0} 
            board={this.state.board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={1} y={1} 
            board={this.state.board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={1} y={2} 
            board={this.state.board} 
            onClick={this.makeMove}> 
          </Tile>
        </div>
        <div className='row'> 
          <Tile x={2} y={0} 
            board={this.state.board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={2} y={1} 
            board={this.state.board} 
            onClick={this.makeMove}> 
          </Tile>
          <Tile x={2} y={2} 
            board={this.state.board} 
            onClick={this.makeMove}> 
          </Tile>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.board == null) {
      return (<div> Loading ... </div>)
    }

    if (this.state.game_over) { 
      return ( 
        <div>
          game over screen! 
          the winner is: { this.state.winner }
        </div>
      )
    }

    return (
      <div className="App">
        Current player: {this.state.current_player}
        { this.renderBoard() }
      </div>
    )
  }

}

export default App;
