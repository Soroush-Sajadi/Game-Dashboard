import React, { useState, useEffect } from 'react';
import pict from '../Images/close.svg'
import './Memory.css'

function Memory ({ sideBarState }) {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState('Loading');
  

  const getData = async () => { 
    await fetch (`http://localhost:3000/memory`)
      .then( res => res.json() )
      .then( res => setData(res) ) 
  }

  const turnCard = (e) => {
    data.map(picture => {
      if( picture.id === Number(e.target.getAttribute('id')) ) {
        setData(() => {
          return(
            picture.statePic = !picture.statePic
          );
          
        });
        setData(data)
      }
    })
  }

  useEffect(() => {
    getData()
  },[])

  console.log(data)
  return (
    <div className={ sideBarState ? 'setting-wraper-open': 'setting-wraper-close' }>
      {data.length === 0 ? loading : 
      <div className="card-wrap">
      {data.map(pic =>  <div onClick={turnCard} className="flip-card">
        <img id={ pic.id } src={pic.statePic === true ? pic.pic : pict} onClick={turnCard} />
      </div>
      
      )}
      </div>
      }
    </div>
  )

}

export default Memory;