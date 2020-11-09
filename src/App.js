import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const App = (props) => {
  const [ personsStates, setPersonsStates] = useState({
    persons: [
      { name: "Max", age: 10 },
      { name: "Manu", age: 20 },
      { name: "Stephanie", age: 30 },
    ]
  });

  const switchNameHandler = () => {
    setPersonsStates({persons: [
      { name: "Maximilian", age: 10 },
      { name: "Manu", age: 20 },
      { name: "Stephanie", age: 40 },
    ]})
  }

    return (
    <div className="App">
      <h1>Hi, I'm a React app</h1>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsStates.persons[0].name} age={personsStates.persons[0].age}/>
      <Person name={personsStates.persons[1].name} age={personsStates.persons[1].age}>My Hobbies: Racing</Person>
      <Person name={personsStates.persons[2].name} age={personsStates.persons[2].age}/>
    </div>
  );
}

export default App;
