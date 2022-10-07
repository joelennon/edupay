import clsx from "clsx";

import { Color } from "../types/styles";

type BadgeSize = "normal" | "large";
type BadgeShape = "circle" | "rounded";

type BadgeProps = {
    text: string;
    color?: Color;
    size?: BadgeSize;
    shape?: BadgeShape;
    dot?: boolean;
    onRemove?: () => void;
};

export default ({
    text,
    color = "gray",
    size = "normal",
    shape = "circle",
    dot = false,
    onRemove,
}: BadgeProps): JSX.Element => {
    const className: string = clsx(
        "inline-flex items-center font-medium",
        shape === "circle" && "rounded-full",
        shape === "rounded" && "rounded",
        size === "normal" && !onRemove && "px-2.5 py-0.5 text-xs",
        size === "large" && !onRemove && "px-3 py-0.5 text-sm",
        size === "normal" && onRemove && "pl-2 pr-0.5 py-0.5 text-xs",
        size === "large" && onRemove && "pl-2.5 pr-1 py-0.5 text-sm",
        color === "gray" && "bg-gray-100 text-gray-800",
        color === "red" && "bg-red-100 text-red-800",
        color === "yellow" && "bg-yellow-100 text-yellow-800",
        color === "green" && "bg-green-100 text-green-800",
        color === "blue" && "bg-blue-100 text-blue-800",
        color === "indigo" && "bg-indigo-100 text-indigo-800",
        color === "purple" && "bg-purple-100 text-purple-800",
        color === "pink" && "bg-pink-100 text-pink-800"
    );

    return (
        <span className={className}>
            {dot && <Dot color={color} />}
            {text}
            {onRemove && (
                <RemoveButton text={text} color={color} onClick={onRemove} />
            )}
        </span>
    );
};

type DotProps = {
    color: Color;
};

const Dot = ({ color = "gray" }: DotProps): JSX.Element => {
    const className: string = clsx(
        "-ml-0.5 mr-1.5 h-2 w-2",
        color === "gray" && "text-gray-400",
        color === "red" && "text-red-400",
        color === "yellow" && "text-yellow-400",
        color === "green" && "text-green-400",
        color === "blue" && "text-blue-400",
        color === "indigo" && "text-indigo-400",
        color === "purple" && "text-purple-400",
        color === "pink" && "text-pink-400"
    );

    return (
        <svg className={className} fill="currentColor" viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
        </svg>
    );
};

type RemoveButtonProps = {
    text: string;
    color: Color;
    onClick: () => void;
};

const RemoveButton = ({
    text,
    color,
    onClick,
}: RemoveButtonProps): JSX.Element => {
    const className = clsx(
        "ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full focus:text-white focus:outline-none",
        color === "gray" &&
            "text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:bg-gray-500",
        color === "red" &&
            "text-red-400 hover:bg-red-200 hover:text-red-500 focus:bg-red-500",
        color === "yellow" &&
            "text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 focus:bg-yellow-500",
        color === "green" &&
            "text-green-400 hover:bg-green-200 hover:text-green-500 focus:bg-green-500",
        color === "blue" &&
            "text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500",
        color === "indigo" &&
            "text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500",
        color === "purple" &&
            "text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:bg-purple-500",
        color === "pink" &&
            "text-pink-400 hover:bg-pink-200 hover:text-pink-500 focus:bg-pink-500"
    );
    return (
        <button type="button" onClick={onClick} className={className}>
            <span className="sr-only">Remove {text}</span>
            <svg
                className="h-2 w-2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 8 8"
            >
                <path
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M1 1l6 6m0-6L1 7"
                />
            </svg>
        </button>
    );
};
