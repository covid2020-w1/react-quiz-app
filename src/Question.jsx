import Option from './Option.jsx'

export default function Question(props){
    // console.log("hello", props)

    const optionElements = props.question.options.map((option, index) =>
        <Option key={index} option={option}/>
    )

    return(
        <fieldset>
            <legend>{props.question.text}</legend>
            {optionElements}
        </fieldset>
    )
}