import { Columns } from "../hooks/use-columns-state.hook";

class RepositoryStorageService {
  private getKey(owner: string, repo: string): string {
    return `${owner}-${repo}`;
  }
  saveRepositoryToStorage(owner: string, repo: string, columns: Columns): void {
    if (!window.localStorage) {
      return;
    }

    window.localStorage.setItem(
      this.getKey(owner, repo),
      JSON.stringify(columns)
    );
  }

  getRepositoryFromStorage(owner: string, repo: string): Columns | null {
    if (!window.localStorage) {
      return null;
    }

    const serialized = window.localStorage.getItem(this.getKey(owner, repo));

    if (!serialized) {
      return null;
    }

    return JSON.parse(serialized) as Columns;
  }
}

const repositoryStorageService = new RepositoryStorageService();

export { repositoryStorageService };
