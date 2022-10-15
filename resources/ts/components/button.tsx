import { createElement, MouseEventHandler } from "react";
import clsx from "clsx";

export type ButtonSize = "x-small" | "small" | "medium" | "large" | "x-large";
export type ButtonVariant = "primary" | "secondary" | "white";
export type ButtonShape = "rounded" | "pill" | "circle";

type IconTypeProps = {
    className: string;
    "aria-hidden": boolean;
};

type IconType = (props: IconTypeProps) => JSX.Element;

export type IconPosition = "left" | "right";

export type ButtonProps = {
    text?: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
    shape?: ButtonShape;
    icon?: IconType;
    iconPosition?: IconPosition;
    onClick?: MouseEventHandler;
};

type IconProps = {
    size?: ButtonSize;
    icon?: IconType;
    iconPosition?: IconPosition;
    shape?: ButtonShape;
};

export default ({
    text,
    size = "medium",
    variant = "white",
    shape = "rounded",
    icon,
    iconPosition = "left",
    onClick,
}: ButtonProps): JSX.Element => {
    const className = clsx(
        "inline-flex items-center border",
        "font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" &&
            "bg-primary border-transparent text-white hover:bg-primary/75 focus:ring-primary",
        variant === "secondary" &&
            "bg-primary/25 border-transparent text-primary hover:bg-primary/50 focus:ring-primary",
        variant === "white" &&
            "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary",
        (shape === "pill" || shape === "circle") && "rounded-full",
        shape === "rounded" && size === "x-small" && "rounded px-2.5",
        shape === "pill" && size === "x-small" && "px-3",
        shape === "rounded" && size !== "x-small" && "rounded-md",
        shape === "pill" && size === "small" && "px-3.5",
        shape === "rounded" && size === "small" && "px-3",
        shape === "pill" && size === "large" && "px-5",
        shape === "rounded" && size === "large" && "px-4",
        shape !== "circle" && size === "x-small" && "py-1.5 text-xs",
        shape !== "circle" && size === "small" && "py-2 text-sm leading-4",
        shape !== "circle" && size === "medium" && "px-4 py-2 text-sm",
        shape !== "circle" && size === "large" && "py-2 text-base",
        shape !== "circle" && size === "x-large" && "px-6 py-3 text-base",
        shape === "circle" && size === "x-small" && "p-1",
        shape === "circle" && size === "small" && "p-1.5",
        shape === "circle" && size === "medium" && "p-2",
        shape === "circle" && size === "large" && "p-2.5",
        shape === "circle" && size === "x-large" && "p-3"
    );

    return (
        <button type="button" onClick={onClick} className={className}>
            {icon && iconPosition === "left" && (
                <Icon
                    size={size}
                    icon={icon}
                    iconPosition={iconPosition}
                    shape={shape}
                />
            )}
            {shape !== "circle" && text}
            {icon && iconPosition === "right" && (
                <Icon size={size} icon={icon} iconPosition={iconPosition} />
            )}
        </button>
    );
};

const Icon = ({ size, icon, iconPosition, shape }: IconProps): JSX.Element => {
    const className = clsx(
        shape !== "circle" &&
            (size === "x-small" || size === "small") &&
            "h-4 w-4",
        shape === "circle" &&
            (size === "x-small" || size === "small") &&
            "h-5 w-5",
        shape !== "circle" &&
            (size === "medium" || size === "large" || size === "x-large") &&
            "h-5 w-5",
        shape === "circle" &&
            (size === "medium" || size === "large" || size === "x-large") &&
            "h-6 w-6",
        shape !== "circle" &&
            size === "x-small" &&
            iconPosition === "left" &&
            "-ml-0.5 mr-2",
        shape !== "circle" &&
            size === "x-small" &&
            iconPosition === "right" &&
            "-mr-0.5 ml-2",
        shape !== "circle" &&
            size === "small" &&
            iconPosition === "left" &&
            "mr-2 -ml-1",
        shape !== "circle" &&
            size === "small" &&
            iconPosition === "right" &&
            "ml-2 -mr-1",
        shape !== "circle" &&
            (size === "medium" || size === "large" || size === "x-large") &&
            iconPosition === "left" &&
            "mr-3 -ml-1",
        shape !== "circle" &&
            (size === "medium" || size === "large" || size === "x-large") &&
            iconPosition === "right" &&
            "-mr-1 ml-3"
    );

    return createElement(icon, {
        className,
        "aria-hidden": true,
    });
};
