import { useCallback, useState } from "react";
import { gitHubClient } from "../../../shared/data-access/github-client.service";
import { githubUtils } from "../../utils/github.utils";

export const useRepositoryBranches = () => {
  const [error, setError] = useState<string | null>(null);
  const [branches, setBranches] = useState<null | Record<string, unknown>>(
    null
  );
  const [loading, setLoading] = useState(false);

  const extractDetails = useCallback((uri: string) => {
    try {
      if (!githubUtils.isGithubRepositoryURI(uri)) {
        throw new Error("");
      }

      const owner = githubUtils.getOwnerFromGithubURI(uri);
      const repository = githubUtils.getRepositoryFromGithubURI(uri);

      return { owner, repository };
    } catch (error) {
      setError("Oops something went wrong");
    }
  }, []);

  const getBranches = useCallback(
    async (uri: string) => {
      setLoading(true);
      try {
        const data = extractDetails(uri);

        if (!data) {
          throw new Error("Oops something went wrong");
        }

        const res = await gitHubClient.getBranches(data.owner, data.repository);

        console.log(res);
        setBranches(res);
        setError(null);
      } catch (error) {
        setError("Oops something went wrong");
        setBranches(null);
      } finally {
        setLoading(false);
      }
    },
    [extractDetails]
  );

  return { error, branches, getBranches, loading };
};
