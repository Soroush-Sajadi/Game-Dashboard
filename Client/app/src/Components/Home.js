import React from 'react';
import './Home.css'

function Home ({sideBarState}) {
  return (
    <div className={sideBarState ? 'home-wraper-open':'home-wraper-close'}>
      Here is Home
    </div>
  )

}

export default Home;