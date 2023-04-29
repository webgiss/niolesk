import React from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';
import PropTypes from 'prop-types';
import './Editor.css'

class Editor extends React.Component {
    get shouldUpdate() {
        return this._shouldUpdate === undefined ? true : this._shouldUpdate
    }

    set shouldUpdate(value) {
        this._shouldUpdate = value;
    }

    shouldComponentUpdate(nextProps) {
        if (this._editor && this._editor.editor) {
            const editorText = this._editor.editor.getValue();
            const nextPropsText = nextProps.text;

            if (nextPropsText === editorText) {
                if (nextProps.height !== this.props.height) {
                    this.shouldUpdate = true;
                } else {
                    this.shouldUpdate = false;
                }
            } else {
                this.shouldUpdate = true;
            }
            return this.shouldUpdate;
        } else {
            return true;
        }
    }

    render() {
        const { text, language, onTextChanged, height } = this.props;
        const { shouldUpdate } = this;

        return <div className='Editor'>
            <MonacoEditor
                className='MonacoEditor'
                ref={(ref) => this._editor = ref}
                language={language || "plaintext"}
                
                onChange={(text) => onTextChanged(text)}
                value={shouldUpdate ? text : null}
                options={{
                    theme: 'vs',
                    automaticLayout: true,
                    folding: true,
                    foldingStrategy: 'indentation',
                }}
                height={`${height}px`}
            />
        </div>
    }
}

Editor.propTypes = {
    text: PropTypes.string,
    onTextChanged: PropTypes.func.isRequired,
};

export default Editor;