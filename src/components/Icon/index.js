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

  if (typeof Component !== 'string') {
    return (
      <Component
        className={classNames('fa', className)}
        {...restProps}
      />
    );
  }

  return (
    <Component
      className={classNames(SCOPE_MAP[scope] || 'fas', `fa-${type}`, className)}
      {...restProps}
    />
  );
}

export default Icon;
