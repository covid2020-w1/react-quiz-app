import './App.css'
import Question from './Question.jsx'
import { useState, useEffect } from 'react'
import generatePlaceholderText from './generatePlaceholderText.js'


export default function App(){

  //state values
  const [questions, setQuestions] = useState([])
  const [showQuestions, setShowQuestions] = useState(false);

  //derived values
  let questionsAnswered = 0
  let questionsAnsweredCorrectly = 0

  //functions
  //fetch the data, map over each question. for each question, randomly insert the correct_answer string into the array of incorrect_answer strings. then, for each question, return an object that contains the index of the question, the text, and an array of options. for that array, map over the array of all questions, returning an array with index, text, isChecked, isCorrect, and isDisabled. for isCorrect, evaluate whether the correct_answer of the current question being mapped is equal to the current option being mapped.
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
  
  //i think im using this right, but i honestly dont know. do i leave the array empty?
  useEffect(
    () => generateApiData(),
    []
  )

  //calculate the number of questions answered and questions answered correctly
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

  //in this function, were passing parameters that were getting from options laced with an eventlistener. in the function we map through each question, and if the question.index matches the questionIndex, we return an object where we just modify the options, where we map through each option and check if option.index matches the optionIndex that was passed from the event listener of the option that was clicked. if it matches, then flip the value of isDisabled, which triggers a clsx on the option component. for the options that dont match, disable it.
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

  //not sure what preventdefault does here, just know you need it
  function startNewGame(e){
    e.preventDefault()
    generateApiData()
  }

  //this is where you import the question component and set its props. for the checkGuess fn, by passing an arrow function, we can curry it, meaning we pass the question index to this function now, and defer the optionIndex argument until later
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


