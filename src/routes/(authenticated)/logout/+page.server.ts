import { infoLog, errorLog } from "$lib/server/logger";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ locals }) => {
        const { session } = await locals.safeGetSession();
        infoLog("Got request to signOut user: " + locals?.user?.id);

        if (session) {
            const { error } = await locals.supabase.auth.signOut();

            if (error) {
                const errorObject = { message: error?.message, code: 401 };
                errorLog(
                    `Error login user: ${errorObject.message}`,
                    errorObject.code,
                );
                return (fail(errorObject.code, {
                    message: JSON.stringify({ message: errorObject.message }),
                }));
            }
        }
        redirect(303, "/app");
    },
};
