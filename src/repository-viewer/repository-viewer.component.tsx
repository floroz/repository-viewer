import { RepositoryEditor } from "./feature/repository-editor/repository-editor.component";
import { RepositoryForm } from "./feature/repository-form/repository-form.component";

export const RepositoryViewer = () => {
  return (
    <div>
      <RepositoryForm />
      <RepositoryEditor />
    </div>
  );
};
