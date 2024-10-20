<script>
    import { marked } from "marked";
    // ... other imports and code ...
    export let markdown;
    $: previewContent = marked(markdown); // Parse markdown to HTML
</script>

<!-- In the preview section -->
<div class="markdown-preview">
    {@html previewContent}
</div>
