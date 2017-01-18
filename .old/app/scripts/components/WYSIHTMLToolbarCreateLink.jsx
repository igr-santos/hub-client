import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

//
// The content widget module it is not the perfect module to provide these actions.
// Needs to refact to more abstract component like global reusable components module.
//
import * as ContentActions from '../../modules/widgets/__plugins__/content/action-creators'

// You may will see the warning below:
// Warning: Stateless function components cannot be given refs (See ref "wrappedInstance" in
// MobilizationSettingsContainer created by Connect(MobilizationSettingsContainer)). Attempts to
// access this ref will fail.
//
// Upgrade React Redux to version 4 will should go away this warning.
// See: https://github.com/reactjs/react-redux/issues/141#issuecomment-148358733

const WYSIHTMLToolbarCreateLink = ({ editorLinkTargetType, setEditorLinkTargetType }) => (
  <div
    data-wysihtml5-dialog='createLink'
    className='white p2 bg-darken-3'
    style={{ display: 'none' }}
  >
    <input
      type='text'
      data-wysihtml5-dialog-field='href'
      defaultValue='http://'
      className='input mr1'
    />
    <a data-wysihtml5-dialog-action='save' className='btn btn-outline'>
      Inserir
    </a>
    <span className='ml2'>
      <input
        type='checkbox'
        name='editorLinkTargetType'
        onChange={e => setEditorLinkTargetType(e.target.checked ? '_blank' : '_self')}
        value={editorLinkTargetType}
        data-wysihtml5-dialog-field='target'
      />
      <label htmlFor='editorLinkTargetType'>
        Abrir link em nova aba
      </label>
    </span>
  </div>
)

WYSIHTMLToolbarCreateLink.propTypes = {
  editorLinkTargetType: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  editorLinkTargetType: state.widgets.plugins.content.editorLinkTargetType
})

export default connect(mapStateToProps, ContentActions)(WYSIHTMLToolbarCreateLink)
