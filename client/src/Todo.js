import React from 'react';
import axios from 'axios';

class Todo extends React.Component {
    render() {
        return (
            <div> 
                { this.props.title } 
                DONE: { this.props.done }
            </div>
        )
    }
}

export default Todo;