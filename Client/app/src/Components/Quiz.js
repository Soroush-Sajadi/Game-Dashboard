import React, {useState, useEffect, useRef} from 'react';
import './Quiz.css'

function Quiz ({ sideBarState, category }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('Loading');
  let [nextQuestion, setNextQuestion] = useState(0)
  let [ correctAnswer, setCorrectAnswer ] = useState(0);

  
  const getNextQuestion = async evt => {
    evt.preventDefault();
    await getResult(data,evt.target.getAttribute('value'))
    return nextQuestion + 1 !== data.length ? setNextQuestion( nextQuestion += 1) : null;
  }

  const getResult = (data, answer) => {
      data[nextQuestion].map( item => {
      if( item.correct_answer === answer) {
        setCorrectAnswer(correctAnswer += 1);
      }
    })
  } 

  const getData = async() => {
    const res = await fetch(`http://localhost:3000/generalknowledge`);
    res
      .json()
      .then(res => setData(res))
  }

  useEffect(() => {
    getData()
  },[]);
  console.log(correctAnswer,  nextQuestion)
  return (
    <div className={ sideBarState ? 'quiz-wraper-open': 'quiz-wraper-close' }>
      {data.length === 0 ? <h3>{loading}</h3>:
      <div className="questions-wraper">
        <div className="question">
          <h4>{data[nextQuestion].map(item => item.question)}</h4>
        </div>
        <div className="answers"> 
          {data[nextQuestion].map(item => <div >
            {item.answers.map(item => <input type="submit" value={item } onClick={ getNextQuestion } /> )}
          </div> )}
        </div>
      </div>
      }
    </div>
  )

}

export default Quiz;