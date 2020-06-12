import React from 'react';
import './Tile.css';

function Tile(props) {
    return (
        <div className='tile' onClick={() => props.onClick(props.x, props.y)}>
            <div className='marker'>
                { props.board[props.x][props.y] }
            </div>
        </div>
    )
}

export default Tile;