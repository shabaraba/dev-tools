import {useState, createContext} from 'react';
import InputTargetStringComponent from './RegExpTool/InputTargetString';
import InputRegexpComponent from './RegExpTool/InputRegexp';
import '../styles/RegexpTool.sass';
export const RegexpContext = createContext();

const RegexpTool = () => {
    const [regexp, setRegexp] = useState("");
    return (
        <RegexpContext.Provider value={[regexp, setRegexp]}>
            <div className="regexp-tool__input__group"> 
                <div className="label">input Regexp</div>
                <InputRegexpComponent />
            </div>

            <div className="regexp-tool__input__group"> 
                <div className="label">input target string</div>
                <InputTargetStringComponent />
            </div>
        </RegexpContext.Provider>
    );
}

export default RegexpTool;