import React from 'react';
import classNames from 'classnames';

const SCOPE_MAP = {
  regular: 'far',
  solid: 'fas',
  brand: 'fab',
};

/**
 * @param {{ scope?: keyof SCOPE_MAP, type: string }} props
 */
function Icon(props) {
  const {
    className,

    component: Component = 'i',
    scope = 'solid',
    type,
    ...restProps
  } = props;

  return (
    <i
      className={classNames(SCOPE_MAP[scope] || 'fas', `fa-${type}`, classNames)}
      {...restProps}
    />
  );
}

export default Icon;
