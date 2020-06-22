import React, { useState, useEffect } from 'react';
import './ThreeInRow.css'

function ThreeInRow ({ sideBarState }) {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState('Loading');
  const [ turn, setTurn ] = useState(0)

  const getData = async () => { 
    await fetch (`http://localhost:3000/threeInRow`)
      .then( res => res.json() )
      .then( res => setData(res) ) 
  }

  const play = (e) => {
    setTurn(turn + 1);
    data.map(item => {
      if(item.id === e.target.getAttribute('id')) {
        setData(() => {
          item.state = true
        });
        setData(data)
      }
    })
  }


  useEffect  (() => {
    getData()
  },[])
console.log(data)
  return (
    <div className={ sideBarState ? 'threeInRow-wraper-open': 'threeInRow-wraper-close' }>
      {data.length === 0 ?loading :
      <>
      <div className="side-div">
        <h3 className={turn % 2 === 0 ? "active" : "your-turn"}>You</h3>
        <h3 className={turn % 2 === 1 ? "active" : "pc-turn"}>computer</h3>
        </div>
      <div className="three-in-row-wrapper">
        {data.map( (item, i) =>
        !item.state ? 
          <div key={i} id={item.id} className="three-in-row" onClick={play}>
          </div> :
          <div key={i} id={item.id} className="three-in-row">
          </div>
        )}
      </div>
      </>
      }
    </div>
  )

}

export default ThreeInRow;