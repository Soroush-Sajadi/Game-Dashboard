import React, { useState } from 'react';
import './Setting.css'

function Setting ({ sideBarState, getColor }) {
  const [ color, setColor ] = useState(null);

  const selectColor = (e) => {
    getColor(e.target.getAttribute('id'))
  }

  return (
    <div className={ sideBarState ? 'setting-wraper-open': 'setting-wraper-close' }>
      <div className="wrapper-setting">
        <div className="wrapper-background">
          <div className="background-title">
            <h4> Background color: </h4>
          </div>
          <div className="background-colors" onClick={selectColor}>
            <input type="radio" id="#795548" name="color" value="Brown"/>
            <label for="Black">Brown</label>
            <input type="radio" id="#2fb9cb" name="color" value="Blue/Green" />
            <label for="Blue/Green">Blue/Green</label>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Setting;