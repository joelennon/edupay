import clsx from "clsx";

import { getInitialsFromName } from "../helpers/string";

export type AvatarSize = 6 | 8 | 10 | 12 | 14;
export type AvatarShape = "circle" | "rounded";

export type AvatarProps = {
    size?: AvatarSize;
    shape?: AvatarShape;
    src?: string;
    name?: string;
    className?: string;
};

type PlaceholderInitialsProps = {
    size: AvatarSize;
    shape: AvatarShape;
    name: string;
    className?: string;
};

type PlaceholderIconProps = {
    size: AvatarSize;
    shape: AvatarShape;
    className?: string;
};

export default ({
    size = 10,
    shape = "circle",
    src,
    name,
    className,
}: AvatarProps): JSX.Element => {
    if (src) {
        return (
            <Image
                size={size}
                shape={shape}
                src={src}
                name={name}
                className={className}
            />
        );
    }

    if (name) {
        return (
            <PlaceholderInitials
                size={size}
                shape={shape}
                name={name}
                className={className}
            />
        );
    }

    return <PlaceholderIcon size={size} shape={shape} className={className} />;
};

const Image = ({
    size,
    shape,
    src,
    name,
    className: cls,
}: AvatarProps): JSX.Element => {
    const className = clsx(
        "inline-block",
        getSizeClassName(size),
        getShapeClassName(shape),
        cls
    );
    const alt: string = `Avatar of ${name ?? "Unknown"}`;

    return <img className={className} src={src} alt={alt} />;
};

const PlaceholderInitials = ({
    size,
    shape,
    name,
    className: cls,
}: PlaceholderInitialsProps): JSX.Element => {
    const className: string = clsx(
        "inline-flex items-center justify-center bg-gray-500",
        getSizeClassName(size),
        getShapeClassName(shape),
        cls
    );
    const innerClassName: string = clsx(
        "font-medium leading-none text-white",
        getTextSizeClassName(size)
    );
    const initials: string = getInitialsFromName(name);

    return (
        <span className={className}>
            <span className={innerClassName}>{initials}</span>
        </span>
    );
};

const PlaceholderIcon = ({
    size,
    shape,
    className: cls,
}: PlaceholderIconProps): JSX.Element => {
    const className: string = clsx(
        "inline-block overflow-hidden bg-gray-100",
        getSizeClassName(size),
        getShapeClassName(shape),
        cls
    );

    return (
        <span className={className}>
            <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        </span>
    );
};

const getSizeClassName = (size: AvatarSize): string =>
    clsx(
        size === 6 && "h-6 w-6",
        size === 8 && "h-8 w-8",
        size === 10 && "h-10 w-10",
        size === 12 && "h-12 w-12",
        size === 14 && "h-14 w-14"
    );

const getTextSizeClassName = (size: AvatarSize): string =>
    clsx(
        size === 6 && "text-xs",
        size === 8 && "text-sm",
        size === 12 && "text-lg",
        size === 14 && "text-xl"
    );

const getShapeClassName = (shape: AvatarShape): string =>
    clsx(
        shape === "circle" && "rounded-full",
        shape === "rounded" && "rounded-md"
    );
