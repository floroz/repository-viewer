import React, { forwardRef, useRef, useState } from "react";
import { RepositoryEditor } from "./feature/repository-editor/repository-editor.component";
import { RepositoryForm } from "./feature/repository-form/repository-form.component";
import { useQueryRepository } from "./hooks/use-query-repository.hook";
import { Box, Flex } from "@chakra-ui/react";
import { Transition } from "react-transition-group";

const DURATION = 750;
const START_TRANSITION = `all ${DURATION}ms ease-in-out`;
const END_TRANSITION = `all 150ms ease-in-out`;

const defaultFormStyle = {
  transition: START_TRANSITION,
  transform: `translateX(0)`,
  opacity: 1,
};

const transitionFormStyles = {
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

const defaultEditorStyle = {
  transition: START_TRANSITION,
  transform: `translateX(100vw)`,
  opacity: 1,
};

const transitionEditorStyles = {
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

enum Screen {
  FORM,
  EDITOR,
}

const ScreenLayout = forwardRef<
  any,
  {
    children: React.ReactNode;
    transitionStyles: any;
    defaultStyles: any;
  }
>(({ children, transitionStyles, defaultStyles }, ref) => {
  return (
    <Flex
      w="100vw"
      p="32"
      position="absolute"
      top="0"
      left="0"
      justify="center"
      ref={ref}
      style={{
        ...defaultStyles,
        ...transitionStyles,
      }}
    >
      <Box maxWidth="120rem">{children}</Box>
    </Flex>
  );
});

export const RepositoryKanban = () => {
  const [screen, setScreen] = useState<Screen>(Screen.FORM);
  const formRef = useRef();
  const editorRef = useRef();

  const goToEditor = () => {
    setScreen(Screen.EDITOR);
  };

  const { data, error, findAllByURI, reset } = useQueryRepository({
    onSuccess: goToEditor,
  });

  const onSubmit = async (uri: string) => {
    await findAllByURI(uri);
  };

  const onGoBack = () => {
    reset();
    setScreen(Screen.FORM);
  };

  const showForm = screen == Screen.FORM;

  return (
    <Flex position="relative">
      <Transition nodeRef={formRef} timeout={DURATION} in={showForm}>
        {(state) => (
          <ScreenLayout
            defaultStyles={defaultFormStyle}
            transitionStyles={transitionFormStyles[state]}
          >
            <RepositoryForm onSubmit={onSubmit} error={error} />
          </ScreenLayout>
        )}
      </Transition>
      <Transition nodeRef={editorRef} timeout={DURATION} in={!showForm}>
        {(state) => (
          <ScreenLayout
            defaultStyles={defaultEditorStyle}
            transitionStyles={transitionEditorStyles[state]}
          >
            <RepositoryEditor repository={data} onGoBack={onGoBack} />
          </ScreenLayout>
        )}
      </Transition>
    </Flex>
  );
};
