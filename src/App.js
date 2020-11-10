import React, { Component } from 'react';
import styled from 'styled-components'
import classes from './App.module.css';
import Person from './Person/Person';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    persons: [
      { id: 'saffdsa', name: "Max", age: 10 },
      { id: 'sdfgggs', name: "Manu", age: 20 },
      { id: 'sdgshhg', name: "Stephanie", age: 30 },
    ],
    userInput: '',
    showPersons: false,
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

  render() {
    const StyledButton = styled.button`
      background-color: ${props => props.alt ? 'red' : 'green'};
      font: inherit;
      border-radius: 3px;
      border: 1px solid blue;
      color: white;
      margin: 0 1em;
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
        color: black;
      }
    `
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
            {this.state.persons.map((person, index) => {
              return <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name} 
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
            })}
        </div>
      )
    }
    let userInputChar = (<p>{this.state.userInput}</p>)
    let dynamicClass;
    if (this.state.persons.length === 2) dynamicClass = classes.bold;
    if (this.state.persons.length === 1) dynamicClass = classes.red;
    return (
        <div className={classes.App}>
          <p className={dynamicClass}>Hi, I'm a React app</p>
          <StyledButton
            alt={this.state.showPersons}
            onClick={this.togglePersonsHandler}>Toggle Persons</StyledButton>
            {persons}
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
