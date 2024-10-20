import { Octokit } from "@octokit/rest";
import { GitHubOrgIntegration, GitHubRepoIntegration, GithubUserIntegration } from "./github.service";

class GithubIntegrationFactory {
    private octokit: Octokit

    constructor(token: string) {
        this.octokit = new Octokit({ auth: token })
    }

    createUserIntegration() {
        return new GithubUserIntegration(this.octokit)
    }

    createRepoIntegration() {
        return new GitHubRepoIntegration(this.octokit)
    }

    createOrgIntegration() {
        return new GitHubOrgIntegration(this.octokit)
    }
}

export default GithubIntegrationFactory;