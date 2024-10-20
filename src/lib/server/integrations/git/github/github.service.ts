/* eslint-disable @typescript-eslint/no-explicit-any */
import { Octokit } from "@octokit/rest";
import type { IGitOrgIntegration, IGitRepoIntegration, IGitUserIntegration } from "../types";

class GithubBaseIntegration {
	protected octokit: Octokit;

	constructor(octokit: Octokit) {
		this.octokit = octokit;
	}
}

class GithubUserIntegration extends GithubBaseIntegration implements IGitUserIntegration {
    async getUserProfile(): Promise<any> {
        try {
            const response = await this.octokit.users.getAuthenticated();
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching user profile: ${String(error)}`);
        }
    }

    async getUserRepos(): Promise<any> {
        try {
            const response = await this.octokit.repos.listForAuthenticatedUser();
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching user repositories: ${String(error)}`);
        }
    }

    async getUserOrgs(): Promise<any> {
        try {
            const response = await this.octokit.orgs.listForAuthenticatedUser();
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching user organizations: ${String(error)}`);
        }
    }

    // New Method: Get Recent Activity
	async getRecentActivity(): Promise<any> {
		try {
			// Using the correct method to fetch the authenticated user's events
			const response = await this.octokit.activity.listPublicEvents();
			return response.data;
		} catch (error) {
			throw new Error(`Error fetching recent activity: ${String(error)}`);
		}
	}
	

    // New Method: Get Contributions (optional)
    async getContributions(): Promise<any> {
        try {
            const response = await this.octokit.activity.listReposStarredByAuthenticatedUser();
            return response.data; // Modify this according to your needs to summarize contributions
        } catch (error) {
            throw new Error(`Error fetching contributions: ${String(error)}`);
        }
    }
}


class GitHubRepoIntegration extends GithubBaseIntegration implements IGitRepoIntegration {
	async getRepos(): Promise<any> {
		try {
			const response = await this.octokit.repos.listForAuthenticatedUser({ affiliation: 'owner', per_page: 100, sort: "updated", direction: "desc" });
			return response.data;
		} catch (error) {
			throw new Error(`Error fetching repositories where user is owner: ${String(error)}`);
		}
	}

	async getRepoLanguages(repo: string, owner: string): Promise<any> {
		try {
			const response = await this.octokit.repos.listLanguages({owner, repo});
			return response.data;
		} catch (error) {
			throw new Error(`Error fetching repositories where user is owner: ${String(error)}`);
		}
	}
}

class GitHubOrgIntegration extends GithubBaseIntegration implements IGitOrgIntegration {
	async getOrg(): Promise<any> {
		try {
			const response = await this.octokit.orgs.listForAuthenticatedUser();
			return response.data;
		} catch (error) {
			throw new Error(`Error fetching user organizations: ${String(error)}`);
		}
	}

	async getOrgRepos(org: string): Promise<any> {
		try {
			const response = await this.octokit.repos.listForOrg({ org });
			return response.data;
		} catch (error) {
			throw new Error(`Error fetching organization repositories: ${String(error)}`);
		}
	}
}

export { GithubUserIntegration, GitHubRepoIntegration, GitHubOrgIntegration };
