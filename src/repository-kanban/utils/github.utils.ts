class GitHubUtils {
  private readonly githubUrlFragment = "github.com/";

  isGithubRepositoryURI(uri: string) {
    return uri.includes(this.githubUrlFragment);
  }

  /**
   * Expects a Repository URI such as `https://github.com/{owner}/
   *
   * Extracts the {owner} param
   *
   * @param uri a GitHub Repository URI
   */
  getOwnerFromGithubURI(uri: string) {
    if (!this.isGithubRepositoryURI(uri)) {
      throw new Error("invalid URI");
    }

    const ownerName = uri.split(this.githubUrlFragment)[1].split("/")[0];

    if (!ownerName.trim()) {
      throw new Error("Invalid URI");
    }

    return ownerName;
  }

  /**
   * Expects a Repository URI such as `https://github.com/{owner}/{repository}/
   *
   * Extracts the {repository} param
   *
   * @param uri a GitHub Repository URI
   */
  getRepositoryFromGithubURI(uri: string) {
    if (!this.isGithubRepositoryURI(uri)) {
      throw new Error("Invalid URI");
    }

    let repositoryName = uri.split(this.githubUrlFragment)[1].split("/")[1];

    if (repositoryName.includes("/")) {
      repositoryName = repositoryName.split("/")[0];
    }

    if (!repositoryName.trim()) {
      throw new Error("Invalid URI");
    }

    return repositoryName;
  }
}

const githubUtils = new GitHubUtils();

export { githubUtils };
