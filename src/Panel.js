import './style.css';
import * as tf from '@tensorflow/tfjs';

function Panel() {

  const model = await tf.loadLayersModel("C:\\Users\\007ra\\Documents\\Codes\\AI-ML\\sentiment-analyzer\\AI\\model.json");
  return (
    <div className='panel--outer'>
      <div className='panel--inner'>
        <h1 className='title'>SENTIMENT-ANALYZER</h1>
        <form>
          <textarea className='textfield' name='Text' cols="50" rows="10" required></textarea>
          <button className='button'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Panel;
