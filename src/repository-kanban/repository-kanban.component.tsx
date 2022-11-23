import { RepositoryEditor } from "./feature/repository-editor/repository-editor.component";
import { RepositoryForm } from "./feature/repository-form/repository-form.component";

export const RepositoryKanban = () => {
  return (
    <div>
      <RepositoryForm />
      <RepositoryEditor />
    </div>
  );
};
