import { useState } from "react";
import { RepositoryEditor } from "./feature/repository-editor/repository-editor.component";
import { RepositoryForm } from "./feature/repository-form/repository-form.component";
import { useRepositoryBranches } from "./feature/repository-form/use-repo.hook";

enum Screen {
  FORM,
  EDITOR,
}

export const RepositoryKanban = () => {
  const [screen, setScreen] = useState<Screen>(Screen.FORM);
  const { branches, error, getBranches, loading } = useRepositoryBranches();

  const goToEditor = () => {
    setScreen(Screen.EDITOR);
  };

  return (
    <div>
      {screen === Screen.FORM ? (
        <RepositoryForm onSubmit={getBranches} error={error} />
      ) : (
        <RepositoryEditor branches={branches} />
      )}
    </div>
  );
};
