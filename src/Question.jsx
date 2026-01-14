import Option from './Option.jsx'

export default function Question(props){
    // console.log("hello", props)

    const optionElements = props.options.map((option) =>
        <Option 
            key={option.index}
            index={option.index} 
            text={option.text} 
            isChecked={option.isChecked}
            isCorrect={option.isCorrect}
            disabled={option.disabled}
            name={props.name}
            checkGuess={() => props.checkGuess(option.index)}
        />
    )

    return(
        <fieldset>
            <legend>{props.text}</legend>
            {optionElements}
        </fieldset>
    )
}