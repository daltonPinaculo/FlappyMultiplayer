<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>
    }

    let {props}:Props = $props()
</script>

<svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M5.02493 10.0007L9.33539 14.3112L10.3175 13.3291L6.98911 10.0007L10.3175 6.67228L9.33539 5.69019L5.02493 10.0007ZM8.94845 10.0007L13.2589 14.3112L14.2411 13.3291L10.9127 10.0007L14.2411 6.67228L13.2589 5.69019L8.94845 10.0007Z" fill="#525866"/>
</svg> 