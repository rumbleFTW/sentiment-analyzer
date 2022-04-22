import './style.css';
import * as tf from '@tensorflow/tfjs';
import tokenizer from './tokenizer.json'
import React, {useState} from 'react';

function Panel() {

  const [form, setForm] = useState("")

  function getTokenisedWord(seedWord) {
    const _token = tokenizer[seedWord.toLowerCase()]
    return _token
  }

  function textToSequence(sentence)
  {
    var res = [];
    for (var i = 0; i<sentence.length; i++)
    {
      res.push(getTokenisedWord(sentence[i]))
    }
    return res
  }

  function pad(sequence)
  {
    var res = []
    const maxlen = 66;
    for(var i = 0; i<maxlen-sequence.length; i++)
    {
      res.push(0)
    }
    res = res.concat(sequence)
    return tf.tensor2d([res])
  }

  function updateText(event)
  {
    event.preventDefault()
    setForm(event.target.value)
  }

  async function analyze(event)
  {
    event.preventDefault()
    var text = form.split(' ')
    const model = await tf.loadLayersModel('model.json')
    var pred = model.predict([pad(textToSequence(text))])
    const ans = Array.from(pred.dataSync()).indexOf(Math.max(...Array.from(pred.dataSync())))
    const labels_dict = {0:'sadness', 1:'joy', 2:'love', 3:'anger', 4:'fear', 5:'surprise'}
    console.log(labels_dict[ans])
  }

  return (
    <div className='panel--outer'>
      <div className='panel--inner'>
        <h1 className='title'>SENTIMENT-ANALYZER</h1>
        <form>
          <textarea placeholder='Enter your text' className='textfield' cols="50" rows="10" required onChange={updateText}/>
          <button type='submit' className='button' onClick={analyze}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Panel;
