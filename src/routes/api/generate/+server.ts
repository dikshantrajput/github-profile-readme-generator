import { createEnhancedUserProfileTemplate } from "$lib/readme-templates/template1";
import GithubIntegrationFactory from "$lib/server/integrations/git/github/github.factory";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const { token } = await request.json();

  if (!token) {
    throw error(500, { id: "UNKNOWN", message: "Token not found" });
  }

  const githubRepoIntegration = (new GithubIntegrationFactory(token))
    .createRepoIntegration();
  const githubUserIntegration = (new GithubIntegrationFactory(token))
    .createUserIntegration();
  const template = await createEnhancedUserProfileTemplate(
    githubUserIntegration,
    githubRepoIntegration,
  );
  return json({ message: "Template generated", template }, { status: 200 });
};
