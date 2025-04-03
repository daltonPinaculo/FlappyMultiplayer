<script lang="ts">
	import type { Snippet } from "svelte";

    interface Props{
        onClick:VoidFunction,
        children:Snippet
    }
    let {onClick,children}:Props = $props()
</script>



<button class="gradient relative w-[300px] h-[50px] flex items-center justify-center rounded-lg leading-1 text-[32px] cursor-pointer 
text-white hover:text-slate-950" onclick={onClick}>

    {@render children()}

</button>

<style>
    .gradient{
       background: linear-gradient(to bottom, #fda238 0%, #fd3841 100%);
       transition-duration: 400ms;
       transition: ease-in-out all 300ms;
    }
    .gradient:hover{
        background: white;
    }
</style>