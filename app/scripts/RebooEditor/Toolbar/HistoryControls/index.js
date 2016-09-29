import React, { Component, PropTypes } from 'react'
import { EditorState } from 'draft-js'


export class HistoryControls extends Component {

  handleUndoClick() {
    const { editorState, setEditorState } = this.props

    if (!editorState.getUndoStack().isEmpty()) {
      setEditorState(EditorState.undo(editorState))
    }
  }

  handleRedoClick() {
    const { editorState, setEditorState } = this.props
    if (!editorState.getRedoStack().isEmpty()) {
      setEditorState(EditorState.redo(editorState))
    }
  }

  render() {

    const { buttonClassName } = this.props

    return (
      <div className="historyControls">
        <button type="button" className={buttonClassName} onClick={this.handleUndoClick.bind(this)}>
          <i className="fa fa-undo regular" />
        </button>
        <button type="button" className={buttonClassName} onClick={this.handleRedoClick.bind(this)}>
          <i className="fa fa-repeat regular" />
        </button>
      </div>
    )
  }
}

HistoryControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}