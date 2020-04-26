import React from 'react';
import DocumentTitle from 'react-document-title';

const DEFAULT_TITLE = window.document.title;

export default (props) => {
  const { title, children } = props;

  return (
    <DocumentTitle title={title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE}>
      {children}
    </DocumentTitle>
  );
};
