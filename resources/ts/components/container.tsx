import clsx from "clsx";
import { ReactNode } from "react";

export type ContainerProps = {
    children: ReactNode;
    padding?: boolean;
    breakpoint?: boolean;
    narrow?: boolean;
    className?: string;
    innerClassName?: string;
};

export default ({
    children,
    padding = false,
    breakpoint = false,
    narrow = false,
    className: cls,
    innerClassName: innerCls,
}: ContainerProps): JSX.Element => {
    const className = clsx(
        "mx-auto sm:px-6 lg:px-8",
        padding && "px-4",
        breakpoint && "container",
        !breakpoint && "max-w-7xl",
        cls
    );

    const innerClassName = clsx(narrow && "mx-auto max-w-3xl", innerCls);

    return (
        <div className={className}>
            <div className={innerClassName}>{children}</div>
        </div>
    );
};
