import { GITHUB_TOKEN } from "$env/static/private";
import { createEnhancedUserProfileTemplate } from "$lib/readme-templates/template1";
import GithubIntegrationFactory from "$lib/server/integrations/git/github/github.factory";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async () => {
  const token = GITHUB_TOKEN
  const githubRepoIntegration = (new GithubIntegrationFactory(token)).createRepoIntegration();
  const githubUserIntegration = (new GithubIntegrationFactory(token)).createUserIntegration();
  const template = await createEnhancedUserProfileTemplate(githubUserIntegration, githubRepoIntegration)
  return json({ message: 'Template generated', template }, { status: 200 });
}