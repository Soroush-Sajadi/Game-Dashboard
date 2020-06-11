import React, { useState, useEffect} from "react";
import { NavLink } from 'react-router-dom';

import './Home.css'

function Home ({sideBarState, getCategory}) {
  const[loading, setLoading] = useState('Loading')
  const[data, setData] = useState([])
  
  const sendCategory = evt => {
    const selectedCategory =((evt.target.src).split('/')[(evt.target.src).split('/').length-1])
    getCategory(selectedCategory)
  }

  async function fetchData() {
    const res = await fetch(`http://localhost:3000/`);
    res
      .json()
      .then(res => setData(res))
  }

  useEffect( () => {
     fetchData();
     setTimeout (() => {
      if (data.length >0 ) {
        console.log(data[0].categories[0])
       }
     },250)
  },[]);

  return (
    <div className={sideBarState ? 'home-wraper-open':'home-wraper-close'}>
      <h3 className="title">Choose  your favorite category!</h3>
      {data.length === 0 ? 
        <h3>{loading}</h3>:
        <div className="card-wraper">
          {data[0].categories.map(item => {
          return  <div className="card" onClick={sendCategory}>
            <NavLink to={item.title !== 'Memorie' ? '/Quiz': '/Memory'}>
              <p>{item.title}</p>
              <img allt="as" src ={item.image}/>
            </NavLink>
            </div>
          })}
        </div>
      }
    </div>
  )

}

export default Home;



  