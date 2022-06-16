import './style.css';
import * as tf from '@tensorflow/tfjs';
import tokenizer from './tokenizer.json'
import React, { useState} from 'react';

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
    const maxlen = 200;
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
    const model = await tf.loadLayersModel('./model/model.json')
    var pred = model.predict([pad(textToSequence(text))])
    const ans = Array.from(pred.dataSync()).indexOf(Math.max(...Array.from(pred.dataSync())))
    const dictEmotion = {0: 'joy', 1: 'fear', 2: 'anger', 3: 'sadness', 4: 'disgust', 5: 'shame' , 6: 'guilt'}
    const dictEmoji = {0: ['😃', '😄', '😁 '], 1: ['😨', '😬', '😱'], 2: ['😠', '💢', '😤'], 3: ['😥', '😭', '☹️'], 4: ['🤢', '💩', '🤮'], 5: ['😖', '😣', '😫'], 6: ['😅', '😓', '🥴']}
    console.log(dictEmotion[ans])
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
