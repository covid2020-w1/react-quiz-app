import './App.css'
import Question from './Question.jsx'
import { useState, useEffect } from 'react'
import generateQuestions from './questionsArr.js'


export default function App(){

  //state values
  const [questions, setQuestions] = useState(generateQuestions)
  const [showQuestions, setShowQuestions] = useState(false);

  //derived values
  let questionsAnswered = 0
  let questionsAnsweredCorrectly = 0

  //functions
  function generateApiData(){
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => 
        
        setQuestions(data.results.map((question, index) =>{

          const allOptions = [...question.incorrect_answers]
          const ranIndex = Math.floor(Math.random() * 4)
          allOptions.splice(ranIndex, 0, question.correct_answer)

          return{
            index: index,
            text: question.question,
            options: allOptions.map((option, index) =>
              ({
                index: index,
                text: option,
                isChecked: false,
                isCorrect: option === question.correct_answer,
                disabled: false
              })
            )
          }
        }))
      )
  }
  

  useEffect(
    () => generateApiData(),
    []
  )

  questions.forEach(question => {
    if(question.options.some(option => option.isChecked)){
      questionsAnswered++
    }
    if(question.options.some(option => option.isChecked && option.isCorrect)){
      questionsAnsweredCorrectly++
    }    
  })

  function startQuiz(){
    setShowQuestions(true)
  }

  function checkGuess(questionIndex, optionIndex){
    setQuestions(prevQuestions => 
      prevQuestions.map(prevQuestion => {
        if(prevQuestion.index === questionIndex){
          return ({
            ...prevQuestion,
            options: prevQuestion.options.map(option => {
              if(option.index === optionIndex){
                return {...option, isChecked: !option.isChecked}
              }else{
                return {...option, isDisabled: true}
              }
            })
          })
        }else{
          return prevQuestion
        }
      })
    )
  }

  function startNewGame(e){
    e.preventDefault()
    generateApiData()
  }

  const questionElements = questions.map(question =>
    <Question 
      key={question.index} 
      text={question.text} 
      options={question.options}
      name={`Question ${question.index + 1}`}
      checkGuess={(optionIndex) => checkGuess(question.index, optionIndex)}
    />
  )

  if(showQuestions){
    return(
      <main>
        <form onSubmit={startNewGame}>
          {questionElements}
          {questionsAnswered > 4 && <button type="submit">Play Again</button>}
        </form>
        <p>Score: {questionsAnsweredCorrectly}/5</p>
      </main>
    )
  }else{
    return(
      <main className="splash">
        <h1>Random Quiz game</h1>
        <button onClick={startQuiz}>Play Quiz</button>
      </main>
    )
  }
}


