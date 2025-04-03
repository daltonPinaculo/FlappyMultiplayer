<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>
    }

    let {props}:Props = $props()
</script>

<svg width="16" height="16" viewBox="0 0 16 16"  fill="#FB3748" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M8 15.5C3.85775 15.5 0.5 12.1422 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1422 0.5 15.5 3.85775 15.5 8C15.5 12.1422 12.1422 15.5 8 15.5ZM5.39225 4.33175C4.98255 4.62394 4.6244 4.98234 4.3325 5.39225L10.6085 11.6683C11.0185 11.3761 11.3769 11.0177 11.669 10.6078L5.39225 4.33175Z"/>
</svg>
    