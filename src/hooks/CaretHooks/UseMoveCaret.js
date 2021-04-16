import {useEffect} from 'react';

const moveCaret = (editor, caretPosition) => {
    const selection = document.getSelection();
    if (selection == null) return;

    const findNode = (nodes, count) => {
        const [head, ...tail] = nodes;
        if (head == null) return [];
        if (head.hasChildNodes())
        return findNode([...Array.from(head.childNodes), ...tail], count);
        const addedCount = count + (head.textContent?.length ?? 0);
        const diff = addedCount - caretPosition;
        if (0 <= diff) return [head, diff];
        return findNode(tail, addedCount);
    };

    const [targetNode, diff] = findNode([editor], 0);
    if (targetNode == null || diff == null) return;

    const range = document.createRange();
    range.setStart(targetNode, targetNode.textContent.length - diff);
    selection.removeAllRanges();
    selection.addRange(range);
};

const useMoveCaret = (editor, toPosition, input) => {
    useEffect(() => {
        // console.log(toPosition);
        if (editor == null) return;

        moveCaret(editor, toPosition);
    }, [editor, toPosition, input]);
}

export default useMoveCaret;