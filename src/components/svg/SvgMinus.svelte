
<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
	interface Props{
		props?:SVGAttributes<SVGSVGElement>
	}

	let {props}:Props = $props()

</script>

<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" {...props} viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path></svg>