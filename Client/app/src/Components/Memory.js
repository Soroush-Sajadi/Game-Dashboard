import React, { useState, useEffect } from 'react';
import './Memory.css'

function Memory ({ sideBarState }) {
  const [ data, setData ] = useState([]);

  const getData = async () => { 
    await fetch (`http://localhost:3000/memory`)
      .then( res => res.json() )
      .then( res => setData(res) ) 
  }

  useEffect(() => {
    getData()
  },[])
  return (
    <div className={ sideBarState ? 'setting-wraper-open': 'setting-wraper-close' }>
      <div className="memroy-wraper">
        {data.map(pic =>  <img className="memory-img" src={pic} /> )}
      </div>
     
    </div>
  )

}

export default Memory;