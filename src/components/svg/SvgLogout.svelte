<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>
    }

    let {props}:Props = $props()
</script>

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M6.75 19.5C6.55109 19.5 6.36032 19.421 6.21967 19.2803C6.07902 19.1397 6 18.9489 6 18.75V5.25C6 5.05109 6.07902 4.86032 6.21967 4.71967C6.36032 4.57902 6.55109 4.5 6.75 4.5H17.25C17.4489 4.5 17.6397 4.57902 17.7803 4.71967C17.921 4.86032 18 5.05109 18 5.25V7.5H16.5V6H7.5V18H16.5V16.5H18V18.75C18 18.9489 17.921 19.1397 17.7803 19.2803C17.6397 19.421 17.4489 19.5 17.25 19.5H6.75ZM16.5 15V12.75H11.25V11.25H16.5V9L20.25 12L16.5 15Z"/>
</svg>