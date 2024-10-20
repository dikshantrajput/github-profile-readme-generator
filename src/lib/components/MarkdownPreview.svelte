<script>
    import { marked } from "marked";
    export let markdown;
    $: previewContent = marked(markdown);
</script>

<!-- In the preview section -->
<div class="markdown-preview">
    {@html previewContent}
</div>
