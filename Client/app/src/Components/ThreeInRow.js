import React, { useState, useEffect, useRef } from 'react';
import blueRing from '../Images/ring-blue.svg';
import redRing from '../Images/ring-red.svg';

import './ThreeInRow.css'

function ThreeInRow ({ sideBarState }) {
  const [ data, setData ] = useState([]);
  //const [ didMount, setDidMount ] = useState(false);
  const mounted = useRef(false);
  const [ loading, setLoading ] = useState('Loading');
  const [ turn, setTurn ] = useState(0);
  const [ selectColor, setSelectColor ] = useState(null)
  const [ numberClicked, setNumberClicked ] = useState (1);
  const [ gameOver, setGameOver ] = useState(false);
  const [ bluePlayer, setBluePlayer ] = useState([]);
  const [ redPlayer, setRedPlayer ] = useState([]);
  const [ winner, setWinner ] = useState(null);
  const [ numberWinnerPlayer, setNumberWinnerPlayer ] = useState(0);
  const [ numberWinnerPc, setNumberWinnerPc ] = useState(0);
  const [ allSelected, setAllSelected ] = useState([])

  const getData = async () => { 
    await fetch (`http://localhost:3000/threeInRow`)
      .then( res => res.json() )
      .then( res => setData(res) ) 
  }

  

  const playersSelect = (color, id) => {
    if(color === selectColor) {
      if(color === 'blue') {
        bluePlayer.unshift(id);
        allSelected.unshift(id)
      } else {
        redPlayer.unshift(id)
        allSelected.unshift(id)
      }
    } 
    else if (color !== selectColor && color !== undefined) {
    }
  }

  const selectedColor = (e) => {
    setSelectColor(e.target.getAttribute('id'));
  }

  const gameIsOver = async () => {
    await setNumberClicked( numberClicked + 1 );
    if ( allSelected.length === data.length ) {
      setGameOver( true );
    } 
  }

  const findWinner = (arr, color) => {
    if ( arr.length > 2 ) {
      for ( let i = 0;  i < arr.length; i += 1 ) {
        let sum = 0;
          for (let j = 0; j < 3; j += 1) {
            sum += Number(arr[j])
          }  
          if ( sum === 15 ) {
            setWinner(color)
            return color === selectColor ? setNumberWinnerPlayer( numberWinnerPlayer + 1 ): setNumberWinnerPc ( numberWinnerPc + 1 );
          } else {
            arr.push(arr.shift());
          }
      }
    }
  }

  const changeDataState = (data, color, r) => {
    data.map(item => {
      if(item.id === r) {
        setData(() => {
          item.state = true
          item.color = color
        });
        setData(data);
      } 
    })
  }

  const play = (e) => {
    const color = e.target.getAttribute('value')
    const id = e.target.getAttribute('id');
    playersSelect(color, id);
    setTurn(turn + 1);
    changeDataState(data, color, e.target.getAttribute('id'))
    findWinner(bluePlayer,color);
    findWinner(redPlayer,color)
    gameIsOver();
  }

  const s = (arr, r) => {
    for( let i = 0; i < arr.length; i += 1 ) {
      if ( Number(arr[i]) === r ) {
        
        return false;
      }
    }
    return true;
  }

  const pcPlays = ( player, color ) => {
    let randomNumber = Math.floor(Math.random() * 9) + 1;
      if ( s(player, randomNumber) ) {
        setTurn (turn + 1)
        player.push( randomNumber.toString() );
        changeDataState(data, color, randomNumber.toString())
        color === 'red' ? redPlayer.push(randomNumber.toString()) : bluePlayer.push(randomNumber.toString());
        color === 'red' ? findWinner(redPlayer, 'red'): findWinner(bluePlayer, 'blue');
      } else {
          pcPlays(allSelected , color);
      }
  }

  if (turn % 2 !== 0 && turn < 9 ) {
    let color = ''
    selectColor === 'blue' ? color = 'red' : color = 'blue';
    pcPlays( allSelected, color )
  }

  const resetItems = (arr) => {
    arr.map(item => {
      setData((e) => {
        item.state = false
        item.color = ''
      });
    })
    setData(data)
  }

  const restartGame = () => {
    setWinner(null)
    resetItems(data)
    setBluePlayer([]);
    setRedPlayer([]);
    setNumberClicked(1);
    setGameOver(false);
    setAllSelected([])
    setTurn(0)
  }

  useEffect  (() => {
    getData();
  },[])
  //console.log('red', redPlayer,'blue', bluePlayer ,winner)
  return (
    <div className={ sideBarState ? 'threeInRow-wraper-open': 'threeInRow-wraper-close' }>
       {winner !== null ? 
       <div>
          {winner === selectColor ? 
            <h2>Congradulation! You are the winner</h2>:<h2>Sorry! You lost</h2>}
            <h4 onClick={restartGame}>Play again</h4>
       </div>
       :
      <>
      {gameOver ? 
        <div>
          <h2>Game Is over{winner}</h2>
          <h4 onClick={restartGame}>Play again</h4>
        </div>
        :
      <>
      {selectColor !== null ? 
      <>
      {data.length === 0 ?loading :
      <>
      <div className="side-div">
        <h3 className={turn % 2 === 0 ? "active" : "your-turn"}>You: { numberWinnerPlayer }</h3>
        <h3 className={turn % 2 === 1 ? "active" : "pc-turn"}>computer: { numberWinnerPc }</h3>
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
          <img id="blue" src={ blueRing } onClick={selectedColor}/>
          <img id="red" src={ redRing } onClick={selectedColor}/>
        </div>

      </div>
      }
      </>
      }
      </>
    }
    </div>
  )
}

export default ThreeInRow;