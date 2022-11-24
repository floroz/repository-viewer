import { useCallback, useState } from "react";
import { gitHubClient } from "../../shared/data-access/github-client.service";
import { repositoryService } from "../data-access/repository.service";
import { Repository } from "../types/repository";
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

export const useQueryRepository = (props: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | Repository>(null);

  const findAllByURI = useCallback(async (uri: string) => {
    setLoading(true);
    try {
      const { owner, repository } = extractMetadataFromURI(uri);

      const [branches, repo] = await Promise.all([
        repositoryService.findBranches(owner, repository),
        repositoryService.findRepository(owner, repository),
      ]);

      const data: Repository = {
        name: repository,
        stars: repo["stargazers_count"],
        branches: branches.map((item: any) => ({ name: item.name })),
      };

      setData(data);
      setError(null);
      props.onSuccess?.();
    } catch (error) {
      setError("Oops something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { error, data, findAllByURI, loading, reset };
};
