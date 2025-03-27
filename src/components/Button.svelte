<script lang="ts">
	import type { Snippet } from "svelte";

    interface Props{
        onClick:VoidFunction,
        children:Snippet
    }
    let {onClick,children}:Props = $props()
</script>



<button class="bg-[url('/gui/button.png')] bg-no-repeat bg-cover relative w-[300px] h-[66px] text-[32px] cursor-pointer text-white" onclick={onClick}>

    {@render children()}

</button>