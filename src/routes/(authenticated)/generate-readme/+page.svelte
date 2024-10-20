<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { githubTokenStore } from "$lib/stores/githubToken";
    import { marked } from "marked";
    import { scale } from "svelte/transition";

    export let markdown = ``;

    const generateTemplate = async () => {
        if (!$githubTokenStore) {
            alert("Token not found");
            return;
        }

        isGenerating = true;
        const response = await fetch(
            `/api/generate`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: $githubTokenStore }),
            },
        );

        if(!response.ok){
            alert((await response.json())?.message)
        }else{
            const templateResponse = (await response.json()) as {
                message: string;
                template: string;
            };
    
            markdown = templateResponse.template;
        }


        isGenerating = false;
    };

    let isEditing = false;
    let isGenerating = false,
        isCopying = false;
    let previewContent;
    $: editableContent = markdown;

    function toggleEdit() {
        isEditing = !isEditing;
        if (!isEditing) {
            markdown = editableContent;
        }
    }

    async function copyToClipboard() {
        try {
            isCopying = true;
            await navigator.clipboard.writeText(markdown);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            isCopying = false;
        } catch (err) {
            alert("Failed to copy to clipboard");
        }
    }

    marked.setOptions({
        gfm: true, // GitHub Flavored Markdown
        breaks: true, // Convert \n to <br>
    });

    // Parse markdown whenever content changes
    $: previewContent = marked(markdown);
</script>

{#if $githubTokenStore}
    <Button
        loading={isGenerating}
        disabled={isGenerating}
        on:click={generateTemplate}>Generate Profile Readme</Button
    >
{:else}
    No token found. please logout and login
{/if}
{#if markdown}
    <div class="w-full max-w-[1200px] mx-auto" in:scale>
        <!-- Controls -->
        <div
            class="flex justify-between items-center mb-4 p-4 bg-background-light rounded-t-lg border border-background-dark border-b-0"
        >
            <div class="flex gap-2">
                <Button variant="primary" on:click={toggleEdit}>
                    {isEditing ? "Preview" : "Edit"}
                </Button>
                <Button
                    variant="secondary"
                    loading={isCopying}
                    disabled={isCopying}
                    on:click={copyToClipboard}>Copy Markdown</Button
                >
            </div>
            <div class="text-text-muted">
                {isEditing ? "Editing Mode" : "Preview Mode"}
            </div>
        </div>

        <!-- Content container -->
        <div class="border border-background-dark rounded-b-lg">
            {#if isEditing}
                <textarea
                    bind:value={editableContent}
                    class="w-full min-h-[800px] p-6 font-mono text-text bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary rounded-b-lg"
                    spellcheck="false"
                ></textarea>
            {:else}
                <div
                    class="markdown-body w-full p-6 overflow-y-auto bg-background rounded-b-lg"
                >
                    {@html previewContent}
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    /* GitHub Markdown Styles */
    :global(.markdown-body h2) {
        padding-bottom: 0.3em;
        font-size: 1.5em;
        border-bottom: 1px solid var(--color-background-dark);
        display: inline-block; /* Ensures h2 behaves inline when necessary */
        text-align: center; /* Center the content of h2 */
        width: 100%;
    }

    :global(.markdown-body h2 img) {
        display: inline-block; /* Ensures images inside headings are inline */
        vertical-align: middle; /* Align image with text */
    }

    :global(.markdown-body img) {
        display: inline-block; /* Ensure general images behave inline */
        vertical-align: middle; /* Align images properly with surrounding text */
        max-width: 100%; /* Maintain image responsiveness */
    }
</style>
