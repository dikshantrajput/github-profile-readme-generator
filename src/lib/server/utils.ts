/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import {
    createBrowserClient,
    createServerClient,
} from "@supabase/ssr";
import {
    createClient,
    type Session,
    type SupabaseClient,
    type SupabaseClientOptions,
} from "@supabase/supabase-js";
import type { Cookies } from "@sveltejs/kit";

const SupabaseDatabaseConfig: SupabaseClientOptions<"private"> = {
    db: {
        schema: "private",
    },
};

type SessionWithoutUserInterface = Omit<Session, "user">;

export const refreshToken = async (
    supabase: SupabaseClient,
    previousSession: SessionWithoutUserInterface | null,
) => {
    const { data: { session }, error: refreshTokenError } = await supabase.auth
        .refreshSession(previousSession ?? undefined);
    if (refreshTokenError || !session) return;

    await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
    });
};

export const getSupabaseServerClient = (cookies: Cookies): SupabaseClient => {
    return createServerClient(
        PUBLIC_SUPABASE_URL!,
        PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookies.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookies.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    );
};

export const getSupabaseBrowserClient = (): SupabaseClient => {
    return createBrowserClient(
        PUBLIC_SUPABASE_URL!,
        PUBLIC_SUPABASE_ANON_KEY!,
    );
};

export const supabasePublicInstance = createClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    SupabaseDatabaseConfig,
);
export const supabasePublicAuthInstance = createClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    SupabaseDatabaseConfig,
).auth;
