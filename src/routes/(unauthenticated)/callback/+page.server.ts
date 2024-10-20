import { redirect } from "@sveltejs/kit";
import { errorLog } from "$lib/server/logger";
import type { PageServerLoad } from "./$types";
import { refreshToken } from "$lib/server/utils";

export const load: PageServerLoad = async ({ url, locals }) => {
    const code = url.searchParams.get("code");
    if (code) {
        // NOTE: locals supabase is required here since if we use the browser instance or create new server instance, we will get the error: both auth code and code verifier should be non-empty
        // https://github.com/supabase/auth-helpers/issues/545#issuecomment-1553296138
        const { data, error } = await locals.supabase.auth
            .exchangeCodeForSession(code);
        if (!error) {
            // after successful login, get the login provider and fetch and keep everything in db
            const githubProvider = (data.user.identities || []).find(
                (identity) => identity?.provider === "github"
            );
            const currentSessionProviderId = data.session.user.user_metadata
                ?.provider_id;
            const providerToken = data.session.provider_token;

            if (currentSessionProviderId === githubProvider?.id) {
                if (providerToken) {
                    try {
                        await locals.supabase.auth.updateUser({
                            data: {
                                provider_token: providerToken
                            }
                        })
                    } catch (error) {
                        errorLog(
                            `Error setting provider token: ${
                                String(error)
                            }`,
                            404,
                            {
                                userId: data.user.id,
                            },
                        );
                    }
                } else {
                    errorLog("No github token found", 404, {
                        userId: data.user.id,
                    });
                }
            }

            // refresh the session
            await refreshToken(locals.supabase, data.session);
            throw redirect(303, "/");
        }
    }
    throw redirect(303, "/auth");
};
