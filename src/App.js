import React, { Component } from 'react'
import { 
  Route, 
  Switch,
  Link,
  BrowserRouter as Router, 
} from 'react-router-dom';
import './App.css';
import TodoList from './TodoList';



export default class App extends Component {
  render() {
    return (
      <Router>
      <div className='App'>
        Hello 
        <br />
      <Link to='/todos'>What to do?</Link>
      
      <Switch>
        <Route exact path='/todos' component={TodoList} />
      </Switch>
      
      
      
      </div>
      </Router>
    )
  }
}

