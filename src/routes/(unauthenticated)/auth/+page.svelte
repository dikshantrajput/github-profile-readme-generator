<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import type { SubmitFunction } from "@sveltejs/kit";

    let showEmailConfirmationCard = false;

    let isSigningIn = false;
    const handleSignIn: SubmitFunction = () => {
        isSigningIn = true;

        return ({ update }) => {
            isSigningIn = false;
            update();
        };
    };
</script>

<main class="flex flex-col items-center justify-center text-text-muted m-4">
    <div
        class="w-full bg-background-dark rounded-lg shadow-lg p-4 sm:p-8 mx-4 sm:mx-0"
        class:hidden={showEmailConfirmationCard}
    >
        <div class="mb-6">
            <h2
                class="text-2xl sm:text-3xl font-bold mb-2 text-center text-white"
            >
                Github readme generator
            </h2>
            <p class="text-center text-text text-xs sm:text-sm">
                Generate dynamic and visually appealing README profiles for
                GitHub
            </p>
        </div>
        <div class="flex justify-center">
            <form
                action="?/signinWithGithubOAuth"
                method="post"
                use:enhance={handleSignIn}
            >
                <Button
                    type="submit"
                    disabled={isSigningIn}
                    loading={isSigningIn}
                    variant="primary"
                >
                    Sign-in with Github</Button
                >
            </form>
        </div>
    </div>
</main>

<style>
    .perspective-1000 {
        perspective: 1000px;
    }

    .transform-style-preserve-3d {
        transform-style: preserve-3d;
    }

    .backface-hidden {
        backface-visibility: hidden;
    }

    .rotate-y-180 {
        transform: rotateY(180deg);
    }

    .hidden {
        display: none;
    }
</style>
