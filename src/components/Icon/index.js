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
  const { scope = 'solid', type, component: Component } = props;

  if (Component) {
    return <Component className="fa" />;
  }

  return <i className={classNames(SCOPE_MAP[scope] || 'fas', `fa-${type}`)} />;
}

export default Icon;
