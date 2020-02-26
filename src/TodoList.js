import React, { Component } from 'react'
import request from 'superagent'


const getTodoList = () => request.get(`https://mysterious-springs-09274.herokuapp.com/api/todos`)

export default class TodoList extends Component {

    state = {
        todoList: []
    }

    async componentDidMount() {
        const todoData = await getTodoList();
        
        console.log(todoData.body)
        
        this.setState({
            todoList: todoData.body
        })
    }



    render() {
        return (
            <div>
                TodoList
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
                        this.setState({ todoList: newTodos });
                        const newData = await request.put(`https://mysterious-springs-09274.herokuapp.com/api/todos/${todo.id}`, matchingTodo);
                    }}
                        key={todo.id}> 
                            { todo.task } 
                        </p>
                    )
                }
            </div>
        )
    }
}
