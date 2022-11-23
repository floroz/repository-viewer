import { describe, expect, it } from "vitest";
import { githubUtils } from "./github.utils";

describe("GitHub Utils", () => {
  describe("isGithubRepositoryURI", () => {
    it("should validate URI", () => {
      expect(
        githubUtils.isGithubRepositoryURI("https://github.com/something")
      ).toBeTruthy();
      expect(
        githubUtils.isGithubRepositoryURI("github.com/something")
      ).toBeTruthy();
      expect(
        githubUtils.isGithubRepositoryURI("http://github.com/something")
      ).toBeTruthy();

      expect(
        githubUtils.isGithubRepositoryURI("http://facebook.com/something")
      ).toBeFalsy();
    });
  });

  describe("getOwnerFromGithubURI", () => {
    it("should get owner from a uri", () => {
      expect(
        githubUtils.getOwnerFromGithubURI("https://github.com/joe/something")
      ).toBe("joe");

      expect(githubUtils.getOwnerFromGithubURI("https://github.com/joe/")).toBe(
        "joe"
      );

      expect(githubUtils.getOwnerFromGithubURI("https://github.com/joe")).toBe(
        "joe"
      );

      expect(() =>
        githubUtils.getOwnerFromGithubURI("https://facebook.com/joe/")
      ).toThrow();

      expect(() =>
        githubUtils.getOwnerFromGithubURI("https://github.com/")
      ).toThrow();
    });
  });

  describe("getRepositoryFromGithubURI", () => {
    it("should get repository from a uri", () => {
      expect(
        githubUtils.getRepositoryFromGithubURI("https://github.com/joe/bird")
      ).toBe("bird");

      expect(
        githubUtils.getRepositoryFromGithubURI(
          "https://github.com/joe/bird/something/something"
        )
      ).toBe("bird");

      expect(
        githubUtils.getRepositoryFromGithubURI("https://github.com/joe/bird/")
      ).toBe("bird");

      expect(() =>
        githubUtils.getRepositoryFromGithubURI("https://facebook.com/joe/")
      ).toThrow();

      expect(() =>
        githubUtils.getRepositoryFromGithubURI("https://github.com/")
      ).toThrow();

      expect(() =>
        githubUtils.getRepositoryFromGithubURI("https://github.com/joe//")
      ).toThrow();
      expect(() =>
        githubUtils.getRepositoryFromGithubURI("https://github.com/joe")
      ).toThrow();
    });
  });
});
