<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
	interface Props{
		props?:SVGAttributes<SVGSVGElement>
	}

	let {props}:Props = $props()

</script>


<svg width="10" height="8" viewBox="0 0 10 8" fill="white" {...props} xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.53032 2.03039L4 7.56072L0.469666 4.03039L1.53033 2.96973L4 5.4394L8.46967 0.969727L9.53032 2.03039Z" />
</svg>
