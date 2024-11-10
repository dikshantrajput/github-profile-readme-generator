import { redirect } from "@sveltejs/kit";
import { errorLog } from "$lib/server/logger";
import type { PageServerLoad } from "./$types";
import { refreshToken } from "$lib/server/utils";

export const load: PageServerLoad = async ({ url, locals }) => {
    const code = url.searchParams.get("code");
    if (code) {
        const { data, error } = await locals.supabase.auth
            .exchangeCodeForSession(code);
        if (!error) {
            const githubProvider = (data.user.identities || []).find(
                (identity) => identity?.provider === "github",
            );
            const currentSessionProviderId = data.session.user.user_metadata
                ?.provider_id;
            const providerToken = data.session.provider_token;

            if (currentSessionProviderId === githubProvider?.id) {
                if (providerToken) {
                    const { error } = await locals.supabase.auth.updateUser({
                        data: {
                            provider_token: providerToken,
                        },
                    });

                    if (error) {
                        errorLog(
                            `Error setting provider token: ${String(error)}`,
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

            await refreshToken(locals.supabase, data.session);
            throw redirect(303, "/generate-readme");
        }else{
            errorLog(
                `Error setting provider token: ${String(error)}`,
                500,
            );
        }
    }
    throw redirect(303, "/app");
};
