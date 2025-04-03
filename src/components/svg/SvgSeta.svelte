<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>
    }

    let {props}:Props = $props()
</script>

<svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4Z" fill="#F5F7FA"/>
    <path d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4Z" stroke="#E1E4EA"/>
    <path d="M10.6001 7.49675V14.8H9.40005V7.49675L6.18165 10.7152L5.33325 9.86675L10.0001 5.19995L14.6669 9.86675L13.8185 10.7152L10.6001 7.49675Z" fill="#525866"/>
</svg> 