import {useEffect, useState, createContext, useContext, useRef} from 'react';
import ContentEditableComponent from '../components/ContentEditableComponent';
import '../styles/RegexpTool.sass';
export const RegexpContext = createContext();
export const TargetContext = createContext();

const InputRegexp = () => {
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

const InputTargetString = () => {
    const [regexp, setRegexp] = useContext(RegexpContext);
    const [target, setTarget] = useContext(TargetContext);
    const [input, setInput] = useState("");

    const onChange = (target) => {
        let matchString = "";
        try {
            matchString = RegExp(regexp, 'g').test(target);
            matchString = target.match(regexp);
        } catch (e) {
            matchString = "";
        }
        console.log("target: " + target);
        console.log("regexp: " + regexp);
        console.log("match: " + matchString);

        if (matchString == null) return target;

        const splitedString = target.split(matchString);
        if (splitedString.length == 0) return matchString;
        if (splitedString.length == 1) {
            return (
                "<span>" + splitedString[0] + "</span>" + 
                "<span style='color: red;'>" + matchString + "</span>" 
            );
        }
        if (splitedString.length == 2) {
            return (
                "<span>" + splitedString[0] + "</span>" + 
                "<span style='color: red;'>" + matchString + "</span>" + 
                "<span>" + splitedString[1] + "</span>"
            );
        }
    }

    return (
        <ContentEditableComponent 
            input={input}
            setInput={setInput}
            onChange={onChange}
            externalTorigger={regexp}
        />
    )
}

const RegexpTool = () => {
    const [regexp, setRegexp] = useState("");
    const [target, setTarget] = useState("");
    return (
        <RegexpContext.Provider value={[regexp, setRegexp]}>
            <TargetContext.Provider value={[target, setTarget]}>
                <div className="regexp-tool__input__group"> 
                    <div className="label">input Regexp</div>
                    <InputRegexp />
                </div>

                <div className="regexp-tool__input__group"> 
                    <div className="label">input target string</div>
                    <InputTargetString />
                </div>
            </TargetContext.Provider>
        </RegexpContext.Provider>
    );
}

export default RegexpTool;