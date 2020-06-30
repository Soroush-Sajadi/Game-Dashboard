import React, { useState, useEffect } from 'react';
import blueRing from '../Images/ring-blue.svg'
import redRing from '../Images/ring-red.svg'

import './ThreeInRow.css'

function ThreeInRow ({ sideBarState }) {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState('Loading');
  const [ turn, setTurn ] = useState(0);
  const [ selectColor, setSelectColor ] = useState(null)
  const [ numberClicked, setNumberClicked ] = useState (1);
  const [ gameOver, setGameOver ] = useState(false);
  const [ bluePlayer, setBluePlayer ] = useState([]);
  const [ redPlayer, setRedPlayer ] = useState([]);
  const [ winner, setWinner ] = useState(null)


  const getData = async () => { 
    await fetch (`http://localhost:3000/threeInRow`)
      .then( res => res.json() )
      .then( res => setData(res) ) 
  }

  const play = (e) => {
    const color = e.target.getAttribute('value')
    const id = e.target.getAttribute('id');
    playersSelect(color, id);
    setTurn(turn + 1);
    data.map(item => {
      if(item.id === e.target.getAttribute('id')) {
        setData((e) => {
          item.state = true
          item.color = color
        });
        setData(data)
      } 
    })
    playersSelect()
    findWinner(bluePlayer,color);
    findWinner(redPlayer,color)
    gameIsOver();
  }

  const playersSelect = (color, id) => {
      if(color === 'blue') {
        bluePlayer.push(id);
      } 
      else if (color === 'red') {
        redPlayer.push(id);
      }
  }

  const selectedColor = (e) => {
    setSelectColor(e.target.getAttribute('id'));
  }

  const gameIsOver = async () => {
    await setNumberClicked( numberClicked + 1 );
    if ( numberClicked === data.length ) {
      setGameOver( true );
    } 
  }

  const findWinner = (arr, color) => {
    for ( let i = 0;  i < arr.length; i += 1 ) {
      let sum = 0;
      if( arr.length > 2 ) {
        for (let j = 0; j < 3; j += 1) {
          sum += Number(arr[j]) 
          if ( sum === 15 ) {
            return setWinner(color)
          } else {
            const firstIndex = arr[0];
            arr.shift();
            arr.push(firstIndex);
          }
        }
      }
      
    }
    console.log(arr)
  }



  useEffect  (() => {
    getData()
  },[])
  console.log(winner)
  return (
    <div className={ sideBarState ? 'threeInRow-wraper-open': 'threeInRow-wraper-close' }>
      {gameOver ? <h2>Game Is over</h2>:
      <>
      {selectColor !== null ? 
      <>
      {data.length === 0 ?loading :
      <>
      <div className="side-div">
        <h3 className={turn % 2 === 0 ? "active" : "your-turn"}>You</h3>
        <h3 className={turn % 2 === 1 ? "active" : "pc-turn"}>computer</h3>
        </div>
      <div className="three-in-row-wrapper">
        {data.map( (item, i) =>
        !item.state ? 
          <div value={selectColor === 'red' ? (turn % 2 === 0 ? 'red' : 'blue') :(turn % 2 === 0 ? 'blue' : 'red')}
          key={i} id={item.id} className="three-in-row" onClick={play}>
          </div> :
          <img src={item.color === 'red' ? redRing : blueRing} className="img"  />
          
        )}
      </div>
      </>
      }
      </>
      : 
      <div className="color-selection-wrapper">
        <h1>Choose your color</h1>
        <div className="img-wrapper">
          <img id="blue" on src={ blueRing } onClick={selectedColor}/>
          <img id="red" src={ redRing } onClick={selectedColor}/>
        </div>

      </div>
      }
      </>
    }
    </div>
  )

}

export default ThreeInRow;