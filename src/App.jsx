import './App.css'
import Question from './Question.jsx'
import { useState, useEffect } from 'react'
import generateQuestions from './questionsArr.js'

/*
-wire up the api
*/


export default function App(){

  const [questions, setQuestions] = useState(generateQuestions)

  //does each question contain any options with isChecked = true?

  useEffect(
    () => 
      fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => {

            //in essence, what were doing here is mapping over the array into a more helpful shape. however, the options array is only partially correct-- it only contains incorrect answers. so we map over the questions array again, and for each options array, we randomly splice in a a new object whose correctness is true. then we chain map methods so that the options array now has an index property. and this new array is what we set state to. so on first render, we paint the ui and then use the effect, which updates state and causes a rerender of the page
            const arr = data.results.map((question, index) => ({
            index: index,
            text: question.question,
            options: question.incorrect_answers.map((optionText) => {
              return {
                text: optionText,
                isChecked: false,
                isCorrect: false,
                disabled: false  
              }
            })
            }))

            setQuestions(arr.map(question => 
              ({
                ...question, 
                options: options.splice(
                  Math.floor(Math.random() * (options.length + 1)), 
                  0,
                  {
                    text: question.correct_answer,
                    isChecked: false,
                    isCorrect: true,
                    disabled: false
                  }
                )
              })
            ).map(question =>
              ({
                ...question,
                options: options.map((option, index) => 
                  ({
                    ...option,
                    index: index
                  })
                )
              })
            ))
        }
        ),
        []
  )


  let questionsAnswered = 0
  let questionsAnsweredCorrectly = 0

  questions.forEach(question => {
    if(question.options.some(option => option.isChecked)){
      questionsAnswered++
    }
    if(question.options.some(option => option.isChecked && option.isCorrect)){
      questionsAnsweredCorrectly++
    }    
  })

  console.log(questionsAnswered)

  //so now i need to add a block that turns every other 
  function checkGuess(questionIndex, optionIndex){
    setQuestions(prevQuestions => 
      prevQuestions.map(prevQuestion => {
        if(prevQuestion.index === questionIndex){
          return ({
            ...prevQuestion,
            options: prevQuestion.options.map(option => {
              if(option.index === optionIndex){
                return {...option, isChecked: !option.isChecked, disabled: true}
              }else{
                return {...option, isChecked: false, disabled: true}
              }
            })
          })
        }else{
          return prevQuestion
        }
      })
    )
  }

  function startNewGame(){
    setQuestions(generateQuestions)
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
      <form action={startNewGame}>
        {questionElements}
        {questionsAnswered > 4 && <button type="submit">dd</button>}
      </form>
      <p>Score: {questionsAnsweredCorrectly}/5</p>
    </main>
  )
}


