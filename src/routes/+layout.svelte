<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { theme } from "$lib/stores/theme";
  import { ThemesEnum } from "$lib/types/core";
  import { THEME_LOCALSTORAGE_KEY } from "$lib/constants";
  import { invalidate } from "$app/navigation";
  import { githubTokenStore } from "$lib/stores/githubToken";
  import { loggedInUserStore } from "$lib/stores/loggedInUser";
  
  onMount(() => {
    const savedTheme = localStorage.getItem(
      THEME_LOCALSTORAGE_KEY,
    ) as ThemesEnum;
    if (savedTheme) {
      theme.set(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme.set(ThemesEnum.DARK);
    }
  });

  export let data;

  $: if (data.user?.user_metadata?.provider_token) {
    githubTokenStore.set(data.user.user_metadata.provider_token);
  }

  $: if (data.user) {
    loggedInUserStore.set(data.user);
  }

  $: ({ session, supabase } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<div class="min-h-screen bg-background text-text">
  <slot />
</div>
