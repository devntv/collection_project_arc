import { createStyles } from "@material-ui/core";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react';
import LabelBox from './label-box';
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

const defaultOptions = ['inline', 'list', 'textAlign', 'colorPicker'];
const defaultOnValueChange = (value = "") => { };
const defaultSetValue = (name = '', value = '') => { };

const styles = createStyles({
    editor: {
        padding: "0 8px",
        minHeight: "6rem",
    }
})
/**
 * @callback getValueType
 * @param {string} name - name of field
 * @callback setValueType
 * @param {string} name - name of field
 * @param {*} value - value to set to form
 * @returns {void}
 */
/**
 * @description This is a rich text editor component.
 * @param {[string]} options array of toolbar options
 * @param {string} label field label
 * @param {string} name name of form value
 * @param {setValueType} setValue function to get field value.
 * @param {getValueType} getValue function to get field value.
 * @example How to use `import RichTextField from "@thuocsi/nextjs-components/editor/rich-text-field/index";import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";`
 */
export default function TextEditorField({
    options = defaultOptions,
    onValueChange = defaultOnValueChange,
    setValue = defaultSetValue,
    label,
    name = '',
    getValue,
    disabled = false,
    error = false,
}) {
    const [focused, setFocused] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(() => {
        const value = getValue(name);
        const blocksFromHTML = convertFromHTML(value ?? '<p></p>');
        const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        )
        setEditorState(EditorState.createWithContent(contentState))

    }, [getValue(name)])


    useEffect(() => {
        const htmlString = stateToHTML(editorState.getCurrentContent());
        onValueChange(htmlString)
    }, [editorState])
    return (
        <LabelBox focused={focused} label={label} error={error}>
            <Editor
                editorStyle={styles.editor}
                toolbar={{
                    options,
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough'],
                    }
                }}
                toolbarHidden={!focused}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                    setFocused(false);
                    const htmlString = stateToHTML(editorState.getCurrentContent());
                    setValue(name, htmlString);
                    onValueChange(htmlString);
                }}
                readOnly={disabled}
            />
        </LabelBox>
    )
}
