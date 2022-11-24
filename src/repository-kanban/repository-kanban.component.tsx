import { useRef, useState } from "react";
import { RepositoryEditor } from "./feature/repository-editor/repository-editor.component";
import { RepositoryForm } from "./feature/repository-form/repository-form.component";
import { useQueryRepository } from "./hooks/use-query-repository.hook";
import { Flex } from "@chakra-ui/react";
import { Transition } from "react-transition-group";
import {
  defaultEditorStyle,
  defaultFormStyle,
  DURATION,
  transitionEditorStyles,
  transitionFormStyles,
} from "./repository-kanban.styles";
import { ScreenLayout } from "./ui/screen-layout.component";

enum Screen {
  FORM,
  EDITOR,
}

export const RepositoryKanban = () => {
  const [screen, setScreen] = useState<Screen>(Screen.FORM);
  const formRef = useRef();
  const editorRef = useRef();

  const { data, error, findAllByURI, reset } = useQueryRepository({
    onSuccess: () => setScreen(Screen.EDITOR),
  });

  const onSubmit = (uri: string) => {
    return findAllByURI(uri);
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
