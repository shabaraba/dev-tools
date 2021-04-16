import {useContext} from 'react';
import ContentEditableComponent from '../../components/ContentEditableComponent';
import {RegexpContext} from '../RegexpTool';

const InputRegexpComponent = () => {
    const [value, setValue] = useContext(RegexpContext);

    const onChange = (inputString) => {
        let newHtml = "";
        inputString.split("").forEach((v) => {
            newHtml += "<span>" + v + "</span>";
        });
        return newHtml;
    }

    return (
        <ContentEditableComponent 
            input={value}
            setInput={setValue}
            className="colorful"
            onChange={onChange}
        />
    )
}

export default InputRegexpComponent;