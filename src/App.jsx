import './App.css'
import Question from './Question.jsx'

export default function App(){

  const questionsArr = []
  const optionObj = {
    text: "hello",
    isChecked: false,
    isCorrect: false  
  }


  for(let i=0; i<5; i++){
    const optionsArr = []
    for(let j=0; j<4; j++){
      if(j===0){
        optionsArr.push({...optionObj, isCorrect: true})
      }else{
        optionsArr.push({...optionObj})
      }
    }

    questionsArr.push({
      text: "world",
      options: optionsArr
    })
  }

  const questionElements = questionsArr.map((question, index) =>
    <Question key={index} question={question}/>
  )

  return(
    <form>
      {questionElements}
    </form>
  )
}


