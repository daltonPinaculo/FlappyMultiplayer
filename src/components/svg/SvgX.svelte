<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
	interface Props{
		props?:SVGAttributes<SVGSVGElement>
	}

	let {props}:Props = $props()

</script>

<svg width="10" height="10" viewBox="0 0 10 10" fill="white" {...props} xmlns="http://www.w3.org/2000/svg">
<path d="M4.99999 3.93955L8.71249 0.227051L9.77299 1.28755L6.06049 5.00005L9.77299 8.71255L8.71249 9.77305L4.99999 6.06055L1.28749 9.77305L0.22699 8.71255L3.93949 5.00005L0.22699 1.28755L1.28749 0.227051L4.99999 3.93955Z" />
</svg>
