import React, { useState, useEffect, useReducer } from 'react';
import pict from '../Images/card-background.jpg'
import './Memory.css'

function Memory ({ sideBarState }) {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState('Loading');
  const [ turn, setTurn ] = useState(1);
  const [ selectedItem, setSelectedItem ] = useState ([]);
  const [ points, setPoints ] = useState(0);
  const [ matchedPictures, setMatchedPictures] = useState(0);
  const [ gameIsDone, setGameISDone ] = useState (false);

  //const [, forceUpdate] = useReducer(x => x + 1, 0);  

  const getData = async () => { 
    await fetch (`http://localhost:3000/memory`)
      .then( res => res.json() )
      .then( res => setData(res) ) 
  }

  const turnCard = (e) => {
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
    if (turn === 2) {
     restartState( data, data[selectedItem[0]], data[selectedItem[2]], data[selectedItem[0]], data[selectedItem[2]] )
    }
    gameOver()
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
        setPoints(points + 20);
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
        setPoints(points - 5)
        setTurn(1);
        setSelectedItem([]);
      }
  }
  const gameOver = () => {
    data.map(item => {
      if (matchedPictures === ((data.length) / 2)  ) {
        setGameISDone(true);
      }
    })
  }
 

  useEffect(() => {
    getData()
  },[])
  
  return (
    <div className={ sideBarState ? 'setting-wraper-open': 'setting-wraper-close' }>
      {gameIsDone ? <h1>Game is Done</h1>:
      <div className="card-wrap">
      {data.map(pic =>  <div  onClick={pic.statePic === false ? turnCard: null} className={pic.statePic? "flip-card-true": "flip-card-false"}>
      {pic.statePic === 'done' ? <div className="done"/> : <img id={ pic.id } src={!pic.statePic ? pic.pic: pict} onClick={ turnCard}  /> }
      </div>
      )}
      </div>
      }
      <h3>Score: {points}</h3>
      
    </div>
  )
}

export default Memory;