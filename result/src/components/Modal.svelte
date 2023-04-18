<script>

    import {fade} from 'svelte/transition'

export let showModal;
</script>

{#if showModal}
<div on:click|self transition:fade class="back-drop">
    <div class="mainModal p-2">
        <slot></slot>
    </div>
</div>
{/if}

<style>
    .back-drop{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        position: absolute;
    }

    .mainModal{
        max-width: 400px;
        margin: 10% auto;
        background: white;
        /* padding: 2px; */
        border-radius: 10px;
    }
</style>