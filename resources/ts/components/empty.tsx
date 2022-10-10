import { createElement } from "react";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type IconTypeProps = {
    className: string;
    "aria-hidden": boolean;
};

type IconType = (props: IconTypeProps) => JSX.Element;

type IconProps = {
    icon?: IconType;
    className?: string;
};

export interface EmptyProps {
    icon?: IconType;
    title?: string;
    description?: string;
}

export default ({
    icon = CircleStackIcon,
    title = "No results to display",
    description = "Whoops, sorry but we don't have anything to show you.",
}): JSX.Element => (
    <div className="text-center">
        <Icon icon={icon} />
        <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
);

const Icon = ({ icon, className: cls }: IconProps): JSX.Element => {
    const className = clsx("mx-auto h-12 w-12 text-gray-400", cls);
    return createElement(icon, {
        className,
        "aria-hidden": true,
    });
};
