import {useState, useRef, useEffect} from 'react';

import useCaretPosition from '../hooks/CaretHooks/UseCurrentCaretPosition';
import useMoveCaret from '../hooks/CaretHooks/UseMoveCaret';

const ContentEditableComponent = (props) => {
    const editorRef = useRef(null);
    const [inputHtml, setInputHtml] = useState(null);
    const [inputtingHtml, setInputtingHtml] = useState(null);
    const [isInputting, setIsInputting] = useState(false);

    console.log(editorRef.current);
    const currentCaretPosition = useCaretPosition(editorRef.current);
    useMoveCaret(editorRef.current, currentCaretPosition, props.input);

    useEffect(() => {
        if (isInputting || inputtingHtml == null) return;
        setInputHtml(inputtingHtml);
        setInputtingHtml(null);
        props.setInput(editorRef.current.innerText);
    }, [isInputting, inputtingHtml, props]);

    useEffect(() => {
        const innerText = editorRef.current.innerText;
        setInputtingHtml(props.onChange(innerText));
    }, [props])

    const handleChange = e => {
        const innerText = e.target.innerText;
        setInputtingHtml(props.onChange(innerText));
    }

    return (
        <div
            className="contentEditableComponent"
            ref={editorRef}
            contentEditable
            dangerouslySetInnerHTML={{ __html: inputHtml }}
            onCompositionStart={setIsInputting.bind(null, true)} // ローマ字入力、漢字変換開始イベント
            onCompositionEnd={setIsInputting.bind(null, false)} // ローマ字入力、漢字変換終了イベント
            onInput={handleChange}
        />
    );
}

export default  ContentEditableComponent;