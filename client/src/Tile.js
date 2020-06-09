import React from 'react';
import './Tile.css';

class Tile extends React.Component {
    render() { 
        return (
            <div className='tile' onClick={() => this.props.onClick(this.props.x, this.props.y)}>
                <div className='marker'>
                    { this.props.board[this.props.x][this.props.y] }
                </div>
            </div>
        )
    }
}

export default Tile;