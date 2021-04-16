import {useState, useEffect} from 'react';

const getCaretPosition = (editor) => {
    const selection = document.getSelection();
    if (selection == null) return 0;

    const target = selection.focusNode;
    const countChars = (nodes, count) => {
        const [head, ...tail] = nodes;
        if (head == null || head === target) return count;
        if (head.nodeType === Node.TEXT_NODE)
        return countChars(tail, count + (head.textContent?.length ?? 0));
        return countChars([...Array.from(head.childNodes), ...tail], count);
    };

    return countChars([editor], 0) + selection?.focusOffset;
};

const useCaretPosition = (editor) => {
    const [caretPosition, setCaretPosition] = useState(0);
    const position = getCaretPosition(editor);
    useEffect(() => {
        console.log("call");
        setCaretPosition(position);
    }, [position])
    return caretPosition;
}

export default useCaretPosition;