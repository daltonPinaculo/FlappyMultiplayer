<script lang="ts">
	import type { Snippet } from "svelte";

    interface Props{
        onClick:VoidFunction,
    }
    let {onClick}:Props = $props()
</script>



<button class=" relative flex items-center justify-center w-[100px] h-[66px] text-[32px] cursor-pointer text-white" onclick={onClick}>
    <img src="/gui/play.png" alt="arrow" class="z-10 w-6 rotate-[180deg]"/>
</button>