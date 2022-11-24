import { gitHubClient } from "../../shared/data-access/github-client.service";

class RepositoryService {
  findBranches(owner: string, repo: string): Promise<{ name: string }[]> {
    return gitHubClient.request(`/repos/${owner}/${repo}/branches`);
  }

  findRepository(
    owner: string,
    repo: string
  ): Promise<{ stargazers_count: number }> {
    return gitHubClient.request(`/repos/${owner}/${repo}`);
  }
}

const repositoryService = new RepositoryService();

export { repositoryService };
