import Option from './Option.jsx'
import he from 'he'

export default function Question(props){
    // console.log("hello", props)

    const optionElements = props.options.map((option) =>
        <Option 
            key={option.index}
            index={option.index} 
            text={option.text} 
            isChecked={option.isChecked}
            isCorrect={option.isCorrect}
            isDisabled={option.isDisabled}
            name={props.name}
            checkGuess={() => props.checkGuess(option.index)}
        />
    )

    return(
        <fieldset>
            <legend>{he.decode(props.text)}</legend>
            <div className="option-container">
                {optionElements}
            </div>
        </fieldset>
    )
}