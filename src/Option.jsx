export default function Option(props){
    return(
        <label>
            <input type="radio"/>
            {props.option.text}
        </label>
    )
}