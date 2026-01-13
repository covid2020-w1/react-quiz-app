import './App.css'
import Question from './Question.jsx'
import { useState } from 'react'
import questionsArr from './questionsArr.js'


export default function App(){

  console.log(questionsArr)

  const [questions, setQuestions] = useState(questionsArr)

  //so now i need to add a block that turns every other 
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
                return {...option, isChecked: false}
              }
            })
          })
        }else{
          return prevQuestion
        }
      })
    )
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


  return(
    <main>
      <form>
        {questionElements}
      </form>
      <p>total score: </p>
    </main>
  )
}


