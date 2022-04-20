import './style.css';

function Panel() {
  return (
    <div className='panel--outer'>
      <div className='panel--inner'>
        <form>
          <input className='textfield'></input>
          <button className='button'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Panel;
