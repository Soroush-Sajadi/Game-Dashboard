import React, { useState, useEffect, useRef } from 'react';
import blueRing from '../Images/ring-blue.svg';
import redRing from '../Images/ring-red.svg';

import './ThreeInRow.css'

function ThreeInRow ({ sideBarState, getScore }) {
  const [ data, setData ] = useState([]);
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

  

  const playersSelect = ( color, id ) => {
    if( color === selectColor ) {
      if( color === 'blue' ) {
        bluePlayer.unshift( id );
        allSelected.unshift( id )
      } else {
        redPlayer.unshift( id )
        allSelected.unshift( id )
      }
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
      for ( let i = 0; i < arr.length; i += 1 ) {
        let sum = 0;
          for (let j = 0; j < 3; j += 1) {
            sum += Number(arr[j])
          }  
          if ( sum === 15 ) {
            setTimeout( async() => {
              await setWinner(color)
            }, 450)
            setBluePlayer([]);
            setRedPlayer([]);
            selectColor === color ? sendData( getDataFromLocalStorage( 'username' ), +50 ): sendData( getDataFromLocalStorage( 'username' ), -50)
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
    setTimeout(() => {
      setTurn(turn + 1);
    },400)
    changeDataState(data, color, e.target.getAttribute('id'))
    findWinner(bluePlayer,color);
    findWinner(redPlayer,color)
    gameIsOver();
  }

  const sendData = async (username, score) => {
    if( JSON.parse(window.localStorage.getItem('username')) !== null ) {
      const scoreFromLocalStorage = getDataFromLocalStorage('score');
      saveDataToLocalStorage('score', score + scoreFromLocalStorage );
      await getScore( score )
      await fetch(`http://localhost:3000/score/${username}/${score}`)
    }
  }

  const saveDataToLocalStorage = (name, data) => {
    window.localStorage.setItem(name, JSON.stringify(data))
  }

  const getDataFromLocalStorage = (name) => {
    return JSON.parse(window.localStorage.getItem(name));
  }

  const s = (arr, r) => {
    for( let i = 0; i < arr.length; i += 1 ) {
      if ( Number(arr[i]) === r ) {
        return false;
      }
    }
    return true;
  }

  const bestPcSelect = (arr, selectedNumbers , color) => {
    const arrLength = arr.length;
    for( let i = 0; i < arrLength; i += 1 ) {
      let sum = 0;
      let bestSelect = 0;
      for ( let j = 0; j < 2; j += 1 ) {
        sum += Number(arr[j]);
        bestSelect = 15 - sum
      }
      if (( bestSelect >= 1 && bestSelect <= 9 )) {
        if (s(selectedNumbers, bestSelect) ) {
          changeDataState(data, color, bestSelect.toString());
          selectedNumbers.push(bestSelect.toString())
          color === 'red' ? redPlayer.push(bestSelect.toString()): bluePlayer.push(bestSelect.toString());
          color === 'red' ? findWinner(redPlayer, 'red'): findWinner(bluePlayer, 'blue');
          setTurn(turn + 1);
          return true;
        } else {
          arr.push(arr.shift());
        }
      }
      }
      return false;
    }
  

  const playRandom = (selectedNumbers, color) => {
    let randomNumber = Math.floor(Math.random() * 9) + 1;
      if( s(selectedNumbers, randomNumber) ) {
        console.log(randomNumber)
        changeDataState(data, color, randomNumber.toString());
        selectedNumbers.push(randomNumber.toString());
        color === 'red' ? redPlayer.push(randomNumber.toString()) : bluePlayer.push(randomNumber.toString());
        color === 'red' ? findWinner(redPlayer, 'red'): findWinner(bluePlayer, 'blue');
        setTurn(turn + 1);
      } else {
        playRandom(allSelected , color)
      }
  }

  const pcPlays = ( selectedNumbers, color ) => {
    if ( selectedNumbers.length < 2 ) {
      if(s(selectedNumbers, 5)) {
        changeDataState(data, color, '5' )
        selectedNumbers.push('5')
        color === 'red' ? redPlayer.push('5') : bluePlayer.push('5');
        setTurn(turn + 1);
      } else {
        changeDataState(data, color, '2' )
          selectedNumbers.push('2')
          color === 'red' ? redPlayer.push('2') : bluePlayer.push('2');
          setTurn(turn + 1);
      }
    } else {
      let player = '';
      let pc = '';
      color === 'red' ? player = bluePlayer : player = redPlayer;
      color === 'red' ? pc = redPlayer : pc = bluePlayer;
       
        if ( !bestPcSelect(pc, allSelected, color) && !bestPcSelect(player, allSelected, color)) {
          playRandom(allSelected, color);
        } else  {
          if ( bestPcSelect(pc, allSelected, color) ) {
            return 
          } else {
            bestPcSelect(pc, allSelected, color)
          }
          
        }
      
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
  return (
    <div className={ sideBarState ? 'threeInRow-wraper-open': 'threeInRow-wraper-close' }>
       {winner !== null ? 
       <div className="result">
          {winner === selectColor ? 
            <h2>Congradulation! You are the winner</h2>:<h2>Sorry! You lost</h2>}
            <h4 onClick={restartGame}>Play again</h4>
       </div>
       :
      <>
      {gameOver ? 
        <div className="result">
          <h2>Game Over</h2>
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