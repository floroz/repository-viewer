import { Octokit } from "@octokit/core";

export const githubClient = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
});
