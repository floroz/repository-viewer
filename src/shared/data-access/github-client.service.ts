class GitHubClient {
  private _headers: Headers;
  private _token = import.meta.env["VITE_GITHUB_API_TOKEN"];
  private _baseUrl = `https://api.github.com`;

  constructor() {
    const headers = new Headers();
    headers.append("Accept", "application/vnd.github+json");
    headers.append("Authorization", `Bearer ${this._token}`);

    this._headers = headers;
  }

  getBranches(owner: string, repo: string) {
    return fetch(`${this._baseUrl}/repos/${owner}/${repo}/branches`, {
      headers: this._headers,
    }).then((res) => res.json());
  }
}

export const gitHubClient = new GitHubClient();
