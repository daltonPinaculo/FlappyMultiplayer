<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>
        cor?: string;
    }

    let {props, cor = "#525866"}:Props = $props()
</script>

<svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M8.50005 12.3791L15.3941 5.48438L16.4553 6.54488L8.50005 14.5001L3.72705 9.72712L4.78755 8.66663L8.50005 12.3791Z" fill={cor}/>
</svg>