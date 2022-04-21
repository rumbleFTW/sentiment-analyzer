import './style.css';

function Panel() {
  return (
    <div className='panel--outer'>
      <div className='panel--inner'>
        <h1>Sentiment-Analyzer</h1>
        <form>
          <textarea className='textfield' name='Text' cols="50" rows="10" required></textarea>
          <button className='button'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Panel;
