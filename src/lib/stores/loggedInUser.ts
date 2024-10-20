import type { User } from "@supabase/supabase-js";
import { writable, type Writable } from "svelte/store";

export const loggedInUserStore: Writable<User | undefined> = writable(undefined);
