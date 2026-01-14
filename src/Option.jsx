import clsx from 'clsx'

export default function Option(props){
    return(
        <label
            className = {clsx(
                props.isChecked && props.isCorrect && "correct",
                props.isChecked && !props.isCorrect && "incorrect" 
            )}
        >
            <input 
                type="radio" 
                name={props.name}
                onChange={ props.checkGuess }
                disabled={props.disabled}
            />
            {props.text}
        </label>
    )
}