export interface Repository {
  owner: string;
  name: string;
  stars: number;
  branches: { name: string }[];
}
