module 'rc-animate' {
  namespace RCAnimate {
    type AnimationDoneCallback = () => void;
    type AnimationCancelCallback = () => void;

    export interface Props {
      children?: React.ReactNode;
      ref?: React.LegacyRef<any> | undefined;
      showProps?: string;
      exclusive?: boolean;
      transitionName?: string;
      transitionAppear?: boolean;
      transitionENter?: boolean;
      transitionLeave?: boolean;
      onEnd?: (key: string, exists: boolean) => void;
      animation?: {
        appear?: (node: Element, done: AnimationDoneCallback) => { stop: AnimationCancelCallback };
        enter?: (node: Element, done: AnimationDoneCallback) => void;
        leave?: (node: Element, done: AnimationDoneCallback) => { stop: AnimationCancelCallback };
      };
      component?: React.ElementType | string;
    }
  }

  export default class Animate extends React.Component<RCAnimate.Props> {}
}

module 'rc-queue-anim' {
  namespace RCQueueAnim {
    export interface Props {

    }
  }

  export default class QueueAnim extends React.Component<RCQueueAnim.Props> {}
}
