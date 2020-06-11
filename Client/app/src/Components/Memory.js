import React from 'react';
import './Setting.css'

function Memory ({ sideBarState }) {
  return (
    <div className={ sideBarState ? 'setting-wraper-open': 'setting-wraper-close' }>
      Here is the Memory
    </div>
  )

}

export default Memory;