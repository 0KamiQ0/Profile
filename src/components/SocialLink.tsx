import Icon from "./Icon";

type SocialLinkProps = {
    href: string;
    icon: string;
    size?: number;
    color?: string;
    className?: string;
}

export default function SocialLink({href, icon, size, color, className}: SocialLinkProps) {
    return (
        <a className={`socialLink ${className || ""}`} href={href} target="_blank" rel="noreferrer">
            <Icon path={icon} size={size} color={color} />
        </a>
    );
}