import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Loading } from '~client/components/await'

const Widget = ({ widget, update, saving }) => {
  // Resize column widget
  const { sm_size, md_size, lg_size } = widget
  const className = classnames(
    `px2 col mb4 md-mb0 col-${sm_size}`,
    `sm-col-${sm_size} md-col-${md_size} lg-col-${lg_size}`
  )

  return (
    <div className={className}>
      {saving && <Loading />}
    </div>
  )
}

Widget.propTypes = {
  widget: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  saving: PropTypes.bool
}

export default Widget
