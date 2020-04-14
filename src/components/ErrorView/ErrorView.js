import React from 'react';
import './ErrorView.css';

const ErrorView = ({ theme }) => {
  const className = `rs-error-view ${ theme ? 'rs-view-error--' + theme : ''}`;
  return <div className={ className }>Something went wrong..</div>;
}

export default ErrorView;
