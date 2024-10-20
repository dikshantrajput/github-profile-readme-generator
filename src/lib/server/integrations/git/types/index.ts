/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IGitUserIntegration {
    getUserProfile(): Promise<any>;
    getUserRepos(): Promise<any>;
    getUserOrgs(): Promise<any>;
}

export interface IGitRepoIntegration {
    getRepos(): Promise<any>;
    getRepoLanguages(owner: string, repo: string): Promise<any>;
}

export interface IGitOrgIntegration {
    getOrg(): Promise<any>;
    getOrgRepos(org: string): Promise<any>;
}
