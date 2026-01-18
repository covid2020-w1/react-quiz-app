  
  export default function generatePlaceholderText(){
    const questionsArr = []
    const optionObj = {
      text: "option",
      isChecked: false,
      isCorrect: false,
      disabled: false  
    }

    for(let i=0; i<5; i++){
      const optionsArr = []
      const randomIndex = Math.floor(Math.random() * 4)
      for(let j=0; j<4; j++){
        if(j=== randomIndex){
          optionsArr.push({...optionObj, isCorrect: true, index: j, text: "correct"})
        }else{
          optionsArr.push({...optionObj, index: j})
        }
      }

      questionsArr.push({
        index: i,
        text: "question",
        options: optionsArr
      })
    }

    return questionsArr
  }
