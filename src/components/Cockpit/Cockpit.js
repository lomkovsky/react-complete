import styled from 'styled-components';
import classes from './Cockpit.module.css';
import React, { useEffect, useRef, useContext } from 'react';

import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
  const toggleRtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    toggleRtnRef.current.click();
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []);
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
    if (props.personsLength === 2) dynamicClass = classes.bold;
    if (props.personsLength === 1) dynamicClass = classes.red;

  return (
    <div className={classes.Cockpit}>
    <p className={dynamicClass}>{props.title}</p>
    <StyledButton
      ref= {toggleRtnRef}
      alt={props.showPersons.toString()}
      onClick={props.togglePersonsHandler}>Toggle Persons</StyledButton>
      <button onClick={authContext.login}>Log in</button>
    </div>
      );
}

export default React.memo(Cockpit);
