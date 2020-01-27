import React from 'react';
import axios from 'axios';
import Todo from './Todo.js'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {todos : null}
    this.renderTodos = this.renderTodos.bind(this);
  }

  async componentDidMount() {
    let todos = await axios.get('/todos')
    console.log(todos.data)
    this.setState({todos: todos.data})

    let data = {
      key: 'val',
      key2: 'val2'
    }
    let response2 = await axios.post('/post', data)
    console.log(response2.data['hi'])
  }

  renderTodos() {
    let todos = []
    for (let key in this.state.todos) {
      todos.push(<Todo 
        title = {this.state.todos[key].title}
        done = {this.state.todos[key].done}/>)
    }
    console.log(todos)
    return todos
  }

  render() {
    if (this.state.todos == null) {
      return (<div> Loading ... </div>)
    }

    return (
      <div className="App">
        {this.renderTodos()}
      </div>
    )
  }

}

export default App;
