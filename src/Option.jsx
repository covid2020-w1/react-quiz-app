import clsx from 'clsx'
import he from 'he'

export default function Option(props){
    return(
        <label
            className = {clsx(
                props.isChecked && props.isCorrect && "correct",
                props.isChecked && !props.isCorrect && "incorrect",
                props.isDisabled && props.isCorrect && "disabledButCorrect" 
            )}
        >
            <input 
                type="radio" 
                name={props.name}
                onChange={ props.checkGuess }
                disabled={props.isDisabled}
                checked={props.isChecked}
            />
            {he.decode(props.text)}
        </label>
    )
}