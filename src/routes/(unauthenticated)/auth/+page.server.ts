import { type Actions, fail, redirect } from '@sveltejs/kit';
import { errorLog, infoLog } from '$lib/server/logger';

export const actions: Actions = {
    signinWithGithubOAuth: async ({ locals, url }) => {
        const supabase = locals?.supabase

        infoLog("Got request to login with github provider")

        const { error: providerSigninError, data } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: url.origin + `/callback`,
                scopes: "read:user user:email read:repo"
            }
        });
        infoLog(JSON.stringify({ providerSigninError, data }))

        if (providerSigninError) {
            const errorObject = { message: providerSigninError?.message, code: 401 };
            errorLog(`Error login user: ${errorObject.message}`, errorObject.code);
            return (fail(errorObject.code, { message: JSON.stringify({ message: errorObject.message }) }))
        }

        if (data.url) {
            infoLog("User redirected to github consent screen")
            throw redirect(303, data.url)
        }
        return (fail(401, { message: JSON.stringify({ message: "Error logging in!!" }) }))
    },
};