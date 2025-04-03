<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
        interface Props{
            props?:SVGAttributes<SVGSVGElement>
        }

    let {props}:Props = $props()

</script>
<svg width="10" height="6" viewBox="0 0 10 6"  fill="#525866" {...props} xmlns="http://www.w3.org/2000/svg">
<path d="M5 3.879L8.71251 0.166504L9.77301 1.227L5 6L0.227005 1.227L1.28751 0.166504L5 3.879Z"/>
</svg>
