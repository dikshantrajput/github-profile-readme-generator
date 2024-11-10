/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUrlPathnameWithSearchParams } from "$lib/helpers";
import { errorLog } from "$lib/server/logger";
import { getSupabaseServerClient } from "$lib/server/utils";
import type { SupabaseClient } from "@supabase/supabase-js";
import { type Handle, type HandleServerError, redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const getSafeSession = (supabaseClient: SupabaseClient) => async () => {
  /**
   * Unlike `supabase.auth.getSession()`, which returns the session _without_
   * validating the JWT, this function also calls `getUser()` to validate the
   * JWT before returning the session.
   */
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) return { session: null, user: null };

  const { data: { user }, error } = await supabaseClient.auth.getUser();
  if (error) return { session: null, user: null };

  // removing the user from session as we are first of all not using at and second it is not secure to use it, third was getting a warning in console
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user: _, ...sessionWithoutUser } = session;

  return { session: sessionWithoutUser, user };
};

const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = getSupabaseServerClient(event?.cookies);
  event.locals.safeGetSession = getSafeSession(event?.locals?.supabase);

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return ["content-range", "x-supabase-api-version"].includes(name);
    },
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;

  const authenticatedRoutesId = "/(authenticated)",
    unAuthenticatedRoutesId = "/(unauthenticated)";
  const isAuthenticatedRoute = event?.route?.id?.startsWith(
    authenticatedRoutesId,
  );
  const isUnauthenticatedRoute = event?.route?.id?.startsWith(
    unAuthenticatedRoutesId,
  );
  const isAccessingRootRoute = event?.url?.pathname === "/";

  if (!session && (isAuthenticatedRoute || isAccessingRootRoute)) {
    const redirectToUrl = getUrlPathnameWithSearchParams(event?.url);
    throw redirect(
      303,
      `app?redirect_to=${
        redirectToUrl !== "/" ? redirectToUrl : "/generate-readme"
      }`,
    );
  }

  if (session && isUnauthenticatedRoute) {
    throw redirect(303, "/generate-readme");
  }

  if (session && isAccessingRootRoute) {
    throw redirect(303, "/generate-readme");
  }

  return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);

export const handleError: HandleServerError = async ({ error }) => {
  const errorId = crypto.randomUUID();
  errorLog("Unexpected error", 500, JSON.stringify(error));
  // do not return sensitive data here as it will be sent to the client
  return {
    id: errorId,
    message: (error as any)?.message ? (error as any)?.message : String(error),
  };
};
