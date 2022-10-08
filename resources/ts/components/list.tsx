import clsx from "clsx";
import { ReactNode } from "react";

export type ListContainerProps = {
    children: ReactNode;
    fullWidthOnMobile?: boolean;
    flat?: boolean;
    separate?: boolean;
    className?: string;
};

export type ListProps = {
    children: ReactNode;
    flat?: boolean;
    separate?: boolean;
};

export type ListItemProps = {
    children: ReactNode;
    fullWidthOnMobile?: boolean;
    inContainer?: boolean;
    separate?: boolean;
    noPadding?: boolean;
    className?: string;
};

export const ListContainer = ({
    children,
    fullWidthOnMobile = false,
    flat = false,
    separate = false,
    className: cls,
}: ListContainerProps): JSX.Element => {
    const className = clsx(
        "overflow-hidden",
        !separate && "bg-white",
        flat && "border border-gray-300",
        !flat && !separate && "shadow",
        !fullWidthOnMobile && "rounded-md",
        fullWidthOnMobile && "sm:rounded-md",
        cls
    );

    return <div className={className}>{children}</div>;
};

export const List = ({
    children,
    flat = false,
    separate = false,
}: ListProps): JSX.Element => {
    const className = clsx(
        separate && "space-y-3",
        !separate && "divide-y",
        !separate && flat && "divide-gray-300",
        !separate && !flat && "divide-gray-200"
    );
    return (
        <ul role="list" className={className}>
            {children}
        </ul>
    );
};

export const ListItem = ({
    children,
    fullWidthOnMobile = false,
    inContainer = false,
    separate = false,
    noPadding = false,
    className: cls,
}: ListItemProps): JSX.Element => {
    const className = clsx(
        separate && "overflow-hidden bg-white shadow",
        separate && fullWidthOnMobile && "sm:rounded-md",
        separate && !fullWidthOnMobile && "rounded-md",
        !noPadding &&
            (separate || inContainer) &&
            fullWidthOnMobile &&
            "sm:px-6 px-4 py-4",
        !noPadding &&
            (separate || inContainer) &&
            !fullWidthOnMobile &&
            "px-6 py-4",
        !noPadding && !inContainer && fullWidthOnMobile && "px-4",
        !noPadding && !inContainer && !fullWidthOnMobile && "sm:px-0 py-4",
        cls
    );

    return <li className={className}>{children}</li>;
};
