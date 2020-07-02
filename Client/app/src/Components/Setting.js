import React from 'react';
import './Setting.css'

function Setting ({ sideBarState }) {
  return (
    <div className={ sideBarState ? 'setting-wraper-open': 'setting-wraper-close' }>
      <div className="wrapper-setting">
        <div className="wrapper-background">
          <div className="background-title">
            <h4> Background color: </h4>
          </div>
          <div className="background-colors">
            <input type="radio" name="#795548" value="Black"/>
            <label for="Black">Black</label>
            <input type="radio" name="#2fb9cb" value="Blue/Green" />
            <label for="Blue/Green">Blue/Green</label>
            <input type="radio" name="#5a132b" value="Dark red" />
            <label for="Dark red">Dark red</label>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Setting;