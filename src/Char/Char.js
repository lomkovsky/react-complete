import './Char.css'
const char = (props) => {
  return (
     <div className="Char" onClick={props.click}>
       <p>{props.character}</p>
     </div>
    )
  }
  
  export default char;