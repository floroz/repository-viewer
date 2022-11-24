import React, { useState } from "react";
import { RepositoryEditor } from "./feature/repository-editor/repository-editor.component";
import { RepositoryForm } from "./feature/repository-form/repository-form.component";
import { useQueryRepository } from "./hooks/use-query-repository.hook";
import { Box, Flex } from "@chakra-ui/react";

enum Screen {
  FORM,
  EDITOR,
}

const ScreenLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="100vw" p="32" justify="center">
      <Box maxWidth="120rem">{children}</Box>
    </Flex>
  );
};

export const RepositoryKanban = () => {
  const [screen, setScreen] = useState<Screen>(Screen.FORM);

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

  return (
    <ScreenLayout>
      {screen === Screen.FORM ? (
        <RepositoryForm onSubmit={onSubmit} error={error} />
      ) : (
        <RepositoryEditor repository={data} onGoBack={onGoBack} />
      )}
    </ScreenLayout>
  );
};
