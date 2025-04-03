<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
        
    interface Props{
        props?:SVGAttributes<SVGSVGElement>,
        fillTailwind?:string
    }

    let {props,fillTailwind}:Props = $props()
</script>
<svg xmlns="http://www.w3.org/2000/svg" width="31" height="42" viewBox="0 0 31 42" fill={fillTailwind}>
    <foreignObject x="-8" y="-8" width="34" height="52"><div style="clip-path:url(#bgblur_0_11323_11542_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter0_i_11323_11542)" data-figma-bg-blur-radius="8">
    <path d="M18 32.3513V36H0L0.00434023 33.0701L0 32.3513V7.9932C0 7.64031 0.112846 7.29484 0.323347 6.99886C0.533848 6.70289 0.834408 6.46878 1.18814 6.32574L16.5938 0.0785816C16.6827 0.0424508 16.7771 0.0186936 16.8726 0.00730992C16.941 -0.000609159 17.0104 -0.00209399 17.0799 0.00285544C17.2459 0.014734 17.4065 0.0647232 17.5464 0.147873C17.6853 0.230529 17.8003 0.344366 17.8796 0.478C17.9197 0.546302 17.9512 0.619058 17.9707 0.693795C17.9902 0.765561 18 0.839308 18 0.914044V32.3513Z" fill={fillTailwind} fill-opacity="0.8"/>
    </g>
    <foreignObject x="16" y="4.00002" width="18.2667" height="42.0009"><div  style="clip-path:url(#bgblur_1_11323_11542_clip_path);height:100%;width:100%"></div></foreignObject><path opacity="0.48" data-figma-bg-blur-radius="3.99998" d="M20 27.0667L20.0013 42.001H30.2667V13.3654C30.2664 13.0791 30.1824 12.7991 30.0248 12.5599C29.8668 12.32 29.6419 12.1318 29.3779 12.0187L20 8V27.0667Z" fill={fillTailwind}/>
    <defs>
    <filter id="filter0_i_11323_11542" x="-8" y="-8" width="34" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_11323_11542"/>
    </filter>
    <clipPath id="bgblur_0_11323_11542_clip_path" transform="translate(8 8)"><path d="M18 32.3513V36H0L0.00434023 33.0701L0 32.3513V7.9932C0 7.64031 0.112846 7.29484 0.323347 6.99886C0.533848 6.70289 0.834408 6.46878 1.18814 6.32574L16.5938 0.0785816C16.6827 0.0424508 16.7771 0.0186936 16.8726 0.00730992C16.941 -0.000609159 17.0104 -0.00209399 17.0799 0.00285544C17.2459 0.014734 17.4065 0.0647232 17.5464 0.147873C17.6853 0.230529 17.8003 0.344366 17.8796 0.478C17.9197 0.546302 17.9512 0.619058 17.9707 0.693795C17.9902 0.765561 18 0.839308 18 0.914044V32.3513Z"/>
    </clipPath><clipPath id="bgblur_1_11323_11542_clip_path" transform="translate(-16 -4.00002)"><path d="M20 27.0667L20.0013 42.001H30.2667V13.3654C30.2664 13.0791 30.1824 12.7991 30.0248 12.5599C29.8668 12.32 29.6419 12.1318 29.3779 12.0187L20 8V27.0667Z"/>
    </clipPath></defs>
    </svg>