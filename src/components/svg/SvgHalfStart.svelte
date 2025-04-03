<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>
    }

    let {props}:Props = $props()
</script>

<svg width="18" height="18" viewBox="0 0 18 18"  fill="#F6B51E" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.75 6.69476L11.5925 5.95497L8.99671 0.25L6.40096 5.95497L0.25 6.69476L4.7975 10.9602L3.58834 17.125L8.99671 14.0526L14.4051 17.125L13.1959 10.9602L17.7434 6.69476H17.75ZM9.00329 12.533V3.43572L10.7119 7.19461L14.7665 7.68113L11.7699 10.4936L12.5651 14.5524L9.00329 12.533Z"/>
</svg>
    