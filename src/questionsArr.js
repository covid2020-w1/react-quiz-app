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
        optionsArr.push({...optionObj, isCorrect: true, index: j})
      }else{
        optionsArr.push({...optionObj, index: j})
      }
    }

    questionsArr.push({
      index: i,
      text: "world",
      options: optionsArr
    })
  }

  /*now lets figure out a way to shuffle the order of the options. there are a couple of ways to do that. i could identify the correct answer beforehand, and insert it into a random position in the array. or maybe theres a way to shuffle the position of all the options. consider an array
  
  const array = ["a", "b", "c", "d"]

  its equivalent to 

  arrayobj = {
    0: "a",
    1: "b",
    2: "c",
    3: "d"
  }

  we also have Math.random() which picks a number from 0 to .99... arrayObj.length = 4. Maybe we can extract the right answer with splice, 

  so the best i can find is to use splice to randomly insert the correct answer. so eg

  const array = []

  */

  export default questionsArr