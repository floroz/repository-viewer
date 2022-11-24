import { useState } from "react";
import { RepositoryEditor } from "./feature/repository-editor/repository-editor.component";
import { RepositoryForm } from "./feature/repository-form/repository-form.component";
import { useQueryBranches } from "./data-access/use-query-branches.hook";

enum Screen {
  FORM,
  EDITOR,
}

export const RepositoryKanban = () => {
  const [screen, setScreen] = useState<Screen>(Screen.FORM);

  const goToEditor = () => {
    setScreen(Screen.EDITOR);
  };

  const {
    data: branches,
    error,
    findAllByURI,
    loading,
  } = useQueryBranches({
    onSuccess: goToEditor,
  });

  const onSubmit = async (uri: string) => {
    await findAllByURI(uri);
  };

  return (
    <div>
      {screen === Screen.FORM ? (
        <RepositoryForm onSubmit={onSubmit} error={error} />
      ) : (
        <RepositoryEditor branches={branches} />
      )}
    </div>
  );
};
