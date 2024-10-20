import { writable, type Writable } from "svelte/store";

export const githubTokenStore: Writable<string | undefined> = writable(undefined);
