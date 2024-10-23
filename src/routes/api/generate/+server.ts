import GithubIntegrationFactory from "$lib/server/integrations/git/github/github.factory";
import { templates } from "$lib/templates";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const { token, templateId } = await request.json();

  if (!token || !templateId) {
    throw error(500, { id: "INVALID_PAYLOAD", message: "Token not found" });
  }

  const githubRepoIntegration = (new GithubIntegrationFactory(token))
    .createRepoIntegration();
  const githubUserIntegration = (new GithubIntegrationFactory(token))
    .createUserIntegration();

  const templateGeneratorFn = templates.find((t) => t.id === templateId)?.fn;
  if (!templateGeneratorFn) {
    throw error(500, { id: "INVALID_TEMPLATE", message: "Invalid template" });
  }
  const template = await templateGeneratorFn(
    githubUserIntegration,
    githubRepoIntegration,
  );
  return json({ message: "Template generated", template }, { status: 200 });
};
