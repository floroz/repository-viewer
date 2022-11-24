import { useCallback, useState } from "react";
import { gitHubClient } from "../../shared/data-access/github-client.service";
import { githubUtils } from "../utils/github.utils";

const extractMetadataFromURI = (uri: string) => {
  if (!githubUtils.isGithubRepositoryURI(uri)) {
    throw new Error("Oops something went wrong");
  }

  const owner = githubUtils.getOwnerFromGithubURI(uri);
  const repository = githubUtils.getRepositoryFromGithubURI(uri);

  return { owner, repository };
};

type Props = {
  onSuccess?: () => void;
};

export const useQueryBranches = (props: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | Record<string, unknown>>(null);

  const findAllByURI = useCallback(async (uri: string) => {
    setLoading(true);
    try {
      const { owner, repository } = extractMetadataFromURI(uri);

      const res = await gitHubClient.getBranches(owner, repository);

      setData(res);
      setError(null);
      props.onSuccess?.();
    } catch (error) {
      setError("Oops something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, data, findAllByURI, loading };
};
