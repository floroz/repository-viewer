import { useEffect } from "react";
import { RepositoryViewer } from "./repository-viewer/repository-viewer.component";
import { githubClient } from "./shared/data-access/github-client.service";

const token = import.meta.env['GITHUB_API_TOKEN']

const App = () => {
  useEffect(() => {
    const headers = new Headers({});
    headers.append("Accept", "application/json");
    headers.append(
      "Authorization",
      `Bearer ${token}`
    );

    fetch("https://api.github.com/repos/floroz/repository-viewer/branches", {
      headers,
    })
      .then((res) => res.json())
      .then(console.log);
  }, [])

  return (
    <div>
      <RepositoryViewer />
    </div>
  );
};

export default App;
