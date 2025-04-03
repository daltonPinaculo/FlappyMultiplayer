<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>
    }

    let {props}:Props = $props()
</script>

<svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M9.20431 9.99932L12.9168 13.7118L11.8563 14.7723L7.08331 9.99932L11.8563 5.22632L12.9168 6.28682L9.20431 9.99932Z" fill="#525866"/>
</svg> 