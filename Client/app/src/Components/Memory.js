import React, { useState, useEffect } from 'react';
import pict from '../Images/close.svg'
import './Memory.css'

function Memory ({ sideBarState }) {
  const [ data, setData ] = useState([]);
  const [ cardShown, setCardShown ] = useState();
  

  const getData = async () => { 
    await fetch (`http://localhost:3000/memory`)
      .then( res => res.json() )
      .then( res => setData(res) ) 
  }

  const turnCard = (e) => {
   setData(e.target.getAttribute( 'imageState') === 'true' ? 'false' : 'true' );
  }

  useEffect(() => {
    getData()
  },[])
  return (
    <div className={ sideBarState ? 'setting-wraper-open': 'setting-wraper-close' }>
      <div className="card-wrap">
      {data.map(pic =>  <div  onClick={turnCard} className="flip-card">
        {  <img id={pic[0].id} imageState={pic[0].statePic} src={pic[0].statePic === 'false' ? pic[0].pic : pict} onClick={turnCard} />  }
      </div>
      )}
      </div>
    </div>
  )

}

export default Memory;