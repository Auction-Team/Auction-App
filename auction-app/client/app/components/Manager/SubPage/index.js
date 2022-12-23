/**
 *
 * SubPage
 *
 */

import React from 'react';

import Button from '../../Common/Button';

const SubPage = (props) => {
  const {
    title,
    actionTitle,
    handleAction,
    subActionTitle,
    handleSubAction,
    children,
  } = props;

  return (
    <div className="sub-page">
      <div className="subpage-header">
        <h3 className="mb-0">{title}</h3>
        <div className="action">
          {subActionTitle && (
            <Button
              variant="none"
              size="sm"
              text={subActionTitle}
              onClick={handleSubAction}
            />
          )}
          {actionTitle && (
            <Button
              variant="none"
              size="sm"
              text={actionTitle}
              onClick={handleAction}
            />
          )}
        </div>
      </div>
      <div className="subpage-body">{children}</div>
    </div>
  );
};

export default SubPage;
