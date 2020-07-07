import React, { useState } from 'react';
import './Setting.css'

function Setting ({ sideBarState, getColor , getPosstion }) {

  const selectColor = (e) => {
    getColor(e.target.getAttribute('id'));
  }

  const selectPosstion = (e) => {
    getPosstion(e.target.getAttribute('value'));
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
            <label for="Brown">Brown</label>
            <input type="radio" id="#2fb9cb" name="color" value="Blue/Green" />
            <label for="Blue/Green">Blue/Green</label>
          </div>
        </div>
        <div className="wrapper-side-bar" onClick={selectPosstion}>
          <div className="side-bar-title">
            <h4>Side-Bar possition:</h4>
          </div>
          <div className="side-bsar-posstion">
            <input type="radio"  name="side-bar" value="left"/>
            <label for="left">Left</label>
            <input type="radio" name="side-bar" value="up" />
            <label for="up">Up</label>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Setting;