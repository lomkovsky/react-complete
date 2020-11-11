import styled from 'styled-components';
import classes from './Cockpit.module.css';
import React, { useEffect } from 'react';

const Cockpit = (props) => {
  useEffect(() => {
    console.log('[Cockpit.js] useEffect')
  })
  const StyledButton = styled.button`
      background-color: ${props => props.alt ==='true' ? 'red' : 'green'};
      font: inherit;
      border-radius: 3px;
      border: 1px solid blue;
      color: white;
      margin: 0 1em;
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: ${props => props.alt ==='true' ? 'salmon' : 'lightgreen'};
        color: black;
      }
    `
    let dynamicClass;
    if (props.persons.length === 2) dynamicClass = classes.bold;
    if (props.persons.length === 1) dynamicClass = classes.red;

  return (
    <div className={classes.Cockpit}>
    <p className={dynamicClass}>{props.title}</p>
    <StyledButton
      alt={props.showPersons.toString()}
      onClick={props.togglePersonsHandler}>Toggle Persons</StyledButton>
    </div>
      );
}

export default Cockpit;
