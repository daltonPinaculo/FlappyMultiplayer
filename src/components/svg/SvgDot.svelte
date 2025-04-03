<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
	interface Props{
		props?:SVGAttributes<SVGSVGElement>
	}

	let {props}:Props = $props()

</script>


<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" {...props} viewBox="0 0 256 256"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"></path></svg>