const validation = (props) => {
  let validationMessage = (<p>'Text to short'</p>);
  if (props.length >= 5) validationMessage = (<p>'Text long enough'</p>);
  return (
     <div className="Validation">
       {validationMessage}
     </div>
    )
  }
  
  export default validation;