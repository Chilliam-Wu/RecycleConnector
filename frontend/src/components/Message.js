import React from 'react';
import { Alert } from 'react-bootstrap';

function Message({ variant, children, show }) {
  return (
    <Alert show={show} variant={variant}>
      {children}
    </Alert>
  );
}

export default Message;
