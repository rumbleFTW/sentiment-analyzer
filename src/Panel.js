import './style.css';
// import React, { Component }  from 'react';
import * as tf from '@tensorflow/tfjs';
import tokenizer from './tokenizer.json'

function Panel() {

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

  async function analyze()
  {
    const model = await tf.loadLayersModel('model.json')
    var pred = model.predict([pad(textToSequence(['my', 'sister', 'died', 'of', 'covid', 'yesterday']))])
    console.log(pred.array())
  }

  return (
    <div className='panel--outer'>
      <div className='panel--inner'>
        <h1 className='title'>SENTIMENT-ANALYZER</h1>
        <form>
          <textarea className='textfield' name='Text' cols="50" rows="10" required></textarea>
          <button className='button' onClick={analyze}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Panel;
