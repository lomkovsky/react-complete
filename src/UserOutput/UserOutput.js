import './UserOutput.css'
const userOutput = (props) => {
  return (
    <div className='UserOutput'>
      <p>Name {props.userName}</p>
      <p>Some else random text</p>
    </div>
  )
}

export default userOutput;
