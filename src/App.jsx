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
    }
    ))
    )
  }
  

  useEffect(
    () => generateApiData(),
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
  //if the question contains a checked answer but the checked answer isn't correct, then green outline the correct answer. can i do this without creating a new property for option? well to style it, im going to need a new class, and a clsx that will brand it in response to a unique input
  function checkGuess(questionIndex, optionIndex){
    setQuestions(prevQuestions => 
      prevQuestions.map(prevQuestion => {
        if(prevQuestion.index === questionIndex){
          return ({
            ...prevQuestion,
            //this loop is finding the option that was clicked. it is flipping the isChecked property to true, which triggers the clsx to kick in. so now i need another function that checks if question.options.some(option => option.checked) && !question.options.filter(option => option.isCorrect)[0].isChecked. if so, then take some variable like correctAndUnchecked and set it to true. i guess technically another way is to leave the checked version undisabled, and then apply a clsx that says isDisabled && isCorrect
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


  return(
    <main>
      <form onSubmit={startNewGame}>
        {questionElements}
        {questionsAnswered > 4 && <button type="submit">Play Again</button>}
      </form>
      <p>Score: {questionsAnsweredCorrectly}/5</p>
    </main>
  )
}


