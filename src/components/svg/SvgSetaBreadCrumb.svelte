<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>
    }

    let {props}:Props = $props()
</script>

<svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M6.871 9.24952H16V10.7495H6.871L10.894 14.7725L9.8335 15.833L4 9.99952L9.8335 4.16602L10.894 5.22652L6.871 9.24952Z" fill="#FDFFFF"/>
</svg>  