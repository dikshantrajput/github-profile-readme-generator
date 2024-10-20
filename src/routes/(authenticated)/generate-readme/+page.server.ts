// import * as Sentry from "@sentry/sveltekit";
import { infoLog } from "$lib/server/logger";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    logout: async ({ locals: { supabase, safeGetSession } }) => {
    const { user, session } = await safeGetSession()
    if (session && user) {
      await supabase.auth.signOut()
      infoLog(`User logged out`, { userId: user.id })
    }
  },
}
