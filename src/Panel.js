import './style.css';
import * as tf from '@tensorflow/tfjs';
import tokenizer from './tokenizer.json'
import React, { useState} from 'react';

function Panel() {

  const [form, setForm] = useState("")
  var model;

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

  document.onload = function load()
  {
    model = await tf.loadLayersModel('./model/model.json')
  }

  async function analyze(event)
  {
    event.preventDefault()
    var text = form.split(' ')
    // const model = await tf.loadLayersModel('./model/model.json')
    var pred = model.predict([pad(textToSequence(text))])
    const ans = Array.from(pred.dataSync()).indexOf(Math.max(...Array.from(pred.dataSync())))
    const dictEmotion = {0: 'joy', 1: 'fear', 2: 'anger', 3: 'sadness', 4: 'disgust', 5: 'shame' , 6: 'guilt'}
    const dictEmoji = {0: ['😃', '😄', '😁 '], 1: ['😨', '😬', '😱'], 2: ['😠', '💢', '😤'], 3: ['😥', '😭', '☹️'], 4: ['🤢', '💩', '🤮'], 5: ['😖', '😣', '😫'], 6: ['😅', '😓', '🥴']}
    var container = document.getElementById('root');
    var emoji = dictEmoji[ans];
    var circles = [];

    for (var i = 0; i < 15; i++) {
      addCircle(i * 150, [10 + 0, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 0, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 200, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 200, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 400, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 400, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 600, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 600, 300], emoji[Math.floor(Math.random() * emoji.length)]);
    }



    function addCircle(delay, range, color) {
      setTimeout(function() {
        var c = new Circle(range[0] + Math.random() * range[1], 80 + Math.random() * 4, color, {
          x: -0.15 + Math.random() * 0.3,
          y: 0.5 + Math.random() * 0.5
        }, range);
        circles.push(c);
      }, delay);
    }

    function Circle(x, y, c, v, range) {
      var _this = this;
      this.x = x;
      this.y = y;
      this.color = c;
      this.v = v;
      this.range = range;
      this.element = document.createElement('span');
      /*this.element.style.display = 'block';*/
      this.element.style.opacity = 0;
      this.element.style.position = 'absolute';
      this.element.style.fontSize = '26px';
      this.element.style.color = 'hsl('+(Math.random()*360|0)+',80%,50%)';
      this.element.innerHTML = c;
      container.appendChild(this.element);

      this.update = function() {
        if (_this.y > 500) {
          _this.element.remove();
          delete this;
          console.log(circles.length)
          // _this.y = 80 + Math.random() * 4;
          // _this.x = _this.range[0] + Math.random() * _this.range[1];
        }
        _this.y += _this.v.y;
        _this.x += _this.v.x;
        this.element.style.opacity = 1;
        this.element.style.transform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
        this.element.style.webkitTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
        this.element.style.mozTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
      };
    }

    function animate() {
      for (var i in circles) {
        circles[i].update();
      }
      requestAnimationFrame(animate);
    }

    animate();
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
