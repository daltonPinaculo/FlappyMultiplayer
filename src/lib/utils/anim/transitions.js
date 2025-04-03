import { circInOut, cubicOut } from "svelte/easing";

export function slidefade(node) {
    const existingTransform = getComputedStyle(node).transform.replace('none', '');
    return {
        delay: 0,
        duration: 700,
        easing: cubicOut,
        css: (t, u) => `transform-origin: bottom left; transform: ${existingTransform} scaleY(${t}); opacity: ${t};`
    };
}

export  function flySlide(node,{ delay = 0,easing=circInOut, duration = 400, axis = 'y',x = 1500, y = 0 } = {}){
    const style = getComputedStyle(node);

    const primary_property = axis === 'y' ? 'height' : 'width';
    const primary_property_value = parseFloat(style[primary_property]);
    const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
    const capitalized_secondary_properties = secondary_properties.map(
        (e) => /** @type {'Left' | 'Right' | 'Top' | 'Bottom'} */ (`${e[0].toUpperCase()}${e.slice(1)}`)
    );
    const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
    const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
    const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
    const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
    const border_width_start_value = parseFloat(
        style[`border${capitalized_secondary_properties[0]}Width`]
    );
    const border_width_end_value = parseFloat(
        style[`border${capitalized_secondary_properties[1]}Width`]
    );
    return {
        duration,
        easing,
        css: (t, u) => `
        overflow:hidden;
        opacity:${(t*1)};
        transform: translate(${u*x}px,${u*y}px);	
        ${primary_property}: ${t * primary_property_value}px;
        padding-${secondary_properties[0]}: ${t * padding_start_value}px;
        padding-${secondary_properties[1]}: ${t * padding_end_value}px;
        margin-${secondary_properties[0]}: ${t * margin_start_value}px;
        margin-${secondary_properties[1]}: ${t * margin_end_value}px;
        border-${secondary_properties[0]}-width: ${Math.round(t * border_width_start_value)}px;
        border-${secondary_properties[1]}-width: ${Math.round(t * border_width_end_value)}px;`
    }
}