import React, { Component } from 'react';

import classes from './App.module.css';
import Validation from '../components/Validation/Validation';
import Char from '../components/Char/Char';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import AuthContext from '../context/auth-context';

class App extends Component {

  static contextType = AuthContext;

  state = {
    persons: [
      { id: 'saffdsa', name: "Max", age: 10 },
      { id: 'sdfgggs', name: "Manu", age: 20 },
      { id: 'sdgshhg', name: "Stephanie", age: 30 },
    ],
    userInput: '',
    showPersons: 0,
    authenticate: false,
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  deleteCharHandler = (chIndex) => {
    const userInputArray = this.state.userInput.split('');
    userInputArray.splice(chIndex, 1);
    const userInput = userInputArray.join('');
    this.setState({userInput})
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id ===id);
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons})
  }

  inputUserCharHandler = (event) => {
    this.setState({userInput: event.target.value})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticate: true})
  };

  render() {
    
    let persons = null;
    const charList = this.state.userInput.split('').map((ch, index) => {
     return <Char 
      character={ch} 
      key={index}
      click={() => this.deleteCharHandler(index)}/>
    })
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          isAuthenticated={this.state.authenticate}
          changed={this.nameChangedHandler}/>
        </div>
      )
    }
    let userInputChar = (<p>{this.state.userInput}</p>)
    
    return (
        <div className={classes.App}>
            <AuthContext.Provider value={{
              authenticate: this.state.authenticate, 
              login: this.loginHandler
              }}
            >
              <Cockpit 
                showPersons={this.state.showPersons}
                togglePersonsHandler={this.togglePersonsHandler}
                title={this.props.appTitle}
                personsLength={this.state.persons.length}/>
              {persons}
            </AuthContext.Provider>
            <div>
              <input type="text" onChange={this.inputUserCharHandler} value={this.state.userInput}/>
              {userInputChar}
              <Validation length={this.state.userInput.length} />
              {charList}
            </div>
        </div>
  );
  }
}

export default App;
