import React from 'react';
import './Setting.css'

function Setting ({ sideBarState }) {
  return (
    <div className={ sideBarState ? 'setting-wraper-open': 'setting-wraper-close' }>
      Here is the Setting
    </div>
  )

}

export default Setting;