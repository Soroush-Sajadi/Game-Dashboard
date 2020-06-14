import React, {useState, useEffect, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import './Quiz.css'

function Quiz ({ sideBarState, category, getScore }) {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState('Loading');
  let [ nextQuestion, setNextQuestion ] = useState(0)
  let [ correctAnswer, setCorrectAnswer ] = useState(0);
  const [ quizIsOver, setQuizIsOver ] = useState(false);

  
  const getNextQuestion = async evt => {
    evt.preventDefault();
    await getResult(data,evt.target.getAttribute('value'))
    return nextQuestion + 1 !== data.length ? setNextQuestion( nextQuestion += 1) : setQuizIsOver(true) 
    || 
    fetchData( getDataFromLocalStorage( 'username' ), ( correctAnswer * 10 ) - (( (nextQuestion + 1) - correctAnswer ) * 5 ) )
    
  }

  const fetchData = async (username, score) => {
    if( JSON.parse(window.localStorage.getItem('username')) !== null ) {
      const scoreFromLocalStorage = getDataFromLocalStorage('score');
      saveDataToLocalStorage('score', score + scoreFromLocalStorage );
      await getScore( score )
      await fetch(`http://localhost:3000/score/${username}/${score}`)
    }
  }

  const getResult = (data, answer) => {
      data[nextQuestion].map( item => {
      if( item.correct_answer === answer) {
        setCorrectAnswer(correctAnswer += 1);
      }
    })
  }
  const saveDataToLocalStorage = (name, data) => {
    window.localStorage.setItem(name, JSON.stringify(data))
  }

  const getDataFromLocalStorage = (name) => {
    return JSON.parse(window.localStorage.getItem(name));
  }

  const getData = async() => {
    const res = await fetch(`http://localhost:3000/${category}`);
    res
      .json()
      .then(res => setData(res))
  }

  useEffect( () => {
    getData()
  },[]);

  return (
    <div className={ sideBarState ? 'quiz-wraper-open': 'quiz-wraper-close' }>
      {quizIsOver !== true ? 
      <>
        {data.length === 0 ? <h3>{loading}</h3>:
        <div className="questions-wraper">
          <div className="question">
            <h4>{data[nextQuestion].map(item => item.question)}</h4>
          </div>
            {data[nextQuestion].map(item => <div className="answers">
              {item.answers.map(item => <input className="answer" type="submit" value={item } onClick={ getNextQuestion } /> )}
            </div> )}
            <div className="footer"> 
              <p className="questions-number">Question: {nextQuestion + 1}</p>
            </div>
        </div>
        }
        </>
      :
        <div className="score-wraper">
          <div className="description">
            <h2> Result </h2>
            <h4> For each right answer you get 10 points and for wrong answer you lose 5 points </h4>
          </div>
          <div className="result">
            <ul>
              <li>
                Correct Answers: {correctAnswer}
              </li>
              <li>
                Wrong Answers: {Number(nextQuestion + 1) - Number(correctAnswer) }
              </li>
            </ul>
          </div>
          <div className="final-score">
            <h3>Score: { ( correctAnswer * 10 ) - (( (nextQuestion + 1) - correctAnswer ) * 5 ) }</h3>
          </div>
          <div className="score-footer" >
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <h3>New game</h3>
            </NavLink>
            
          </div>
        </div>
      }
      </div>
  )

}

export default Quiz;