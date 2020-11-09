const userInput = (props) => {
  const style = {
    border: '2px solid red'
  }
  return <input 
    type="text"
    style={style}
    onChange={props.inputUserNameChangedHandler}
    value={props.currentName}/>;
}

export default userInput;
