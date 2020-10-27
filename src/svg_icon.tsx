import React from 'react'


type SVGIconProps = {
    d: string,
    width?: number,
    height?: number,
    fill?: string,
    stroke?: string,
    fillRule?: 'evenodd' | 'nonzero' | 'inherit',
    clipRule?: 'evenodd' | 'nonzero' | 'inherit',
    strokeLinecap?: 'inherit' | 'round' | 'butt' | 'square',
    strokeLinejoin?: 'inherit' | 'round' | 'miter' | 'bevel',
    strokeWidth?: number,
}
export default ({ d, width = 24, height = 24, fill = 'none', stroke = 'currentColor', strokeLinecap = 'round', strokeLinejoin = 'round', strokeWidth = 1, fillRule = 'evenodd', clipRule = 'evenodd' }: SVGIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
    >
        <path
            d={d}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin}
            strokeWidth={strokeWidth}
            fillRule={fillRule}
            clipRule={clipRule}
        ></path>
    </svg>
)