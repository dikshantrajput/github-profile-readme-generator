<script lang="ts">
  import { slide, fade, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import type { GithubTemplateInterface } from "$lib/types/core";
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";

  const eventDispatchers = createEventDispatcher<{
    select: {
      id: number;
    };
  }>();
  export let show = false, isGenerating = false;

  export let templates: GithubTemplateInterface[] = [];

  let selectedTemplate: GithubTemplateInterface | undefined = undefined;
  // let previewTemplate: GithubTemplateInterface | undefined = undefined;

  function handleSelect(template: GithubTemplateInterface) {
    selectedTemplate = template;
  }

  function handleConfirm() {
    if (!selectedTemplate) {
      alert("No template selected");
      return;
    }
    eventDispatchers("select", { id: selectedTemplate.id });
  }
</script>

{#if show}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/50 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
  >
    <div
      class="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-background rounded-xl shadow-xl"
      transition:scale={{ duration: 200, easing: quintOut }}
    >
      <!-- Header -->
      <div class="p-6 border-b border-background-dark">
        <h2 class="text-2xl font-semibold text-text">
          Choose a README Template
        </h2>
        <p class="mt-1 text-text-muted">
          Select a template to kickstart your GitHub README
        </p>
        <button
          class="absolute top-4 right-4 p-2 rounded-lg hover:bg-background-dark transition-colors"
          on:click={() => (show = false)}
        >
          <svg
            class="w-6 h-6 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="flex flex-col lg:flex-row">
        <!-- Template Grid -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)] lg:w-3/3">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {#each templates as template (template.id)}
              <button
                class="group relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md
                    {selectedTemplate?.id === template.id
                  ? 'border-primary bg-primary/5'
                  : 'border-background-dark hover:border-primary/50 hover:bg-background-light'}"
                on:click={() => handleSelect(template)}
                transition:slide|local={{ duration: 200 }}
              >
                <div class="flex items-start space-x-3">
                  <span class="text-2xl">{template.icon}</span>
                  <div class="flex-1">
                    <h3 class="font-medium text-text text-left">
                      {template.title}
                    </h3>
                    <p class="text-sm text-text-muted text-left line-clamp-3">
                      {template.description}
                    </p>
                  </div>
                </div>
                <div
                  class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                />
              </button>
            {/each}
          </div>
        </div>

        <!-- Preview Panel -->
        <!-- <div class="hidden lg:hidden w-1/3 p-6 border-l border-background-dark">
          <div class="sticky top-6">
            <h3 class="text-lg font-medium text-text mb-3">Preview</h3>
            {#if previewTemplate}
              <div
                class="font-mono text-sm bg-background-light rounded-lg p-4 overflow-x-auto"
                transition:fade={{ duration: 150 }}
              >
                <pre
                  class="text-text-dark whitespace-pre-wrap">{previewTemplate.preview}</pre>
              </div>
            {:else}
              <p class="text-text-muted text-sm">
                Hover over a template to see its preview
              </p>
            {/if}
          </div>
        </div> -->
      </div>
      <div class="p-4 w-full text-right">
        <Button loading={isGenerating} on:click={handleConfirm}>Generate</Button>
      </div>
    </div>
  </div>
{/if}
