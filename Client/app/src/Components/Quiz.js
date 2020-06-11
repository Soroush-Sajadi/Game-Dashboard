import React, {useState, useEffect} from 'react';
import './Quiz.css'

function Quiz ({ sideBarState, category }) {
  const [data, setData] = useState([]);

  const getData = async() => {
    const res = await fetch(`http://localhost:3000/generalknowledge`);
    res
      .json()
      .then(res => setData(res))
  }

  useEffect(() => {
    getData()
  },[]);

  return (
    <div className={ sideBarState ? 'quiz-wraper-open': 'quiz-wraper-close' }>
      <div className="questions-wraper">
        <div className="question">
            <h3>Question!</h3>
        </div>
        <div className="answers">
          <h5>a1</h5>
          <h5>a12</h5>
          <h5>a13</h5>
        </div>
      </div>
    </div>
  )

}

export default Quiz;