type IconProps = {
    path: string;
    size?: number;
    color?: string;
}

export default function Icon({path, size = 24, color = "#000000"}: IconProps) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
            <path d={path}/>
        </svg>
    );
}