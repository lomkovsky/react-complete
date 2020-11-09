import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import UserOutput from './UserOutput/UserOutput';
import UserInput from './UserInput/UserInput';

class App extends Component {
  state = {
    persons: [
      { name: "Max", age: 10 },
      { name: "Manu", age: 20 },
      { name: "Stephanie", age: 30 },
    ],
    username: 'userFromState',
  }

  switchNameHandler = (newName) => {
    this.setState({persons: [
      { name: newName, age: 10 },
      { name: "Manu", age: 20 },
      { name: "Stephanie", age: 40 },
    ]})
  }

  nameChangedHandler = (event) => {
    this.setState({persons: [
      { name: "Max", age: 10 },
      { name: event.target.value, age: 20 },
      { name: "Stephanie", age: 40 },
    ]})
  }

  inputUserNameChangedHandler = (event) => {
    this.setState({username: event.target.value})
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    }
    return (
    <div className="App">
      <h1>Hi, I'm a React app</h1>
      <UserInput 
        inputUserNameChangedHandler={this.inputUserNameChangedHandler}
        currentName={this.state.username}/>
      <UserOutput userName={this.state.username}/>
      <UserOutput userName="user2"/>
      <UserOutput userName="user3"/>
      <button 
        style={style}
        onClick={() => this.switchNameHandler('Maximilian')}>Switch Name</button>
      <Person 
        name={this.state.persons[0].name} 
        age={this.state.persons[0].age}/>
      <Person 
        name={this.state.persons[1].name} 
        age={this.state.persons[1].age}
        changed={this.nameChangedHandler}
        click={this.switchNameHandler.bind(this, 'MAX!')} >My Hobbies: Racing</Person>
      <Person 
        name={this.state.persons[2].name} 
        age={this.state.persons[2].age}/>
    </div>
  );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React app!!!'))
  }
}

export default App;
