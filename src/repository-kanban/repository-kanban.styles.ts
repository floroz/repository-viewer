export const DURATION = 750;
const START_TRANSITION = `all ${DURATION}ms ease-in-out`;
const END_TRANSITION = `all 150ms ease-in-out`;

export const defaultFormStyle = {
  transition: START_TRANSITION,
  transform: `translateX(0)`,
  opacity: 1,
};

export const transitionFormStyles = {
  entering: {
    transition: END_TRANSITION,
  },
  entered: {
    transition: END_TRANSITION,
  },
  exiting: {
    opacity: 1,
    transform: `translateX(0)`,
  },
  exited: {
    opacity: 0,
    transform: `translateX(-100vw)`,
  },
  unmounted: {},
};

export const defaultEditorStyle = {
  transition: START_TRANSITION,
  transform: `translateX(100vw)`,
  opacity: 1,
};

export const transitionEditorStyles = {
  entering: {
    opacity: 0.7,
    transform: `translateX(80vw)`,
  },
  entered: {
    opacity: 1,
    transform: `translateX(0vw)`,
  },
  exiting: {
    transition: END_TRANSITION,
  },
  exited: {
    transition: END_TRANSITION,
  },
  unmounted: {},
};
