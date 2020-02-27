import React, { Component } from 'react'
import { 
  Route, 
  Switch,
  Link,
  BrowserRouter as Router,
  Redirect, 
} from 'react-router-dom';
import './App.css';
import TodoList from './TodoList';
import Login from './Login';



const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends Component {
  render() {
    return (
      <Router>
      <div className='App'>
        Hello 
        <br />
      <Link to='/todos'>What to do?</Link>
      
      <Switch>
        <Route exact path='/todos' render={() =>
        isLoggedIn()
          ? <TodoList />
          : <Redirect to='login' />
        } />
        <Route exact path='/login' component={Login} />
      </Switch>
      
      </div>
      </Router>
    )
  }
}

