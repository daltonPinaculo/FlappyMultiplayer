<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>
    }

    let {props}:Props = $props()
</script>

<svg width="44" height="44" viewBox="0 0 44 44" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_11290_3117)">
    <path d="M2 21C2 9.95431 10.9543 1 22 1C33.0457 1 42 9.95431 42 21C42 32.0457 33.0457 41 22 41C10.9543 41 2 32.0457 2 21Z" fill="white"/>
    <path d="M2.5 21C2.5 10.2304 11.2304 1.5 22 1.5C32.7696 1.5 41.5 10.2304 41.5 21C41.5 31.7696 32.7696 40.5 22 40.5C11.2304 40.5 2.5 31.7696 2.5 21Z" stroke="#E1E4EA"/>
    <path d="M23.5 22.689V24.2565C22.8212 24.0165 22.0947 23.9429 21.3816 24.0418C20.6684 24.1408 19.9894 24.4094 19.4016 24.8252C18.8137 25.2409 18.3343 25.7916 18.0034 26.4311C17.6725 27.0705 17.4999 27.78 17.5 28.5L16 28.4993C15.9998 27.5834 16.2092 26.6797 16.6122 25.8573C17.0153 25.0349 17.6012 24.3157 18.3252 23.7548C19.0491 23.1939 19.8919 22.8061 20.7889 22.6212C21.6858 22.4364 22.6132 22.4593 23.5 22.6883V22.689ZM22 21.75C19.5138 21.75 17.5 19.7363 17.5 17.25C17.5 14.7638 19.5138 12.75 22 12.75C24.4863 12.75 26.5 14.7638 26.5 17.25C26.5 19.7363 24.4863 21.75 22 21.75ZM22 20.25C23.6575 20.25 25 18.9075 25 17.25C25 15.5925 23.6575 14.25 22 14.25C20.3425 14.25 19 15.5925 19 17.25C19 18.9075 20.3425 20.25 22 20.25ZM26.3448 26.9355L28.996 24.2843L30.0573 25.3448L26.3448 29.0573L23.6928 26.4053L24.754 25.3448L26.344 26.9355H26.3448Z" fill="#525866"/>
    </g>
    <defs>
    <filter id="filter0_d_11290_3117" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="1"/>
    <feGaussianBlur stdDeviation="1"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.0392157 0 0 0 0 0.0509804 0 0 0 0 0.0784314 0 0 0 0.03 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11290_3117"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11290_3117" result="shape"/>
    </filter>
    </defs>
</svg>
    