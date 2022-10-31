import './add.css';

function Add({ temp, onClickButton }){
  temp = true;
  return(
    <div className='add'>
      <button type="submit" className="add__button" onClick={_=>onClickButton(temp)}>Еще</button>
    </div>
  )
}

export default Add;
