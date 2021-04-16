import {useState, useContext} from 'react';
import ContentEditableComponent from '../../components/ContentEditableComponent';
import {RegexpContext} from '../RegexpTool';

const addSpan = (target, splitList, splitListNumber) => {
    console.log("-----------------split");
    if (splitList.length <= splitListNumber) {
        console.log("split文字を使い切ったのでreturn");
        return target;
    }
    console.log("target: " + target);
    console.log("split string: " + splitList[splitListNumber]);
    const splitResultList = target.split(splitList[splitListNumber]);
    console.log("splitResultList: ");
    console.log(splitResultList);
    if (splitResultList.length === 1 && splitResultList[0] === "") {
        console.log("空文字のみのためreturn");
        return splitResultList[0];
    }
    splitListNumber++;
    let allSplitResultList = [];
    let splitResult = "";
    for (splitResult of splitResultList) {
        allSplitResultList.push(addSpan(splitResult, splitList, splitListNumber));
    }

    console.log("-----------------join");
    splitListNumber--;
    console.log("target list: ");
    console.log(allSplitResultList);
    let joinString = splitList[splitListNumber];
    console.log("join string: " + joinString);
    if (joinString !== "") {
        joinString = "<span class='hit'>" + joinString + "</span>";
    }
    console.log("result: " + allSplitResultList.join(joinString));
    return allSplitResultList.join(joinString);
}

const InputTargetStringComponent = () => {
    const [regexp, ] = useContext(RegexpContext);
    const [input, setInput] = useState("");

    const onChange = (target) => {
        console.log("---------------------------------------------------");
        let matchString = null;
        let matchStringRestricted = null;
        try {
            const regexpL = new RegExp(regexp, "g");
            matchString = target.match(regexpL)
            matchStringRestricted = Array.from(new Set(matchString));

            console.log("regexp result");
            console.log(matchStringRestricted);
            if (matchStringRestricted === null) return target;

            const resultString = addSpan(target, matchStringRestricted, 0);
            return resultString;
        } catch (e) {
            return target;
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

export default InputTargetStringComponent;