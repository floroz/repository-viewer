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

  request(endpoint: string, method?: string) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      method: method ?? "GET",
    }).then((res) => res.json());
  }
}

export const gitHubClient = new GitHubClient();
