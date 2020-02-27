import React, { Component } from 'react'
import AddTodo from './AddTodo'
import request from 'superagent'


// const getTodoList = () => request.get(`https://mysterious-springs-09274.herokuapp.com/api/todos`)

export default class TodoList extends Component {
    state = {
        todoList: []
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        const todoData = await request.get(`https://mysterious-springs-09274.herokuapp.com/api/todos`)
            .set('Authorization', user.token)        
                
        this.setState({
            todoList: todoData.body
        })
    }

    handleClick = async () => {
        const newTodo = {
            id: Math.random(),
            task: this.state.todoInput,
            complete: false,
        };

        const user = JSON.parse(localStorage.getItem('user'));
    
        const newTodos = [...this.state.todoList, newTodo];
        
        this.setState({ todoList: newTodos })
        const data = await request.post(`https://mysterious-springs-09274.herokuapp.com/api/todos`,
        {task: this.state.todoInput})
        
        .set('Authorization', user.token);    
    }

    handleInput = (e) => { this.setState({ todoInput: e.target.value })};

    render() {
        if (localStorage.getItem('user')) {
            return (
                <div>
                TodoList
                
                <AddTodo
                todoInput={ this.state.todoInput }
                handleClick={ this.handleClick }
                handleInput={ this.handleInput }
                />

                {
                    this.state.todoList.map(todo => 
                    <p className='todo-item'
                    
                    style={{
                        textDecoration: todo.complete ? 'line-through' : 'none'
                    }}
                    onClick={async () => {
                        const newTodos = this.state.todoList.slice();

                        const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id)

                        matchingTodo.complete = !todo.complete
                        const user = JSON.parse(localStorage.getItem('user'));

                        this.setState({ todoList: newTodos });
                        const data = await request.put(`https://mysterious-springs-09274.herokuapp.com/api/todos/${todo.id}`, matchingTodo)
                        .set('Authorization', user.token); 
                    }}
                        key={todo.id}> 
                            { todo.task } 
                        </p>
                    )
                }
            </div>
        )
    } 
    else {
        return (
            <div>You Need To Sign Up </div>
        )
    }

    }
}
