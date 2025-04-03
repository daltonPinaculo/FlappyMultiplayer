<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>
    }

    let {props}:Props = $props()
</script>

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 16.5H13.5V15H10.5V16.5ZM5.25 7.5V9H18.75V7.5H5.25ZM7.5 12.75H16.5V11.25H7.5V12.75Z" fill="#525866"/>
</svg>
    
    