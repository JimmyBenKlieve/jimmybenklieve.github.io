import React from 'react';
import PropTypes from 'prop-types';

const timeout = async (interval) => (
  new Promise((resolve) => {
    window.setTimeout(resolve, interval);
  })
);

class Typewriter extends React.PureComponent {
  static defaultProps = {
    maxInterval: 280,
    minInterval: 60,
    children: null,

    component: null,
    componentProps: {},
    charComponent: null,
    charComponentProps: {},

    onEnd: null
  }

  static propTypes = {
    maxInterval: PropTypes.number,
    minInterval: PropTypes.number,
    children: PropTypes.string,

    component: PropTypes.elementType,
    componentProps: PropTypes.object,
    charComponent: PropTypes.elementType,
    charComponentProps: PropTypes.object,

    onEnd: PropTypes.func,
  }

  state = {
    currentText: '',
  }

  async componentDidMount() {
    const {
      maxInterval: max,
      minInterval: min,
      children,
      onEnd,
    } = this.props;

    if (typeof children === 'string') {
      for (const char of children) {
        // eslint-disable-next-line
        await timeout(min + Math.random() * (max - min));

        this.setState(({ currentText }) => ({ currentText: `${currentText}${char}` }));
      }

      if (typeof onEnd === 'function') {
        onEnd();
      }
    }
  }

  render() {
    const {
      component: Component,
      componentProps,
      charComponent: CharWrapperComponent,
      charComponentProps,
    } = this.props;
    const { currentText } = this.state;

    let text = currentText;

    if (CharWrapperComponent) {
      text = currentText
        .split('')
        .map((char, i) => (
          <CharWrapperComponent key={`${i}${char}`} {...charComponentProps}>{char}</CharWrapperComponent> // eslint-disable-line
        ));
    }

    return Component
      ? (<Component {...componentProps}>{text}</Component>)
      : text;
  }
}

export default Typewriter;
