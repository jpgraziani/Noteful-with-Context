import React from 'react-router-dom';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

export default function ValidationError(props) {
  if(props.hasError) {
    return (
      <Fragment>
        <div className='Validation_error-message'>
          {props.message}
        </div>
      </Fragment>
    )
  }
  return <></>
}

ValidationError.propTypes = {
  hasError: PropTypes.bool,
  message: PropTypes.string
}