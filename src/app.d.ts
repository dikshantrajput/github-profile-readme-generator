/* eslint-disable @typescript-eslint/no-explicit-any */
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Database } from "@entities/supabase/interfaces";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

// and what to do when importing types
declare global {
	namespace App {
		type SessionWithoutUserInterface = Omit<Session, 'user'>

		interface Locals {
			userid: string;
			supabase: SupabaseClient<Database>;
			safeGetSession(): Promise<{ session: SessionWithoutUserInterface | null; user: User | null }>;
			session: SessionWithoutUserInterface | null;
      		user: User | null;
		}

		// interface Platform {}

		interface Error {
			// can be UNKNOWN or a UUID depending on whether it's an api error or not
			id: string;
			code?: string;
			message: string;
			error?: any;
		}
	}

	// https://github.com/isaacHagoel/svelte-dnd-action/issues/458
	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			"on:consider"?: (
				event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }
			) => void;
			"on:finalize"?: (
				event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }
			) => void;
		}
	}
}
export {};
