import React from 'react'
import { FormattedMessage } from '../translate/fake_react_intl'
import propTypes from 'prop-types'

const TitleGenerator = ({ id, required = false, bold = true, titleClassName = '' }) => {
  return (
    <div
      className={bold ? 'bold' : ''}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
    >
      {/* <i className="fa fa-angle-right mr-2" /> */}
      <p id="title-generator-p" className={titleClassName}>
        <FormattedMessage id={id} /> {required ? '*' : ''}
      </p>
    </div>
  )
}

TitleGenerator.propTypes = {
  id: propTypes.string.isRequired,
  // required: propTypes.bool.isRequired,
  // bold: propTypes.bool.isRequired, //llora por usarlo required
}

export default TitleGenerator
