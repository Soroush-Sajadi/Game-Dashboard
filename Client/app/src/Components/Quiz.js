import React, {useState, useEffect} from 'react';
import './Quiz.css'

function Quiz ({ sideBarState, category }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('Loading');
  let [nextQuestion, setNextQuestion] = useState(0)

  const getData = async() => {
    const res = await fetch(`http://localhost:3000/generalknowledge`);
    res
      .json()
      .then(res => setData(res))
  }

  useEffect(() => {
    getData()
  },[]);

  const getNextQuestion = () => {
    setNextQuestion( nextQuestion += 1);
  }

console.log(data)
  return (
    <div className={ sideBarState ? 'quiz-wraper-open': 'quiz-wraper-close' }>
      {data.length === 0 ? <h3>{loading}</h3>:
      <div className="questions-wraper">
        <div className="question">
          <h3>{data[nextQuestion].map(item => item.question)}</h3>
        </div>
        <div className="answers"> 
         
          {data[nextQuestion].map(item => item.answers.map(item => <h5 onClick={getNextQuestion}>{item}</h5>))}
          
        </div>
      </div>
      }
    </div>
  )

}

export default Quiz;