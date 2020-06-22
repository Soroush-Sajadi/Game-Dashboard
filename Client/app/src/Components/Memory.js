import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import pict from '../Images/card-background.jpg'
import './Memory.css'

function Memory ({ sideBarState, getScore }) {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState('Loading');
  const [ turn, setTurn ] = useState(1);
  const [ selectedItem, setSelectedItem ] = useState ([]);
  const [ score, setScore ] = useState(0);
  const [ matchedPictures, setMatchedPictures] = useState(0);
  const [ gameIsDone, setGameISDone ] = useState (false);

  //const [, forceUpdate] = useReducer(x => x + 1, 0);  

  const getData = async () => { 
    await fetch (`http://localhost:3000/memory`)
      .then( res => res.json() )
      .then( res => setData(res) ) 
  }

  const turnCard = async (e) => {
    console.log('hasdkja')
    setTurn(turn + 1);
    data.map((picture, i) => {
      if( picture.id === Number(e.target.getAttribute('id')) ) {
        selectedItem.push(i)
        setData(() => {
          picture.statePic = true
        });
       setData(data);
      };
    });
    if (turn > 1) {
    await restartState( data, data[selectedItem[0]], data[selectedItem[1]], data[selectedItem[0]], data[selectedItem[1]] )
    }
    if(matchedPictures === 8 ) {
      gameOver();
      fetchData( getDataFromLocalStorage( 'username' ),score )
    }
  }

  const fetchData = async (username, score) => {
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

  const restartState = (data, firstPicture ,secondPicture, firstState, secondState) => {
      if ( secondPicture.pic === firstPicture.pic ) {
        setData( async() => {
          await setTimeout(() => {
            secondState.statePic = 'done';
            firstState.statePic = 'done';
          },100)
        });
        setData(data);
        setMatchedPictures( matchedPictures + 1 );
        setScore(score + 20);
        setTurn(1);
        setSelectedItem([]);
      } else {
        setData( async() => {
          await setTimeout( () => {
          secondState.statePic = false;
          firstState.statePic = false;
          },100 )
      });
        setData(data);
        setScore(score - 5)
        setTurn(1);
        setSelectedItem([]);
      }
  }
  const gameOver = () => {
      setGameISDone(true);
  }
 

  useEffect(() => {
    getData()
  },[])
  console.log(selectedItem)
  return (
    <div className={ sideBarState ? 'setting-wraper-open': 'setting-wraper-close' }>
      {gameIsDone ? 
      <div>
        <h1>Game over</h1>
        <h3>20 points for each correct guess and -10 points for each wrong one</h3>
        <h3>Score: {score}</h3>
        <NavLink to="/">
          <h2>Play More</h2>
        </NavLink>
      </div>
      :
      <div>
      <div className="card-wrap">
      {data.map(pic =>  <div  onClick={pic.statePic === false ? turnCard: null} className={pic.statePic? "flip-card-true": "flip-card-false"}>
      {pic.statePic === 'done' ? <div className="done"/> : <img id={ pic.id } src={!pic.statePic ? pic.pic: pict}  /> }
      </div>
      )}
      </div>
      <h3>Score: {score}</h3>
      </div>
      }
    </div>
  )
}

export default Memory;