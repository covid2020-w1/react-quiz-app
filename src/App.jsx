import { useState, useEffect } from 'react'
import './App.css'
import {decode} from 'html-entities'
import he from 'he'

function App() {

  //ok so were displaying things correctly now. now i want to make it so that when a user checks a radio, the program checks if the option isCorrect, and if so it turns itself green and the rest red. then it needs to keep track of the total score of the user in the background, so that when all questions are answered, it displays the users score and allows them to start a new game.

  //what is state for really? I think its used to update the ui everytime state changes. how would that apply here? well, im not sure. i don't think the user is actually changing anything in state when they check an option. but i still somehow need to store whether they got it right or wrong in a variable. hmm. im stumped. 

  //and what about the other stuff? effects, refs, action attribute for form data submissions and controlled components for synchronizing things that arent controlled by react with ui renders? well, were using effects for the api bc thats generally a thing you do, but im not convinced we need to. i seem to remember the example with luke skywalker and the counter being fundamentally different somehow. refs are for targetting elements that you cant target otherwise. action attributes work well but on form submissions. i only see that heppening for a new game button after a user has done the trivia game. 

  //what are things i can try? whats my intution say? well, lemme just fuck around and see if i can figure something out

  //what if i had each radio have an onchange event listener that checked if the answer is correct? if a button is unchecked, style it this way. if a button is checked and correct style B, if checked and incorrect, style C

  const [questions, setQuestions] = useState([])

  useEffect(
    () => {
      fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => {
          setQuestions(data.results.map(result => {

            const optionsArr = [
              {
                text: result.correct_answer,
                isCorrect: true,
                isChecked: false
              },
              {
                text: result.incorrect_answers[0],
                isCorrect: false,
                isChecked: false
              },
              {
                text: result.incorrect_answers[1],
                isCorrect: false,
                isChecked: false
              },
              {
                text: result.incorrect_answers[2],
                isCorrect: false,
                isChecked: false
              }              
            ]

            return (
              {
                question: result.question,
                options: optionsArr
              }
            )
        }))
        })
    },
    []
  )

  function checkGuess(isCorrect){
    console.log(isCorrect)
    //i want to check if the data object that is populating this input element has a property of isChecked equal to true. but i dont know how to do that with e. 
  }


  const fieldsetElements = questions.map(question =>
    <fieldset key={question.question}>
      <legend>{decode(question.question)}</legend>
      <label>
        <input type="radio" onChange={() => checkGuess(question.options[0].isCorrect)}/>
        {decode(question.options[0].text)}
      </label>
      <label>
        <input type="radio"  onChange={() => checkGuess(question.options[1].isCorrect)}/>
        {decode(question.options[1].text)}
      </label>
      <label>
        <input type="radio"  onChange={() => checkGuess(question.options[2].isCorrect)}/>
        {decode(question.options[2].text)}
      </label>
      <label>
        <input 
          type="radio"  
          onChange={() => checkGuess(question.options[3].isCorrect)}/>
        {decode(question.options[3].text)}
      </label>
    </fieldset>
  )


  return (
    <>
      <h1>hello world</h1>
      <button>Start game</button>
      <form>
        {fieldsetElements}
      </form>
      <button>New Game</button>
    </>
  )
}

export default App
